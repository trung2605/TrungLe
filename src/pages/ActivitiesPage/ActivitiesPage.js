import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCalendarAlt,
  FaBuilding,
  FaUser,
  FaCrown,
  FaStar,
  FaPlay,
  FaCheck,
} from "react-icons/fa";
import { activities } from "../../data";
import "./ActivitiesPage.scss";
import Markdown from "react-markdown";

const ActivitiesPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrganization, setSelectedOrganization] = useState("all");

  // Filter activities based on selected filters
  const filteredActivities = activities.filter((activity) => {
    const matchesStatus =
      selectedStatus === "all" || activity.status === selectedStatus;
    const matchesOrg =
      selectedOrganization === "all" ||
      activity.organization === selectedOrganization;
    return matchesStatus && matchesOrg;
  });

  // Get unique organizations for filter
  const organizations = [
    "all",
    ...new Set(activities.map((activity) => activity.organization)),
  ];
  const statuses = ["all", "Active", "Completed"];

  const getRoleIcon = (role) => {
    if (role.toLowerCase().includes("leader")) return FaCrown;
    if (role.toLowerCase().includes("core")) return FaStar;
    if (role.toLowerCase().includes("ambassador")) return FaUser;
    return FaUsers;
  };

  const getRoleColor = (role) => {
    if (role.toLowerCase().includes("leader"))
      return "from-purple-500 to-purple-700";
    if (role.toLowerCase().includes("core")) return "from-blue-500 to-blue-700";
    if (role.toLowerCase().includes("ambassador"))
      return "from-green-500 to-green-700";
    return "from-gray-500 to-gray-700";
  };

  const getStatusIcon = (status) => {
    return status === "Active" ? FaPlay : FaCheck;
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "from-green-400 to-green-600"
      : "from-blue-400 to-blue-600";
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
            <FaUsers className="inline-block mr-4 text-purple-600" />
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
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Activities</p>
                <p className="text-3xl font-bold">{activities.length}</p>
              </div>
              <FaUsers className="text-4xl text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Active</p>
                <p className="text-3xl font-bold">
                  {activities.filter((a) => a.status === "Active").length}
                </p>
              </div>
              <FaPlay className="text-4xl text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Completed</p>
                <p className="text-3xl font-bold">
                  {activities.filter((a) => a.status === "Completed").length}
                </p>
              </div>
              <FaCheck className="text-4xl text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Organizations</p>
                <p className="text-3xl font-bold">{organizations.length - 1}</p>
              </div>
              <FaBuilding className="text-4xl text-orange-200" />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                onChange={(e) => setSelectedOrganization(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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

            // Giả định bạn đã import các hình ảnh
            const ActivityImage =
              activity.image ||
              "https://via.placeholder.com/400x250?text=Activity+Image";

            return (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                // Thêm hiệu ứng nổi bật khi hover
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
              >
                {/* 1. IMAGE CONTAINER & HEADER OVERLAY */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={ActivityImage}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay để chữ dễ đọc */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />

                  {/* Header Content (Tên + Vai trò + Status) - Đặt dưới cùng */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-start justify-between mb-2">
                      {/* Tiêu đề & Vai trò */}
                      <div>
                        <h3 className="text-xl font-bold line-clamp-2">
                          {activity.title}
                        </h3>
                        <div
                          className={`flex items-center space-x-2 text-sm mt-1 text-gray-300`}
                        >
                          <RoleIcon className={`text-base ${roleColorClass}`} />
                          <span className="font-medium">{activity.role}</span>
                        </div>
                      </div>

                      {/* Status Badge */}
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

                {/* 2. CONTENT DETAILS (Organization & Description) */}
                <div className="p-4">
                  <div className="space-y-3 mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">
                    {/* Organization */}
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                      <FaBuilding className="text-blue-600 dark:text-blue-400 text-base flex-shrink-0" />
                      <span className="text-sm font-medium">
                        {activity.organization}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                      <FaCalendarAlt className="text-green-600 dark:text-green-400 text-base flex-shrink-0" />
                      <span className="text-sm font-medium">
                        {activity.duration}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {/* Giả định bạn đã sửa lỗi Markdown trong component cha */}
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No results message */}
        {filteredActivities.length === 0 && (
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
        )}
      </div>
    </div>
  );
};

export default ActivitiesPage;
