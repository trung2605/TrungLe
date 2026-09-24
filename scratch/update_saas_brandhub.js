const fs = require('fs');

const filePath = 'd:/ProjectCode/my-website/src/components/Services/Services.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to \n for replacement, then write back with original or standard \r\n
const isCrlf = content.includes('\r\n');
content = content.replace(/\r\n/g, '\n');

// 1. Add BrandHub modules to SAAS_MODULES
const brandhubModulesCode = `  {
    id: "omnichannel_publisher",
    category: "omnichannel",
    num: "11",
    iconName: "FaShareAlt",
    systemBadgeVi: "Hệ thống BrandHub",
    systemBadgeEn: "BrandHub System",
    metricVi: "5 MXH • 0% Mất tin DLQ",
    metricEn: "5 Platforms • 0% Loss DLQ",
    titleVi: "Phát Hành Đa Kênh Tự Động & Hàng Đợi RabbitMQ DLQ",
    titleEn: "Omnichannel Auto-Publisher & RabbitMQ DLQ Pipeline",
    descVi: "Đăng tải đồng thời lên 5 mạng xã hội qua Spring Boot 3 & RabbitMQ chống rớt tin...",
    descEn: "Dispatches scheduled content to 5 social channels via RabbitMQ DLQ with zero message loss...",
    specsVi: [
      "Tích hợp OAuth đồng thời: Facebook, TikTok, Instagram, Threads, Zalo",
      "Hàng đợi Dead Letter Queue (DLQ) retry lũy thừa chống rớt tin 100%"
    ],
    specsEn: [
      "Unified OAuth gateway: Facebook, TikTok, Instagram, Threads, Zalo",
      "RabbitMQ Dead Letter Queue (DLQ) with exponential backoff retry"
    ],
    techVi: "Spring Boot 3 • RabbitMQ DLQ",
    techEn: "Spring Boot 3 • RabbitMQ DLQ",
    image: "/docs/images/DA-D19-03.png",
    captionVi: "Giao diện lập lịch đăng bài tự động đa kênh và bảng điều khiển telemetry hàng đợi RabbitMQ từ hệ thống BrandHub",
    captionEn: "Live omnichannel scheduling console and RabbitMQ async queue telemetry from BrandHub platform",
    painPointVi: "Doanh nghiệp hoặc Agency quản trị hàng chục Fanpage/Kênh mạng xã hội phải tốn 4-6 giờ mỗi ngày copy-paste nội dung thủ công sang từng nền tảng, dễ bị khóa tài khoản hoặc lỗi mạng làm mất bài đăng. Hệ thống Omnichannel Publisher điều phối qua Spring Boot 3 và RabbitMQ DLQ tự động retry lũy thừa, đảm bảo 100% bài viết được xuất bản đúng giờ với 0% tỷ lệ mất tin.",
    painPointEn: "Managing dozens of brand social pages manually drains 4-6 hours daily in repetitive copy-pasting, risking network dropouts and inconsistent campaign timing. Our Omnichannel Publisher leverages Spring Boot 3 and RabbitMQ DLQ with exponential retry, guaranteeing zero message loss and seamless scheduled dispatches across 5 social channels.",
    workflowVi: [
      { step: "01", title: "Soạn thảo & Chọn 5 kênh phát hành", desc: "Người dùng tạo nội dung một lần duy nhất, tùy chỉnh định dạng riêng cho từng kênh (Facebook, TikTok, Instagram, Threads, Zalo)." },
      { step: "02", title: "Điều phối hàng đợi RabbitMQ Asynchronous", desc: "Tin nhắn được đẩy vào hàng đợi RabbitMQ; cơ chế Dead Letter Queue giám sát, tự động retry khi API mạng xã hội nghẽn." },
      { step: "03", title: "Xuất bản đồng bộ & Báo cáo Telemetry", desc: "Hệ thống bắn bài đăng đồng thời, cập nhật trạng thái thời gian thực và ghi nhận ID bài viết trả về từ từng nền tảng." }
    ],
    workflowEn: [
      { step: "01", title: "Single-Editor Multi-Channel Authoring", desc: "Draft marketing copy once, fine-tune aspect ratios and tags for Facebook, TikTok, Instagram, Threads, and Zalo." },
      { step: "02", title: "RabbitMQ Async Queue Orchestration", desc: "Payloads route through RabbitMQ with Dead Letter Queue protection, retrying dynamically under rate limits." },
      { step: "03", title: "Concurrent Publish & Telemetry Verification", desc: "Posts dispatches concurrently; dashboard tracks live status and records returned post IDs from each platform API." }
    ]
  },
  {
    id: "ai_brand_rag",
    category: "ai",
    num: "12",
    iconName: "FaRobot",
    systemBadgeVi: "Hệ thống BrandHub",
    systemBadgeEn: "BrandHub System",
    metricVi: "RAG Llama 3 • Siêu tốc 1.2s",
    metricEn: "RAG Llama 3 • 1.2s Fast",
    titleVi: "AI Content RAG & Tự Động Chuẩn Hóa Brand Voice",
    titleEn: "Context-Aware AI RAG & Brand-Voice Engine",
    descVi: "Python FastAPI RAG học ngữ điệu thương hiệu, tự động sinh copy chuẩn SEO theo kênh...",
    descEn: "Python FastAPI RAG pipeline synthesizing context-aware SEO captions tailored by platform...",
    specsVi: [
      "Vector Search ChromaDB + Hybrid LLM (Groq Llama 3 & Claude)",
      "Tự động cá nhân hóa văn phong theo Brand Guidelines độc quyền"
    ],
    specsEn: [
      "ChromaDB semantic retrieval + Groq Llama 3 with Claude fallback",
      "Dynamic tone-of-voice adaptation strictly following Brand Guidelines"
    ],
    techVi: "FastAPI • LangChain • ChromaDB",
    techEn: "FastAPI • LangChain • ChromaDB",
    image: "/docs/images/DA-D19-04.png",
    captionVi: "Pipeline AI sinh nội dung tự động thông minh bằng Python FastAPI tích hợp RAG và kiểm soát văn phong thương hiệu",
    captionEn: "AI content automation pipeline with Python FastAPI, RAG context injection, and Brand-Voice compliance",
    painPointVi: "Thuê đội ngũ Copywriter tốn kém chi phí cố định nhưng văn phong bài viết thường không đồng nhất, dễ lệch tông nhận diện thương hiệu hoặc mất hàng giờ để chỉnh sửa cho từng định dạng (TikTok cần giật gân, LinkedIn cần trang trọng). Pipeline AI RAG nhúng toàn bộ Brand Guidelines vào vector database, sinh hàng trăm bài viết chuẩn văn phong chỉ trong 1.2 giây.",
    painPointEn: "Hiring creative copywriters incurs heavy payroll while brand voice fluctuates wildly across channels. Content creators waste hours adapting formats for TikTok vs. LinkedIn. Our Python FastAPI RAG pipeline embeds your brand manual into vector storage, generating channel-perfect copy adhering strictly to brand identity in 1.2s.",
    workflowVi: [
      { step: "01", title: "Nạp tài liệu Brand Guidelines vào ChromaDB", desc: "Hệ thống số hóa quy chuẩn thương hiệu, danh mục sản phẩm và từ khóa cấm/khuyến khích vào vector database." },
      { step: "02", title: "RAG Context Retrieval & Sinh nội dung", desc: "LangChain trích xuất ngữ cảnh liên quan, Groq Llama 3 xử lý sinh nội dung siêu tốc (fallback Claude khi cần độ sâu)." },
      { step: "03", title: "Tự động chia tách định dạng từng kênh", desc: "Xuất ra cùng lúc 5 phiên bản: Hook & Hashtag cho TikTok, Caption dài cho Facebook, Tone chuyên nghiệp cho LinkedIn." }
    ],
    workflowEn: [
      { step: "01", title: "Brand Guidelines Ingestion into ChromaDB", desc: "Digitizes brand identity manuals, catalog specs, and negative keywords into vector embeddings." },
      { step: "02", title: "Semantic Retrieval & Dual-LLM Generation", desc: "LangChain extracts relevant context; Groq Llama 3 generates lightning-fast drafts with Claude fallback." },
      { step: "03", title: "Platform-Specific Copy Formatting", desc: "Delivers tailored variations instantly: short hooks for TikTok, detailed Facebook copy, and professional LinkedIn tone." }
    ]
  },
  {
    id: "multitenant_rbac",
    category: "retention",
    num: "13",
    iconName: "FaUsers",
    systemBadgeVi: "Hệ thống BrandHub",
    systemBadgeEn: "BrandHub System",
    metricVi: "Multi-tenant • Phân quyền 4 cấp",
    metricEn: "Multi-Tenant • 4-Tier RBAC",
    titleVi: "Phân Quyền Tổ Chức Đa Cấp Agency & Doanh Nghiệp",
    titleEn: "Multi-Tenant Enterprise RBAC & Workspace Segregation",
    descVi: "Kiến trúc Multi-tenant phân lập workspace giữa Agency, Brand, KOL và CTV...",
    descEn: "Multi-tenant workspace isolation for Agencies, Brands, KOLs, and external partners...",
    specsVi: [
      "Spring Cloud Gateway JWT & Redis Rate Limiting kiểm soát truy cập",
      "Phân lập dữ liệu hoàn toàn giữa các Brand và Agency thành viên"
    ],
    specsEn: [
      "Spring Cloud Gateway JWT tokens & Redis rate-limiting access control",
      "Strict data tenancy isolation between autonomous brands and agency units"
    ],
    techVi: "Spring Cloud Gateway • RBAC",
    techEn: "Spring Cloud Gateway • RBAC",
    image: "/docs/images/DA-D19-06.png",
    captionVi: "Màn hình phân quyền tổ chức đa cấp Multi-tenant (Agency, Doanh nghiệp, Brand, CTV) trên nền tảng BrandHub",
    captionEn: "Enterprise multi-tenant organizational structure and granular role-based access control interface in BrandHub",
    painPointVi: "Khi doanh nghiệp mở rộng quy mô hoặc Agency cùng lúc quản lý nhiều khách hàng, việc dùng chung tài khoản dẫn đến nguy cơ lộ dữ liệu chiến dịch nhạy cảm giữa các bên đối thủ, hoặc nhân sự cấp dưới vô tình xóa nhầm tài nguyên quan trọng. Kiến trúc Multi-Tenant phân lập dữ liệu triệt để, phân quyền chặt chẽ 4 cấp độ với Spring Cloud Gateway.",
    painPointEn: "Scaling businesses and agencies managing multiple clients face severe security risks when sharing shared logins, risking client data leaks across competing brands or accidental resource deletion. Our Multi-Tenant RBAC architecture enforces strict data isolation and granular 4-tier permissions via Spring Cloud Gateway.",
    workflowVi: [
      { step: "01", title: "Khởi tạo Workspace & Định danh Tenant", desc: "Agency tạo không gian riêng biệt cho từng nhãn hàng (Brand), dữ liệu được cô lập logic ở tầng Database." },
      { step: "02", title: "Gán quyền hạt nhân (Granular RBAC)", desc: "Phân chia vai trò rõ ràng: Admin (quản trị), Editor (sáng tạo), Reviewer (duyệt bài) và CTV (theo dõi số liệu)." },
      { step: "03", title: "Spring Cloud Gateway kiểm soát truy cập", desc: "Mọi API request đều được Gateway xác thực JWT và giới hạn tần suất (Redis rate-limit) chống khai thác dữ liệu chéo." }
    ],
    workflowEn: [
      { step: "01", title: "Workspace Provisioning & Tenant Separation", desc: "Agency provisions dedicated workspaces for each brand; data is logically segregated at database layer." },
      { step: "02", title: "Granular Role-Based Assignment", desc: "Assign specific roles: Admin, Editor, Reviewer, and Affiliate Partner with restricted read/write scopes." },
      { step: "03", title: "Gateway Authentication & Cross-Tenant Shield", desc: "Spring Cloud Gateway validates JWT tokens with Redis rate-limiting, blocking cross-tenant data leaks." }
    ]
  }`;

