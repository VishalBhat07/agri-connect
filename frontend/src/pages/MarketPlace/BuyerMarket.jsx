import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWeightHanging,
  faXmark,
  faLocationDot,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { getAllFarmersCrops } from "../../../firebaseFunctions/cropFarmer";

export default function BuyerMarket() {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const CropModal = ({ crop, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded-lg"></div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{crop.cropName}</h2>
            <p className="text-gray-600">Variety: {crop.cropVariety}</p>
            <div className="flex items-center text-gray-700">
              <FontAwesomeIcon
                icon={faWeightHanging}
                className="w-4 h-4 mr-2"
              />
              <span>{crop.cropWeight} kg</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 mr-2" />
              <span>{crop.cropLocation}</span>
            </div>
            <p className="text-2xl font-bold">${crop.cropPrice}</p>
            <Button gradientDuoTone="greenToBlue" className="w-full">
              Confirm Purchase
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const CropCard = ({ crop }) => (
    <div className="w-full h-96 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-4/5">
        <div className="absolute w-full bg-gray-200 py-2 text-center">
          <h5 className="text-xl font-bold text-black">{crop.cropName}</h5>
        </div>
        <div className="h-full bg-gray-200"></div>
        <div className="absolute bottom-0 w-full flex justify-between items-center bg-gray-200 bg-opacity-50 p-2">
          <span className="text-black">{crop.cropVariety}</span>
          <span className="text-black font-bold">${crop.cropPrice}</span>
        </div>
      </div>
      <div className="h-1/5 flex justify-between items-center px-4">
        <div className="flex items-center text-gray-700">
          <FontAwesomeIcon icon={faWeightHanging} className="w-4 h-4 mr-2" />
          <span>{crop.cropWeight} kg</span>
        </div>
        <div className="flex items-center text-gray-700">
          <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 mr-2" />
          <span>{crop.cropLocation}</span>
        </div>
        <Button
          gradientDuoTone="greenToBlue"
          onClick={() => setSelectedCrop(crop)}
        >
          Buy
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Crop Marketplace</h1>

      <div className="max-w-md mx-auto mb-8 relative">
        <div className="relative">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name, variety, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCrops.length > 0 ? (
          filteredCrops.map((crop) => (
            <CropCard key={crop.cropID} crop={crop} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500 text-lg">
            No crops found matching your search
          </div>
        )}
      </div>

      {selectedCrop && (
        <CropModal crop={selectedCrop} onClose={() => setSelectedCrop(null)} />
      )}
    </div>
  );
}
