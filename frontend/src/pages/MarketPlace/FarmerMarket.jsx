import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faTimes,
  faCheck,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { Farmer, Crop } from "../../../firebaseFunctions/cropFarmer";

const Modal = ({
  isModalOpen,
  onClose,
  onSubmit,
  cropData,
  setCropData,
  editingCrop,
}) => (
  <AnimatePresence>
    {isModalOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {editingCrop ? "Edit Crop" : "Add New Crop"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {[
              { name: "cropName", label: "Crop Name" },
              { name: "cropVariety", label: "Variety" },
              { name: "cropPrice", label: "Price per kg", type: "number" },
              { name: "cropWeight", label: "Weight in kg", type: "number" },
              { name: "cropLocation", label: "Location" },
            ].map(({ name, label, type }) => (
              <input
                key={name}
                type={type || "text"}
                name={name}
                placeholder={label}
                value={cropData[name]}
                onChange={(e) =>
                  setCropData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                {...(type === "number" ? { min: "0", step: "0.01" } : {})}
              />
            ))}

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {editingCrop ? "Save Changes" : "Add Crop"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

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
        setCrops(fetchedCrops || []);
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
      if (editingCrop) {
        const updatedCrop = new Crop(
          cropData.cropName,
          cropData.cropVariety,
          parseFloat(cropData.cropPrice),
          parseFloat(cropData.cropWeight),
          cropData.cropLocation
        );
        updatedCrop.cropID = editingCrop.cropID;
        await farmer.updateCrop(updatedCrop);
      } else {
        const newCrop = new Crop(
          cropData.cropName,
          cropData.cropVariety,
          parseFloat(cropData.cropPrice),
          parseFloat(cropData.cropWeight),
          cropData.cropLocation
        );
        await farmer.addCrop(newCrop);
      }

      const fetchedCrops = await farmer.getCrops();
      setCrops(fetchedCrops || []);
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
      setCrops(fetchedCrops || []);
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

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
              ))}
              <motion.tr
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <td colSpan="6" className="px-6 py-4">
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