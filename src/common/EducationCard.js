import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';

const EducationCard = ({
    education,
}) => {
    const {
        institution,
        degree,
        field,
        startDate,
        endDate,
        grade,
        description,
        logo,
        location,
        achievements = [],
    } = education;

    const formatDate = (dateString) => {
        if (!dateString) return 'Hiện tại';
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'short',
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -32, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02 }}
            className="h-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-slate-800 relative group overflow-hidden"
        >
            {/* Color Streak Decoration */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-600 to-blue-300 dark:from-pink-600 dark:to-pink-400" />

            <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Logo / Icon */}
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden group-hover:rotate-6 transition-transform duration-500">
                    {logo ? (
                        <img src={logo} alt={institution} className="w-full h-full object-contain p-2" />
                    ) : (
                        <FaGraduationCap size={28} className="text-blue-500" />
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div>
                            <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight mb-1">
                                {institution}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
                                {location}
                            </p>
                        </div>
                        {grade && (
                            <div className="self-start px-3 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs font-black rounded-lg border border-blue-100 dark:border-blue-800">
                                GPA: {grade}
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <p className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-1">
                            {degree}{field && <span className="text-slate-400 font-medium"> in {field}</span>}
                        </p>
                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-mono font-bold">
                            <FaCalendarAlt size={11} />
                            {formatDate(startDate)} — {formatDate(endDate)}
                        </div>
                    </div>

                    {description && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                            {description}
                        </p>
                    )}

                    {achievements.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
                                Thành tựu nổi bật
                            </h4>
                            <ul className="space-y-2">
                                {achievements.map((item, index) => (
                                    <li key={index} className="flex gap-3 text-sm text-slate-500 dark:text-slate-400">
                                        <span className="text-blue-500 dark:text-pink-500 mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-current" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default EducationCard;