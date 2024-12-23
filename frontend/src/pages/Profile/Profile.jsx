import React, { useEffect, useState } from "react";
import { auth } from "../../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  UserCircle,
  LogOut,
  Edit,
  Sprout,
  ShoppingCart,
  Mail,
  Settings,
} from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRole = currentUser?.uid === "farmerUID" ? "farmer" : "buyer";
        setUserRole(userRole);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleProfileUpdate = () => {
    alert("Update your profile information!");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-green-500 px-8 py-12 text-center">
          <div className="relative inline-block">
            <UserCircle className="w-24 h-24 text-white mb-4" />
            <button
              onClick={handleProfileUpdate}
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <Edit className="w-4 h-4 text-green-500" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {user.displayName || "User"}
          </h2>
          <div className="flex items-center justify-center text-green-100 gap-2">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          {/* Role Specific Content */}
          <div className="mb-8">
            {userRole === "farmer" ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                  <Sprout className="w-6 h-6 text-green-500" />
                  <h3>Farmer Dashboard</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Active Listings
                    </h4>
                    <p className="text-gray-600">
                      Manage your crop listings and orders
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Analytics
                    </h4>
                    <p className="text-gray-600">
                      View your sales and performance metrics
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                  <ShoppingCart className="w-6 h-6 text-green-500" />
                  <h3>Buyer Dashboard</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Recent Orders
                    </h4>
                    <p className="text-gray-600">
                      Track your purchases and history
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Saved Items
                    </h4>
                    <p className="text-gray-600">
                      View your favorited products
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t">
            <button
              onClick={handleProfileUpdate}
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
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