// Replace the end of SAAS_MODULES
const oldEndMarker = `    workflowEn: [
      { step: "01", title: "Add to Comparison Matrix", desc: "Shoppers click the comparison icon across 2 to 4 candidate products from catalog cards." },
      { step: "02", title: "Side-by-Side Spec & Score Radar", desc: "Tabular matrix contrasts price, dimensions, rarity, and compatibility scores in parallel." },
      { step: "03", title: "Embedded Authentic Video & Checkout", desc: "Shoppers watch authentic TikTok/Reels review videos directly on-page and click instant deposit." }
    ]
  }
];`;

const newEndMarker = `    workflowEn: [
      { step: "01", title: "Add to Comparison Matrix", desc: "Shoppers click the comparison icon across 2 to 4 candidate products from catalog cards." },
      { step: "02", title: "Side-by-Side Spec & Score Radar", desc: "Tabular matrix contrasts price, dimensions, rarity, and compatibility scores in parallel." },
      { step: "03", title: "Embedded Authentic Video & Checkout", desc: "Shoppers watch authentic TikTok/Reels review videos directly on-page and click instant deposit." }
    ]
  },
${brandhubModulesCode}
];`;

if (!content.includes(oldEndMarker)) {
  console.error("Could not find oldEndMarker in normalized content!");
  process.exit(1);
}
content = content.replace(oldEndMarker, newEndMarker);
console.log("Replaced SAAS_MODULES successfully!");

