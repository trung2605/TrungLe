import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaDownload, FaSpinner, FaFolderOpen, FaExternalLinkAlt, FaFilePdf } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { personalInfo } from '../../data';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

const CV_VERSIONS = [
    {
        id: 'en_ba',
        file: '/LeTriTrung_EN.pdf',
        downloadName: 'CV_LeTriTrung_TechnicalBA_EN.pdf',
        badgeVi: 'BẢN TIẾNG ANH • TECHNICAL BA / PRODUCT',
        badgeEn: 'ENGLISH CV • TECHNICAL BA / PRODUCT',
        titleVi: 'Technical Business Analyst & Product Architect (EN)',
        titleEn: 'Technical Business Analyst & Product Architect (EN)',
        descVi: 'Định vị Technical BA & Founder: trực tiếp khảo sát nghiệp vụ, thiết kế FSM 4-tab (Biensovip 1,1M+ bản ghi), chuẩn hóa 109 yêu cầu thô thành 141 Atomic FRs (BrandHub) & 2.500+ test cases.',
        descEn: 'Technical BA & Founder focus: covers Requirement Elicitation, 4-tab FSM (Biensovip 1.1M+ records), 141 Atomic FRs SRS (BrandHub), and 2,500+ QA test cases.',
        accent: '#F5C242',
    },
    {
        id: 'vi_se',
        file: '/LeTriTrung_VI.pdf',
        downloadName: 'CV_LeTriTrung_SoftwareEngineer_VI.pdf',
        badgeVi: 'BẢN TIẾNG VIỆT • SOFTWARE ENGINEER',
        badgeEn: 'VIETNAMESE CV • SOFTWARE ENGINEER',
        titleVi: 'Kỹ Sư Phần Mềm & Kiến Trúc Sư Hệ Thống (VI)',
        titleEn: 'Software Engineer & System Architect (VI)',
        descVi: 'Nhấn mạnh chiều sâu kỹ thuật .NET 8 Clean Architecture, Java 21 Spring Boot, Python FastAPI, PostgreSQL 61 bảng GIN Index (<8ms), RabbitMQ DLQ & Docker Linux VPS.',
        descEn: 'Deep-dive into .NET 8 Clean Architecture, Java 21 Spring Boot, Python FastAPI, PostgreSQL 61 tables GIN Index (<8ms), RabbitMQ DLQ & Docker Linux VPS.',
        accent: '#B8E8D0',
    },
];

const BA_PORTFOLIO_DRIVES = [
    {
        id: 'biensovip-ba',
        labelVi: 'Hồ sơ BA Biensovip.com (Khảo sát, FSM 4-tab, MVP Roadmap)',
        labelEn: 'Biensovip.com BA Dossier (Elicitation, 4-tab FSM, MVP Roadmap)',
        url: 'https://drive.google.com/drive/u/0/folders/1Co2k-tGTlGEEEJ1jY04arhtNMuqyW4gu',
        tag: 'BA DRIVE #01',
    },
    {
        id: 'brandhub-ba',
        labelVi: 'Hồ sơ BA BrandHub (141 Atomic FRs, SRS Report 1–7, Visual Paradigm)',
        labelEn: 'BrandHub BA Dossier (141 Atomic FRs, SRS Report 1–7, Visual Paradigm)',
        url: 'https://drive.google.com/drive/folders/1CjfeDVfT30N12sL61ZIaIECzalY8bJIY?usp=sharing',
        tag: 'BA DRIVE #02',
    },
];

