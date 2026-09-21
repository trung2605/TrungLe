export const post01 = {
  id: 1,
  slug: "threadlearn-javascript-concurrency-bugs",
  date: "2026-06-11",
  tags: ["AI", "RAG", "Fine-tuning", "JavaScript", "FastAPI"],
  readTime: "9 min read",
  titleVi: "Dạy một model 1.5B tham số sửa lỗi concurrency JavaScript",
  excerptVi: "Bên trong ThreadLearn: fine-tune Qwen2.5-Coder-1.5B bằng QLoRA, ghép RAG pipeline dựa trên BM25, và vì sao model nhỏ lại thắng GPT-3.5-turbo trên một domain hẹp.",
  titleEn: "Teaching a 1.5B-Parameter Model to Fix JavaScript Concurrency Bugs",
  excerptEn: "Inside ThreadLearn: fine-tuning Qwen2.5-Coder-1.5B with QLoRA, pairing it with a BM25-based RAG pipeline, and why a small model beats GPT-3.5-turbo on a narrow domain.",
  contentVi: `JavaScript chạy trên một luồng duy nhất — single-threaded event loop — nhưng lại xử lý hàng loạt tác vụ bất đồng bộ cùng lúc qua callback, Promise, async/await. Chính khoảng cách giữa "một luồng" và "nhiều tác vụ chồng lấp" đó tạo ra một lớp lỗi rất khó chịu: **concurrency bugs**. Theo nghiên cứu NodeCB (ASE 2017) phân tích 57 lỗi thực tế trên 53 dự án Node.js, 93% trong số đó gây hậu quả nghiêm trọng — crash server, sai dữ liệu, hoặc treo vĩnh viễn. Và chúng gần như không bao giờ lộ diện khi chạy test đơn lẻ.

Ví dụ kinh điển — hai request cùng đọc rồi cùng ghi:

\`\`\`javascript
const stock = await db.getStock(productId);   // cả 2 request đọc được stock = 1
await db.setStock(productId, stock - 1);       // cả 2 request đặt stock = 0
// bán được 2 sản phẩm, kho chỉ có 1 — race condition
\`\`\`

Công cụ tĩnh như ESLint chỉ báo lỗi, không sửa. Gọi GPT-4 thì tốn phí, cần internet, và không chuyên biệt cho domain này. **ThreadLearn** — đồ án môn WDP301 tại FPT University tôi làm cùng hai bạn cùng nhóm — thử một hướng khác: fine-tune một model nhỏ (Qwen2.5-Coder-1.5B) để chuyên trị đúng một loại lỗi, rồi bù kiến thức còn thiếu bằng RAG.

## Vì sao model nhỏ, không phải GPT-4

Ba lý do thực dụng: chi phí, độ trễ, và khả năng chạy offline trong môi trường doanh nghiệp có firewall. Nhóm chọn **Qwen2.5-Coder-1.5B** — đủ nhỏ để chạy trên GPU 8GB, đủ mạnh vì đã pretrain trên hàng trăm tỷ token code — rồi fine-tune bằng **QLoRA** (load model 4-bit NF4, chỉ train một adapter LoRA rank 16, tức khoảng 0.5% tổng tham số). Toàn bộ quá trình chạy trên 2×T4 miễn phí của Kaggle, khoảng 2 giờ.

Phần fine-tuning (783 cặp code lỗi/đã sửa, dataset thu thập từ GitHub + viết tay) là công của bạn cùng nhóm Hà Văn Ân. Phần tôi trực tiếp phụ trách là **RAG pipeline và API server** — chỗ đáng kể nhất về mặt kỹ thuật, nên đây là phần tôi kể chi tiết.

## RAG: vì sao BM25, không phải vector search

Với JavaScript, người lập trình biết chính xác tên API cần tìm — \`Promise.all\`, \`setTimeout\`, \`appendFile\`. Đó là bài toán exact-keyword-match, không phải semantic similarity. Vector search (FAISS, Chroma) cần GPU để embed, cần model 500MB+, và đôi khi bỏ sót match chính xác vì tối ưu cho "ý nghĩa gần giống" chứ không phải "đúng từ khóa". **BM25** — thuật toán tìm kiếm dựa trên tần suất từ, cải tiến từ TF-IDF — build index cho 2050 tài liệu trong dưới 500ms, không cần GPU, và cho kết quả tốt hơn trên domain code.

Vấn đề là BM25 mặc định tokenize kém với code: \`setTimeout\` bị vỡ thành \`["set", "timeout"]\`, \`fetchAllUsers\` thành \`["fetch", "all", "users"]\`. Khi query chứa \`setTimeout\` nguyên vẹn, nó khớp yếu hơn với tài liệu đã bị tách vụn. Bản đầu tôi viết regex tokenizer để tách CamelCase — chạy được nhưng vẫn làm vỡ tên API khi trích keyword từ code đầu vào.

Bản sửa sau dùng **esprima parse code thành AST**, rồi chỉ lấy token loại \`Identifier\` — tên hàm/biến do lập trình viên đặt — bỏ qua keyword ngôn ngữ (\`async\`, \`await\`, \`for\`):

\`\`\`python
script = esprima.parseScript(code, options={"tolerant": True, "tokens": True})
for tok in script.tokens:
    if tok.type == "Identifier" and tok.value not in _JS_STOPWORDS:
        result.append(tok.value)
\`\`\`

So sánh trực tiếp: \`fs.appendFile(logPath, data)\` qua regex tokenizer ra \`"fs append file path data"\` — appendFile bị vỡ. Qua AST extraction ra \`"fs appendFile logPath data"\` — nguyên vẹn. Tên API giữ nguyên nghĩa là BM25 score cao hơn với đúng tài liệu, và top-3 doc trả về chính xác hơn đáng kể.

## Kết quả — và vì sao fine-tuning quan trọng hơn RAG

Đánh giá trên 20 test case thủ công phủ 8 loại lỗi concurrency (race condition, event loop blocking, unhandled rejection, callback hell, zalgo, context loss...), chấm bằng Fix-Pattern Scoring (kiểm tra output chứa pattern fix đúng, không so khớp cứng với đáp án mẫu):

| Phương pháp | Pass | Partial | Fail | Pass Rate |
|---|---|---|---|---|
| GPT-3.5-turbo zero-shot | 6 | 11 | 3 | 30% |
| Qwen2.5-Coder-1.5B (base, chưa fine-tune) | 8 | 9 | 3 | 40% |
| ThreadLearn RAW (fine-tune, không RAG) | 14 | 6 | 0 | 70% |
| **ThreadLearn + RAG** | **15** | **5** | **0** | **75%** |

![Ablation chart](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783871855/my-website/assets/blog/threadlearn/fig_ablation.png)

### Benchmark 2 — 30 case real-world (từ npm packages thật trên GitHub Issues)

ThreadLearn + pipeline đạt **73.3% (22/30)**, vượt GPT-3.5-turbo + pipeline **65.0%** (19.5/30). Chi tiết tại \`server/tests/real_world/README.md\`.

### Phân tích

Fine-tuning đóng góp **+30pp** (40% → 70%), RAG **+5pp** (70% → 75%). 783 mẫu training đủ để model học pattern fix cụ thể; RAG giúp các case khó cần thêm ngữ cảnh ngoài training data. Không có case nào FAIL hoàn toàn — model luôn sinh ra code đọc được.

**3 category còn yếu**: Zalgo (0/1), Double Callback (0/1), Buffer Leak (0/1) — pattern rất đặc thù, ít xuất hiện trong dataset.

Event Loop Blocking đạt **100% (5/5)** — training data phủ tốt nhất.

![Per-category chi tiết](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783871858/my-website/assets/blog/threadlearn/fig_category.png)

## Bài học

Model nhỏ (~1.5B), fine-tune trên domain hẹp, **vượt GPT-3.5 (175B) dù nhỏ hơn 125 lần** — không phải vì "giỏi hơn", mà vì không phải gánh kiến thức không liên quan. BM25 + AST extraction rẻ, nhanh, offline. Khi thiết kế retrieval cho code, exact keyword match quan trọng hơn semantic similarity.

---

*Vai trò nhóm: **Lê Trí Trung** (AI2 — RAG Pipeline, FastAPI Server, Race Detector) · Hà Văn Ân (AI1 — Dataset Collection, QLoRA Fine-tuning) · Nguyễn Thị Thúy Hoài (Đánh giá mô hình & viết báo cáo). FPT University, Da Nang.*

Code, dataset, và bài nghiên cứu: [github.com/ThreadLearn/ThreadLearn_AI_Trainning](https://github.com/ThreadLearn/ThreadLearn_AI_Trainning). Bản PDF đầy đủ: \`/d/FPT/threadlearn_paper-full.pdf\`. Visual demo site: [github.com/ThreadLearn/ThreadLearn-AI-Visual](https://github.com/ThreadLearn/ThreadLearn-AI-Visual).`,
  contentEn: `JavaScript runs on a single thread — a single-threaded event loop — yet handles a mountain of asynchronous tasks at once via callbacks, Promises, and async/await. That gap between "one thread" and "many overlapping tasks" creates a particularly nasty class of bug: **concurrency bugs**. According to the NodeCB study (ASE 2017), which analyzed 57 real-world bugs across 53 Node.js projects, 93% of them caused serious consequences — server crashes, data corruption, or permanent hangs. And they almost never surface when running tests in isolation.

A classic example — two requests reading then writing at the same time:

\`\`\`javascript
const stock = await db.getStock(productId);   // both requests read stock = 1
await db.setStock(productId, stock - 1);       // both requests set stock = 0
// 2 units sold, but inventory only had 1 — race condition
\`\`\`

Static tools like ESLint only flag the bug, they don't fix it. Calling GPT-4 costs money, requires internet, and isn't specialized for this domain. **ThreadLearn** — a WDP301 course project at FPT University I built with two teammates — took a different approach: fine-tune a small model (Qwen2.5-Coder-1.5B) to specialize in exactly one class of bug, then fill the knowledge gap with RAG.

## Why a small model, not GPT-4

Three practical reasons: cost, latency, and the ability to run offline inside a firewalled enterprise environment. The team picked **Qwen2.5-Coder-1.5B** — small enough to run on an 8GB GPU, yet capable since it's pretrained on hundreds of billions of code tokens — then fine-tuned it with **QLoRA** (loading the model in 4-bit NF4, training only a rank-16 LoRA adapter, roughly 0.5% of total parameters). The whole process ran on Kaggle's free 2×T4 GPUs in about 2 hours.

The fine-tuning side (783 buggy/fixed code pairs, dataset collected from GitHub plus hand-written examples) was my teammate Ha Van An's work. What I directly owned was the **RAG pipeline and API server** — the most technically substantial part, so that's what I'll detail here.

## RAG: why BM25, not vector search

With JavaScript, a developer knows exactly which API name they're looking for — \`Promise.all\`, \`setTimeout\`, \`appendFile\`. That's an exact-keyword-match problem, not semantic similarity. Vector search (FAISS, Chroma) needs a GPU to embed, needs a 500MB+ model, and sometimes misses exact matches because it's optimized for "roughly similar meaning" rather than "the exact keyword." **BM25** — a frequency-based search algorithm, an improvement over TF-IDF — builds an index over 2,050 documents in under 500ms, needs no GPU, and produces better results on the code domain.

The catch is BM25's default tokenizer handles code poorly: \`setTimeout\` gets split into \`["set", "timeout"]\`, \`fetchAllUsers\` into \`["fetch", "all", "users"]\`. When a query contains \`setTimeout\` intact, it matches more weakly against documents that got fragmented. My first version wrote a regex tokenizer to split CamelCase — it worked, but still fragmented API names when extracting keywords from input code.

The fix uses **esprima to parse code into an AST**, then only keeps tokens of type \`Identifier\` — function/variable names the developer chose — skipping language keywords (\`async\`, \`await\`, \`for\`):

\`\`\`python
script = esprima.parseScript(code, options={"tolerant": True, "tokens": True})
for tok in script.tokens:
    if tok.type == "Identifier" and tok.value not in _JS_STOPWORDS:
        result.append(tok.value)
\`\`\`

Direct comparison: \`fs.appendFile(logPath, data)\` through the regex tokenizer becomes \`"fs append file path data"\` — appendFile gets fragmented. Through AST extraction it becomes \`"fs appendFile logPath data"\` — intact. Keeping API names intact means a higher BM25 score against the right document, and the top-3 retrieved docs come back noticeably more accurate.

## Results — and why fine-tuning matters more than RAG

Evaluated on 20 hand-crafted test cases covering 8 concurrency bug categories (race conditions, event loop blocking, unhandled rejection, callback hell, zalgo, context loss, etc.), scored with Fix-Pattern Scoring (checking whether the output contains the correct fix pattern, not a hard match against a sample answer):

| Method | Pass | Partial | Fail | Pass Rate |
|---|---|---|---|---|
| GPT-3.5-turbo zero-shot | 6 | 11 | 3 | 30% |
| Qwen2.5-Coder-1.5B (base, no fine-tune) | 8 | 9 | 3 | 40% |
| ThreadLearn RAW (fine-tuned, no RAG) | 14 | 6 | 0 | 70% |
| **ThreadLearn + RAG** | **15** | **5** | **0** | **75%** |

![Ablation chart](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783871855/my-website/assets/blog/threadlearn/fig_ablation.png)

### Benchmark 2 — 30 real-world cases (from real npm packages on GitHub Issues)

ThreadLearn + pipeline scored **73.3% (22/30)**, beating GPT-3.5-turbo + pipeline's **65.0%** (19.5/30). Full details in \`server/tests/real_world/README.md\`.

### Analysis

Fine-tuning contributed **+30pp** (40% → 70%), RAG added **+5pp** (70% → 75%). 783 training samples were enough for the model to learn concrete fix patterns; RAG helps the harder cases that need context beyond the training data. No case FAILED outright — the model always produced readable code.

**3 categories still weak**: Zalgo (0/1), Double Callback (0/1), Buffer Leak (0/1) — very niche patterns, rarely represented in the dataset.

Event Loop Blocking hit **100% (5/5)** — best-covered category in the training data.

![Per-category breakdown](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783871858/my-website/assets/blog/threadlearn/fig_category.png)

## Takeaways

A small model (~1.5B), fine-tuned on a narrow domain, **beats GPT-3.5 (175B) despite being 125x smaller** — not because it's "smarter," but because it doesn't carry irrelevant knowledge. BM25 + AST extraction is cheap, fast, and offline. When designing retrieval for code, exact keyword matching matters more than semantic similarity.

---

*Team roles: **Le Tri Trung** (AI2 — RAG Pipeline, FastAPI Server, Race Detector) · Ha Van An (AI1 — Dataset Collection, QLoRA Fine-tuning) · Nguyen Thi Thuy Hoai (Model Evaluation & Report Writing). FPT University, Da Nang.*

Code, dataset, and research paper: [github.com/ThreadLearn/ThreadLearn_AI_Trainning](https://github.com/ThreadLearn/ThreadLearn_AI_Trainning). Full PDF: \`/d/FPT/threadlearn_paper-full.pdf\`. Visual demo site: [github.com/ThreadLearn/ThreadLearn-AI-Visual](https://github.com/ThreadLearn/ThreadLearn-AI-Visual).`
};
