export const post06 = {
  id: 6,
  slug: "hackathon-first-prize-computer-vision-edge-optimization",
  date: "2026-03-05",
  tags: ["Computer Vision", "Deep Learning", "Edge AI", "TensorRT", "Python", "Hackathon"],
  readTime: "9 min read",

  titleVi: "Hành Trình Giành Giải Nhất Hackathon Computer Vision 2026: Tối Ưu Pipeline Edge AI Dưới 35ms",
  excerptVi: "Chi tiết kiến trúc kỹ thuật đưa đội thi của tôi chạm tay vào Giải Nhất Hackathon 2026: Từ bài toán object detection thời gian thực, kỹ thuật lượng tử hóa TensorRT FP16/INT8, đến pipeline đa luồng decoupling giải phóng nghẽn cổ chai CPU-GPU.",
  contentVi: `## Giới Thiệu & Thách Thức Tại Hackathon 2026

Vào đầu năm 2026, tôi cùng các đồng đội tham gia cuộc thi Hackathon Công Nghệ & Trí Tuệ Nhân Tạo với bài toán trọng tâm: **Giám sát và phân tích hành vi đối tượng đa mục tiêu thời gian thực trên thiết bị biên (Edge Device)**.

Quy định cuộc thi đặt ra những giới hạn khắc nghiệt:
1. **Phần cứng giới hạn**: Hệ thống chạy trên thiết bị biên (tương đương NVIDIA Jetson Orin Nano / RTX Laptop GPU giới hạn công suất 45W).
2. **Độ trễ nghiêm ngặt (Latency Budget)**: Toàn bộ quá trình từ lúc nhận khung hình RTSP camera, tiền xử lý, suy luận AI (Inference), định danh theo dõi (Tracking), đến xuất cảnh báo phải hoàn tất trong **dưới 35ms (đạt chuẩn 30 FPS mượt mà)**.
3. **Môi trường phức tạp**: Điều kiện ánh sáng thay đổi liên tục, góc quay camera bị che khuất một phần (occlusion), và mật độ đối tượng dày đặc.

Sau 48 giờ liên tục nghiên cứu, thử nghiệm và tối ưu hóa hệ thống, giải pháp của nhóm chúng tôi đã xuất sắc vượt qua các đội thi khác để giành **Giải Nhất (First Prize - Computer Vision Hackathon 2026)**. Dưới đây là toàn bộ kinh nghiệm và kiến trúc kỹ thuật đằng sau chiến thắng đó.

---

## 1. Phân Tích Điểm Nghẽn (Bottleneck Analysis)

Rất nhiều đội thi tại hackathon gặp chung một vấn đề: Mô hình AI của họ đạt độ chính xác cao trên máy trạm (Workstation RTX 4090), nhưng khi triển khai lên máy thi đấu thì tốc độ tụt thảm hại xuống **8 - 11 FPS**, độ trễ khung hình tích lũy dần khiến stream bị giật lag và tràn bộ nhớ đệm (buffer overflow).

Khi phân tích pipeline thông thường bằng công cụ profiler (*PySpy* & *NVIDIA Nsight Systems*), chúng tôi nhận thấy các nút thắt sau:

\`\`\`
Pipeline Tuần Tự (Naive Sequential Pipeline) - TỔNG THỜI GIAN: 92ms (~10.8 FPS)
[ Camera RTSP Decode: 18ms ] ➔ [ Preprocessing: 14ms ] ➔ [ PyTorch Model: 42ms ] ➔ [ Tracking & Post: 18ms ]
\`\`\`

Trong pipeline tuần tự:
* GPU phải chờ CPU giải mã video và resize ảnh (GPU idle time lên tới 40%).
* CPU lại phải chờ GPU hoàn tất phép tính ma trận suy luận.
* Việc sao chép dữ liệu giữa Host Memory (RAM CPU) và Device Memory (VRAM GPU) thông qua PCIe chiếm lượng thời gian đáng kể.

---

## 2. Giải Pháp 1: Tách Rời Pipeline Đa Luồng (Decoupled Producer-Consumer Architecture)

Để GPU luôn hoạt động hết công suất (near 100% utilization) và loại bỏ thời gian chết, chúng tôi tái cấu trúc toàn bộ luồng xử lý theo mô hình **Producer-Consumer** bất đồng bộ qua hàng đợi luồng (\`threading.Queue\` với bounded size để ngăn trễ tích lũy):

\`\`\`
   Thread 1: RTSP Ingestion (Producer)
       │  [OpenCV GStreamer Hardware Decoder]
       ▼
   Queue (maxsize=2, drop oldest frame if full)
       │
       ▼
   Thread 2: GPU Inference & Tracking (Consumer / Processor)
       │  [Pinned Host Memory ➔ CUDA Stream Async H2D]
       │  [TensorRT Engine Execution]
       │  [ByteTrack Hungarian Association]
       ▼
   Queue (maxsize=5)
       │
       ▼
   Thread 3: UI Renderer & WebSocket Alert Dispatcher
\`\`\`

\`\`\`python
import cv2
import queue
import threading
import time

class RealtimeStreamPipeline:
    def __init__(self, rtsp_url, max_buffer=2):
        self.cap = cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG)
        self.frame_queue = queue.Queue(maxsize=max_buffer)
        self.stopped = False

    def start_capture(self):
        def _capture_worker():
            while not self.stopped:
                ret, frame = self.cap.read()
                if not ret:
                    break
                # Nếu buffer đầy, chủ động bỏ frame cũ nhất để đảm bảo độ trễ thời gian thực
                if self.frame_queue.full():
                    try:
                        self.frame_queue.get_nowait()
                    except queue.Empty:
                        pass
                self.frame_queue.put(frame)
        
        t = threading.Thread(target=_capture_worker, daemon=True)
        t.start()
        return self
\`\`\`

Nhờ thiết kế \`drop oldest frame\`, hệ thống không bao giờ bị hiện tượng "video delay trễ 5 giây so với thực tế" khi có đột biến tải tính toán.

---

## 3. Giải Pháp 2: Tối Ưu Hóa & Lượng Tử Hóa Mô Hình Bằng NVIDIA TensorRT

Thay vì chạy mô hình PyTorch nguyên bản (\`.pt\`), chúng tôi xuất kiến trúc sang **ONNX** và biên dịch sang **NVIDIA TensorRT Engine (\`.engine\`)**.

### Quá Trình Tối Ưu TensorRT:
1. **Layer & Tensor Fusion**: TensorRT tự động gộp các lớp \`Convolution + BatchNorm + SiLU/ReLU\` thành một hạt nhân CUDA duy nhất (fused kernel), loại bỏ chi phí truy cập bộ nhớ trung gian.
2. **Precision Calibration (Lượng Tử Hóa)**:
   * Chuyển đổi từ số thực đơn chính xác **FP32** sang bán chính xác **FP16**.
   * Thử nghiệm lượng tử hóa **INT8** với tập dữ liệu hiệu chuẩn (Calibration Dataset) 300 ảnh mẫu từ camera thực địa.

\`\`\`bash
# Lệnh biên dịch ONNX sang TensorRT Engine hỗ trợ FP16 và dynamic batching
trtexec --onnx=model_detector.onnx \\
        --saveEngine=model_detector_fp16.engine \\
        --fp16 \\
        --workspace=2048 \\
        --minShapes=images:1x3x640x640 \\
        --optShapes=images:1x3x640x640 \\
        --maxShapes=images:2x3x640x640
\`\`\`

---

## 4. Kết Quả Benchmark Đo Kiểm Thực Tế

Dưới đây là kết quả thử nghiệm trực tiếp trên phần cứng máy thi đấu trong buổi thuyết trình chung kết:

| Cấu Hình Mô Hình | Độ Phân Giải | Inference Time | FPS Toàn Pipeline | mAP@50-95 | Mức Tiêu Thụ VRAM |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **PyTorch FP32 (Gốc)** | 640x640 | 41.6 ms | 12.4 FPS | **46.8%** | 2.1 GB |
| **ONNX Runtime (CUDA)** | 640x640 | 26.2 ms | 19.8 FPS | 46.8% | 1.6 GB |
| **TensorRT FP16 (Nhóm sử dụng)** | 640x640 | **9.4 ms** | **42.5 FPS** | **46.5%** (-0.3%) | **780 MB** |
| **TensorRT INT8 (Thử nghiệm)** | 640x640 | 6.1 ms | 56.0 FPS | 43.1% (-3.7%) | 520 MB |

*Quyết định của nhóm*: Nhóm chọn **TensorRT FP16** vì tốc độ đã vượt xa yêu cầu (đạt 42.5 FPS so với chuẩn 30 FPS), trong khi độ chính xác mAP hầu như không suy giảm (-0.3%), tránh rủi ro nhận diện sai trong điều kiện ánh sáng khó của phòng thi.

---

## 5. Tích Hợp ByteTrack Đa Đối Tượng & Xử Lý Va Chạm

Bên cạnh phát hiện vật thể, bài toán yêu cầu định danh liên tục quỹ đạo (trajectory). Chúng tôi tích hợp **ByteTrack**, một giải pháp tracking vượt trội hơn SORT và DeepSORT:
* Sử dụng cả các bounding box có điểm tin cậy thấp (low confidence detections) để duy trì liên kết ID khi đối tượng bị che khuất một phần bởi cây cối hoặc cột đèn.
* Tránh việc gọi thêm một mạng trích xuất đặc trưng Re-ID nặng nề, giữ cho thời gian tracking chỉ tốn **1.8 ms/frame**.

---

## 6. Bài Học Kinh Nghiệm Sau Chức Vô Địch

Chiến thắng tại Hackathon 2026 không chỉ đến từ việc huấn luyện một mô hình AI có độ chính xác cao trên giấy tờ, mà là năng lực **Engineering & Edge Deployment**:

1. **Hiểu rõ giới hạn phần cứng**: Đừng bao giờ mang nguyên mô hình PyTorch nghiên cứu vào sản phẩm triển khai thực tế. TensorRT, OpenVINO, hoặc ONNX Runtime là bước bắt buộc.
2. **IO & Memory là kẻ thù số 1**: Hầu hết độ trễ không nằm ở phép nhân ma trận của GPU mà nằm ở việc sao chép bộ nhớ CPU-GPU và giải mã video.
3. **Phân bổ vai trò trong nhóm thi 48h**: Phân chia rõ ràng: 1 kỹ sư phụ trách data & calibration, 1 kỹ sư phụ trách pipeline & multi-threading, 1 kỹ sư phụ trách business logic & demo UI.

Dự án này là minh chứng rõ nét cho định hướng kỹ thuật của tôi: **Không chỉ dừng lại ở lý thuyết AI, mà luôn tối ưu hóa đến từng millisecond và megabyte bộ nhớ để tạo ra sản phẩm chạy được trong thế giới thực.**`,

  titleEn: "Winning First Prize at Computer Vision Hackathon 2026: Sub-35ms Edge AI Pipeline Optimization",
  excerptEn: "The comprehensive technical breakdown behind our First Prize victory at Hackathon 2026: From real-time object detection challenges, TensorRT FP16/INT8 quantization, to decoupled multi-threaded pipelining eliminating CPU-GPU bottlenecks.",
  contentEn: `## Introduction & The Hackathon 2026 Challenge

In early 2026, my team competed in the AI & Computer Vision Hackathon, tackling a challenging industrial topic: **Real-Time Edge-Based Multi-Target Surveillance and Behavior Analysis**.

The competition organizers enforced uncompromising constraints:
1. **Constrained Edge Hardware**: Systems had to execute on embedded/edge devices (equivalent to NVIDIA Jetson Orin Nano / RTX Laptop GPU capped at 45W TDP).
2. **Strict Latency Budget**: The end-to-end pipeline—from RTSP video frame ingestion, preprocessing, neural network inference, multi-object tracking (MOT), to alarm triggering—had to finish in **under 35ms (ensuring smooth 30+ FPS)**.
3. **Challenging Environmental Dynamics**: Drastic illumination shifts, partial target occlusions, and high visual clutter.

After 48 intense hours of designing, profiling, and optimizing, our solution outperformed competing teams to claim **First Prize (Winner - Computer Vision Hackathon 2026)**. Here is the full architectural dissection of how we achieved this.

---

## 1. Profiling & Bottleneck Analysis

A pervasive mistake made by teams in computer vision hackathons is training heavy models on beefy workstation GPUs (RTX 4090), only to discover that the same model crawls at **8–11 FPS** when deployed on edge hardware, suffering from severe buffer accumulation and frame drops.

Profiling the naive pipeline using *PySpy* and *NVIDIA Nsight Systems* exposed the classic sequential bottleneck:

\`\`\`
Naive Sequential Pipeline - TOTAL LATENCY: 92ms (~10.8 FPS)
[ RTSP Decode: 18ms ] ➔ [ Preprocessing: 14ms ] ➔ [ PyTorch Model: 42ms ] ➔ [ Tracking & Post: 18ms ]
\`\`\`

In this naive architecture:
* The GPU sat idle for nearly 40% of the total frame time waiting for CPU decoding and image resizing.
* Host-to-Device (H2D) memory transfers across the PCIe bus introduced notable synchronous stalls.

---

## 2. Solution 1: Decoupled Multi-Threaded Producer-Consumer Architecture

To maintain near 100% GPU utilization and eliminate thread idling, we decoupled the execution into an asynchronous **Producer-Consumer pipeline** communicating through bounded queues:

\`\`\`
   Thread 1: RTSP Ingestion (Producer)
       │  [OpenCV GStreamer Hardware Decoder]
       ▼
   Queue (maxsize=2, drop oldest frame if full)
       │
       ▼
   Thread 2: GPU Inference & Tracking (Consumer / Processor)
       │  [Pinned Host Memory ➔ CUDA Stream Async H2D]
       │  [TensorRT Engine Execution]
       │  [ByteTrack Hungarian Association]
       ▼
   Queue (maxsize=5)
       │
       ▼
   Thread 3: UI Renderer & WebSocket Alert Dispatcher
\`\`\`

\`\`\`python
import cv2
import queue
import threading
import time

class RealtimeStreamPipeline:
    def __init__(self, rtsp_url, max_buffer=2):
        self.cap = cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG)
        self.frame_queue = queue.Queue(maxsize=max_buffer)
        self.stopped = False

    def start_capture(self):
        def _capture_worker():
            while not self.stopped:
                ret, frame = self.cap.read()
                if not ret:
                    break
                # Drop stale frames to guarantee absolute real-time latency
                if self.frame_queue.full():
                    try:
                        self.frame_queue.get_nowait()
                    except queue.Empty:
                        pass
                self.frame_queue.put(frame)
        
        t = threading.Thread(target=_capture_worker, daemon=True)
        t.start()
        return self
\`\`\`

The \`drop oldest frame\` policy guaranteed zero lag buildup, even during occasional compute spikes.

---

## 3. Solution 2: NVIDIA TensorRT Quantization & Layer Fusion

Rather than running raw PyTorch weights (\`.pt\`), we exported the network to **ONNX** and compiled a target-specific **NVIDIA TensorRT Engine (\`.engine\`)**.

### TensorRT Optimization Highlights:
1. **Layer & Tensor Fusion**: Vertically fused \`Conv + BatchNorm + Activation\` operations into single optimized CUDA kernels, drastically cutting GPU memory bandwidth traffic.
2. **Precision Calibration**:
   * Downscaled precision from **FP32** to **FP16** floating-point numbers.
   * Conducted **INT8** post-training quantization using an entropy calibration dataset of 300 domain-representative field frames.

\`\`\`bash
# Compiling ONNX to optimized TensorRT FP16 engine with dynamic shapes
trtexec --onnx=model_detector.onnx \\
        --saveEngine=model_detector_fp16.engine \\
        --fp16 \\
        --workspace=2048 \\
        --minShapes=images:1x3x640x640 \\
        --optShapes=images:1x3x640x640 \\
        --maxShapes=images:2x3x640x640
\`\`\`

---

## 4. Empirical Benchmark Results

The following numbers were measured live on the competition evaluation hardware during the final defense:

| Model Configuration | Input Resolution | Inference Time | Total Pipeline FPS | mAP@50-95 | VRAM Consumption |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **PyTorch FP32 (Baseline)** | 640x640 | 41.6 ms | 12.4 FPS | **46.8%** | 2.1 GB |
| **ONNX Runtime (CUDA)** | 640x640 | 26.2 ms | 19.8 FPS | 46.8% | 1.6 GB |
| **TensorRT FP16 (Our Pick)** | 640x640 | **9.4 ms** | **42.5 FPS** | **46.5%** (-0.3%) | **780 MB** |
| **TensorRT INT8 (Experimental)** | 640x640 | 6.1 ms | 56.0 FPS | 43.1% (-3.7%) | 520 MB |

*Engineering Decision*: We deployed **TensorRT FP16** for the final presentation. It well exceeded the 30 FPS requirement (delivering 42.5 FPS) while preserving near-identical accuracy (-0.3% mAP), eliminating any false positive risks during edge-case live judging.

---

## 5. Multi-Object Association with ByteTrack

For continuous tracking across video sequences, we paired the detector with **ByteTrack**:
* Retaining second-stage low-confidence bounding boxes allowed us to preserve trajectories even when targets were partially obstructed by pillars or foliage.
* It eliminated the need for heavy Re-ID appearance embedding networks, keeping tracking compute cost under **1.8 ms/frame**.

---

## 6. Key Takeaways from the Victory

Winning the 2026 Hackathon reaffirmed a foundational engineering philosophy:

1. **Hardware Awareness is Paramount**: Research code never runs cleanly in edge production without rigorous quantization and runtime compilation.
2. **I/O & Memory Bottlenecks Dominate**: Latency is frequently lost in image decoding, resizing, and host-device memory movement—not pure matrix multiplication.
3. **Execution Discipline**: Clear role division within our team (one on data/calibration, one on low-level pipeline concurrency, one on business logic & demo UI) enabled rapid iterative testing under the 48-hour pressure.

This victory exemplifies my software engineering approach: **Bridging deep AI models with high-performance systems engineering to create real-world impact.**`
};
