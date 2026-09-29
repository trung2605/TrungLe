import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaBolt, 
  FaQrcode, 
  FaCheckCircle, 
  FaLock, 
  FaSyncAlt, 
  FaShieldAlt, 
  FaServer, 
  FaClock, 
  FaCheck, 
  FaTimes 
} from 'react-icons/fa';
import './HeroTechSimulator.scss';

export const HeroTechSimulator = ({ isEn }) => {
  const [activeTab, setActiveTab] = useState('search'); // 'search' | 'vietqr' | 'redis'

  // Tab 1: Sub-8ms Search State
  const [searchQuery, setSearchQuery] = useState('999');
  const [latency, setLatency] = useState(5.2);
  const [isSearching, setIsSearching] = useState(false);

  // Mock sample 900+ items dataset
  const sampleProducts = [
    { id: 1, title: '92A - 999.99', category: 'Ngũ quý Đỉnh Cao', price: '450.000.000₫', status: 'Sẵn sàng chốt', speed: '5.2ms' },
    { id: 2, title: '43C - 888.88', category: 'Ngũ quý Phát Tài', price: '380.000.000₫', status: 'Sẵn sàng chốt', speed: '6.1ms' },
    { id: 3, title: '92A - 686.86', category: 'Lộc Phát Toàn Diện', price: '95.000.000₫', status: 'Sẵn sàng chốt', speed: '4.9ms' },
    { id: 4, title: '43A - 797.79', category: 'Thần Tài Lớn', price: '120.000.000₫', status: 'Sẵn sàng chốt', speed: '5.5ms' },
  ];

  const cleanQuery = searchQuery.replace(/[\s.-]/g, '').toLowerCase();
  const filteredProducts = sampleProducts.filter(p => {
    if (!searchQuery.trim()) return true;
    const cleanTitle = p.title.replace(/[\s.-]/g, '').toLowerCase();
    return cleanTitle.includes(cleanQuery) || 
           p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (val) => {
    setIsSearching(true);
    setSearchQuery(val);
    const randMs = (4.5 + Math.random() * 2.8).toFixed(1);
    setLatency(randMs);
    setTimeout(() => setIsSearching(false), 80);
  };

  // Tab 2: VietQR Pro State
  const [reconcileStep, setReconcileStep] = useState(0); // 0: Idle, 1: Pending, 2: Matched, 3: Completed
  const [isSimulatingQr, setIsSimulatingQr] = useState(false);

  const startQrSimulation = () => {
    if (isSimulatingQr) return;
    setIsSimulatingQr(true);
    setReconcileStep(1);
    
    setTimeout(() => {
      setReconcileStep(2);
      setTimeout(() => {
        setReconcileStep(3);
        setIsSimulatingQr(false);
      }, 900);
    }, 1100);
  };

  const resetQrSimulation = () => {
    setReconcileStep(0);
    setIsSimulatingQr(false);
  };

  // Tab 3: Redis Lock State
  const [lockSimulation, setLockSimulation] = useState({
    userA: { status: 'idle', time: '' },
    userB: { status: 'idle', time: '' },
    lockOwner: null,
  });

  const runLockSimulation = () => {
    const tA = '12:00:00.004';
    const tB = '12:00:00.006';
    setLockSimulation({
      userA: { status: 'locking', time: tA },
      userB: { status: 'locking', time: tB },
      lockOwner: null,
    });

    setTimeout(() => {
      setLockSimulation({
        userA: { status: 'success', time: tA },
        userB: { status: 'rejected', time: tB },
        lockOwner: 'Khách A (Hà Nội)',
      });
    }, 600);
  };

  return (
    <div className="hero-tech-simulator-card">
      {/* CARD HEADER & TABS */}
      <div className="simulator-header">
        <div className="sim-title-group">
          <div className="sim-live-badge">
            <span className="sim-pulse-dot" />
            <span>SYNAPFORGE CORE ENGINE</span>
          </div>
          <span className="sim-sub">
            {isEn ? "Live Architectural Proof of Concept" : "Mô Phỏng Trực Quan Năng Lực Kiến Trúc Thực Tế"}
          </span>
        </div>

        {/* Tab Controls */}
        <div className="sim-nav-tabs">
          <button 
            type="button"
            className={`sim-tab ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            <FaBolt className="tab-icon" />
            <span>{isEn ? "Sub-8ms Search (900+ items)" : "Lọc 900+ SP < 8ms"}</span>
          </button>

          <button 
            type="button"
            className={`sim-tab ${activeTab === 'vietqr' ? 'active' : ''}`}
            onClick={() => setActiveTab('vietqr')}
          >
            <FaQrcode className="tab-icon" />
            <span>{isEn ? "VietQR 0đ Fee Webhook" : "Khớp Cọc VietQR 0đ"}</span>
          </button>

          <button 
            type="button"
            className={`sim-tab ${activeTab === 'redis' ? 'active' : ''}`}
            onClick={() => setActiveTab('redis')}
          >
            <FaLock className="tab-icon" />
            <span>{isEn ? "Redis Lock Collision-Guard" : "Khóa Redis Chống Trùng"}</span>
          </button>
        </div>
      </div>

      {/* CARD BODY CONTENT */}
      <div className="simulator-body">
        <AnimatePresence mode="wait">
          {/* TAB 1: SUB-8MS HIGH-PERFORMANCE SEARCH */}
          {activeTab === 'search' && (
            <motion.div 
              key="tab-search"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="sim-pane-search"
            >
              <div className="search-control-bar">
                <div className="search-input-box">
                  <FaSearch className="search-icon" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder={isEn ? "Try typing: 9999, 8888, Lộc Phát, 92A..." : "Thử gõ: 9999, 8888, Lộc Phát, 92A..."}
                    className="sim-search-input"
                  />
                  {searchQuery && (
                    <button type="button" className="clear-btn" onClick={() => handleSearchChange('')}>
                      <FaTimes size={12} />
                    </button>
                  )}
                </div>

                {/* Microsecond latency readout */}
                <div className="latency-telemetry">
                  <span className="telemetry-label">{isEn ? "Query Latency:" : "Độ Trễ Phản Hồi:"}</span>
                  <span className={`telemetry-value ${isSearching ? 'pulsing' : ''}`}>
                    <FaBolt size={11} /> {latency} ms
                  </span>
                  <span className="dataset-tag">Indexed: 984 Sản Phẩm</span>
                </div>
              </div>

              {/* Quick Query Suggestions */}
              <div className="query-suggestions">
                <span className="suggest-lbl">{isEn ? "Quick test filters:" : "Thử nhanh:"}</span>
                {['9999', '8888', 'Lộc Phát', '92A', 'Thần Tài'].map(q => (
                  <button 
                    type="button"
                    key={q} 
                    className={`suggest-chip ${searchQuery === q ? 'active' : ''}`}
                    onClick={() => handleSearchChange(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Live search results grid */}
              <div className="sim-results-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(p => (
                    <div key={p.id} className="sim-product-card">
                      <div className="prod-badge-row">
                        <span className="prod-cat">{p.category}</span>
                        <span className="prod-speed"><FaClock size={10} /> {p.speed}</span>
                      </div>
                      <div className="prod-title">{p.title}</div>
                      <div className="prod-price-row">
                        <span className="prod-price">{p.price}</span>
                        <span className="prod-status"><FaCheckCircle size={11} /> {p.status}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-result-box">
                    <span>Không tìm thấy với từ khóa "{searchQuery}"</span>
                    <button type="button" onClick={() => handleSearchChange('')} className="reset-search-btn">Xem tất cả</button>
                  </div>
                )}
              </div>

              <div className="sim-footer-note">
                <FaShieldAlt className="note-icon" />
                <span>
                  {isEn 
                    ? "Inverted Indexing & Redis In-Memory caching eliminates database overhead. Zero spinner delays for your shoppers." 
                    : "Hệ thống sử dụng Đánh chỉ mục ngược (Inverted Index) kết hợp Redis In-Memory Cache — khách hàng gõ đến đâu hiển thị ngay đến đó, không tải lại trang."}
                </span>
              </div>
            </motion.div>
          )}

          {/* TAB 2: VIETQR PRO ZERO-FEE RECONCILIATION */}
          {activeTab === 'vietqr' && (
            <motion.div 
              key="tab-vietqr"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="sim-pane-vietqr"
            >
              <div className="vietqr-sim-layout">
                {/* Left: Interactive Mock Bill & QR Code */}
                <div className="vietqr-bill-mock">
                  <div className="bill-header">
                    <span className="bill-title">HOÁ ĐƠN ĐẶT CỌC TỰ ĐỘNG</span>
                    <span className="bill-id">#DH-9842</span>
                  </div>

                  <div className="bill-content">
                    <div className="bill-row">
                      <span>Sản phẩm:</span>
                      <strong>Biển Số VIP 92A - 999.99</strong>
                    </div>
                    <div className="bill-row">
                      <span>Tiền cọc giữ chỗ (10%):</span>
                      <strong className="text-orange">45.000.000₫</strong>
                    </div>
                    <div className="bill-row">
                      <span>Cú pháp CK (Chính xác):</span>
                      <span className="bill-code-badge">SYNAP 9842</span>
                    </div>
                  </div>

                  <div className="qr-box-wrap">
                    <div className="mock-qr-code">
                      <FaQrcode size={76} className="qr-svg-icon" />
                      <div className="qr-overlay-logo">
                        <img src="/branding/synapforge-icon.png" alt="SF" />
                      </div>
                    </div>
                    <span className="qr-caption">Quét mã bằng app ngân hàng bất kỳ (Vietcombank, MB, Techcombank, ACB...)</span>
                  </div>

                  <div className="bill-action-btn">
                    {reconcileStep === 0 ? (
                      <button type="button" onClick={startQrSimulation} className="btn-sim-action">
                        <FaBolt /> Bấm Thử Quét Thanh Toán Demo
                      </button>
                    ) : (
                      <button type="button" onClick={resetQrSimulation} className="btn-sim-reset">
                        <FaSyncAlt /> Khởi tạo lại phiên thanh toán
                      </button>
                    )}
                  </div>
                </div>

                {/* Right: Realtime Webhook Log Terminal */}
                <div className="vietqr-log-terminal">
                  <div className="terminal-top-bar">
                    <div className="term-dots"><span /><span /><span /></div>
                    <span className="term-name">webhook-server : VietQR Banking Gateway</span>
                    <span className="term-fee-badge">Phí Cổng: 0đ</span>
                  </div>

                  <div className="terminal-logs-window">
                    <div className="log-line">
                      <span className="log-time">[12:00:00.000]</span>
                      <span className="log-msg info">Khởi tạo phiên đặt cọc đơn #DH-9842</span>
                    </div>

                    {reconcileStep >= 1 && (
                      <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="log-line">
                        <span className="log-time">[12:00:00.320]</span>
                        <span className="log-msg warn">Đang lắng nghe Webhook ngân hàng (ACB/VCB)...</span>
                      </motion.div>
                    )}

                    {reconcileStep >= 2 && (
                      <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="log-line">
                        <span className="log-time">[12:00:00.480]</span>
                        <span className="log-msg success">✓ NHẬN TIỀN CỌC: 45.000.000₫ | Nội dung: SYNAP 9842</span>
                      </motion.div>
                    )}

                    {reconcileStep >= 3 && (
                      <>
                        <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="log-line">
                          <span className="log-time">[12:00:00.520]</span>
                          <span className="log-msg success">✓ KHỚP ĐƠN TỰ ĐỘNG SAU 0.2s — Chuyển trạng thái "ĐÃ CỌC"</span>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="log-line">
                          <span className="log-time">[12:00:00.560]</span>
                          <span className="log-msg accent">✓ ĐÃ BẮN ZALO ZNS & EMAIL XÁC NHẬN CHO KHÁCH HÀNG</span>
                        </motion.div>
                        <div className="terminal-success-pill">
                          <FaCheckCircle /> GIAO DỊCH HOÀN TẤT • PHÍ CỔNG 0 ĐỒNG
                        </div>
                      </>
                    )}

                    {reconcileStep === 0 && (
                      <div className="log-prompt-hint">
                        Bấm nút "Bấm Thử Quét Thanh Toán Demo" ở cột bên trái để xem webhook tự động khớp đơn trong 0.2 giây!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: REDIS DISTRIBUTED LOCK GUARANTEE */}
          {activeTab === 'redis' && (
            <motion.div 
              key="tab-redis"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="sim-pane-redis"
            >
              <div className="redis-desc-banner">
                <span className="desc-title">Tình huống hiểm hóc:</span> 2 khách hàng tại Hà Nội & TP.HCM cùng bấm "Đặt Cọc" đúng 1 sản phẩm duy nhất trong cùng 1 mili-giây!
              </div>

              <div className="redis-race-container">
                {/* User A */}
                <div className={`race-card ${lockSimulation.userA.status}`}>
                  <div className="user-label">Khách Hàng A (Hà Nội)</div>
                  <div className="timestamp">Thời điểm bấm: {lockSimulation.userA.time || '12:00:00.004'}</div>
                  <div className="result-badge">
                    {lockSimulation.userA.status === 'idle' && <span>Chờ bấm thử nghiệm</span>}
                    {lockSimulation.userA.status === 'locking' && <span>Đang xin khóa phân tán...</span>}
                    {lockSimulation.userA.status === 'success' && (
                      <span className="success-badge"><FaCheck /> THÀNH CÔNG (Chiếm Khóa Redis)</span>
                    )}
                  </div>
                </div>

                <div className="race-vs-node">
                  <FaServer size={22} className="server-icon" />
                  <span className="redis-core-lbl">Redis Mutex Lock</span>
                </div>

                {/* User B */}
                <div className={`race-card ${lockSimulation.userB.status}`}>
                  <div className="user-label">Khách Hàng B (TP.HCM)</div>
                  <div className="timestamp">Thời điểm bấm: {lockSimulation.userB.time || '12:00:00.006 (+2ms)'}</div>
                  <div className="result-badge">
                    {lockSimulation.userB.status === 'idle' && <span>Chờ bấm thử nghiệm</span>}
                    {lockSimulation.userB.status === 'locking' && <span>Đang xin khóa phân tán...</span>}
                    {lockSimulation.userB.status === 'rejected' && (
                      <span className="rejected-badge"><FaTimes /> BẢO VỆ CHỐNG BÁN TRÙNG</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="redis-action-center">
                <button type="button" onClick={runLockSimulation} className="btn-sim-action">
                  <FaBolt /> Mô Phỏng 2 Khách Bấm Tranh Mua Cùng Lúc (2ms)
                </button>
              </div>

              {lockSimulation.lockOwner && (
                <div className="redis-verdict-box">
                  <FaShieldAlt className="verdict-icon" />
                  <div>
                    <strong>Kết quả bảo vệ toàn vẹn:</strong> Khách A chiếm khóa an toàn trong 20 phút để thanh toán. Khách B nhận thông báo lịch sự <em>"Sản phẩm đang được một khách hàng khác giữ chỗ thanh toán"</em> — Tránh 100% rủi ro khiếu nại bán trùng đơn!
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroTechSimulator;
