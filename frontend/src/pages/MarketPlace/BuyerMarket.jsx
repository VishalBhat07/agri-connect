import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  faSeedling,
  faLocationDot,
  faWeightScale,
  faSearch,
  faXmark,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllFarmersCrops } from "../../../firebaseFunctions/cropFarmer";
import { searchFarmerByCrop } from "../../../firebaseFunctions/cropFarmer";
const MotionCard = motion.div;

export default function ModernMarketplace() {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const fetchCrops = async () => {
      const farmersWithCrops = await getAllFarmersCrops();
      const allCrops = farmersWithCrops.flatMap(({ crops }) => crops);
      setCrops(allCrops);
    };
    fetchCrops();
  }, []);

  const filteredCrops = crops.filter((crop) => {
    const search = searchTerm.toLowerCase();
    return (
      crop.cropName.toLowerCase().includes(search) ||
      crop.cropVariety.toLowerCase().includes(search) ||
      crop.cropLocation.toLowerCase().includes(search)
    );
  });

  const getMapUrl = (location) => {
    // Encode the location for use in the URL
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodedLocation},India`;
  };

  const handlePurchaseClick = async (crop) => {
    try {
      const farmer = await searchFarmerByCrop(crop);
      if (farmer) {
        navigate(`/farmer/${farmer.farmerID}`);
      } else {
        console.error("No farmer found for this crop");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
    }
  };

  const CropCard = ({ crop, index }) => (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        rotateY: 5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
      className="bg-white rounded-xl overflow-hidden transform-gpu"
    >
      <motion.div
        className="h-48 bg-gradient-to-br from-green-400 to-emerald-600 relative"
        whileHover={{ scale: 1.05 }}
      >
        <FontAwesomeIcon
          icon={faSeedling}
          className="absolute inset-0 m-auto text-white/20 w-24 h-24"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-4">
          <h3 className="text-xl font-bold text-white">{crop.cropName}</h3>
          <p className="text-white/90">{crop.cropVariety}</p>
        </div>
      </motion.div>

      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-600">
            <FontAwesomeIcon icon={faWeightScale} />
            <span>{crop.cropWeight}kg</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{crop.cropLocation}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-emerald-600">
            Rs. {crop.cropPrice}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCrop(crop)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </MotionCard>
  );

  const CropModal = ({ crop }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setSelectedCrop(null)}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl p-6 w-full max-w-4xl m-4 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setSelectedCrop(null)}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {crop.cropName}
                </h2>
                <p className="text-lg text-gray-600">{crop.cropVariety}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <FontAwesomeIcon icon={faWeightScale} className="w-5 h-5" />
                  <span className="text-lg">{crop.cropWeight} kg</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <FontAwesomeIcon icon={faLocationDot} className="w-5 h-5" />
                  <span className="text-lg">{crop.cropLocation}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <span className="text-2xl font-bold text-emerald-600">
                    Rs. {crop.cropPrice}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePurchaseClick(crop)}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-lg font-medium text-lg"
              >
                Purchase Now
              </motion.button>
            </div>

            <div className="h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                title={`Map showing location of ${crop.cropName}`}
                src={getMapUrl(crop.cropLocation)}
                className="w-full h-full border-0 rounded-lg"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Crop Marketplace
          </motion.h1>
          <p className="text-gray-600 text-lg">
            Discover and purchase fresh crops directly from farmers
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto mb-12 relative"
        >
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 text-lg"
            placeholder="Search by name, variety, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredCrops.length > 0 ? (
              filteredCrops.map((crop, index) => (
                <CropCard key={crop.cropID} crop={crop} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-12"
              >
                <FontAwesomeIcon
                  icon={faLeaf}
                  className="w-16 h-16 text-gray-300 mb-4"
                />
                <p className="text-xl text-gray-500">
                  No crops found matching your search
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {selectedCrop && <CropModal crop={selectedCrop} />}
      </motion.div>
    </div>
  );
}
