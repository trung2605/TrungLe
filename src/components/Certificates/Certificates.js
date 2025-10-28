import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaCertificate, FaEye, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Thêm icon điều hướng
import { certificates } from '../../data';
import './Certificates.scss';

const ITEMS_PER_PAGE = 9; // Thiết lập số mục tối đa mỗi trang

const Certificates = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // State theo dõi trang hiện tại

    // Get unique years for filtering (Giữ nguyên)
    const years = ['all', ...new Set(certificates.map(cert => cert.year))].sort((a, b) => {
        if (a === 'all') return -1;
        if (b === 'all') return 1;
        return b - a;
    });

    // 1. Lọc chứng chỉ (Giữ nguyên)
    const filteredCertificates = certificates.filter(cert => {
        const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            cert.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = selectedYear === 'all' || cert.year === selectedYear;
        return matchesSearch && matchesYear;
    });

    // 2. TÍNH TOÁN PHÂN TRANG
    const totalPages = Math.ceil(filteredCertificates.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    // 3. Lấy dữ liệu cho trang hiện tại
    const currentItems = filteredCertificates.slice(startIndex, endIndex);

    // Xử lý chuyển trang
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            // Cuộn lên đầu trang sau khi chuyển trang (Tùy chọn)
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
    };

    return (
        <div className="certificates-page">
            {/* Header (Giữ nguyên tiếng Anh) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Certificates &{' '}
                    <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Achievements
                    </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    A comprehensive list of certifications and achievements gained throughout my learning and development journey.
                </p>
            </motion.div>

            {/* Search and Filter Controls (Giữ nguyên) */}
            {/* ... */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-12"
            >
                {/* ... (Search Box và Year Filter) ... */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search Box */}
                    <div className="relative flex-1 max-w-md">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search certificates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                        />
                    </div>

                    {/* Year Filter */}
                    <div className="flex flex-wrap gap-2">
                        {years.map(year => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                    selectedYear === year
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md'
                                }`}
                            >
                                {year === 'all' ? 'All' : year}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Results Count */}
                <div className="mt-4 text-gray-600 dark:text-gray-400">
                    Found {filteredCertificates.length} certificates
                </div>
            </motion.div>


            {/* Certificates Grid - SỬ DỤNG currentItems */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map((certificate, index) => ( // Dùng currentItems thay vì filteredCertificates
                    <motion.div
                        key={certificate.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ y: -8 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                    >
                        {/* ... (Nội dung Card: Image, Year Badge, Content) ... */}
                        
                        <div className="relative overflow-hidden h-48">
                            <img
                                src={certificate.image}
                                alt={certificate.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="absolute top-4 right-4">
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {certificate.year}
                                </span>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => setSelectedCertificate(certificate)}
                                    className="w-full bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-white/30 transition-colors"
                                >
                                    <FaEye />
                                    <span>View Details</span>
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {certificate.name}
                                </h3>
                                <FaCertificate className="text-blue-600 dark:text-blue-400 text-xl flex-shrink-0 ml-2" />
                            </div>

                            <div className="flex items-center space-x-2 mb-3 text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Issued by:</span>
                                <span>{certificate.issuer}</span>
                            </div>

                            <div className="flex items-center space-x-2 mb-4 text-gray-600 dark:text-gray-400">
                                <FaCalendarAlt />
                                <span>Year {certificate.year}</span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                                {certificate.description}
                            </p>

                            <div className="flex space-x-2">
                                <motion.button
                                    onClick={() => setSelectedCertificate(certificate)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <FaEye />
                                    <span>View</span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

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

                    {/* Hiển thị các nút số trang */}
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
            
            {/* ... (No Results Message và Modal Details giữ nguyên) ... */}

             {/* No Results Message */}
             {currentItems.length === 0 && filteredCertificates.length > 0 && (
                // Nếu không có mục nào trên trang hiện tại, nhưng tổng cộng có mục (chẳng hạn khi lọc)
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                    No items on this page. Please navigate back.
                </div>
            )}
            {filteredCertificates.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <FaCertificate className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        No certificates found
                    </h3>
                    <p className="text-gray-400 dark:text-gray-500">
                        Try changing the filters or search keywords
                    </p>
                </motion.div>
            )}

            {/* Certificate Details Modal */}
            {selectedCertificate && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedCertificate(null)}
                >
                    {/* ... (Nội dung Modal) ... */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <img
                                src={selectedCertificate.image}
                                alt={selectedCertificate.name}
                                className="w-full h-64 object-cover rounded-t-2xl"
                            />
                            <button
                                onClick={() => setSelectedCertificate(null)}
                                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                            >
                                &times;
                            </button>
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium">
                                    {selectedCertificate.year}
                                </span>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        {selectedCertificate.name}
                                    </h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400">
                                        Issued by: {selectedCertificate.issuer}
                                    </p>
                                </div>
                                <FaCertificate className="text-3xl text-blue-600 dark:text-blue-400" />
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-4">
                                    <FaCalendarAlt />
                                    <span>Issuance Year: {selectedCertificate.year}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {selectedCertificate.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Certificates;