import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaDownload, FaSpinner } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { personalInfo } from '../../data';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

const ResumeViewer = () => {
    const { t } = useTranslation();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageWidth, setPageWidth] = useState(Math.min(720, window.innerWidth - 64));
    const [failed, setFailed] = useState(false);

    return (
        <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <p style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
                    color: 'var(--color-ink-soft)', margin: 0,
                }}>
                    {numPages ? `${t('resume.page')} ${pageNumber} / ${numPages}` : t('resume.loading')}
                </p>
                <a
                    href={personalInfo.cv}
                    download="Le_Tri_Trung_CV.pdf"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '10px 22px', borderRadius: '50px',
                        fontSize: '14px', fontWeight: '480',
                        color: '#ffffff', backgroundColor: '#000000',
                        textDecoration: 'none',
                    }}
                >
                    <FaDownload size={13} /> {t('resume.download')}
                </a>
            </div>

            {failed ? (
                <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-ink-soft)' }}>
                    <p>{t('resume.viewerFailed')}</p>
                    <a href={personalInfo.cv} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-ink)' }}>
                        {t('resume.openInNewTab')}
                    </a>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
                        backgroundColor: 'var(--color-surface)', borderRadius: '24px', padding: '32px 16px',
                    }}
                >
                    <Document
                        file={personalInfo.cv}
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
                                style={{ width: '36px', height: '36px', borderRadius: '9999px', border: '1.5px solid var(--color-hairline)', backgroundColor: 'var(--color-canvas)', cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer', opacity: pageNumber <= 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <FaChevronLeft size={12} />
                            </button>
                            <button
                                onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                                disabled={pageNumber >= numPages}
                                aria-label={t('resume.nextPage')}
                                style={{ width: '36px', height: '36px', borderRadius: '9999px', border: '1.5px solid var(--color-hairline)', backgroundColor: 'var(--color-canvas)', cursor: pageNumber >= numPages ? 'not-allowed' : 'pointer', opacity: pageNumber >= numPages ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
