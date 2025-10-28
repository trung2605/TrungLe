// src/components/About/ImageSlider.js

import React from 'react';
import { motion } from 'framer-motion';
import { FaImages } from 'react-icons/fa';
import Slider from 'react-slick'; 
import { aboutSliderImages } from '../../data'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; 

const ImageSlider = () => {
    if (!aboutSliderImages || aboutSliderImages.length === 0) return null;
    const settings = {
        dots: true, // Hiển thị các chấm điều hướng
        infinite: true, // Vòng lặp vô tận
        speed: 500,
        slidesToShow: 3, // Số item hiển thị trên desktop
        slidesToScroll: 1,
        autoplay: true, // Tự động chạy
        autoplaySpeed: 3000,
        arrows: false, // Ẩn mũi tên điều hướng (tùy chọn)
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
    };

    return (
        <section className= "w-full mt-20 py-10 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
            >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center space-x-3">
                    <FaImages className="text-blue-600" />
                    <span>My Journey Visualized</span>
                </h2>
            </motion.div>

            <div className="max-w mx-auto px-4 w-full">

                <Slider {...settings}>
                    {aboutSliderImages.map((image) => (
                        <div key={image.id} className="p-2"> {/* Dùng p-2 để tạo khoảng cách giữa các slide */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                            >
                                <div className="relative h-64 md:h-72 lg:h-80">
                                    <img
                                        src={image.source}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="p-3 text-white text-xs font-medium w-full bg-black/50">{image.caption}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default ImageSlider;