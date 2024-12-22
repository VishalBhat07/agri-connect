import React, { useState } from "react";

// Dummy options for form fields
const dummyOptions = {
  district: [
    "Bangalore Rural",
    "Mysore",
    "Belgaum",
    "Dharwad",
    "Hassan",
    "Tumkur",
    "Mandya",
    "Kolar",
  ],
  commodity: [
    "Tomato",
    "Potato",
    "Onion",
    "Rice",
    "Wheat",
    "Maize",
    "Carrot",
    "Beans",
  ],
  variety: ["Sona", "Jawari"],
  month: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const PricePredictor = () => {
  const [formData, setFormData] = useState({
    district: "",
    commodity: "",
    variety: "",
    month: "",
  });

  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setPredictions(data.predictions);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to get predictions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Karnataka Crop Price Predictor
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["district", "commodity", "variety", "month"].map((field) => (
          <div key={field} className="flex flex-col space-y-2">
            <label
              htmlFor={field}
              className="text-sm font-medium text-gray-700"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)} Name
            </label>
            <select
              id={field}
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              required
              className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select {field}</option>
              {dummyOptions[field].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Predicting..." : "Predict Prices"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {predictions && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Predicted Prices:</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-gray-600">Maximum Price:</div>
            <div className="font-medium">
              ₹{predictions.max_price.toFixed(2)}
            </div>
            <div className="text-gray-600">Minimum Price:</div>
            <div className="font-medium">
              ₹{predictions.min_price.toFixed(2)}
            </div>
            <div className="text-gray-600">Modal Price:</div>
            <div className="font-medium">
              ₹{predictions.modal_price.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricePredictor;
