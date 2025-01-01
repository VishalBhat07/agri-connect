import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import { Sprout, LogOut, Settings } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Farmer, Crop } from "../../../firebaseFunctions/cropFarmer";
import Modal from "../MarketPlace/Modal";

export default function FarmerProfile() {
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
  const { userID } = useParams();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
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

  useEffect(() => {
    async function fetchFarmer() {
      try {
        const fetchedFarmer = await Farmer.getFarmer(userID);
        setFarmer(fetchedFarmer);
        return fetchedFarmer;
      } catch (error) {
        console.error("Error fetching farmer details:", error);
        return null;
      }
    }

    async function fetchCrops(farmer) {
      if (!farmer) return;
      try {
        const fetchedCrops = await farmer.getCrops();
        setCrops(fetchedCrops);
      } catch (error) {
        console.error("Error fetching farmer crops:", error);
      }
    }

    fetchFarmer().then(fetchCrops);
  }, [userID]);

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

  const deleteCrop = async (crop) => {
    if (!farmer) return;
    try {
      await farmer.deleteCrop(crop.cropID);
      const fetchedCrops = await farmer.getCrops();
      setCrops(fetchedCrops);
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  const TableRow = ({ crop }) => {

    return (
      <motion.tr
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
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-green-500 px-8 py-12 text-center">
          <Sprout className="w-24 h-24 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Farmer Dashboard
          </h2>
          <span className="text-green-100">Farmer ID: {userID}</span>
        </div>

        <div className="p-8">
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
                  <TableRow key={crop.cropID} crop={crop} />
                ))}
              </tbody>
            </table>
          </div>

          <Modal
            isModalOpen={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handleCropSubmit}
            cropData={cropData}
            setCropData={setCropData}
            editingCrop={editingCrop}
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t">
            <button className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Settings className="w-5 h-5" />
              Account Settings
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}