// 2. Update getSaasIcon to support FaShareAlt and FaUsers
const oldGetSaasIcon = `    const getSaasIcon = (iconName) => {
    switch (iconName) {
      case 'FaCogs': return <FaCogs size={18} />;
      case 'FaQrcode': return <FaQrcode size={18} />;
      case 'FaSyncAlt': return <FaSyncAlt size={18} />;
      case 'FaRobot': return <FaRobot size={18} />;
      case 'FaLaptopCode': return <FaLaptopCode size={18} />;
      case 'FaEnvelope': return <FaEnvelope size={18} />;
      case 'FaUserTie': return <FaUserTie size={18} />;
      case 'FaShieldAlt': return <FaShieldAlt size={18} />;
      case 'FaStar': return <FaStar size={18} />;
      case 'FaBalanceScale': return <FaBalanceScale size={18} />;
      default: return <FaBolt size={18} />;
    }
  };`;

const newGetSaasIcon = `    const getSaasIcon = (iconName) => {
    switch (iconName) {
      case 'FaCogs': return <FaCogs size={18} />;
      case 'FaQrcode': return <FaQrcode size={18} />;
      case 'FaSyncAlt': return <FaSyncAlt size={18} />;
      case 'FaRobot': return <FaRobot size={18} />;
      case 'FaLaptopCode': return <FaLaptopCode size={18} />;
      case 'FaEnvelope': return <FaEnvelope size={18} />;
      case 'FaUserTie': return <FaUserTie size={18} />;
      case 'FaShieldAlt': return <FaShieldAlt size={18} />;
      case 'FaStar': return <FaStar size={18} />;
      case 'FaBalanceScale': return <FaBalanceScale size={18} />;
      case 'FaShareAlt': return <FaShareAlt size={18} />;
      case 'FaUsers': return <FaUsers size={18} />;
      default: return <FaBolt size={18} />;
    }
  };`;

