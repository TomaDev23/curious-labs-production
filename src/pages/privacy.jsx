/**
 * 🛡️ KEEP - PRIVACY POLICY PAGE
 * Code: PRIVACY-001
 * Route: /privacy
 * Features: Legal disclaimer, privacy policy, data handling information
 * Type: Legal/Compliance Page
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from '../FramerProvider';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import BackgroundLayerAtomic from '../components/atomic/BackgroundLayerAtomic';
import ScrollToTop from '../components/ScrollToTop';

const Privacy = () => {
  const lastUpdated = "December 2024";

  const sections = [
    {
      title: "Information We Collect",
      content: [
        "We collect information you provide directly to us, such as when you create an account, use our services, or contact us.",
        "We automatically collect certain information about your device when you use our services, including your IP address, browser type, and usage patterns.",
        "We may collect information from third-party sources to enhance our services and provide better user experiences."
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide, maintain, and improve our services and products.",
        "To process transactions and send related information.",
        "To send technical notices, updates, security alerts, and support messages.",
        "To respond to your comments, questions, and customer service requests.",
        "To monitor and analyze trends, usage, and activities in connection with our services."
      ]
    },
    {
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.",
        "We may share information in response to legal requests or to protect our rights.",
        "We may share aggregated, non-personally identifiable information publicly or with our partners."
      ]
    },
    {
      title: "Data Security",
      content: [
        "We implement appropriate security measures to protect your personal information.",
        "We use encryption and secure protocols to safeguard data transmission.",
        "We regularly review and update our security practices to maintain protection standards."
      ]
    },
    {
      title: "Your Rights",
      content: [
        "You have the right to access, update, or delete your personal information.",
        "You can opt out of certain communications from us.",
        "You may request a copy of the personal information we hold about you."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ScrollToTop />
      <MissionControlNavbar />
      <BackgroundLayerAtomic />
      
      <Helmet>
        <title>Privacy Policy | CuriousLabs</title>
        <meta name="description" content="Privacy Policy and Legal Disclaimer for CuriousLabs. Learn how we protect and handle your data." />
        <meta property="og:title" content="Privacy Policy | CuriousLabs" />
        <meta property="og:description" content="Privacy Policy and Legal Disclaimer for CuriousLabs. Learn how we protect and handle your data." />
      </Helmet>

      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <motion.div 
          className="container mx-auto px-6 py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400"></div>
                <span className="text-purple-400 font-mono text-sm tracking-wider">LEGAL-001</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400"></div>
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Privacy Policy
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your privacy and data security are fundamental to our mission. Learn how we protect and handle your information.
            </motion.p>

            <motion.div
              className="mt-6 text-sm text-gray-400 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Last Updated: {lastUpdated}
            </motion.div>
          </div>
        </motion.div>

        {/* Legal Disclaimer */}
        <motion.div 
          className="container mx-auto px-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-6 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚠️</span>
              <h2 className="text-xl font-bold text-red-400">Legal Disclaimer</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p>
                <strong>CuriousLabs</strong> provides AI-powered development tools and services. By using our services, you acknowledge that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Our AI tools are designed to assist in development but should not replace human judgment and expertise.</li>
                <li>All generated code, suggestions, and outputs should be reviewed and tested before production use.</li>
                <li>We are not liable for any damages resulting from the use of our AI-generated content or tools.</li>
                <li>Our services are provided "as is" without warranties of any kind, express or implied.</li>
                <li>You are responsible for ensuring compliance with applicable laws and regulations in your jurisdiction.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Privacy Policy Sections */}
        <div className="container mx-auto px-6 pb-20">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            className="max-w-4xl mx-auto mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us.
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Contact Us</span>
                <span>→</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 