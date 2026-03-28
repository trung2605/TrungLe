import { useState } from "react";
import { motion } from "framer-motion";
import {
    FaUsers,
    FaCalendarAlt,
    FaBuilding,
    FaCrown,
    FaStar,
    FaPlay,
    FaCheck,
    FaChevronLeft,
    FaChevronRight,
    FaUser,
    FaTimes,
    FaEye,
} from "react-icons/fa";
import { activities } from "../../data";
import './Activities.scss';
import Markdown from "react-markdown";
import SpotlightCard from "../../animations/SpotlightCard";
import BlurText from "../../animations/BlurText";
import ShinyText from "../../animations/ShinyText";

const ITEMS_PER_PAGE = 9;

const Activities = () => {
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedOrganization, setSelectedOrganization] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const organizations = [
        "all",
        ...new Set(activities.map((activity) => activity.organization)),
    ];
    const statuses = ["all", "Active", "Completed", "Various", "In Progress"];

    const preliminaryFilteredActivities = activities.filter((activity) => {
        const matchesStatus =
            selectedStatus === "all" || activity.status === selectedStatus;
        const matchesOrg =
            selectedOrganization === "all" ||
            activity.organization === selectedOrganization;
        return matchesStatus && matchesOrg;
    });

    const totalPages = Math.ceil(preliminaryFilteredActivities.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    const filteredActivities = preliminaryFilteredActivities.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
    };

    const getRoleIcon = (role) => {
        if (role.toLowerCase().includes("leader")) return FaCrown;
        if (role.toLowerCase().includes("core")) return FaStar;
        if (role.toLowerCase().includes("ambassador")) return FaUser;
        return FaUsers;
    };

    const getRoleColor = (role) => {
        if (role.toLowerCase().includes("leader"))
            return "from-blue-600 to-blue-800"; // Leader: Deep Blue
        if (role.toLowerCase().includes("core")) return "from-sky-500 to-sky-700"; // Core: Sky Blue
        if (role.toLowerCase().includes("ambassador"))
            return "from-cyan-500 to-cyan-700"; // Ambassador: Cyan (Blue-ish)
        return "from-slate-500 to-slate-700";
    };

    const getStatusIcon = (status) => {
        return status === "Active" || status === "In Progress" ? FaPlay : FaCheck;
    };

    const getStatusColor = (status) => {
        return status === "Active" || status === "In Progress"
            ? "from-cyan-400 to-cyan-600" // Active: Cyan
            : "from-blue-400 to-blue-600"; // Completed: Blue
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <div className="activities-page">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        <motion.span
                            className="inline-block mr-4 text-blue-600"
                            animate={{ rotate: [0, 10, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <FaUsers />
                        </motion.span>
                        <BlurText
                            text="Activities &"
                            delay={50}
                            animateBy="words"
                            direction="bottom"
                            className="inline"
                        />
                        {' '}
                        <ShinyText
                            text="Participation"
                            color="#38bdf8"
                            shineColor="#ffffff"
                            speed={3}
                            className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent"
                        />
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Extracurricular activities and leadership roles I have undertaken
                        during my academic journey
                    </p>
                </motion.div>

                {/* Statistics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="grid md:grid-cols-4 gap-6 mb-12"
                >
                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sky-100 text-sm">Total Activities</p>
                                <p className="text-3xl font-bold">{activities.length}</p>
                            </div>
                            <FaUsers className="text-4xl text-sky-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cyan-100 text-sm">Active</p>
                                <p className="text-3xl font-bold">
                                    {activities.filter((a) => a.status === "Active" || a.status === "In Progress").length}
                                </p>
                            </div>
                            <FaPlay className="text-4xl text-cyan-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-sky-500 to-sky-700 rounded-lg p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sky-100 text-sm">Completed</p>
                                <p className="text-3xl font-bold">
                                    {activities.filter((a) => a.status === "Completed").length}
                                </p>
                            </div>
                            <FaCheck className="text-4xl text-sky-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-indigo-100 text-sm">Organizations</p>
                                <p className="text-3xl font-bold">{organizations.length - 1}</p>
                            </div>
                            <FaBuilding className="text-4xl text-indigo-200" />
                        </div>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12 border border-gray-100 dark:border-gray-700"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Filter by Status
                            </label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                            >
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status === "all" ? "All Status" : status}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Filter by Organization
                            </label>
                            <select
                                value={selectedOrganization}
                                onChange={(e) => { setSelectedOrganization(e.target.value); setCurrentPage(1); }}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                            >
                                {organizations.map((org) => (
                                    <option key={org} value={org}>
                                        {org === "all" ? "All Organizations" : org}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Activities Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredActivities.map((activity, index) => {
                        const RoleIcon = getRoleIcon(activity.role);
                        const StatusIcon = getStatusIcon(activity.status);
                        const roleColorClass = getRoleColor(activity.role);
                        const statusColorClass = getStatusColor(activity.status);

                        const ActivityImage =
                            activity.image ||
                            "https://via.placeholder.com/400x250?text=Activity+Image";

                        return (
                            <motion.div
                                key={activity.id}
                                variants={itemVariants}
                                className="group h-full"
                            >
                                <div className="h-full flex flex-col bg-transparent relative">
                                    {/* ── THE ARTISTIC FRAME (FILM STYLE) ── */}
                                    <div className="p-4 pb-12 bg-white dark:bg-slate-900 rounded-[2.5rem] rounded-b-none border border-gray-100 dark:border-slate-800 shadow-xl relative transition-all duration-700 group-hover:-rotate-2">
                                        {/* Status Badge */}
                                        <div className="absolute top-8 right-8 z-20">
                                            <div className={`px-3 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-widest shadow-xl backdrop-blur-md bg-gradient-to-r ${getStatusColor(activity.status)}`}>
                                                {activity.status}
                                            </div>
                                        </div>

                                        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-slate-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-800 shadow-inner">
                                            <img
                                                src={ActivityImage}
                                                alt={activity.title}
                                                className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:blur-[1px]"
                                            />
                                            
                                            {/* Cinematic Overlay & Actions */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center">
                                                <button
                                                    onClick={() => setSelectedActivity(activity)}
                                                    className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all transform scale-90 group-hover:scale-100 duration-500 shadow-2xl"
                                                >
                                                    <FaEye className="text-2xl" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Film Metadata Decoration */}
                                        <div className="mt-6 flex justify-center opacity-30 select-none">
                                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                                                ACT_{activity.id || 'N01'} • {activity.organization?.substring(0, 10).toUpperCase()} • 2025
                                            </span>
                                        </div>
                                    </div>

                                    {/* ── CONTENT AREA ── */}
                                    <div className="flex-1 p-8 bg-white dark:bg-slate-900 rounded-b-[2.5rem] border border-gray-100 dark:border-slate-800 border-t-0 shadow-2xl relative z-10 transition-transform duration-500 group-hover:translate-z-10 flex flex-col">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className={`px-3 py-1 bg-gradient-to-r ${getRoleColor(activity.role)} text-white text-[9px] uppercase font-black tracking-widest rounded-full shadow-sm`}>
                                                {activity.role}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-500 line-clamp-2 mb-4">
                                            {activity.title}
                                        </h3>

                                        <div className="space-y-3 mb-6 flex-grow">
                                            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs font-bold">
                                                <FaBuilding className="text-blue-500" />
                                                <span className="truncate">{activity.organization}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs font-bold">
                                                <FaCalendarAlt className="text-sky-500" />
                                                <span>{activity.duration}</span>
                                            </div>
                                        </div>

                                        <div className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 italic">
                                            <Markdown>{activity.description}</Markdown>
                                        </div>

                                        <button
                                            onClick={() => setSelectedActivity(activity)}
                                            className="w-full py-4 bg-slate-900 dark:bg-slate-800 text-white hover:bg-blue-600 dark:hover:bg-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95 border border-white/5"
                                        >
                                            <span>Details</span>
                                            <FaChevronRight className="text-[8px]" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-12">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                        >
                            <FaChevronLeft />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    currentPage === page
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}


                {/* No results message */}
                {(filteredActivities.length === 0 && preliminaryFilteredActivities.length > 0) ? (
                    <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                        No items on this page. Please navigate back or adjust the filters.
                    </div>
                ) : (
                    preliminaryFilteredActivities.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <FaUsers className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                No activities found
                            </h3>
                            <p className="text-gray-400 dark:text-gray-500">
                                Try adjusting your filters to see more results
                            </p>
                        </motion.div>
                    )
                )}
                {/* Activity Details Modal */}
                {selectedActivity && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
                        onClick={() => setSelectedActivity(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-gray-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative bg-gray-100 dark:bg-gray-900 rounded-t-3xl flex items-center justify-center overflow-hidden">
                                <img
                                    src={selectedActivity.image || "https://via.placeholder.com/400x250?text=Activity+Image"}
                                    alt={selectedActivity.title}
                                    className="w-full h-auto max-h-[60vh] object-cover"
                                />
                                
                                <button
                                    onClick={() => setSelectedActivity(null)}
                                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all backdrop-blur-sm border border-white/20 z-10"
                                >
                                    <FaTimes className="text-lg" />
                                </button>
                                
                                <div className="absolute top-4 left-4">
                                     <div className={`backdrop-blur-md bg-white/20 text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/30 flex items-center gap-2`}>
                                         {(() => {
                                             const StatusIcon = getStatusIcon(selectedActivity.status);
                                             return <StatusIcon className="text-xs" />;
                                         })()}
                                         {selectedActivity.status}
                                     </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                                        {selectedActivity.title}
                                    </h2>
                                    <div className="flex flex-wrap gap-4 mt-3">
                                        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium">
                                            <FaBuilding />
                                            <span>{selectedActivity.organization}</span>
                                        </div>
                                         <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                                            <FaCalendarAlt />
                                            <span>{selectedActivity.duration}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-600">
                                         {(() => {
                                             const RoleIcon = getRoleIcon(selectedActivity.role);
                                             const roleColorClass = getRoleColor(selectedActivity.role);
                                             return <RoleIcon className={`text-2xl ${roleColorClass.replace('bg-', 'text-').split(' ')[0]}`} />
                                         })()}
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Role</span>
                                            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{selectedActivity.role}</span>
                                        </div>
                                    </div>
                                    
                                     <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg markdown-content">
                                        <Markdown>{selectedActivity.description}</Markdown>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Activities;