if (!content.includes(oldGetSaasIcon)) {
  console.error("Could not find oldGetSaasIcon in content!");
  process.exit(1);
}
content = content.replace(oldGetSaasIcon, newGetSaasIcon);
console.log("Replaced getSaasIcon successfully!");

// 3. Update Section 3 description, KPI strip, and category tabs
const oldSection3Header = `          <p className="section-desc">
            {isEn 
              ? "We don't just build static showcase sites. We engineer lean SaaS automation systems that eliminate manual repetitive tasks, accelerate lead conversions, and scale your revenue effortlessly."
              : "Chúng tôi không chỉ dựng website tĩnh đơn thuần. Trọng tâm cốt lõi là xây dựng các giải pháp Tự động hóa SaaS (SaaS Automation) tinh gọn, giải phóng 80% thời gian trực chốt của chủ shop và nhân đôi tỉ lệ chuyển đổi."}
          </p>

          {/* MINIMALIST KPI STRIP */}
          <div className="saas-kpi-strip">
            <div className="kpi-box">
              <span className="kpi-num">80%</span>
              <span className="kpi-txt">{isEn ? "Manual Work Eliminated" : "Giải phóng việc thủ công"}</span>
            </div>
            <div className="kpi-sep"></div>
            <div className="kpi-box">
              <span className="kpi-num">&lt; 0.5s</span>
              <span className="kpi-txt">{isEn ? "VietQR Match Latency" : "Khớp cọc VietQR tức thời"}</span>
            </div>
            <div className="kpi-sep"></div>
            <div className="kpi-box">
              <span className="kpi-num">0 ₫</span>
              <span className="kpi-txt">{isEn ? "Gateway Transaction Fee" : "Phí cổng trung gian"}</span>
            </div>
            <div className="kpi-sep"></div>
            <div className="kpi-box">
              <span className="kpi-num">24/7</span>
              <span className="kpi-txt">{isEn ? "Autonomous Night Closing" : "Chốt đơn tự động xuyên đêm"}</span>
            </div>
          </div>

          {/* MINIMALIST CATEGORY FILTER TABS */}
          <div className="saas-category-tabs">
            <button 
              className={\`cat-tab \${activeSaasCategory === 'all' ? 'active' : ''}\`}
              onClick={() => setActiveSaasCategory('all')}
            >
              {isEn ? "All Modules (10)" : "Tất Cả Module (10)"}
            </button>
            <button 
              className={\`cat-tab \${activeSaasCategory === 'sales' ? 'active' : ''}\`}
              onClick={() => setActiveSaasCategory('sales')}
            >
              {isEn ? "Sales & Cashflow" : "Dòng Tiền & Chốt Cọc"}
            </button>
            <button 
              className={\`cat-tab \${activeSaasCategory === 'ai' ? 'active' : ''}\`}
              onClick={() => setActiveSaasCategory('ai')}
            >
              {isEn ? "AI & Automation" : "AI & Tự Động Hóa"}
            </button>
            <button 
              className={\`cat-tab \${activeSaasCategory === 'retention' ? 'active' : ''}\`}
              onClick={() => setActiveSaasCategory('retention')}
            >
              {isEn ? "Retention & Operations" : "Tương Tác & Vận Hành"}
            </button>
          </div>`;

