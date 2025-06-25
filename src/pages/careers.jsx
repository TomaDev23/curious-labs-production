/**
 * 🛡️ KEEP - CAREERS PAGE
 * Code: CAREERS-001
 * Route: /careers
 * Features: Job opportunities, company culture, application process
 * Type: Recruitment/HR Page
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from '../FramerProvider';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import BackgroundLayerAtomic from '../components/atomic/BackgroundLayerAtomic';
import ScrollToTop from '../components/ScrollToTop';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const jobOpenings = [
    {
      id: 'CAR-001',
      title: 'Senior AI Engineer',
      department: 'engineering',
      location: 'Phnom Penh',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead the development of our next-generation AI systems and machine learning pipelines.',
      requirements: [
        'Expert knowledge in Python, TensorFlow, PyTorch',
        'Experience with large-scale ML systems',
        'Strong background in NLP and computer vision',
        'PhD in Computer Science or related field preferred'
      ],
      status: 'ACTIVE'
    },
    {
      id: 'CAR-002',
      title: 'Full-Stack Developer',
      department: 'engineering',
      location: 'Phnom Penh',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Build and maintain our web applications using modern technologies and frameworks.',
      requirements: [
        'Proficiency in React, Node.js, TypeScript',
        'Experience with cloud platforms (AWS, GCP)',
        'Knowledge of database systems (PostgreSQL, MongoDB)',
        'Understanding of DevOps practices'
      ],
      status: 'ACTIVE'
    },
    {
      id: 'CAR-003',
      title: 'Product Designer',
      department: 'design',
      location: 'Phnom Penh',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Design intuitive and beautiful user experiences for our AI-powered development tools.',
      requirements: [
        'Expert in Figma, Sketch, Adobe Creative Suite',
        'Strong portfolio of web and mobile designs',
        'Experience with design systems and prototyping',
        'Understanding of user research methodologies'
      ],
      status: 'ACTIVE'
    },
    {
      id: 'CAR-004',
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'Phnom Penh',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Manage our cloud infrastructure and deployment pipelines for scalable AI systems.',
      requirements: [
        'Expertise in Kubernetes, Docker, Terraform',
        'Experience with CI/CD pipelines',
        'Knowledge of monitoring and logging systems',
        'Security best practices for cloud environments'
      ],
      status: 'ACTIVE'
    },
    {
      id: 'CAR-005',
      title: 'Data Scientist',
      department: 'research',
      location: 'Phnom Penh',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Analyze complex datasets to drive insights and improve our AI model performance.',
      requirements: [
        'Strong background in statistics and machine learning',
        'Proficiency in Python, R, SQL',
        'Experience with data visualization tools',
        'PhD in Statistics, Mathematics, or related field preferred'
      ],
      status: 'COMING_SOON'
    }
  ];

  const departments = [
    { id: 'all', name: 'All Departments', count: jobOpenings.length },
    { id: 'engineering', name: 'Engineering', count: jobOpenings.filter(job => job.department === 'engineering').length },
    { id: 'design', name: 'Design', count: jobOpenings.filter(job => job.department === 'design').length },
    { id: 'research', name: 'Research', count: jobOpenings.filter(job => job.department === 'research').length }
  ];

  const companyValues = [
    {
      icon: '🚀',
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible with AI and development tools.'
    },
    {
      icon: '🤝',
      title: 'Collaborative Spirit',
      description: 'We believe the best solutions come from diverse perspectives working together.'
    },
    {
      icon: '🎯',
      title: 'User-Centric',
      description: 'Every decision we make is guided by how it impacts our users\' experience.'
    },
    {
      icon: '🌱',
      title: 'Continuous Learning',
      description: 'We invest in our team\'s growth and encourage experimentation.'
    }
  ];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === selectedDepartment);

  const getStatusColor = (status) => {
    return status === 'ACTIVE' ? 'text-green-400' : 'text-yellow-400';
  };

  const getStatusText = (status) => {
    return status === 'ACTIVE' ? 'HIRING NOW' : 'COMING SOON';
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ScrollToTop />
      <MissionControlNavbar />
      <BackgroundLayerAtomic />
      
      <Helmet>
        <title>Careers | CuriousLabs</title>
        <meta name="description" content="Join the CuriousLabs team and help build the future of AI-powered development tools. Explore career opportunities and our company culture." />
        <meta property="og:title" content="Careers | CuriousLabs" />
        <meta property="og:description" content="Join the CuriousLabs team and help build the future of AI-powered development tools. Explore career opportunities and our company culture." />
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
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
                <span className="text-blue-400 font-mono text-sm tracking-wider">CAREERS-001</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Join Our Mission
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Help us build the future of AI-powered development tools. Join a team of curious minds pushing the boundaries of what's possible.
            </motion.p>
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div 
          className="container mx-auto px-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Job Openings */}
        <div className="container mx-auto px-6 pb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-gray-300">Find your next opportunity with us</p>
          </motion.div>

          {/* Department Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedDepartment === dept.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {dept.name} ({dept.count})
              </button>
            ))}
          </motion.div>

          {/* Job Listings */}
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span>📍 {job.location}</span>
                      <span>💼 {job.type}</span>
                      <span>⏱️ {job.experience}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono ${getStatusColor(job.status)} bg-gray-800/50`}>
                      {getStatusText(job.status)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{job.description}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start gap-2 text-gray-300">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    job.status === 'ACTIVE'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={job.status === 'ACTIVE' ? { scale: 1.05 } : {}}
                  whileTap={job.status === 'ACTIVE' ? { scale: 0.95 } : {}}
                  disabled={job.status !== 'ACTIVE'}
                >
                  {job.status === 'ACTIVE' ? 'Apply Now' : 'Coming Soon'}
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            className="max-w-4xl mx-auto mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Don't See Your Role?</h2>
              <p className="text-gray-300 mb-6">
                We're always looking for talented individuals to join our team. Send us your resume and let us know how you'd like to contribute!
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get In Touch</span>
                <span>→</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Careers; 