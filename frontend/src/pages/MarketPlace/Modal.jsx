import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()} // Prevent click from propagating to backdrop
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

export default Modal;