const newSection3Header = `          <p className="section-desc">
            {isEn 
              ? "We engineer lean enterprise SaaS automation and omnichannel distribution engines drawn directly from our verified production platforms (Biensovip & BrandHub) — eliminating manual repetitive tasks, syncing 5 social channels, and running autonomous 24/7 conversion pipelines."
              : "Chúng tôi không chỉ dựng website tĩnh đơn thuần. Trọng tâm cốt lõi là xây dựng các giải pháp Tự động hóa SaaS (SaaS Automation) tinh gọn đúc kết từ các hệ thống thực tế (Biensovip & BrandHub), giải phóng 80% thời gian vận hành, đồng bộ 5 mạng xã hội và nhân đôi tỉ lệ chuyển đổi tự động 24/7."}
          </p>

          {/* MINIMALIST KPI STRIP */}
          <div className="saas-kpi-strip">
            <div className="kpi-box">
              <span className="kpi-num">80%</span>
              <span className="kpi-txt">{isEn ? "Manual Work Eliminated" : "Giải phóng việc thủ công"}</span>
            </div>
            <div className="kpi-sep"></div>
            <div className="kpi-box">
              <span className="kpi-num">&lt; 0.5s</span>
              <span className="kpi-txt">{isEn ? "VietQR Match Latency" : "Khớp cọc VietQR tức thời"}</span>
            </div>
            <div className="kpi-sep"></div>
            <div className="kpi-box">
              <span className="kpi-num">0 ₫</span>
              <span className="kpi-txt">{isEn ? "Gateway Transaction Fee" : "Phí cổng trung gian"}</span>
            </div>
            <div className="kpi-sep"></div>
            <div className="kpi-box">
              <span className="kpi-num">05</span>
              <span className="kpi-txt">{isEn ? "Omnichannel Synced" : "Kênh MXH đồng bộ tự động"}</span>
            </div>
            <div className="kpi-sep"></div>
            <div className="kpi-box">
              <span className="kpi-num">0%</span>
              <span className="kpi-txt">{isEn ? "Loss Rate (RabbitMQ DLQ)" : "Tỷ lệ mất tin (RabbitMQ DLQ)"}</span>
            </div>
            <div className="kpi-sep"></div>
            <div className="kpi-box">
              <span className="kpi-num">24/7</span>
              <span className="kpi-txt">{isEn ? "Autonomous Operations" : "Vận hành tự động xuyên đêm"}</span>
            </div>
          </div>

          {/* MINIMALIST CATEGORY FILTER TABS */}
          <div className="saas-category-tabs">
            <button 
              className={\`cat-tab \${activeSaasCategory === 'all' ? 'active' : ''}\`}
              onClick={() => setActiveSaasCategory('all')}
            >
              {isEn ? "All Modules (13)" : "Tất Cả Module (13)"}
            </button>
            <button 
              className={\`cat-tab \${activeSaasCategory === 'sales' ? 'active' : ''}\`}
              onClick={() => setActiveSaasCategory('sales')}
            >
              {isEn ? "Sales & Cashflow" : "Dòng Tiền & Chốt Cọc"}
            </button>
            <button 
              className={\`cat-tab \${activeSaasCategory === 'ai' ? 'active' : ''}\`}
              onClick={() => setActiveSaasCategory('ai')}
            >
              {isEn ? "AI & Automation" : "AI & Tự Động Hóa"}
            </button>
            <button 
              className={\`cat-tab \${activeSaasCategory === 'omnichannel' ? 'active' : ''}\`}
              onClick={() => setActiveSaasCategory('omnichannel')}
            >
              {isEn ? "Omnichannel & Social" : "Đa Kênh & Mạng Xã Hội"}
            </button>
            <button 
              className={\`cat-tab \${activeSaasCategory === 'retention' ? 'active' : ''}\`}
              onClick={() => setActiveSaasCategory('retention')}
            >
              {isEn ? "Retention & Operations" : "Tương Tác & Vận Hành"}
            </button>
          </div>`;

