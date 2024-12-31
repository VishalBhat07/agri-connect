import React from "react";
import { useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import { ShoppingCart, LogOut, Settings } from "lucide-react";

export default function BuyerProfile() {
  const { userID } = useParams(); // Get buyerID from the URL

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
        <div className="bg-blue-500 px-8 py-12 text-center">
          <ShoppingCart className="w-24 h-24 text-white mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Buyer Dashboard
          </h2>
          <span className="text-blue-100">Buyer ID: {userID}</span>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
              <ShoppingCart className="w-6 h-6 text-blue-500" />
              <h3>Recent Orders</h3>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">
                Track your purchases and history
              </h4>
              <p className="text-gray-600">
                View your recent orders and their statuses.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t">
            <button className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
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
