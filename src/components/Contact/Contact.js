import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaPaperPlane } from 'react-icons/fa';
import { personalInfo } from '../../data';
import emailService from '../../services/emailService';
import './Contact.scss';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        try {
            // Validate form data
            if (!formData.name || !formData.email || !formData.message) {
                throw new Error('Please fill in all required fields (Name, Email, Message).');
            }
            
            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error('Please enter a valid email address.');
            }
            
            // Send email via EmailJS
            // Giả định emailService.sendContactEmail đã được cấu hình đúng
            const result = await emailService.sendContactEmail(formData);
            
            if (result.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setSubmitStatus('error');
                console.error('Email sending failed:', result.message);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            
            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    const contactMethods = [
        {
            icon: FaEnvelope,
            label: 'Email',
            value: personalInfo.contact.email,
            href: `mailto:${personalInfo.contact.email}`,
            color: 'text-red-500',
            bgColor: 'bg-red-100 dark:bg-red-900/30'
        },
        {
            icon: FaPhone,
            label: 'Phone',
            value: personalInfo.contact.phone,
            href: `tel:${personalInfo.contact.phone}`,
            color: 'text-green-500',
            bgColor: 'bg-green-100 dark:bg-green-900/30'
        },
        {
            icon: FaMapMarkerAlt,
            label: 'Location',
            value: personalInfo.contact.location,
            href: '#',
            color: 'text-blue-500',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30'
        },
        {
            icon: FaFacebook,
            label: 'Facebook',
            value: personalInfo.contact.facebook,
            href: `https://www.facebook.com/${personalInfo.contact.facebook}`, // Sử dụng link Facebook chuẩn
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30'
        }
    ];

    return (
        <div className="contact-page">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Contact{" "}
                    <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Me
                    </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    I'm always open to discussing new project collaborations, internship opportunities, or simply chatting about technology.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
                
                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Contact Information
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Feel free to reach out via the methods below. I typically respond to emails within 24 hours.
                        </p>
                    </div>

                    {/* Contact Methods */}
                    <div className="space-y-4">
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={index}
                                href={method.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ x: 8 }}
                                className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className={`p-3 rounded-lg ${method.bgColor}`}>
                                    <method.icon className={`text-xl ${method.color}`} />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {method.label}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                                        {method.value}
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Send a Message
                    </h2>

                    {submitStatus === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-lg"
                        >
                            ✅ Message sent successfully! I will respond as soon as possible.
                        </motion.div>
                    )}

                    {submitStatus === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-lg"
                        >
                            ❌ An error occurred while sending the message. Please try again or contact me directly via email.
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Subject *
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                                placeholder="Subject of your message"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Message *
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-colors duration-200"
                                placeholder="Enter your message here..."
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800'
                            } text-white`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <FaPaperPlane />
                                    <span>Send Message</span>
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;