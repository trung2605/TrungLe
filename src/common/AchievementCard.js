import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaScroll, FaStar, FaCoins } from 'react-icons/fa6';
import { FaMedal, FaAward } from 'react-icons/fa';

const AchievementCard = ({
    achievement,
    type = 'prize', // 'prize', 'certificate', 'activity'
}) => {
    const {
        title,
        issuer,
        organizer,
        event,
        date,
        issueDate,
        rank,
        description,
        image,
        category,
        amount,
    } = achievement;

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const config = {
        prize: { color: 'amber', icon: <FaTrophy /> },
        certificate: { color: 'green', icon: <FaScroll /> },
        activity: { color: 'blue', icon: <FaStar /> },
    }[type] || { color: 'blue', icon: <FaAward /> };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, rotate: 0.5 }}
            className="h-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-xl border border-gray-100 dark:border-slate-800 group relative transition-all duration-500 overflow-hidden"
        >
            {/* Background Accent */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity blur-3xl pointer-events-none bg-${config.color}-500`} />

            <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-6">
                    {/* Avatar/Icon Container */}
                    <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-transparent transition-all duration-500 overflow-hidden bg-${config.color}-500/10`}>
                        {image ? (
                            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                            <span style={{ fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="transform group-hover:scale-110 transition-transform">{config.icon}</span>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        {category && (
                            <span className={`inline-block px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider mb-2 border bg-${config.color}-50 text-${config.color}-600 border-${config.color}-200 dark:bg-${config.color}-900/20 dark:text-${config.color}-300 dark:border-${config.color}-800`}>
                                {category}
                            </span>
                        )}
                        <h3 className="font-bold text-slate-800 dark:text-white text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-pink-400 transition-colors">
                            {title}
                        </h3>
                    </div>

                    {amount && (
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 border border-green-100 dark:border-green-800">
                            <FaCoins size={12} />
                            <span className="text-xs font-black">{amount}</span>
                        </div>
                    )}
                </div>

                <div className="space-y-3 mb-6">
                    {rank && (
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black rounded uppercase tracking-widest shadow-lg">
                                {rank}
                            </span>
                        </div>
                    )}
                    
                    <p className="font-medium text-blue-600 dark:text-blue-300 text-sm">
                        {organizer || event || issuer}
                    </p>

                    <p className="text-slate-500 dark:text-slate-400 text-sm italic font-mono">
                        {formatDate(date || issueDate)}
                    </p>
                </div>

                <div className="flex-1">
                    {description && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                            {description}
                        </p>
                    )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest group-hover:text-blue-600 dark:group-hover:text-pink-400 transition-colors">
                        Xem chi tiết <span>→</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AchievementCard;