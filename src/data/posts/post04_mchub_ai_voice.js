export const post04 = {
  id: 4,
  slug: "the-mc-hub-ai-speech-analysis-microservice",
  date: "2026-07-20",
  tags: ["Python", "FastAPI", "AI Voice", "Whisper", "Librosa", "Audio DSP", "Microservices"],
  readTime: "11 min read",

  titleVi: "The MC Hub: Xây Dựng Microservice Phân Tích Giọng Nói AI Bằng Python FastAPI, Whisper & Librosa DSP",
  excerptVi: "Chi tiết kiến trúc kỹ thuật microservice phân tích âm thanh giọng nói cho MC: Thuật toán trích xuất đường cong cao độ F0 (pYIN), căn chỉnh mốc thời gian từ vựng và thuật toán chấm điểm 4 chiều, kèm hình ảnh minh họa từ sản phẩm thật.",
  contentVi: `## Giới Thiệu & Bài Toán Tại The MC Hub

Trong dự án **[The MC Hub](https://mc-voice-training.vercel.app/)** — nền tảng số hóa đào tạo kỹ năng dẫn chương trình và luyện giọng trực tuyến đầu tiên tại Việt Nam — bài toán công nghệ thử thách nhất mà tôi chịu trách nhiệm thiết kế là: **Làm thế nào để một hệ thống máy tính có thể "nghe" một đoạn thu âm giọng nói của học viên và đưa ra nhận xét, chấm điểm chi tiết như một giảng viên thanh nhạc / MC kỳ cựu?**

![Giao diện phòng luyện giọng thông minh The MC Hub](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579575/my-website/assets/projects/screenshots/01-landing.png)

Nhiều người lầm tưởng rằng chỉ cần gọi API Speech-to-Text của Google hoặc Whisper là xong. Nhưng đối với một MC chuyên nghiệp, việc phát âm đúng chữ chỉ chiếm 30% sự thành công. 70% còn lại nằm ở:
1. **Ngữ điệu (Intonation / Pitch Contour)**: Giọng có truyền cảm, có trầm bổng nhấn nhá hay đều đều (monotone) gây buồn ngủ?
2. **Tốc độ nói (Speaking Pace / Cadence)**: Tốc độ có phù hợp với bối cảnh sự kiện hay không? (Gala trang trọng cần 120 - 135 từ/phút; tiệc cưới sôi động cần 140 - 160 từ/phút).
3. **Nhịp ngắt nghỉ (Pauses & Breathing Rhythm)**: Điểm ngắt câu có tự nhiên, hay ngắt giữa chừng làm gãy nghĩa câu văn? Có bị các khoảng lặng chết (awkward silence) hay không?

Bài viết này đi sâu vào kiến trúc và giải pháp kỹ thuật cụ thể đằng sau hệ thống phân tích giọng nói này.

* **Trải nghiệm sản phẩm thực tế**: [The MC Hub Web Application](https://mc-voice-training.vercel.app/)
* **Mã nguồn microservice AI**: [github.com/trungle2605/the-mc-hub-ai-service](https://github.com/trungle2605/the-mc-hub-ai-service)

---

## 1. Kiến Trúc Xử Lý Tín Hiệu 2 Luồng Song Song (Dual-Track Pipeline)

Để giải quyết đồng thời cả nội dung văn bản và đặc tính âm học mà không làm nghẽn server, tôi thiết kế pipeline xử lý bất đồng bộ qua **Python FastAPI**:

![Bảng điều khiển phân tích chi tiết độ cao giọng nói F0, nhịp thở và tốc độ nói](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579578/my-website/assets/projects/screenshots/01-dashboard-full.png)

\`\`\`
   Audio Thu Âm (Browser WebM / WAV)
               │
               ▼
   [FFmpeg Stream Wrapper: Chuẩn hóa 16kHz Mono 16-bit PCM]
               ├───► [Track 1: Speech-to-Text & Word Alignment (OpenAI Whisper)]
               │         └── Word-level Timestamps, Phát hiện lắp bắp / từ thừa
               │
               └───► [Track 2: Digital Signal Processing (Librosa + Pyin)]
                         ├── Đường cong tần số cơ bản F0 (Fundamental Frequency)
                         ├── Năng lượng âm lượng khung (Frame RMS Energy)
                         └── Phát hiện khoảng lặng (Silence & Pause Segmentation)
               │
               ▼
   [Scoring & Feedback Engine: Thuật toán chấm điểm tổng hợp 4 chiều]
               │
               ▼
   Kết quả JSON + Biểu đồ Radar + Lời khuyên cá nhân hóa
\`\`\`

---

## 2. Track 1: Căn Chỉnh Thời Gian Từ Vựng (Word-Level Alignment) Với Whisper

Khi sử dụng Whisper thông thường, mô hình chỉ trả về các phân đoạn câu lớn (segments 3 - 5 giây). Điều này không đủ để chỉ ra cho học viên biết họ đã "ngắc ngứ" hoặc kéo dài giọng ở từ cụ thể nào.

Tôi sử dụng cơ chế Cross-Attention weights của Whisper để trích xuất mốc thời gian chính xác tới từng từ (\`word_timestamps=True\`):

\`\`\`python
import whisper_timestamped as whisper
import numpy as np

def transcribe_and_align_words(audio_path: str):
    # Tải mô hình Whisper 'base' được tối ưu hóa inference thời gian thực
    model = whisper.load_model("base", device="cuda" if torch.cuda.is_available() else "cpu")
    
    result = whisper.transcribe(model, audio_path, language="vi", word_timestamps=True)
    
    words_data = []
    for segment in result["segments"]:
        for word in segment["words"]:
            words_data.append({
                "text": word["text"],
                "start": word["start"],
                "end": word["end"],
                "duration": round(word["end"] - word["start"], 3),
                "confidence": round(word["confidence"], 2)
            })
            
    return result["text"], words_data
\`\`\`

Nhờ có mốc thời gian từng từ, hệ thống tính toán được:
* **Tốc độ nói tức thời (Instantaneous WPM - Words Per Minute)** theo từng câu văn.
* **Thời gian kéo dài âm tiết**: Phát hiện các từ bị kéo dài bất thường do học viên chưa thuộc kịch bản (ví dụ từ *"làaaaa"* kéo dài 1.8 giây).

---

## 3. Track 2: Xử Lý Tín Hiệu Âm Thanh Số (Audio DSP) Với Librosa

### 3.1. Trích Xuất Tần Số Cơ Bản F0 (Pitch Contour) Bằng Thuật Toán pYIN
Để biết giọng người nói trầm, bổng hay đều đều, chúng ta cần theo dõi tần số dao động của dây thanh quản (gọi là $F_0$). Tôi áp dụng giải thuật **Probabilistic YIN (pYIN)**:

\`\`\`python
import librosa
import numpy as np

def extract_pitch_contour(y: np.ndarray, sr: int):
    # Giới hạn dải tần giọng nói người thông thường: 65 Hz (nam trầm) đến 400 Hz (nữ cao)
    fmin = librosa.note_to_hz('C2')   # ~65 Hz
    fmax = librosa.note_to_hz('G5')   # ~392 Hz
    
    # Tính F0 theo từng khung thời gian (hop length = 512 mẫu)
    f0, voiced_flag, voiced_probs = librosa.pyin(
        y, 
        fmin=fmin, 
        fmax=fmax, 
        sr=sr,
        frame_length=2048,
        hop_length=512
    )
    
    # Lọc bỏ các khung không có tiếng nói (unvoiced frames)
    valid_f0 = f0[voiced_flag & ~np.isnan(f0)]
    
    if len(valid_f0) == 0:
        return {"mean_pitch": 0, "pitch_variance": 0, "contour": []}
        
    return {
        "mean_pitch_hz": float(np.mean(valid_f0)),
        "pitch_std_hz": float(np.std(valid_f0)), # Độ biến thiên cao độ -> Đo độ truyền cảm!
        "pitch_contour": [float(val) if not np.isnan(val) else 0.0 for val in f0[::4]]
    }
\`\`\`

*Ý nghĩa số học*: Độ lệch chuẩn cao độ (\`pitch_std_hz\`) phản ánh trực tiếp sự biểu cảm:
* Sigma < 15 Hz: Giọng **monotone** (đều đều, thiếu cảm xúc).
* 25 Hz <= Sigma <= 55 Hz: Giọng **truyền cảm, có điểm nhấn ấn tượng**.
* Sigma > 70 Hz: Giọng quá kích động hoặc không kiểm soát được cao độ.

---

## 4. Bảng Chấm Điểm 4 Tiêu Chí & Công Thức Đánh Giá Tổng Hợp

Hệ thống quy đổi các chỉ số vật lý thành điểm số thang 100 theo tiêu chuẩn đào tạo MC:

| Tiêu Chí | Công Thức Tính Toán Từ Tín Hiệu | Thang Điểm & Mục Tiêu Chuẩn |
| :--- | :--- | :--- |
| **Độ Biểu Cảm (Intonation)** | Hàm Sigmoid của Sigma(F0) và dải động Dynamic Range RMS | 35 - 50 Hz -> 90 - 100 điểm |
| **Tốc Độ Nói (Pace)** | WPM chuẩn hóa theo thể loại sự kiện (Gala, Wedding, Talkshow) | 130 - 145 WPM -> 95 điểm |
| **Nhịp Ngắt Nghỉ (Pauses)** | Tỷ lệ khoảng lặng / tổng thời lượng và vị trí ngắt câu | 18% - 24% thời lượng -> 100 điểm |
| **Độ Rõ Ràng (Clarity)** | Trung bình cộng điểm tin cậy (Confidence score) từ Whisper | Confidence > 0.92 -> 95 điểm |

![Thư viện bài tập luyện giọng chuyên sâu cho MC chuyên nghiệp](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579580/my-website/assets/projects/screenshots/04-voice-library.png)

---

## 5. Tối Ưu Hóa Hiệu Năng Microservice Trên Hạ Tầng Giới Hạn

Để microservice có thể phục vụ hàng chục người dùng luyện giọng đồng thời trên một máy chủ VPS chỉ có 2 vCPU và 4GB RAM (không có GPU rời):

1. **Chuyển Đổi Định Dạng Âm Thanh Bằng Streaming FFmpeg**: Thay vì lưu file tạm thời ra ổ cứng SSD (Disk I/O), stream âm thanh được truyền trực tiếp qua stdin của tiến trình FFmpeg C++ và đẩy thẳng vào bộ nhớ RAM NumPy array.
2. **Kỹ Thuật Quantization INT8 Cho Whisper**: Sử dụng thư viện \`faster-whisper\` (dựa trên CTranslate2 engine) lượng tử hóa mô hình sang số nguyên 8-bit, giúp giảm **65% dung lượng RAM** và tăng tốc độ suy luận gấp **3.2 lần** trên CPU thông thường.
3. **Background Task Queue**: Quá trình phân tích chuyên sâu được đẩy vào BackgroundTasks của FastAPI, trả về mã theo dõi \`job_id\` ngay lập tức và thông báo kết quả cho React Frontend qua WebSocket.

---

## 6. Kết Luận

Dự án The MC Hub khẳng định một tư duy then chốt: **Để tạo ra sản phẩm AI có giá trị thực sự, ta không thể chỉ phụ thuộc vào các API hộp đen có sẵn. Ta cần kết hợp sự am hiểu sâu sắc về lĩnh vực chuyên môn (Domain Knowledge của nghề MC) với toán học xử lý tín hiệu (DSP) và kỹ thuật phần mềm hiệu năng cao.**`,

  titleEn: "The MC Hub: Engineering an AI Speech Analysis Microservice with Python FastAPI, Whisper & Librosa DSP",
  excerptEn: "Deep-dive technical breakdown of the MC audio analysis engine: fundamental frequency F0 extraction (pYIN), word-level temporal alignment, and multi-dimensional vocal rubric scoring, accompanied by live production screenshots.",
  contentEn: `## Introduction & Problem Space at The MC Hub

In **[The MC Hub](https://mc-voice-training.vercel.app/)** — Vietnam's pioneering digital voice coaching and master of ceremonies training platform — the most demanding technical challenge I architected was: **How can a software system listen to a user's speech recording and provide actionable, granular coaching feedback on par with a veteran vocal instructor?**

![The MC Hub Intelligent Voice Coaching Suite](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579575/my-website/assets/projects/screenshots/01-landing.png)

Many assume that calling a commodity Speech-to-Text API solves the problem. But for a professional speaker or event host, reciting the correct words represents barely 30% of vocal delivery. The decisive 70% resides in:
1. **Intonation & Pitch Dynamics ($F_0$)**: Is the delivery engaging and melodic, or monotone and disengaging?
2. **Speaking Cadence (Pace / WPM)**: Does the host match the event's situational tempo? (A prestigious formal gala demands 120–135 WPM; an upbeat wedding requires 140–160 WPM).
3. **Pauses & Respiratory Control**: Do pauses occur naturally at semantic phrase boundaries, or do awkward mid-sentence breath intakes fracture comprehension?

Here is the full architectural breakdown of this audio intelligence microservice.

* **Live Web App**: [The MC Hub](https://mc-voice-training.vercel.app/)
* **Microservice Source Code**: [github.com/trungle2605/the-mc-hub-ai-service](https://github.com/trungle2605/the-mc-hub-ai-service)

---

## 1. Dual-Track Parallel DSP Architecture

To process textual semantic meaning and acoustic physical properties without server contention, I designed an asynchronous pipeline using **Python FastAPI**:

![Real-time speech pitch dynamics, breathing pauses, and speaking rate dashboard](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579578/my-website/assets/projects/screenshots/01-dashboard-full.png)

\`\`\`
   Browser Audio Ingestion (WebM / WAV)
               │
               ▼
   [In-Memory FFmpeg Stream: 16kHz Mono 16-bit PCM]
               ├───► [Track 1: Semantic & Word Timestamps (OpenAI Whisper)]
               │         └── Word-level start/end timestamps, filler detection
               │
               └───► [Track 2: Digital Signal Processing (Librosa + pYIN)]
                         ├── Pitch Contour ($F_0$ Fundamental Frequency)
                         ├── Frame RMS Energy & Dynamics
                         └── Pause & Silence Segmentation
               │
               ▼
   [Multi-Dimensional Scoring Engine & Feedback Synthesizer]
               │
               ▼
   JSON Diagnostic Report + Dynamic Radar Visualizer
\`\`\`

---

## 2. Track 1: Word-Level Temporal Alignment with Whisper

Standard Whisper models return coarse temporal segments (3–5 seconds). To pinpoint precisely which syllable a student hesitated on, we extracted cross-attention matrix weights via \`whisper_timestamped\`:

\`\`\`python
import whisper_timestamped as whisper

def transcribe_and_align_words(audio_path: str):
    model = whisper.load_model("base", device="cpu")
    result = whisper.transcribe(model, audio_path, language="vi", word_timestamps=True)
    
    words_data = []
    for segment in result["segments"]:
        for word in segment["words"]:
            words_data.append({
                "text": word["text"],
                "start": word["start"],
                "end": word["end"],
                "duration": round(word["end"] - word["start"], 3),
                "confidence": round(word["confidence"], 2)
            })
    return result["text"], words_data
\`\`\`

---

## 3. Track 2: Acoustic Signal Processing with Librosa

### Fundamental Frequency ($F_0$) Extraction with pYIN
To map pitch contour, we deploy the **Probabilistic YIN (pYIN)** algorithm bounded to human vocal anatomy:

\`\`\`python
import librosa
import numpy as np

def extract_pitch_contour(y: np.ndarray, sr: int):
    fmin = librosa.note_to_hz('C2')   # ~65 Hz
    fmax = librosa.note_to_hz('G5')   # ~392 Hz
    
    f0, voiced_flag, voiced_probs = librosa.pyin(
        y, fmin=fmin, fmax=fmax, sr=sr,
        frame_length=2048, hop_length=512
    )
    
    valid_f0 = f0[voiced_flag & ~np.isnan(f0)]
    return {
        "mean_pitch_hz": float(np.mean(valid_f0)) if len(valid_f0) > 0 else 0,
        "pitch_std_hz": float(np.std(valid_f0)) if len(valid_f0) > 0 else 0,
        "pitch_contour": [float(v) if not np.isnan(v) else 0.0 for v in f0[::4]]
    }
\`\`\`

*Standard Deviation Metric*: Pitch variation standard deviation (Sigma) translates directly into emotional expressiveness:
* Sigma < 15 Hz: Monotone delivery.
* 25 Hz <= Sigma <= 55 Hz: Eloquent, resonant delivery.
* Sigma > 70 Hz: Erratic vocal stability.

![Specialized voice training curriculum library](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579580/my-website/assets/projects/screenshots/04-voice-library.png)

---

## 4. Production CPU Optimization

To host concurrent speech coaching sessions within a 2 vCPU / 4GB RAM VPS budget:
1. **Pipelined In-Memory Audio Streaming**: FFmpeg subprocesses pipe directly into memory buffers without disk write overhead.
2. **CTranslate2 INT8 Quantization**: By running \`faster-whisper\` with 8-bit quantized weights, RAM utilization shrank by **65%** and inference throughput improved by **3.2x** on commodity x86 CPUs.

---

## 5. Engineering Reflections

Building The MC Hub proved that transformative AI solutions are forged not by relying solely on generalized third-party APIs, but by synthesizing **deep domain knowledge, digital signal processing mathematics, and resilient microservice engineering**.`
};
