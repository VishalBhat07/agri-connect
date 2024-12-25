import React, { useState, useEffect } from "react";
import { Farmer, Crop } from "../../../firebaseFunctions/cropFarmer"; // Import your Farmer and Crop classes

const CropManager = ({ farmerID }) => {
  const [crops, setCrops] = useState([]); // List of crops
  const [newCrop, setNewCrop] = useState({
    cropName: "",
    cropVariety: "",
    cropPrice: "",
    cropLocation: "",
  }); // Form state for new crops
  const [editingIndex, setEditingIndex] = useState(-1); // -1 if not editing
  const [editingCrop, setEditingCrop] = useState({}); // Store the crop being edited

  let farmer = null;

  async function fetchFarmer(){farmer = await Farmer.getFarmer(farmerID)};
  fetchFarmer();


  // Load crops on component mount
  useEffect(() => {
    const fetchCrops = async () => {
      await farmer.getFarmer(farmerID); // Load farmer details
      const farmerCrops = await farmer.getCrops();
      setCrops(farmerCrops); // Set the crops in state
    };
    fetchCrops();
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
    const crop = new Crop(
      newCrop.cropName,
      newCrop.cropVariety,
      parseFloat(newCrop.cropPrice),
      newCrop.cropLocation
    );
    await farmer.addCrop(crop);
    setCrops((prev) => [...prev, crop]);
    setNewCrop({ cropName: "", cropVariety: "", cropPrice: "", cropLocation: "" });
  };

  // Delete a crop
  const deleteCrop = async (index) => {
    const crop = crops[index];
    await crop.deleteCrop(farmerID);
    setCrops((prev) => prev.filter((_, i) => i !== index));
  };

  // Start editing a crop
  const editCrop = (index) => {
    setEditingIndex(index);
    setEditingCrop({ ...crops[index] });
  };

  // Save edited crop
  const saveCrop = async (index) => {
    const crop = new Crop(
      editingCrop.cropName,
      editingCrop.cropVariety,
      parseFloat(editingCrop.cropPrice),
      editingCrop.cropLocation
    );
    crop.cropID = crops[index].cropID; // Retain the existing crop ID
    await crop.updateCrop(farmerID, crop.toJSON());
    const updatedCrops = [...crops];
    updatedCrops[index] = crop;
    setCrops(updatedCrops);
    setEditingIndex(-1); // Reset editing state
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
            placeholder="Crop Price"
            value={newCrop.cropPrice}
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

export default CropManager;