if (!content.includes(oldSection3Header)) {
  console.error("Could not find oldSection3Header in content!");
  process.exit(1);
}
content = content.replace(oldSection3Header, newSection3Header);
console.log("Replaced Section 3 header and tabs successfully!");

// 4. Update saas-feature-card card-top-meta to display systemBadge if available
const oldCardTopMeta = `                    <div className="card-top-meta">
                      <span className="card-number">{feat.num}</span>
                      <span className="card-metric-pill">
                        {isEn ? feat.metricEn : feat.metricVi}
                      </span>
                    </div>`;

const newCardTopMeta = `                    <div className="card-top-meta">
                      {feat.systemBadgeVi && (
                        <span className="card-system-badge">
                          {isEn ? feat.systemBadgeEn : feat.systemBadgeVi}
                        </span>
                      )}
                      <span className="card-number">{feat.num}</span>
                      <span className="card-metric-pill">
                        {isEn ? feat.metricEn : feat.metricVi}
                      </span>
                    </div>`;

if (!content.includes(oldCardTopMeta)) {
  console.error("Could not find oldCardTopMeta in content!");
  process.exit(1);
}
content = content.replace(oldCardTopMeta, newCardTopMeta);
console.log("Replaced card-top-meta successfully!");

// 5. Update modal category badge mapping to handle 'omnichannel'
const oldModalCatBadge = `                  <span className="modal-cat-badge">
                    {selectedSaasFeature.category === 'sales' 
                      ? (isEn ? "Sales & Cashflow" : "Dòng Tiền & Chốt Cọc")
                      : selectedSaasFeature.category === 'ai'
                      ? (isEn ? "AI & Automation" : "AI & Tự Động Hóa")
                      : (isEn ? "Retention & Operations" : "Tương Tác & Vận Hành")}
                  </span>`;

