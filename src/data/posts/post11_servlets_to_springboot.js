export const post11 = {
  id: 11,
  slug: "evolution-from-java-servlets-jdbc-to-spring-boot-clean-architecture",
  date: "2025-08-12",
  tags: ["Java", "Spring Boot", "Clean Architecture", "Software Engineering", "Backend", "Database"],
  readTime: "9 min read",

  titleVi: "Từ Java Servlets & JDBC Thuần Đến Spring Boot 3 & Clean Architecture: Hành Trình Trưởng Thành Của Một Backend Engineer",
  excerptVi: "Tại sao việc từng 'đánh vật' với HttpServlet, đóng mở Connection thủ công và bắt lỗi SQL lại là tài sản vô giá giúp tôi làm chủ Spring Boot 3, HikariCP, JPA Hibernate và tư duy thiết kế phần mềm hiện đại?",
  contentVi: `## Khởi Đầu Với "Bụi Bặm": Java Servlets, JSP & Raw JDBC

Nhiều lập trình viên hiện nay bắt đầu học Java trực tiếp với **Spring Boot**. Họ gõ vài dòng \`@RestController\`, \`@Autowired\`, kế thừa \`JpaRepository\` và ứng dụng CRUD chạy như một phép thuật.

Thế nhưng, khi ứng dụng gặp các lỗi kinh điển như:
* *Cạn kiệt kết nối cơ sở dữ liệu (Database Connection Pool Leaks)*
* *Lỗi LazyInitializationException / N+1 Query trong JPA*
* *Transaction không rollback khi xảy ra ngoại lệ checked exception*

...họ hoàn toàn bế tắc vì không hiểu cơ chế hoạt động bên dưới lớp trừu tượng (abstraction layer) đồ sộ của Spring Framework.

May mắn thay, hành trình của tôi bắt đầu từ những điều cơ bản và "bụi bặm" nhất: Tự tay viết từng lớp **HttpServlet**, override \`doGet\` / \`doPost\`, tạo kết nối qua **Raw JDBC DriverManager**, và nhúng thẻ JSP để render giao diện. Trải nghiệm đó đã đặt nền móng tư duy vững chắc nhất cho sự nghiệp kỹ sư backend của tôi.

---

## 1. Nỗi Đau Quản Lý Kết Nối: DriverManager vs HikariCP Connection Pool

Khi viết mã JDBC thuần thuở ban đầu:

\`\`\`java
// Cách tiếp cận ngây thơ thời kỳ sơ khai (Naive JDBC)
public User findUserById(long id) {
    Connection conn = null;
    PreparedStatement stmt = null;
    ResultSet rs = null;
    try {
        // TẠO MỚI một kết nối TCP đến PostgreSQL/MySQL trên mỗi request!
        conn = DriverManager.getConnection(DB_URL, USER, PASS);
        stmt = conn.prepareStatement("SELECT id, name, email FROM users WHERE id = ?");
        stmt.setLong(1, id);
        rs = stmt.executeQuery();
        if (rs.next()) {
            return new User(rs.getLong("id"), rs.getString("name"), rs.getString("email"));
        }
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        // Quên đóng một trong ba đối tượng này sẽ gây rò rỉ bộ nhớ & connection leak!
        try { if (rs != null) rs.close(); } catch (Exception e) {}
        try { if (stmt != null) stmt.close(); } catch (Exception e) {}
        try { if (conn != null) conn.close(); } catch (Exception e) {}
    }
    return null;
}
\`\`\`

### Vấn Đề Nghiêm Trọng Của Cách Làm Này:
1. **Chi phí bắt tay 3 bước TCP (3-way handshake)**: Việc mở một kết nối database mới tốn từ 20ms - 80ms. Nếu có 100 người dùng gửi request đồng thời, server database sẽ quá tải chỉ vì mở và đóng kết nối TCP.
2. **Rò rỉ tài nguyên (Connection Leak)**: Chỉ cần một khối \`catch\` quên đóng \`conn.close()\`, kết nối đó sẽ bị treo vĩnh viễn trên database server cho đến khi hết dung lượng pool.

### Bước Tiến Với Spring Boot 3 & HikariCP:
Khi chuyển sang Spring Boot, cơ chế **Connection Pooling (HikariCP)** tự động duy trì sẵn một nhóm kết nối ấm (pre-warmed connections):
* Ứng dụng chỉ mượn (borrow) kết nối trong vài microsecond để thực thi câu lệnh rồi trả về pool.
* Hiệu năng thông lượng (throughput) tăng vọt gấp **15 đến 20 lần** so với việc mở kết nối thủ công.
* Khi đã hiểu rõ JDBC thuần, tôi biết chính xác cách cấu hình các thông số sống còn của HikariCP như \`maximum-pool-size\`, \`connection-timeout\`, và \`leak-detection-threshold\`.

---

## 2. Quản Lý Giao Dịch: Bẫy Phục Hồi Lỗi Thủ Công vs Declarative @Transactional

Trong nghiệp vụ tài chính, việc chuyển tiền giữa 2 tài khoản đòi hỏi tính toàn vẹn tuyệt đối (ACID Transaction):

\`\`\`java
// Quản lý Transaction thủ công thời kỳ Servlets
conn.setAutoCommit(false); // Bắt đầu Transaction
try {
    deductMoney(conn, senderId, amount);
    // Giả sử có lỗi logic hoặc mất điện tại đây...
    addMoney(conn, receiverId, amount);
    
    conn.commit(); // Thành công: Cam kết dữ liệu
} catch (Exception e) {
    if (conn != null) {
        conn.rollback(); // Thất bại: Hoàn tác toàn bộ
    }
    throw e;
}
\`\`\`

Trong Spring Boot, chúng ta chỉ cần một annotation duy nhất: \`@Transactional\`. Tuy nhiên, nếu không hiểu rằng Spring sử dụng **AOP Proxy (Dynamic Proxy / CGLIB)** để bọc khối mã trên, lập trình viên sẽ mắc phải các lỗi chết người:
* Gọi method có \`@Transactional\` từ một method khác trong cùng một class (Self-invocation bug) khiến Transaction không bao giờ được kích hoạt!
* Spring mặc định chỉ rollback đối với \`RuntimeException\` và \`Error\`. Nếu ném một Checked Exception (\`Exception\`), dữ liệu sẽ **không** được rollback trừ khi cấu hình rõ \`@Transactional(rollbackFor = Exception.class)\`.

Chính trải nghiệm viết JDBC thuần giúp tôi tránh được 100% những cạm bẫy tiềm ẩn này.

---

## 3. Sự Tiến Hóa Về Kiến Trúc: Tách Rời Trách Nhiệm Với Clean Architecture

Ở các ứng dụng Java Servlet cũ, giao diện JSP trộn lẫn với mã Java (Scriptlets), Servlet vừa nhận HTTP request vừa thực thi câu lệnh SQL và xử lý HTML render. Một hệ thống như vậy là cơn ác mộng về bảo trì (Spaghetti Code).

Ngày nay, với **Spring Boot 3**, tôi áp dụng triệt để nguyên lý **Clean Architecture & Onion Architecture**:

\`\`\`
   [Presentation Layer]  --> Controllers, DTOs, Swagger Documentation
            │
            ▼
   [Application Layer]   --> Use Cases, Service Interfaces, Business Logic
            │
            ▼
   [Domain Layer]        --> Pure Domain Entities, Value Objects, Domain Exceptions
            ▲
            │
   [Infrastructure Layer] --> JPA Repositories, Redis Caching, RabbitMQ, Third-party APIs
\`\`\`

### Lợi Ích Vượt Trội:
* **Tách biệt hoàn toàn Business Logic**: Logic cốt lõi của doanh nghiệp không bị ràng buộc vào bất kỳ cơ sở dữ liệu hay framework nào. Nếu ngày mai ta thay PostgreSQL bằng MongoDB, ta chỉ việc viết lại adapter trong Infrastructure Layer mà không cần sửa một dòng code nào trong Business Service.
* **Khả năng kiểm thử độc lập (Testability)**: Các lớp Service có thể được Unit Test 100% bằng Mockito mà không cần phải bật server hay kết nối tới cơ sở dữ liệu thật.

---

## 4. Bảng So Sánh Hai Thế Giới

| Tiêu Chí Kỹ Thuật | Kỷ Nguyên Raw Servlet / JDBC | Hiện Đại Với Spring Boot 3 & Clean Architecture |
| :--- | :--- | :--- |
| **Quản lý Vòng Đời Object** | \`new Service()\` thủ công khắp nơi | **Inversion of Control (IoC) & DI Container** |
| **Giao Tiếp Cơ Sở Dữ Liệu** | Parse \`ResultSet\` thủ công từng cột | **Spring Data JPA, Hibernate, MapStruct DTOs** |
| **Cơ Chế Khởi Tạo Server** | Deploy file \`.war\` lên Tomcat/Glassfish | **Fat JAR nhúng sẵn Tomcat / Netty, Dockerized** |
| **Cấu Trúc Mã Nguồn** | Scriptlet JSP + Servlet Controller | **Domain-Driven Design (DDD) & Clean Architecture** |
| **Độ Phức Tạp Khi Unit Test** | Rất khó vì phụ thuộc HTTP Session | **Dễ dàng Mocking, TestContainers cho Integration Test** |

---

## 5. Lời Khuyên Dành Cho Các Bạn Trẻ Bước Vào Thế Giới Backend

Framework đến rồi đi. Cách đây 10 năm là Struts, JSF; hôm nay là Spring Boot, Quarkus, Micronaut; ngày mai có thể là một công nghệ khác.

Nhưng những nguyên lý nền tảng:
1. **Mô hình luồng (Thread Model & Virtual Threads)**
2. **Cơ chế mạng & kết nối CSDL (Sockets, TCP Handshake, Connection Pools)**
3. **Nguyên lý thiết kế phần mềm (SOLID, Clean Architecture, High Cohesion - Loose Coupling)**

...sẽ không bao giờ lỗi thời. Đừng chỉ học cách sử dụng công cụ, hãy học cách công cụ đó được tạo ra. Đó là sự khác biệt giữa một "thợ gõ code" (coder) và một **Kỹ sư Phần mềm thực thụ (Software Engineer)**.`,

  titleEn: "Evolution from Java Servlets & JDBC to Spring Boot 3 & Clean Architecture: A Backend Engineer's Maturation Journey",
  excerptEn: "Why battling raw HttpServlet, manual database connection lifecycles, and low-level SQL parsing provided the invaluable foundation for mastering Spring Boot 3, HikariCP, JPA/Hibernate, and enterprise Clean Architecture.",
  contentEn: `## Starting in the Trenches: Java Servlets, JSP & Raw JDBC

Many contemporary developers begin their Java journey directly inside **Spring Boot**. They annotate classes with \`@RestController\` and \`@Autowired\`, inherit from \`JpaRepository\`, and CRUD APIs materialize like magic.

However, the moment production environments encounter critical anomalies:
* *HikariCP Connection Pool Exhaustion & Leaks*
* *JPA LazyInitializationException and N+1 Query Multiplications*
* *Transaction rollback failures during checked exceptions*

...they hit a brick wall because they never understood the underlying mechanisms beneath Spring's massive abstraction hierarchy.

My engineering journey began in the trenches: manually authoring **HttpServlet** classes, overriding \`doGet\` / \`doPost\`, managing **Raw JDBC DriverManager** sockets, and embedding JSP tags. That formative experience cemented the mental model that guides my backend systems design today.

---

## 1. The Agony of Connection Lifecycles: DriverManager vs HikariCP

Consider the raw, manual JDBC approach:

\`\`\`java
// Naive legacy JDBC pattern
public User findUserById(long id) {
    Connection conn = null;
    PreparedStatement stmt = null;
    ResultSet rs = null;
    try {
        // Establishes a brand-new TCP socket handshake on EVERY single request!
        conn = DriverManager.getConnection(DB_URL, USER, PASS);
        stmt = conn.prepareStatement("SELECT id, name, email FROM users WHERE id = ?");
        stmt.setLong(1, id);
        rs = stmt.executeQuery();
        if (rs.next()) {
            return new User(rs.getLong("id"), rs.getString("name"), rs.getString("email"));
        }
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        // Missing any of these closures triggers severe resource leaks!
        try { if (rs != null) rs.close(); } catch (Exception e) {}
        try { if (stmt != null) stmt.close(); } catch (Exception e) {}
        try { if (conn != null) conn.close(); } catch (Exception e) {}
    }
    return null;
}
\`\`\`

### Fundamental Flaws:
1. **TCP Handshake Overhead**: Establishing a physical TCP connection to PostgreSQL incurs 20ms–80ms. Concurrent traffic floods and chokes the database server with handshake handoffs.
2. **Connection Leak Hazard**: Any missed \`conn.close()\` in a bespoke exception path permanently ties up a socket until the operating system drops it.

### The Modern Paradigm: Spring Boot 3 & HikariCP
Modern applications utilize connection pools like **HikariCP**, maintaining pre-warmed database sockets:
* Threads borrow a connection for mere microseconds to execute statements, immediately returning it to the pool.
* System throughput accelerates **15x–20x** over unpooled architectures.
* Having lived through raw JDBC, tuning HikariCP parameters (\`maximum-pool-size\`, \`connection-timeout\`, \`leak-detection-threshold\`) becomes intuitive rather than guesswork.

---

## 2. Transaction Demarcation: Manual Fallbacks vs Declarative @Transactional

In financial transactions, transferring funds between accounts demands strict ACID guarantees:

\`\`\`java
// Legacy programmatic transaction handling
conn.setAutoCommit(false); // Begin transaction
try {
    deductMoney(conn, senderId, amount);
    addMoney(conn, receiverId, amount);
    conn.commit(); // Commit atomic changes
} catch (Exception e) {
    if (conn != null) {
        conn.rollback(); // Rollback on failure
    }
    throw e;
}
\`\`\`

In Spring Boot, we decorate services with \`@Transactional\`. Yet without understanding that Spring generates an **AOP Dynamic Proxy** around the target method, developers inevitably fall into costly traps:
* Invoking a \`@Transactional\` method from another method within the same class (the self-invocation bug) bypasses the proxy entirely, silently executing without a transaction!
* Spring's default rollback policy triggers strictly on unchecked exceptions (\`RuntimeException\` and \`Error\`). Checked exceptions leave mutations unrolled unless explicitly declared via \`@Transactional(rollbackFor = Exception.class)\`.

---

## 3. Structural Maturity: Decoupling with Clean Architecture

In legacy monolithic Servlets, presentation JSP scriptlets were intertwined with business SQL queries—a maintenance disaster.

Today with **Spring Boot 3**, I enforce **Clean Architecture & Onion Architecture**:

\`\`\`
   [Presentation Layer]  --> Controllers, DTOs, Swagger OpenAPI
            │
            ▼
   [Application Layer]   --> Use Cases, Service Interfaces, Domain Orchestration
            │
            ▼
   [Domain Layer]        --> Core Entities, Value Objects, Domain Exceptions
            ▲
            │
   [Infrastructure Layer] --> JPA Repositories, Redis, RabbitMQ, External APIs
\`\`\`

### Core Benefits:
* **Framework Independence**: Domain rules are decoupled from Spring or persistence libraries. Migrating databases touches only infrastructure adapters.
* **Effortless Testability**: Application services can be tested with 100% Mockito unit test coverage without firing up application contexts or live databases.

---

## 4. Evolutionary Comparison

| Technical Dimension | Legacy Servlet / JDBC Era | Modern Spring Boot 3 & Clean Architecture |
| :--- | :--- | :--- |
| **Object Lifecycle** | Manual \`new Service()\` instantiation | **Inversion of Control (IoC) & DI Container** |
| **Data Access** | Manual column parsing via \`ResultSet\` | **Spring Data JPA, Hibernate, MapStruct** |
| **Deployment Model** | External WAR files deployed to Tomcat | **Self-contained Executable JAR / Dockerized** |
| **Architecture** | Monolithic mixed presentation scripts | **Domain-Driven Design (DDD) & Clean Layering** |
| **Unit Testing** | Complex due to deep Servlet API coupling | **Mocking with Mockito & TestContainers** |

---

## 5. Parting Advice for Aspiring Backend Engineers

Frameworks and libraries will continually evolve—from Struts and JSF to Spring Boot, Quarkus, and beyond.

However, foundational computer science tenets:
1. **Concurrency models and socket lifecycles**
2. **Database connection pooling and ACID semantics**
3. **Timeless architectural principles (SOLID, high cohesion, low coupling)**

...remain immutable. Don't merely memorize framework annotations—understand what happens under the hood. That is what separates a routine coder from a **true Software Engineer**.`
};
