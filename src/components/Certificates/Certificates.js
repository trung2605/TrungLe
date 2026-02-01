import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaCertificate, FaEye, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { certificates } from '../../data';
import './Certificates.scss';

const ITEMS_PER_PAGE = 9;

const Certificates = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const years = ['all', ...new Set(certificates.map(cert => cert.year))].sort((a, b) => {
        if (a === 'all') return -1;
        if (b === 'all') return 1;
        return b - a;
    });

    const filteredCertificates = certificates.filter(cert => {
        const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            cert.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = selectedYear === 'all' || cert.year === selectedYear;
        return matchesSearch && matchesYear;
    });

    const totalPages = Math.ceil(filteredCertificates.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    const currentItems = filteredCertificates.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
    };

    return (
        <div className="certificates-page">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Certificates &{' '}
                    <span className="text-gradient bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent glitch-wrapper">
                         Achievements
                    </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    A comprehensive list of certifications and achievements gained throughout my learning and development journey.
                </p>
            </motion.div>

            {/* Search and Filter Controls */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-12 max-w-4xl mx-auto"
            >
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-2">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400 text-lg" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, issuer, or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-12 pr-4 py-4 bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-500 focus:ring-0 text-lg"
                        />
                         <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                {filteredCertificates.length} Results
                            </span>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-100 dark:border-gray-700 mx-4"></div>

                    {/* Year Filters */}
                    <div className="p-2 overflow-x-auto scrollbar-hide">
                         <div className="flex items-center space-x-2 min-w-max pb-2">
                            <span className="text-sm font-medium text-gray-400 px-2 lg:hidden">Year:</span>
                            {years.map(year => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                                        selectedYear === year
                                            ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md transform scale-105'
                                            : 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {year === 'all' ? 'All Years' : year}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Certificates Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map((certificate, index) => (
                    <motion.div
                        key={certificate.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ 
                            y: -10,
                            rotateX: 5,
                            scale: 1.02,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                        }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group perspective-1000 border border-gray-100 dark:border-gray-700"
                    >
                        <div className="relative overflow-hidden h-52">
                            <img
                                src={certificate.image}
                                alt={certificate.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="absolute top-4 right-4 translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                <span className="bg-blue-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                    {certificate.year}
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 flex justify-center">
                                <button
                                    onClick={() => setSelectedCertificate(certificate)}
                                    className="bg-white/20 backdrop-blur-md text-white py-2 px-6 rounded-full flex items-center space-x-2 hover:bg-white/30 transition-all border border-white/30"
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
                                <FaCertificate className="text-blue-600 dark:text-blue-400 text-xl flex-shrink-0 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                            </div>

                            <div className="flex items-center space-x-2 mb-3 text-gray-600 dark:text-gray-400 text-sm">
                                <span className="font-semibold text-gray-400 uppercase tracking-wider text-xs">Issued by</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">{certificate.issuer}</span>
                            </div>

                            <div className="flex items-center space-x-2 mb-4 text-gray-500 dark:text-gray-500 text-sm">
                                <FaCalendarAlt />
                                <span>{certificate.year}</span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 h-10">
                                {certificate.description}
                            </p>

                            <motion.button
                                onClick={() => setSelectedCertificate(certificate)}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-md"
                            >
                                <span>Learn More</span>
                                <FaChevronRight className="text-xs" />
                            </motion.button>
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
                        className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors shadow-sm"
                    >
                        <FaChevronLeft />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                currentPage === page
                                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors shadow-sm"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}
            
             {/* No Results Message */}
             {currentItems.length === 0 && filteredCertificates.length > 0 && (
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
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedCertificate(null)}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-gray-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <img
                                src={selectedCertificate.image}
                                alt={selectedCertificate.name}
                                className="w-full h-72 object-cover rounded-t-3xl"
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <button
                                onClick={() => setSelectedCertificate(null)}
                                className="absolute top-4 right-4 bg-black/30 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/50 transition-colors border border-white/20"
                            >
                                &times;
                            </button>
                            <div className="absolute bottom-6 left-6">
                                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg">
                                    {selectedCertificate.year}
                                </span>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                                        {selectedCertificate.name}
                                    </h2>
                                    <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                                        @ {selectedCertificate.issuer}
                                    </p>
                                </div>
                                <FaCertificate className="text-4xl text-gray-200 dark:text-gray-700" />
                            </div>

                            <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                    {selectedCertificate.description}
                                </p>
                            </div>

                             <div className="flex items-center justify-between text-gray-500 text-sm">
                                <span>Certificate ID: #CERT-{selectedCertificate.id}</span>
                                <div className="flex items-center space-x-2">
                                    <FaCalendarAlt />
                                    <span>Issued: {selectedCertificate.year}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Certificates;