import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({
    project,
    onClick,
    id
}) => {
    const navigate = useNavigate();
    const {
        title,
        description,
        technologies = [],
        image,
        category,
        featured = false,
    } = project;

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
        hover: {
            y: -12,
            rotate: 0.5,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        },
    };

    const handleNavigate = () => {
        if (onClick) onClick();
        else navigate(`/portfolio/${id || project.id}`);
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: '-50px' }}
            className="h-full flex flex-col cursor-pointer bg-transparent group relative"
            onClick={handleNavigate}
        >
            {/* ── THE ARTISTIC FRAME (FILM STYLE) ── */}
            <div className="p-4 pb-10 bg-white dark:bg-slate-900 rounded-[2.5rem] rounded-b-none border border-gray-100 dark:border-slate-800 shadow-lg relative transition-transform duration-500 group-hover:-rotate-1">
                {/* Status & Featured Badges */}
                <div className="absolute top-8 right-8 z-10 flex gap-2">
                    {featured && (
                        <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl">
                            Featured
                        </span>
                    )}
                </div>

                <div className="relative rounded-[1.5rem] overflow-hidden aspect-[16/10] bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-800 shadow-inner">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
                            loading="lazy"
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center opacity-20 grayscale">
                            <span className="text-6xl">🖼️</span>
                        </div>
                    )}

                    {/* Cinematic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Film Metadata Decoration */}
                <div className="mt-5 flex justify-center opacity-30 select-none">
                    <span className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400">
                        {category?.replace(' & ', ' • ') || 'PROJECT'} • REF_{id || '00'}{Math.floor(Math.random() * 89) + 10}
                    </span>
                </div>
            </div>

            {/* ── CONTENT AREA ── */}
            <div className="flex-1 p-8 bg-white dark:bg-slate-900 rounded-b-[2.5rem] border border-gray-100 dark:border-slate-800 border-t-0 shadow-2xl relative z-10">
                <div className="mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-[10px] uppercase font-black tracking-widest rounded-full border border-blue-200 dark:border-blue-800">
                        {category}
                    </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                    {title}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {technologies.slice(0, 4).map((tech, index) => (
                        <span
                            key={index}
                            className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded-md border border-slate-100 dark:border-slate-700"
                        >
                            #{tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;