import React from "react";
import { motion } from "framer-motion";

const schemes = [
  {
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    description:
      "A scheme that provides financial assistance to farmers for purchasing agricultural inputs and other needs.",
    eligibility:
      "Small and marginal farmers who own cultivable land of up to 2 hectares.",
    benefits:
      "₹6,000 annually, paid in three equal installments, directly to the bank account of the farmer.",
    color: "from-green-400 to-emerald-600",
    link: "https://pmkisan.gov.in/", // Link to PM-KISAN official site
  },
  {
    name: "National Mission on Agricultural Extension and Technology",
    description:
      "Focuses on improving the productivity and income of farmers through various agricultural extension services.",
    eligibility:
      "Farmers, particularly those in underserved areas, requiring capacity building in farming techniques.",
    benefits:
      "Training on advanced farming techniques, provision of subsidies for adopting new technologies.",
    color: "from-teal-400 to-green-600",
    link: "https://www.agricoop.nic.in/en/schemes/national-mission-agricultural-extension-and-technology", // Link to official site
  },
  {
    name: "Fasal Bima Yojana",
    description:
      "Provides insurance coverage to farmers for losses due to natural calamities or pests affecting crops.",
    eligibility:
      "Farmers growing notified crops, with insurance premiums based on the type of crop and geographical area.",
    benefits:
      "Coverage for crop losses, with a minimal premium contribution from the farmer, especially in disaster-hit areas.",
    color: "from-emerald-400 to-teal-600",
    link: "https://pmfby.gov.in/", // Link to Fasal Bima Yojana official site
  },
  {
    name: "Soil Health Management Scheme",
    description:
      "Aims to improve soil health through soil testing and providing recommendations to farmers for better agricultural practices.",
    eligibility:
      "Farmers across the country, especially those with soil degradation issues.",
    benefits:
      "Free soil testing and recommendations on crop rotation, fertilizers, and other practices to improve soil health.",
    color: "from-green-500 to-emerald-700",
    link: "https://www.agricoop.nic.in/en/schemes/soil-health-management", // Link to official site
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana",
    description:
      "Provides insurance coverage for farmers against crop loss due to natural calamities.",
    eligibility: "All farmers growing notified crops are eligible.",
    benefits:
      "Premium coverage for crops, reduced premiums for farmers in disaster-prone areas.",
    color: "from-teal-500 to-green-700",
    link: "https://pmfby.gov.in/", // Link to PMFBY official site
  },
  {
    name: "Rashtriya Krishi Vikas Yojana",
    description:
      "Focuses on enhancing farm productivity through integrated development and investment.",
    eligibility:
      "State governments are the primary beneficiaries. Farmers can indirectly benefit.",
    benefits:
      "Infrastructure development, technology upgrades, and more accessible resources for farmers.",
    color: "from-emerald-500 to-teal-700",
    link: "https://www.agricoop.nic.in/en/schemes/rashtriya-krishi-vikas-yojana", // Link to official site
  },
];

const SchemeCard = ({ scheme, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, rotateY: 5, zIndex: 50 }}
      className="w-full"
    >
      <div className="h-full rounded-2xl shadow-xl overflow-hidden transform-gpu">
        <div className={`p-6 h-full bg-gradient-to-br ${scheme.color}`}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {scheme.name}
            </h2>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Description
                </h3>
                <p className="text-white/90">{scheme.description}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Eligibility
                </h3>
                <p className="text-white/90">{scheme.eligibility}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Benefits
                </h3>
                <p className="text-white/90">{scheme.benefits}</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 px-6 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              onClick={() => window.open(scheme.link, "_blank")} // Opens scheme link in a new tab
            >
              Apply Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const SchemesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-5xl font-bold text-center text-green-800 mb-16">
          Government Schemes for Farmers
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schemes.map((scheme, index) => (
            <SchemeCard key={index} scheme={scheme} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SchemesPage;