const ResumeViewer = () => {
    const { t, i18n } = useTranslation();
    const isEn = i18n.language === 'en';
    const [activeCvId, setActiveCvId] = useState('en_ba');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageWidth, setPageWidth] = useState(() => Math.min(760, Math.max(280, (typeof window !== 'undefined' ? window.innerWidth : 760) - 48)));
    const [failed, setFailed] = useState(false);

    const activeCv = CV_VERSIONS.find(v => v.id === activeCvId) || CV_VERSIONS[0];

    useEffect(() => {
        const handleResize = () => {
            setPageWidth(Math.min(760, Math.max(280, window.innerWidth - 48)));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSelectVersion = (id) => {
        setActiveCvId(id);
        setPageNumber(1);
        setFailed(false);
    };

    return (
        <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>
            {/* Version Switcher Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '16px',
                marginBottom: '24px',
            }}>
                {CV_VERSIONS.map((ver) => {
                    const isSelected = ver.id === activeCvId;
                    return (
                        <button
                            key={ver.id}
                            type="button"
                            onClick={() => handleSelectVersion(ver.id)}
                            style={{
                                textAlign: 'left',
                                padding: '18px 20px',
                                borderRadius: '8px',
                                backgroundColor: isSelected ? '#18181B' : 'var(--color-surface)',
                                color: isSelected ? '#FFFFFF' : 'var(--color-ink)',
                                border: '2px solid #18181B',
                                boxShadow: isSelected ? `5px 5px 0px ${ver.accent}` : '3px 3px 0px #18181B',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '3px 10px',
                                    borderRadius: '4px',
                                    backgroundColor: ver.accent,
                                    color: '#18181B',
                                    border: '1.5px solid #18181B',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '10.5px',
                                    fontWeight: 700,
                                    letterSpacing: '0.4px',
                                }}>
                                    <FaFilePdf size={11} />
                                    {isEn ? ver.badgeEn : ver.badgeVi}
                                </span>
                                {isSelected && (
                                    <span style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        color: ver.accent,
                                    }}>
                                        ● ACTIVE
                                    </span>
                                )}
                            </div>
                            <div style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '16px',
                                fontWeight: 700,
                                color: isSelected ? '#FFFFFF' : 'var(--color-ink)',
                            }}>
                                {isEn ? ver.titleEn : ver.titleVi}
                            </div>
                            <div style={{
                                fontSize: '13px',
                                lineHeight: 1.5,
                                color: isSelected ? '#D4D4D8' : 'var(--color-ink-soft)',
                            }}>
                                {isEn ? ver.descEn : ver.descVi}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* BA Artifact Google Drive Links */}
            <div style={{
                padding: '16px 20px',
                borderRadius: '8px',
                backgroundColor: '#FAF8F3',
                border: '2px dashed #18181B',
                marginBottom: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
            }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#18181B',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <FaFolderOpen style={{ color: '#D97706' }} />
                    {isEn ? 'Verified Business Analysis & SRS Documentation Repositories (Google Drive)' : 'Kho Tài Liệu Nghiệp Vụ BA & Đặc Tả Hệ Thống Thực Chiến (Google Drive)'}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {BA_PORTFOLIO_DRIVES.map((drive) => (
                        <a
                            key={drive.id}
                            href={drive.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 14px',
                                borderRadius: '6px',
                                backgroundColor: '#FFFFFF',
                                color: '#18181B',
                                border: '1.5px solid #18181B',
                                boxShadow: '2px 2px 0px #18181B',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '13px',
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            <span style={{
                                padding: '2px 6px',
                                borderRadius: '3px',
                                backgroundColor: '#F5C242',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                fontWeight: 700,
                            }}>
                                {drive.tag}
                            </span>
                            <span>{isEn ? drive.labelEn : drive.labelVi}</span>
                            <FaExternalLinkAlt size={11} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <span className="notebook-boxed-label" style={{ fontSize: '12px' }}>
                    {numPages ? `★ ${t('resume.page')} ${pageNumber} / ${numPages}` : t('resume.loading')}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <a
                        href={activeCv.file}
                        download={activeCv.downloadName}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '10px 20px', borderRadius: '6px',
                            fontFamily: 'var(--font-mono)', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase',
                            color: '#18181B', backgroundColor: '#F5C242',
                            border: '2px solid #18181B',
                            boxShadow: '3px 3px 0px #18181B',
                            textDecoration: 'none',
                        }}
                    >
                        <FaDownload size={12} /> {t('resume.download')} ({activeCvId === 'en_ba' ? 'EN' : 'VI'})
                    </a>
                </div>
            </div>

            {failed ? (
                <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-ink-soft)' }}>
                    <p>{t('resume.viewerFailed')}</p>
                    <a href={activeCv.file || personalInfo.cv} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-ink)' }}>
                        {t('resume.openInNewTab')}
                    </a>
                </div>
            ) : (
                <motion.div
                    key={activeCv.file}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
                        backgroundColor: 'var(--color-surface)', borderRadius: '8px',
                        border: '2px solid #18181B', boxShadow: '6px 6px 0px #18181B',
                        padding: '32px 16px',
                    }}
                >
                    <Document
                        file={activeCv.file}
                        onLoadSuccess={({ numPages: n }) => setNumPages(n)}
                        onLoadError={() => setFailed(true)}
                        loading={<FaSpinner size={24} style={{ animation: 'spin 1s linear infinite' }} aria-label={t('resume.loading')} />}
                    >
                        <Page
                            pageNumber={pageNumber}
                            width={pageWidth}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                        />
                    </Document>

                    {numPages > 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <button
                                onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                                disabled={pageNumber <= 1}
                                aria-label={t('resume.prevPage')}
                                style={{ width: '36px', height: '36px', borderRadius: '6px', border: '1.5px solid #18181B', backgroundColor: '#FAF8F3', cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer', opacity: pageNumber <= 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '2px 2px 0px #18181B' }}
                            >
                                <FaChevronLeft size={12} />
                            </button>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}>
                                {pageNumber} / {numPages}
                            </span>
                            <button
                                onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                                disabled={pageNumber >= numPages}
                                aria-label={t('resume.nextPage')}
                                style={{ width: '36px', height: '36px', borderRadius: '6px', border: '1.5px solid #18181B', backgroundColor: '#FAF8F3', cursor: pageNumber >= numPages ? 'not-allowed' : 'pointer', opacity: pageNumber >= numPages ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '2px 2px 0px #18181B' }}
                            >
                                <FaChevronRight size={12} />
                            </button>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default ResumeViewer;
