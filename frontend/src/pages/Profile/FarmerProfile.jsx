import React from "react";
import { useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import { Sprout, LogOut, Settings } from "lucide-react";

export default function FarmerProfile() {
  const { userID } = useParams(); // Get farmerID from the URL

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-green-500 px-8 py-12 text-center">
          <Sprout className="w-24 h-24 text-white mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Farmer Dashboard
          </h2>
          <span className="text-green-100">Farmer ID: {userID}</span>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
              <Sprout className="w-6 h-6 text-green-500" />
              <h3>Active Listings</h3>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">
                Manage your crop listings and orders
              </h4>
              <p className="text-gray-600">
                Add, update, and track the performance of your listings.
              </p>
            </div>
          </div>

          {/* Actions */}
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