const newModalCatBadge = `                  <span className="modal-cat-badge">
                    {selectedSaasFeature.category === 'sales' 
                      ? (isEn ? "Sales & Cashflow" : "Dòng Tiền & Chốt Cọc")
                      : selectedSaasFeature.category === 'ai'
                      ? (isEn ? "AI & Automation" : "AI & Tự Động Hóa")
                      : selectedSaasFeature.category === 'omnichannel'
                      ? (isEn ? "Omnichannel & Social" : "Đa Kênh & Mạng Xã Hội")
                      : (isEn ? "Retention & Operations" : "Tương Tác & Vận Hành")}
                  </span>`;

if (!content.includes(oldModalCatBadge)) {
  console.error("Could not find oldModalCatBadge in content!");
  process.exit(1);
}
content = content.replace(oldModalCatBadge, newModalCatBadge);
console.log("Replaced modal category badge successfully!");

// 6. Update deployment-meta-card in modal to display Production Source (Biensovip vs BrandHub)
const oldDeployCard = `                  <div className="deployment-meta-card">
                    <div className="deploy-row">
                      <span className="deploy-label">{isEn ? "Tech Engine:" : "Hạ tầng kỹ thuật:"}</span>
                      <span className="deploy-value font-mono">{isEn ? selectedSaasFeature.techEn : selectedSaasFeature.techVi}</span>
                    </div>
                    <div className="deploy-row">
                      <span className="deploy-label">{isEn ? "Deliverable Status:" : "Trạng thái bàn giao:"}</span>
                      <span className="deploy-value status-verified">Production Verified</span>
                    </div>
                  </div>`;

const newDeployCard = `                  <div className="deployment-meta-card">
                    <div className="deploy-row">
                      <span className="deploy-label">{isEn ? "System Origin:" : "Nguồn chứng thực:"}</span>
                      <span className="deploy-value status-origin">
                        {selectedSaasFeature.systemBadgeVi 
                          ? (isEn ? "BrandHub Enterprise Architecture" : "Hệ thống BrandHub Thực tế")
                          : (isEn ? "Biensovip Production Platform" : "Hệ thống Sàn Biensovip")}
                      </span>
                    </div>
                    <div className="deploy-row">
                      <span className="deploy-label">{isEn ? "Tech Engine:" : "Hạ tầng kỹ thuật:"}</span>
                      <span className="deploy-value font-mono">{isEn ? selectedSaasFeature.techEn : selectedSaasFeature.techVi}</span>
                    </div>
                    <div className="deploy-row">
                      <span className="deploy-label">{isEn ? "Deliverable Status:" : "Trạng thái bàn giao:"}</span>
                      <span className="deploy-value status-verified">Production Verified</span>
                    </div>
                  </div>`;

if (!content.includes(oldDeployCard)) {
  console.error("Could not find oldDeployCard in content!");
  process.exit(1);
}
content = content.replace(oldDeployCard, newDeployCard);
console.log("Replaced deployment-meta-card successfully!");

// Restore CRLF if needed
if (isCrlf) {
  content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated Services.jsx successfully!");
