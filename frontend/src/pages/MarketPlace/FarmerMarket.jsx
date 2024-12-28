import React, { useState, useEffect } from "react";
import { Farmer, Crop } from "../../../firebaseFunctions/cropFarmer"; // Import your Farmer and Crop classes

const FarmerMarket = ({ farmerID }) => {
  const [farmer, setFarmer] = useState(null); // Farmer instance
  const [crops, setCrops] = useState([]); // List of crops
  const [newCrop, setNewCrop] = useState({
    cropName: "",
    cropVariety: "",
    cropPrice: "",
    cropWeight: "",
    cropLocation: "",
  }); // Form state for new crops
  const [editingIndex, setEditingIndex] = useState(-1); // -1 if not editing
  const [editingCrop, setEditingCrop] = useState({}); // Store the crop being edited

  // Load farmer and crops on component mount
  useEffect(() => {
    const fetchFarmerAndCrops = async () => {
      try {
        const fetchedFarmer = await Farmer.getFarmer(farmerID);
        setFarmer(fetchedFarmer);

        if (fetchedFarmer) {
          const farmerCrops = await fetchedFarmer.getCrops();
          setCrops(farmerCrops);
        }
      } catch (error) {
        console.error("Error fetching farmer and crops:", error);
      }
    };

    fetchFarmerAndCrops();
  }, [farmerID]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCrop((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditingChange = (e) => {
    const { name, value } = e.target;
    setEditingCrop((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new crop
  const addCrop = async () => {
    if (!farmer) return;

    try {
      const crop = new Crop(
        newCrop.cropName,
        newCrop.cropVariety,
        parseFloat(newCrop.cropPrice),
        newCrop.cropWeight,
        newCrop.cropLocation
      );
      await farmer.addCrop(crop); // Add to Firestore
      setCrops((prev) => [...prev, crop]); // Update local state
      setNewCrop({
        cropName: "",
        cropVariety: "",
        cropPrice: "",
        cropWeight: "",
        cropLocation: "",
      });
    } catch (error) {
      console.error("Error adding crop:", error);
    }
  };

  // Delete a crop
  const deleteCrop = async (index) => {
    if (!farmer) return;

    try {
      const crop = crops[index];
      await farmer.deleteCrop(crop.cropID); // Remove from Firestore
      setCrops((prev) => prev.filter((_, i) => i !== index)); // Update local state
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  // Start editing a crop
  const editCrop = (index) => {
    setEditingIndex(index);
    setEditingCrop({ ...crops[index] });
  };

  // Save edited crop
  const saveCrop = async (index) => {
    if (!farmer) return;
  
    // Validate all fields are present
    if (
      !editingCrop.cropName ||
      !editingCrop.cropVariety ||
      editingCrop.cropPrice === undefined ||
      editingCrop.cropWeight === undefined ||
      !editingCrop.cropLocation
    ) {
      console.error("Invalid crop data:", editingCrop);
      return;
    }
  
    try {
      // Use the existing crop and update its properties
      const updatedCrop = new Crop(
        editingCrop.cropName,
        editingCrop.cropVariety,
        parseFloat(editingCrop.cropPrice),
        parseFloat(editingCrop.cropWeight),
        editingCrop.cropLocation
      );
  
      // Retain the existing crop ID
      updatedCrop.cropID = crops[index].cropID;
      // Update Firestore and local state
      await farmer.updateCrop(updatedCrop);
  
      // Update React state to reflect changes
      const updatedCrops = [...crops];
      updatedCrops[index] = updatedCrop;
      setCrops(updatedCrops);
      setEditingIndex(-1); // Reset editing state
    } catch (error) {
      console.error("Error updating crop:", error);
    }
  };
  
  return (
    <div>
      <h1>Crop Manager</h1>
      <div>
        <h2>Add Crop</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCrop();
          }}
        >
          <input
            type="text"
            name="cropName"
            placeholder="Crop Name"
            value={newCrop.cropName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="cropVariety"
            placeholder="Crop Variety"
            value={newCrop.cropVariety}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="cropPrice"
            placeholder="Crop Price (per kg)"
            value={newCrop.cropPrice}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="cropWeight"
            placeholder="Crop weight (in kg)"
            value={newCrop.cropWeight}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="cropLocation"
            placeholder="Crop Location"
            value={newCrop.cropLocation}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Crop</button>
        </form>
      </div>
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Crop Name</th>
            <th>Crop Variety</th>
            <th>Crop Price</th>
            <th>Crop Weight</th>
            <th>Crop Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop, index) => (
            <tr key={crop.cropID}>
              {editingIndex === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="cropName"
                      value={editingCrop.cropName}
                      onChange={handleEditingChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="cropVariety"
                      value={editingCrop.cropVariety}
                      onChange={handleEditingChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="cropPrice"
                      value={editingCrop.cropPrice}
                      onChange={handleEditingChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="cropWeight"
                      value={editingCrop.cropWeight}
                      onChange={handleEditingChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="cropLocation"
                      value={editingCrop.cropLocation}
                      onChange={handleEditingChange}
                    />
                  </td>
                  <td>
                    <button onClick={() => saveCrop(index)}>Save</button>
                    <button onClick={() => setEditingIndex(-1)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{crop.cropName}</td>
                  <td>{crop.cropVariety}</td>
                  <td>{crop.cropPrice}</td>
                  <td>{crop.cropWeight}</td>
                  <td>{crop.cropLocation}</td>
                  <td>
                    <button onClick={() => editCrop(index)}>Edit</button>
                    <button onClick={() => deleteCrop(index)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerMarket;
