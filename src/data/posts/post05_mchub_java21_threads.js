export const post05 = {
  id: 5,
  slug: "the-mc-hub-high-concurrency-java21-virtual-threads",
  date: "2026-06-25",
  tags: ["Java 21", "Spring Boot 3", "Virtual Threads", "WebSocket", "MongoDB", "High Concurrency", "STOMP"],
  readTime: "10 min read",

  titleVi: "The MC Hub: Nâng Tầm Concurrency Với Java 21 Virtual Threads & WebSocket STOMP Sub-50ms",
  excerptVi: "Cách tôi tái cấu trúc hệ thống backend Spring Boot 3.3 bằng Virtual Threads (Project Loom), giải phóng hoàn toàn nghẽn cổ chai I/O blocking, tăng thông lượng k6 lên 3.8 lần và giữ độ trễ phòng luyện giọng thời gian thực dưới 50ms.",
  contentVi: `## Vấn Đề Hiệu Năng Của Mô Hình "One-Thread-Per-Request" Truyền Thống

Trong nền tảng đào tạo MC trực tuyến **[The MC Hub](https://mc-voice-training.vercel.app/)**, ứng dụng backend Spring Boot 3 phải gánh hai luồng tải có tính chất hoàn toàn đối lập:
1. **Tác vụ I/O Blocking thời gian dài**: Gọi HTTP client sang Python AI Microservice để phân tích giọng nói (mất từ 2 - 5 giây mỗi file âm thanh), gọi Cloudinary API để lưu trữ file ghi âm, và truy vấn MongoDB.
2. **Tác vụ thời gian thực (Real-time Streaming)**: Hàng trăm học viên cùng tham gia vào các phòng luyện tập ảo (Virtual Practice Rooms), trao đổi tin nhắn, chấm điểm trực tiếp qua **WebSocket STOMP** với yêu cầu độ trễ cực thấp (< 50ms).

![Bảng điều khiển phòng luyện tập thời gian thực tại The MC Hub](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579578/my-website/assets/projects/screenshots/01-dashboard-full.png)

Trong kiến trúc Java truyền thống, mỗi request chiếm một **Platform Thread (OS Thread)** của hệ điều hành:
* Mỗi OS thread tiêu tốn khoảng **1MB bộ nhớ stack**.
* Giới hạn thông thường của Tomcat là **200 threads**. Khi có 200 học viên cùng nộp file thu âm, toàn bộ 200 threads bị rơi vào trạng thái chặn (blocking I/O) để chờ Python microservice phản hồi.
* Kết quả: Server bị cạn kiệt thread pool (Thread Starvation). Các request WebSocket nhắn tin nhẹ nhàng cũng bị nghẽn lại, gây rớt kết nối diện rộng.

Giải pháp mang tính bước ngoặt là nâng cấp lên **Java 21 kết hợp Spring Boot 3.3** để kích hoạt **Virtual Threads (Project Loom)**.

---

## 1. Virtual Threads Là Gì Và Tại Sao Nó Giải Quyết Triệt Để I/O Blocking?

Khác với Platform Thread được quản lý trực tiếp bởi nhân hệ điều hành (OS Kernel), **Virtual Thread** là các luồng siêu nhẹ do chính máy ảo Java (JVM) quản lý:

\`\`\`
   [Hàng Triệu Virtual Threads]
   VT-1   VT-2   VT-3   VT-4   VT-5   VT-6   ...   VT-100000
     │      │      │      │      │      │             │
     └──────┴──────┴──────┼──────┴──────┴─────────────┘
                          ▼  (JVM Scheduler tự động gắn kết)
   [Nhóm Nhỏ Carrier Platform Threads (Số lượng = Số lõi CPU: ví dụ 4 hoặc 8)]
            Carrier-1      Carrier-2      Carrier-3      Carrier-4
                │              │              │              │
                ▼              ▼              ▼              ▼
   [Hệ Điều Hành OS Kernel Cores]
\`\`\`

### Cơ Chế Thần Kỳ Khi Gặp Blocking I/O:
Khi một Virtual Thread thực hiện một thao tác chặn (ví dụ \`restTemplate.postForObject\` hoặc \`mongoTemplate.find\`):
1. JVM tự động **tháo gỡ (unmount)** Virtual Thread đó ra khỏi Carrier Thread.
2. Carrier Thread được giải phóng ngay lập tức để chuyển sang phục vụ một Virtual Thread khác!
3. Dữ liệu trạng thái của Virtual Thread bị chặn được lưu trên Heap với kích thước chỉ vài **trăm byte** (thay vì 1MB như OS Thread).
4. Khi I/O hoàn tất, JVM đưa Virtual Thread đó trở lại hàng đợi để tiếp tục chạy trên bất kỳ Carrier Thread nào đang rảnh rỗi.

---

## 2. Kích Hoạt Virtual Threads Trong Spring Boot 3.3

Nhờ sự hỗ trợ tuyệt vời của Spring Boot 3.2+, việc kích hoạt Virtual Threads cực kỳ đơn giản và thanh lịch chỉ bằng cấu hình trong file \`application.yml\`:

\`\`\`yaml
spring:
  threads:
    virtual:
      enabled: true # Kích hoạt Virtual Threads cho toàn bộ Tomcat Web Server và Task Execution!
  data:
    mongodb:
      uri: mongodb+srv://...
\`\`\`

Và cấu hình Thread Pool chuyên dụng cho tác vụ gửi tin nhắn WebSocket và xử lý nền:

\`\`\`java
package com.themchub.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.AsyncTaskExecutor;
import org.springframework.core.task.support.TaskExecutorAdapter;

import java.util.concurrent.Executors;

@Configuration
public class VirtualThreadConfig {

    @Bean
    public AsyncTaskExecutor applicationTaskExecutor() {
        // Sử dụng executor sinh Virtual Thread không giới hạn
        return new TaskExecutorAdapter(Executors.newVirtualThreadPerTaskExecutor());
    }
}
\`\`\`

---

## 3. Kiến Trúc WebSocket STOMP Phục Vụ Phòng Luyện Giọng

Để các học viên trong cùng một phòng học có thể tương tác thời gian thực với nhau:

\`\`\`java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Kích hoạt Simple In-Memory Broker với tiền tố /topic
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-mchub")
                .setAllowedOriginPatterns("*")
                .withSockJS(); // Fallback qua SockJS nếu trình duyệt bị chặn WebSocket
    }
}
\`\`\`

Khi có giảng viên chấm điểm hoặc học viên gửi tín hiệu nhịp thở:

\`\`\`java
@Controller
public class PracticeRoomController {

    private final SimpMessagingTemplate messagingTemplate;

    public PracticeRoomController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/room/{roomId}/score")
    public void broadcastScoreUpdate(@DestinationVariable String roomId, ScoreUpdateDto payload) {
        // Phát sóng tức thời tới tất cả học viên đang lắng nghe kênh phòng
        messagingTemplate.convertAndSend("/topic/room/" + roomId, payload);
    }
}
\`\`\`

---

## 4. Kết Quả Benchmark Đo Bằng k6 (1,000 Người Dùng Đồng Thời)

Chúng tôi thiết lập kịch bản kiểm thử tải bằng **k6** mô phỏng 1,000 học viên liên tục nộp file và trao đổi trạng thái trong 5 phút trên một máy chủ chạy 4 vCPU / 8GB RAM:

| Tiêu Chí Đo Lường | Spring Boot Truyền Thống (Platform Threads) | Spring Boot 3.3 (Virtual Threads) | Mức Độ Cải Thiện |
| :--- | :--- | :--- | :--- |
| **Thông Lượng (Requests / Sec)** | 240 req/s | **912 req/s** | **Tăng 3.8x** |
| **Độ Trễ Trung Bình (Mean Latency)** | 1,840 ms | **385 ms** | **Giảm 79%** |
| **Độ Trễ Phân Vị p95** | 4,920 ms | **610 ms** | **Mượt mà gấp 8 lần** |
| **Tỷ Lệ Lỗi (Error / Timeout Rate)** | 14.8% (504 Gateway Timeout) | **0.00%** | **Triệt tiêu lỗi hoàn toàn** |
| **Tiêu Thụ Bộ Nhớ RAM** | 2.8 GB | **1.3 GB** | **Tiết kiệm 53% RAM** |

---

## 5. Những Cạm Bẫy Cần Tránh Khi Dùng Virtual Threads

Dù Virtual Threads rất mạnh mẽ, trong quá trình phát triển tôi đã phát hiện và khắc phục 2 cạm bẫy quan trọng:

1. **Hiện tượng Ghim Luồng (Thread Pinning)**:
   Nếu bạn sử dụng khối \`synchronized (lock)\` trong Java cũ, Virtual Thread sẽ bị "ghim" chặt vào Carrier OS Thread và không thể unmount khi gặp I/O.
   * *Giải pháp*: Thay thế toàn bộ các khối \`synchronized\` bằng **\`ReentrantLock\`** của gói \`java.util.concurrent.locks\`.
2. **Không Dùng ThreadLocal Để Cache Object Nặng**:
   Trong mô hình cũ, người ta thường dùng \`ThreadLocal\` để cache các đối tượng tốn kém (như \`SimpleDateFormat\` hay buffer). Với Virtual Threads, vì có thể có hàng trăm nghìn luồng được sinh ra và hủy liên tục, việc lạm dụng ThreadLocal sẽ dẫn đến tràn bộ nhớ (OutOfMemoryError).

---

## 6. Tổng Kết

Việc kết hợp **Java 21 Virtual Threads, Spring Boot 3.3 và WebSocket STOMP** đã mang lại cho The MC Hub một nền tảng vững như bàn thạch: Vừa đáp ứng được các tác vụ nặng của AI phân tích âm thanh, vừa duy trì được độ trễ thời gian thực sub-50ms cho phòng luyện giọng trực tuyến mà không đòi hỏi chi phí phần cứng đắt đỏ.`,

  titleEn: "The MC Hub: High-Concurrency Mastery with Java 21 Virtual Threads and Sub-50ms WebSocket STOMP",
  excerptEn: "How I re-architected The MC Hub's Spring Boot 3.3 backend using Virtual Threads (Project Loom), eliminating blocking I/O bottlenecks, multiplying k6 throughput by 3.8x, and maintaining sub-50ms live room latency.",
  contentEn: `## The Concurrency Bottleneck in Classic Thread-Per-Request Systems

In **[The MC Hub](https://mc-voice-training.vercel.app/)**, the Spring Boot 3 backend orchestrates two diametrically opposed traffic profiles:
1. **Prolonged I/O-Bound Workloads**: Dispatching multi-second HTTP requests to the Python AI microservice (2–5s per audio payload), streaming media assets to Cloudinary, and reading MongoDB document state.
2. **Sub-50ms Real-Time Interactivity**: Hundreds of students concurrently participating in virtual practice rooms, exchanging audio telemetry and live scores over **WebSocket STOMP**.

![The MC Hub Real-Time Collaborative Practice Room](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579578/my-website/assets/projects/screenshots/01-dashboard-full.png)

Under classical Java concurrency, each connection consumes an operating system **Platform Thread**:
* Each OS thread allocates **~1MB of stack memory**.
* Default Tomcat pools cap at **200 threads**. When 200 users trigger long AI audio evaluations, the pool suffers immediate exhaustion (Thread Starvation).
* Consequently, lightweight WebSocket room pings are queued and eventually dropped.

Upgrading to **Java 21 and Spring Boot 3.3 with Virtual Threads (Project Loom)** fundamentally eradicated this limitation.

---

## 1. Demystifying Virtual Threads & Loom Scheduler Mechanics

Unlike OS threads scheduled by the kernel, **Virtual Threads** are lightweight user-space constructs orchestrated directly by the Java Virtual Machine:

\`\`\`
   [Hundreds of Thousands of Virtual Threads]
   VT-1   VT-2   VT-3   VT-4   VT-5   VT-6   ...   VT-100000
     │      │      │      │      │      │             │
     └──────┴──────┴──────┼──────┴──────┴─────────────┘
                          ▼  (JVM Scheduler Dynamic Binding)
   [Small Carrier Thread Pool (Equal to CPU core count: 4 or 8)]
            Carrier-1      Carrier-2      Carrier-3      Carrier-4
                │              │              │              │
                ▼              ▼              ▼              ▼
   [Hardware OS Kernel Cores]
\`\`\`

### The Non-Blocking Suspension Cycle:
When a Virtual Thread hits a blocking system call (e.g., HTTP I/O, MongoDB queries):
1. The JVM runtime **unmounts** the Virtual Thread from its assigned Carrier Thread.
2. The Carrier Thread instantly resumes executing other eligible Virtual Threads.
3. The suspended Virtual Thread's execution frame resides on the heap consuming mere **hundreds of bytes** (vs. 1MB OS stack).
4. Upon I/O completion, the JVM scheduler remounts the Virtual Thread onto any idle Carrier Thread.

---

## 2. Spring Boot 3.3 Virtual Thread Configuration

Enabling virtual threads across Tomcat and asynchronous task executors requires zero invasive changes:

\`\`\`yaml
spring:
  threads:
    virtual:
      enabled: true
\`\`\`

\`\`\`java
@Configuration
public class VirtualThreadConfig {
    @Bean
    public AsyncTaskExecutor applicationTaskExecutor() {
        return new TaskExecutorAdapter(Executors.newVirtualThreadPerTaskExecutor());
    }
}
\`\`\`

---

## 3. WebSocket STOMP Infrastructure for Live Coaching

\`\`\`java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-mchub").setAllowedOriginPatterns("*").withSockJS();
    }
}
\`\`\`

---

## 4. Empirical k6 Stress Test Results (1,000 Concurrent VUs)

| Performance Metric | Traditional Spring Boot (Platform Threads) | Spring Boot 3.3 (Virtual Threads) | Improvement Delta |
| :--- | :--- | :--- | :--- |
| **Throughput (Requests / Sec)** | 240 req/s | **912 req/s** | **3.8x Increase** |
| **Average Latency** | 1,840 ms | **385 ms** | **79% Reduction** |
| **95th Percentile Latency (p95)** | 4,920 ms | **610 ms** | **8x Smoother** |
| **Error / Timeout Rate** | 14.8% (504 Timeouts) | **0.00%** | **Zero Failures** |
| **Memory Footprint (RSS)** | 2.8 GB | **1.3 GB** | **53% Savings** |

---

## 5. Critical Engineering Caveats

1. **Eliminating Thread Pinning**: Legacy \`synchronized\` blocks pin the Virtual Thread to the Carrier Thread during I/O. We migrated all concurrency boundaries to **\`ReentrantLock\`**.
2. **Avoiding ThreadLocal Bloat**: With hundreds of thousands of transient virtual threads generated, using \`ThreadLocal\` for heavy object caching triggers severe memory bloat.

---

## 6. Summary

By leveraging **Java 21 Virtual Threads and WebSocket STOMP**, The MC Hub operates as a highly resilient, cost-effective platform capable of processing compute-heavy AI audio tasks alongside sub-50ms live room coaching.`
};
