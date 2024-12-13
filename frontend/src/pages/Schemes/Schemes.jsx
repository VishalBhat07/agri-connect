import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faClipboardList,
  faHandHoldingUsd,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

// Hardcoded data for government schemes
const schemes = [
  {
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    description:
      "A scheme that provides financial assistance to farmers for purchasing agricultural inputs and other needs.",
    eligibility:
      "Small and marginal farmers who own cultivable land of up to 2 hectares.",
    benefits:
      "₹6,000 annually, paid in three equal installments, directly to the bank account of the farmer.",
    icon: faHandHoldingUsd,
  },
  {
    name: "National Mission on Agricultural Extension and Technology (NMAET)",
    description:
      "Focuses on improving the productivity and income of farmers through various agricultural extension services.",
    eligibility:
      "Farmers, particularly those in underserved areas, requiring capacity building in farming techniques.",
    benefits:
      "Training on advanced farming techniques, provision of subsidies for adopting new technologies.",
    icon: faClipboardList,
  },
  {
    name: "Fasal Bima Yojana (Crop Insurance Scheme)",
    description:
      "Provides insurance coverage to farmers for losses due to natural calamities or pests affecting crops.",
    eligibility:
      "Farmers growing notified crops, with insurance premiums based on the type of crop and geographical area.",
    benefits:
      "Coverage for crop losses, with a minimal premium contribution from the farmer, especially in disaster-hit areas.",
    icon: faInfoCircle,
  },
  {
    name: "Soil Health Management Scheme",
    description:
      "Aims to improve soil health through soil testing and providing recommendations to farmers for better agricultural practices.",
    eligibility:
      "Farmers across the country, especially those with soil degradation issues.",
    benefits:
      "Free soil testing and recommendations on crop rotation, fertilizers, and other practices to improve soil health.",
    icon: faClipboardList,
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description:
      "Provides insurance coverage for farmers against crop loss due to natural calamities.",
    eligibility: "All farmers growing notified crops are eligible.",
    benefits:
      "Premium coverage for crops, reduced premiums for farmers in disaster-prone areas.",
    icon: faHandHoldingUsd,
  },
  {
    name: "Rashtriya Krishi Vikas Yojana (RKVY)",
    description:
      "Focuses on enhancing farm productivity through integrated development and investment.",
    eligibility:
      "State governments are the primary beneficiaries. Farmers can indirectly benefit.",
    benefits:
      "Infrastructure development, technology upgrades, and more accessible resources for farmers.",
    icon: faInfoCircle,
  },
];

function Schemes() {
  const [expandedScheme, setExpandedScheme] = useState(null);

  const toggleSchemeDetails = (index) => {
    setExpandedScheme(expandedScheme === index ? null : index);
  };

  return (
    <div className="min-h-[85vh] p-8 bg-green-100 w-full mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Government Schemes for Farmers
        </div>
        <div className="space-y-6">
          {schemes.map((scheme, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden"
            >
              <div
                onClick={() => toggleSchemeDetails(index)}
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-green-50 transition"
              >
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon
                    icon={scheme.icon}
                    className="text-3xl text-green-600"
                  />
                  <h2 className="text-2xl font-semibold text-green-700">
                    {scheme.name}
                  </h2>
                </div>
                <FontAwesomeIcon
                  icon={expandedScheme === index ? faChevronUp : faChevronDown}
                  className="text-green-600"
                />
              </div>

              {expandedScheme === index && (
                <div className="p-6 bg-green-50 border-t-2 border-green-200 animate-fade-in">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-green-800 mb-2">
                        Description
                      </h3>
                      <p className="text-gray-700">{scheme.description}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-green-800 mb-2">
                        Eligibility
                      </h3>
                      <p className="text-gray-700">{scheme.eligibility}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-green-800 mb-2">
                        Benefits
                      </h3>
                      <p className="text-gray-700">{scheme.benefits}</p>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                      Apply Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schemes;
