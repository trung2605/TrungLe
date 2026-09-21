export const post09 = {
  id: 9,
  slug: "job-finder-team-leadership-git-flow-jwt-security",
  date: "2025-11-14",
  tags: ["Team Leadership", "Agile", "JWT", "Web Security", "React", "Node.js", "Git"],
  readTime: "9 min read",

  titleVi: "Job Finder: Dẫn Dắt Đội Ngũ 6 Lập Trình Viên, Chiến Lược Git Branching Và Kiến Trúc JWT Đa Phân Quyền",
  excerptVi: "Kinh nghiệm thực chiến khi đảm nhiệm vai trò Team Leader dự án Job Finder: Điều phối sprint, thiết lập văn hóa Code Review không xung đột, và triển khai cơ chế xác thực JWT kép (Candidate/Employer) với Refresh Token Rotation an toàn tuyệt đối.",
  contentVi: `## Giới Thiệu Dự Án & Vai Trò Team Leader

**Job Finder** là một nền tảng tuyển dụng trực tuyến kết nối ứng viên tìm việc làm công nghệ với các nhà tuyển dụng doanh nghiệp. Dự án được triển khai bởi một nhóm kỹ sư gồm **6 thành viên**, và tôi đảm nhiệm vai trò **Team Leader kiêm Core Backend Architect**.

Trải nghiệm dẫn dắt một đội ngũ kỹ sư 6 người đưa tôi đối mặt với bài toán hoàn toàn khác biệt so với khi làm solo developer:
> *"Làm thế nào để 6 con người với phong cách viết code khác nhau có thể cùng commit hàng trăm lượt mỗi tuần vào một repository duy nhất mà không gây xung đột (merge conflicts), không phá vỡ tính năng của nhau, và vẫn bàn giao sản phẩm đúng hạn sprint?"*

Dưới đây là phương pháp chúng tôi đã áp dụng để vận hành trơn tru và các quyết định kỹ thuật then chốt giúp bảo mật nền tảng Job Finder.

* **Trải nghiệm sản phẩm thực tế**: [Job Finder Web App](https://fe-jobfinder.vercel.app/)
* **Mã nguồn dự án**: [GitHub - Trung Le / fe-jobfinder](https://github.com/trungle2605/fe-jobfinder)

![Giao diện tìm kiếm việc làm và cổng thông tin nhà tuyển dụng Job Finder](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783870959/my-website/assets/projects/screenshots/1-job-finder.png)

---

## 1. Thiết Lập Quy Trình Git & Chuẩn Mực Code Review

Một trong những sai lầm phổ biến nhất của các đội ngũ trẻ là cho phép mọi người commit thẳng vào nhánh \`main\` hoặc tạo các pull request khổng lồ (hơn 2,000 dòng code thay đổi) vào ngày cuối cùng của sprint.

Để loại bỏ hoàn toàn tình trạng này, tôi đã thiết lập quy tắc làm việc ngay từ ngày đầu tiên:

\`\`\`
   [main branch] (Production - Chỉ deploy bản ổn định đã qua QA)
         ▲
         │ (Pull Request có ít nhất 2 approvals)
   [develop branch] (Staging environment)
         ▲
         │ (Tách nhánh làm tính năng)
   ┌─────┴─────────────────────────┐
   │ feat/auth-jwt-rotation        │ (Developer A)
   │ feat/company-profile-upload   │ (Developer B)
   │ fix/job-filter-pagination     │ (Developer C)
\`\`\`

### Các Quy Tắc Bắt Buộc Được Cài Đặt Trên GitHub:
1. **Branch Protection Rules**: Nhánh \`main\` và \`develop\` bị khóa hoàn toàn quyền push trực tiếp (\`git push --force\` bị cấm vĩnh viễn).
2. **Nguyên tắc "Small PRs"**: Mỗi Pull Request không được vượt quá **300 dòng code**. Điều này giúp các thành viên review kỹ lưỡng từng logic thay vì chỉ lướt qua lấy lệ.
3. **Checklist Review Rõ Ràng**:
   * Code có xử lý trường hợp ngoại lệ (\`try/catch\`, \`null/undefined check\`) chưa?
   * Có vi phạm bảo mật (hardcode secret key, SQL injection) không?
   * Giao diện responsive trên cả mobile và desktop chưa?

---

## 2. Thống Nhất Hợp Đồng Dữ Liệu (API Contract First)

Xung đột lớn nhất giữa đội ngũ Frontend và Backend thường là: Frontend chờ Backend viết xong API mới làm giao diện, hoặc khi ghép nối thì tên trường dữ liệu bị lệch (\`userId\` vs \`user_id\`).

Tôi đã áp dụng nguyên tắc **API-First Design**:
* Trước khi bất kỳ ai gõ dòng code đầu tiên, tôi cùng các bạn thiết kế toàn bộ schema request/response bằng tài liệu **Swagger / OpenAPI**.
* Sử dụng công cụ mock server (như MSW hoặc Prism) để team Frontend có thể phát triển giao diện ngay lập tức với dữ liệu giả định chuẩn xác 100% với Backend tương lai.
* Nhờ đó, thời gian ghép nối (integration phase) vào cuối sprint giảm từ **3 ngày xuống chỉ còn chưa đầy 2 giờ đồng hồ**.

---

## 3. Kiến Trúc Xác Thực JWT Phân Quyền Kép (Dual-Role RBAC)

Hệ thống Job Finder có 2 đối tượng người dùng với vòng đời và quyền hạn hoàn toàn tách biệt:
1. **Ứng viên (Candidate)**: Tìm kiếm việc làm, nộp hồ sơ CV (PDF), nhận thông báo phỏng vấn.
2. **Nhà tuyển dụng (Employer/Recruiter)**: Đăng tin tuyển dụng, xem hồ sơ ứng viên, đặt lịch phỏng vấn và quản lý gói tin đăng.

Để ngăn chặn lỗ hổng leo thang đặc quyền (Privilege Escalation - ví dụ một ứng viên sửa request để đăng tin tuyển dụng hoặc xem CV của người khác), tôi thiết kế middleware phân quyền đa lớp:

\`\`\`javascript
// Middleware xác thực quyền hạn theo vai trò (Role-Based Access Control)
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to perform this action.'
      });
    }
    next();
  };
};

// Route chỉ dành riêng cho Nhà Tuyển Dụng
router.post(
  '/api/v1/jobs',
  verifyJwtToken,
  authorizeRoles('EMPLOYER', 'ADMIN'),
  jobController.createJobPosting
);
\`\`\`

![Trang quản lý tin tuyển dụng và theo dõi hồ sơ ứng viên](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579568/my-website/assets/projects/screenshots/yfy17yiopbaz9vlzvv1m.png)

---

## 4. Bảo Mật Token Với Cơ Chế Refresh Token Rotation (RTR)

Lưu trữ Access Token trong \`localStorage\` là một rủi ro bảo mật lớn vì dễ bị tấn công qua lỗi **XSS (Cross-Site Scripting)**. Nếu hacker chèn được một đoạn script độc hại vào trang web, toàn bộ token người dùng sẽ bị đánh cắp.

Để giải quyết triệt để, chúng tôi áp dụng chiến lược xác thực kép với **Refresh Token Rotation**:

\`\`\`
   Client (React)                       Server (Node.js API)
     │                                         │
     │── 1. POST /login ──────────────────────►│
     │◄── 2. Access Token (Memory) + ──────────│
     │       Refresh Token (HttpOnly Cookie)   │
     │                                         │
     │── 3. GET /api/v1/profile (Bearer AT) ──►│
     │◄── 4. 401 Unauthorized (AT Hết Hạn) ───│
     │                                         │
     │── 5. POST /refresh-token (RT Cookie) ──►│ (Hủy RT cũ, sinh cặp AT/RT mới)
     │◄── 6. New AT + New RT Cookie ───────────│
\`\`\`

1. **Access Token (Thời gian sống ngắn: 15 phút)**: Được lưu trong bộ nhớ biến JavaScript (in-memory state), hoàn toàn không lưu vào \`localStorage\`. Nếu người dùng refresh trang, ứng dụng gọi nhẹ endpoint \`/refresh-token\` để cấp lại.
2. **Refresh Token (Thời gian sống: 7 ngày)**: Được lưu trong cookie có gắn cờ:
   * \`HttpOnly: true\` (JavaScript không thể đọc được, miễn nhiễm 100% với XSS).
   * \`Secure: true\` (Chỉ truyền qua giao thức mã hóa HTTPS).
   * \`SameSite: Strict\` (Bảo vệ tuyệt đối khỏi tấn công CSRF).
3. **Cơ Chế Token Rotation & Phát Hiện Xâm Nhập (Compromise Detection)**: Mỗi khi Refresh Token được dùng để cấp Access Token mới, server lập tức **thu hồi (revoke) token cũ và cấp một chuỗi Refresh Token mới**. Nếu một Refresh Token cũ đã bị sử dụng lại (dấu hiệu kẻ gian đã lấy cắp token), hệ thống sẽ lập tức vô hiệu hóa toàn bộ phiên đăng nhập của tài khoản đó!

---

## 5. Những Bài Học Quý Giá Khi Dẫn Dắt Nhóm Kỹ Sư

Trải nghiệm tại Job Finder đã giúp tôi trưởng thành vượt bậc về kỹ năng quản trị kỹ thuật:
* **Lắng nghe và tôn trọng**: Mỗi thành viên đều có thế mạnh riêng (người giỏi UI/UX animation, người giỏi tối ưu database). Người lãnh đạo giỏi là người biết đặt đúng người vào đúng vị trí để họ tỏa sáng.
* **Tài liệu hóa rõ ràng (Documentation is King)**: Hướng dẫn cài đặt môi trường (\`README.md\`, Docker compose) rõ ràng giúp thành viên mới onboard và bắt tay vào việc chỉ sau 30 phút.
* **Xây dựng văn hóa không đổ lỗi (Blameless Post-Mortem)**: Khi hệ thống gặp bug hoặc merge conflict, nhóm cùng nhau ngồi lại tìm giải pháp cải tiến quy trình CI thay vì tìm người để chỉ trích.`,

  titleEn: "Job Finder: Leading a 6-Engineer Team, Git Branching Strategy, and Enterprise JWT Security",
  excerptEn: "Hands-on leadership insights from the Job Finder project: Driving Agile sprints, cultivating a conflict-free Code Review culture, and engineering dual-role JWT authentication (Candidate/Employer) with secure Refresh Token Rotation.",
  contentEn: `## Project Introduction & The Team Lead Role

**Job Finder** is a web-based tech talent recruiting platform connecting software engineers with technology enterprises. The project was engineered by a cross-functional team of **6 developers**, where I served as the **Team Leader and Core Backend Architect**.

Leading a 6-engineer engineering team presented a challenge completely distinct from solo development:
> *"How do you coordinate 6 engineers with different coding habits, committing hundreds of lines across multiple features weekly to a single repository without merge conflicts, regression bugs, or missed sprint milestones?"*

Here is our battle-tested operational workflow and the core security architecture protecting Job Finder.

* **Live Web App**: [Job Finder Production](https://fe-jobfinder.vercel.app/)
* **Repository**: [GitHub - Trung Le / fe-jobfinder](https://github.com/trungle2605/fe-jobfinder)

![Job Finder Web Interface & Tech Recruitment Portal](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783870959/my-website/assets/projects/screenshots/1-job-finder.png)

---

## 1. Git Workflow Governance & Code Review Culture

A recurring failure mode in junior engineering teams is pushing unreviewed code directly into \`main\` or dumping monstrous pull requests (2,000+ line diffs) at the tail end of a sprint.

We instituted strict repository governance from Day 1:

\`\`\`
   [main branch] (Production - Deployed only after QA signoff)
         ▲
         │ (Pull Request requiring min. 2 approvals)
   [develop branch] (Staging integration environment)
         ▲
         │ (Feature Branching)
   ┌─────┴─────────────────────────┐
   │ feat/auth-jwt-rotation        │ (Developer A)
   │ feat/company-profile-upload   │ (Developer B)
   │ fix/job-filter-pagination     │ (Developer C)
\`\`\`

### Enforced GitHub Repository Rules:
1. **Branch Protection**: Direct pushes to \`main\` and \`develop\` were permanently disabled (\`git push --force\` disallowed).
2. **Atomic PR Discipline**: Pull requests were capped at **<300 lines of code**. This transformed code reviews from superficial scans into rigorous logic evaluations.
3. **Structured Review Checklist**:
   * Proper exception handling (\`try/catch\`, defensive \`null/undefined\` guards).
   * Strict security checks (zero hardcoded secrets, parameterized queries).
   * Verified responsive behavior across both mobile and desktop viewports.

---

## 2. API Contract-First Engineering

The classic frontend-backend synchronization dilemma occurs when frontend developers are blocked waiting for backend endpoints, or discover subtle schema mismatches (\`userId\` vs \`user_id\`) right before release.

We adopted an **API-First Design** methodology:
* Before typing implementation code, we collaboratively defined every request and response schema in a comprehensive **Swagger / OpenAPI** specification.
* Frontend developers used mock adapters (such as MSW or Prism), enabling complete UI and state implementation in parallel with backend development.
* Consequently, end-of-sprint integration time collapsed from **3 days down to under 2 hours**.

---

## 3. Dual-Role RBAC Authorization Architecture

Job Finder serves two distinct user personas with mutually exclusive permissions:
1. **Candidates**: Search jobs, upload CVs, track application statuses.
2. **Employers / Recruiters**: Publish job postings, review applicants, schedule interviews, and manage subscription quotas.

To preempt Privilege Escalation vulnerabilities, we instituted robust role-based middleware:

\`\`\`javascript
// Role-Based Access Control (RBAC) Middleware
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to perform this action.'
      });
    }
    next();
  };
};

// Employer-restricted endpoint
router.post(
  '/api/v1/jobs',
  verifyJwtToken,
  authorizeRoles('EMPLOYER', 'ADMIN'),
  jobController.createJobPosting
);
\`\`\`

![Employer Job Management Dashboard & Candidate Tracking](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579568/my-website/assets/projects/screenshots/yfy17yiopbaz9vlzvv1m.png)

---

## 4. Hardening Auth via Refresh Token Rotation (RTR)

Storing long-lived JWTs inside browser \`localStorage\` is an acute security hazard due to vulnerability to **Cross-Site Scripting (XSS)**. Any injected script can exfiltrate credentials instantly.

We mitigated this through an enterprise dual-token architecture with **Refresh Token Rotation**:

\`\`\`
   Client (React)                       Server (Node.js API)
     │                                         │
     │── 1. POST /login ──────────────────────►│
     │◄── 2. Short Access Token (In-Memory) + ─│
     │       Refresh Token (HttpOnly Cookie)   │
     │                                         │
     │── 3. GET /api/v1/profile (Bearer AT) ──►│
     │◄── 4. 401 Unauthorized (AT Expired) ───│
     │                                         │
     │── 5. POST /refresh-token (RT Cookie) ──►│ (Revoke old RT, issue new AT/RT pair)
     │◄── 6. New AT + New RT Cookie ───────────│
\`\`\`

1. **Access Token (15-min lifespan)**: Held strictly in volatile JavaScript application state (in-memory). If a user refreshes the tab, a silent background ping to \`/refresh-token\` restructures state.
2. **Refresh Token (7-day lifespan)**: Delivered in a secure cookie flagged with:
   * \`HttpOnly: true\` (Inaccessible to browser scripts, 100% immune to XSS theft).
   * \`Secure: true\` (Transmitted exclusively over TLS/HTTPS).
   * \`SameSite: Strict\` (Immune to Cross-Site Request Forgery).
3. **Compromise Detection**: Every time a refresh token generates a new access token, the old refresh token is **immediately invalidated and rotated**. If an already-rotated token is submitted again (indicating a potential stolen credential replay attack), the backend immediately terminates all active sessions for that account.

---

## 5. Key Leadership Insights

Guiding Job Finder to completion elevated my perspective as an engineering leader:
* **Empowering Team Strengths**: Great leadership is about aligning individual developer talents (animation finesse vs database query tuning) with the right architectural components.
* **Documentation as an Accelerator**: High-quality \`README.md\` specs and automated Docker Compose configs enabled frictionless local onboarding.
* **Blameless Post-Mortem Culture**: When bugs emerged, our team focused on root causes and CI automation guards rather than assigning individual fault.`
};
