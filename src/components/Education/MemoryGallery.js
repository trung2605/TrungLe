import React from 'react';
import { motion } from 'framer-motion';
import { FaCameraRetro } from 'react-icons/fa';
import { educationMemories } from '../../data'; // Đảm bảo import đúng đường dẫn
import './Education.scss'; 

const MemoryGallery = () => {
    const galleryVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5,
            }
        }
    };

    const imageVariants = {
        hidden: { y: 20, opacity: 0, scale: 0.9 },
        visible: { y: 0, opacity: 1, scale: 1 }
    };

    return (
        <section className="mt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center space-x-3">
                    {/* <FaCameraRetro className="text-purple-600" /> */}
                    <span>Academic & Personal Memories</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    A collection of moments from my learning and development journey.
                </p>
            </motion.div>

            <motion.div
                variants={galleryVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {educationMemories.map((memory) => (
                    <motion.div
                        key={memory.id}
                        variants={imageVariants}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300"
                    >
                        <img
                            src={memory.source}
                            alt={memory.alt}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <p className="text-sm text-gray-800 dark:text-white font-medium">{memory.caption}</p>
                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">{memory.year}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default MemoryGallery;