import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import { aboutSliderImages } from '../../data';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
    const [hoveredId, setHoveredId] = useState(null);

    if (!aboutSliderImages || aboutSliderImages.length === 0) return null;

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: false,
        dotsClass: 'slick-dots',
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div style={{ width: '100%' }}>
            <style>{`
                .image-slider-wrap .slick-dots li button:before {
                    color: #000000;
                    opacity: 0.2;
                    font-size: 8px;
                }
                .image-slider-wrap .slick-dots li.slick-active button:before {
                    opacity: 1;
                    color: #000000;
                }
                .image-slider-wrap .slick-dots {
                    bottom: -32px;
                }
            `}</style>
            <div className="image-slider-wrap" style={{ paddingBottom: '48px' }}>
                <Slider {...settings}>
                    {aboutSliderImages.map((image) => (
                        <div key={image.id} style={{ padding: '0 8px' }}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                onMouseEnter={() => setHoveredId(image.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    border: '1px solid #e6e6e6',
                                    cursor: 'pointer',
                                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                                    borderColor: hoveredId === image.id ? '#000000' : '#e6e6e6',
                                    boxShadow: hoveredId === image.id ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
                                }}
                            >
                                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#f7f7f5' }}>
                                    <img
                                        src={image.source}
                                        alt={image.alt}
                                        loading="lazy"
                                        style={{
                                            width: '100%', height: '100%', objectFit: 'cover',
                                            transition: 'transform 0.4s ease',
                                            transform: hoveredId === image.id ? 'scale(1.04)' : 'scale(1)',
                                        }}
                                    />
                                    <AnimatePresence>
                                        {hoveredId === image.id && image.caption && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.2 }}
                                                style={{
                                                    position: 'absolute', inset: 0,
                                                    background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
                                                    display: 'flex', alignItems: 'flex-end',
                                                    padding: '16px',
                                                }}
                                            >
                                                <p style={{ fontSize: '13px', fontWeight: '400', color: '#ffffff', margin: 0, lineHeight: '1.4' }}>
                                                    {image.caption}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ImageSlider;
