import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { Farmer, Crop } from "../../../firebaseFunctions/cropFarmer";
import Modal from "./Modal"; // Import the Modal component

const FarmerMarket = ({ farmerID }) => {
  const [farmer, setFarmer] = useState(null);
  const [crops, setCrops] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [cropData, setCropData] = useState({
    cropName: "",
    cropVariety: "",
    cropPrice: "",
    cropWeight: "",
    cropLocation: "",
  });

  useEffect(() => {
    async function fetchFarmer() {
      try {
        const fetchedFarmer = await Farmer.getFarmer(farmerID);
        setFarmer(fetchedFarmer);
        return fetchedFarmer;
      } catch (error) {
        console.error("Error fetching farmer details", error);
        return null;
      }
    }

    async function fetchCrops(farmer) {
      if (!farmer) return;
      try {
        const fetchedCrops = await farmer.getCrops();
        setCrops(
          fetchedCrops.map((crop) => ({
            ...crop,
            minPrice: crop.minPrice || 0,
            maxPrice: crop.maxPrice || 0,
            avgPrice: crop.avgPrice || 0,
          }))
        );
      } catch (error) {
        console.error("Error fetching farmer crops", error);
      }
    }

    fetchFarmer().then(fetchCrops);
  }, [farmerID]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCrop(null);
    setCropData({
      cropName: "",
      cropVariety: "",
      cropPrice: "",
      cropWeight: "",
      cropLocation: "",
    });
  };

  const handleCropSubmit = async (e) => {
    e.preventDefault();
    if (!farmer) return;

    try {
      const crop = new Crop(
        cropData.cropName,
        cropData.cropVariety,
        parseFloat(cropData.cropPrice),
        parseFloat(cropData.cropWeight),
        cropData.cropLocation
      );

      if (editingCrop) {
        crop.cropID = editingCrop.cropID;
        await farmer.updateCrop(crop);
      } else {
        await farmer.addCrop(crop);
      }

      const fetchedCrops = await farmer.getCrops();
      setCrops(fetchedCrops);
      handleModalClose();
    } catch (error) {
      console.error("Error saving crop:", error);
    }
  };

  const deleteCrop = async (crop) => {
    if (!farmer) return;

    try {
      await farmer.deleteCrop(crop.cropID);
      const fetchedCrops = await farmer.getCrops();
      setCrops(
        fetchedCrops.map((crop) => ({
          ...crop,
          minPrice: crop.minPrice || 0,
          maxPrice: crop.maxPrice || 0,
          avgPrice: crop.avgPrice || 0,
        }))
      );
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  function TableRow({ crop }) {
    const [predictedPrices, setPredictedPrices] = useState({
      minPrice: 0,
      maxPrice: 0,
      modalPrice: 0,
    });
    useEffect(() => {
      // Extract district from location (assuming format like "District, State")
      const getDistrict = (location) => {
        if (!location) return "";
        return location.split(",")[0].trim();
      };

      const fetchPrediction = async () => {
        try {
          const requestData = {
            district: getDistrict(crop.cropLocation),
            commodity: crop.cropName,
            variety: crop.cropVariety,
            month: new Date().toLocaleString("default", { month: "long" }), // Current month name
          };

          const response = await fetch("http://localhost:5174/predict", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          });

          const data = await response.json();
          console.log(data);

          if (data.success) {
            setPredictedPrices({
              minPrice: data.predictions.min_price,
              maxPrice: data.predictions.max_price,
              modalPrice: data.predictions.modal_price,
            });
          } else {
            console.error("Prediction failed:", data.error);
          }
        } catch (error) {
          console.error("Error making prediction:", error);
        }
      };

      fetchPrediction();
    }, [crop]);

    return (
      <motion.tr
        key={crop.cropID}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="hover:bg-gray-50"
      >
        <td className="px-6 py-4">{crop.cropName}</td>
        <td className="px-6 py-4">{crop.cropVariety}</td>
        <td className="px-6 py-4">₹{crop.cropPrice}</td>
        <td className="px-6 py-4">
          ₹{Math.floor(predictedPrices.minPrice) / 100}
        </td>
        <td className="px-6 py-4">
          ₹{Math.floor(predictedPrices.maxPrice) / 100}
        </td>
        <td className="px-6 py-4">
          ₹{Math.floor(predictedPrices.modalPrice) / 100}
        </td>

        <td className="px-6 py-4">{crop.cropWeight} kg</td>
        <td className="px-6 py-4">{crop.cropLocation}</td>
        <td className="px-6 py-4">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setEditingCrop(crop);
                setCropData(crop);
                setIsModalOpen(true);
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              <FontAwesomeIcon icon={faPen} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => deleteCrop(crop)}
              className="text-red-600 hover:text-red-800"
            >
              <FontAwesomeIcon icon={faTrash} />
            </motion.button>
          </div>
        </td>
      </motion.tr>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FontAwesomeIcon icon={faLeaf} className="text-green-600" />
            Crop Manager
          </h1>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crop Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variety
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price/kg
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Max Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {crops.map((crop) => (
                <TableRow key={crop.cropID} crop={crop} />
              ))}

              <motion.tr
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <td colSpan="9" className="px-6 py-4">
                  <div className="flex justify-center items-center text-green-600 hover:text-green-700">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add New Crop
                  </div>
                </td>
              </motion.tr>
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleCropSubmit}
        cropData={cropData}
        setCropData={setCropData}
        editingCrop={editingCrop}
      />
    </div>
  );
};

export default FarmerMarket;
