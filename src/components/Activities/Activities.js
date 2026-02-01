import React, { useState } from "react";
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
} from "react-icons/fa";
import { activities } from "../../data";
import './Activities.scss';
import Markdown from "react-markdown";

const ITEMS_PER_PAGE = 9;

const Activities = () => {
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedOrganization, setSelectedOrganization] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

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
                        <FaUsers className="inline-block mr-4 text-blue-600" />
                        Activities & Participation
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
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 dark:border-gray-700"
                            >
                                <div className="relative overflow-hidden h-56">
                                    <img
                                        src={ActivityImage}
                                        alt={activity.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-xl font-bold line-clamp-2">
                                                    {activity.title}
                                                </h3>
                                                <div
                                                    className={`flex items-center space-x-2 text-sm mt-1 text-gray-300`}
                                                >
                                                    <RoleIcon className={`text-base ${roleColorClass.replace('bg-', 'text-').split(' ')[0]}`} />
                                                    <span className="font-medium">{activity.role}</span>
                                                </div>
                                            </div>
                                            <div
                                                className={`flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 border-2 border-white/50`}
                                            >
                                                <StatusIcon className="text-xs" />
                                                <span className="text-xs font-semibold">
                                                    {activity.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="space-y-3 mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">
                                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                                            <FaBuilding className="text-blue-600 dark:text-blue-400 text-base flex-shrink-0" />
                                            <span className="text-sm font-medium">
                                                {activity.organization}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                                            <FaCalendarAlt className="text-sky-600 dark:text-sky-400 text-base flex-shrink-0" />
                                            <span className="text-sm font-medium">
                                                {activity.duration}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                                        <Markdown>
                                            {activity.description}
                                        </Markdown>
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
            </div>
        </div>
    );
};

export default Activities;