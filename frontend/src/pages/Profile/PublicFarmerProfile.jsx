import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Farmer } from "../../../firebaseFunctions/cropFarmer";

const PublicFarmerProfile = () => {
  const { farmerID } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const fetchedFarmer = await Farmer.getFarmer(farmerID);
        setFarmer(fetchedFarmer);

        const fetchedCrops = await fetchedFarmer.getCrops();
        setCrops(fetchedCrops);
      } catch (error) {
        console.error("Error fetching farmer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, [farmerID]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700">Farmer not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Farmer Info */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {farmer.name}
          </h1>
          <a
            href={"mailto:" + farmer.emailID}
            className="text-green-600 hover:text-green-700 underline"
          >
            {farmer.emailID}
          </a>
        </div>

        {/* Crop Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Available Crops
          </h2>
          {crops.length > 0 ? (
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full bg-white text-left border-collapse">
                <thead className="bg-green-100">
                  <tr>
                    <th className="px-6 py-3 text-gray-700 font-medium uppercase text-sm">
                      Crop Name
                    </th>
                    <th className="px-6 py-3 text-gray-700 font-medium uppercase text-sm">
                      Variety
                    </th>
                    <th className="px-6 py-3 text-gray-700 font-medium uppercase text-sm">
                      Price/kg
                    </th>
                    <th className="px-6 py-3 text-gray-700 font-medium uppercase text-sm">
                      Weight
                    </th>
                    <th className="px-6 py-3 text-gray-700 font-medium uppercase text-sm">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {crops.map((crop) => (
                    <tr
                      key={crop.cropID}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">{crop.cropName}</td>
                      <td className="px-6 py-4">{crop.cropVariety}</td>
                      <td className="px-6 py-4">₹{crop.cropPrice}</td>
                      <td className="px-6 py-4">{crop.cropWeight} kg</td>
                      <td className="px-6 py-4">{crop.cropLocation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-lg">No crops available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicFarmerProfile;
