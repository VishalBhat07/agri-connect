import React from "react";
import { motion } from "framer-motion";

const resources = [
  {
    title: "Crop Management Fundamentals",
    type: "Video Course",
    description:
      "Comprehensive video series covering basic to advanced crop management techniques, pest control, and yield optimization.",
    duration: "8 hours",
    topics: [
      "Soil Preparation",
      "Crop Rotation",
      "Pest Management",
      "Harvest Techniques",
    ],
    level: "Beginner",
    color: "from-blue-400 to-cyan-600",
  },
  {
    title: "Sustainable Farming Practices",
    type: "Interactive Guide",
    description:
      "Learn about eco-friendly farming methods, organic cultivation, and sustainable resource management.",
    duration: "6 hours",
    topics: [
      "Organic Farming",
      "Water Conservation",
      "Natural Fertilizers",
      "Biodiversity",
    ],
    level: "Intermediate",
    color: "from-teal-400 to-green-600",
  },
  {
    title: "Modern Agricultural Technology",
    type: "Workshop Series",
    description:
      "Explore modern farming technologies, smart irrigation systems, and precision agriculture techniques.",
    duration: "10 hours",
    topics: [
      "Smart Irrigation",
      "Drone Technology",
      "IoT in Agriculture",
      "Data Analytics",
    ],
    level: "Advanced",
    color: "from-indigo-400 to-blue-600",
  },
  {
    title: "Financial Management for Farmers",
    type: "Online Course",
    description:
      "Master financial planning, budgeting, and risk management specifically tailored for agricultural businesses.",
    duration: "5 hours",
    topics: [
      "Budgeting",
      "Risk Management",
      "Credit Planning",
      "Market Analysis",
    ],
    level: "Beginner",
    color: "from-purple-400 to-indigo-600",
  },
  {
    title: "Agricultural Marketing Skills",
    type: "Practical Guide",
    description:
      "Learn effective marketing strategies for agricultural products and direct-to-consumer sales techniques.",
    duration: "4 hours",
    topics: [
      "Market Research",
      "Digital Marketing",
      "Value Chain",
      "Pricing Strategies",
    ],
    level: "Intermediate",
    color: "from-cyan-400 to-blue-600",
  },
  {
    title: "Climate-Smart Agriculture",
    type: "Certificate Course",
    description:
      "Understanding climate change impacts on agriculture and adaptation strategies for sustainable farming.",
    duration: "12 hours",
    topics: [
      "Climate Adaptation",
      "Resilient Crops",
      "Weather Monitoring",
      "Risk Mitigation",
    ],
    level: "Advanced",
    color: "from-green-400 to-teal-600",
  },
];

const ResourceCard = ({ resource, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, rotateY: 5, z: 50 }}
      className="w-full"
    >
      <div className="h-full rounded-2xl shadow-xl overflow-hidden transform-gpu">
        <div className={`p-6 h-full bg-gradient-to-br ${resource.color}`}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">
                {resource.title}
              </h2>
              <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                {resource.level}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-white/90">
              <span>{resource.type}</span>
              <span>•</span>
              <span>{resource.duration}</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mt-4">
              <p className="text-white/90">{resource.description}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                Key Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {resource.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/20 rounded-full text-white text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Start Learning
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Preview
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const LearningResourcesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-100 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            Learning Resources
          </h1>
          <p className="text-xl text-blue-700">
            Enhance your agricultural knowledge with our comprehensive learning
            materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LearningResourcesPage;
