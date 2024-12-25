import {
  doc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { v4 as uuidv4 } from "uuid"; // For unique IDs

class Crop {
  constructor(cropName, cropVariety, cropPrice, cropLocation) {
    this.cropName = cropName;
    this.cropVariety = cropVariety;
    this.cropPrice = cropPrice;
    this.cropID = uuidv4();
    this.cropLocation = cropLocation;
  }

  async addCrop(farmerID) {
    try {
      const cropRef = collection(db, "users", farmerID, "crops");
      await addDoc(cropRef, {
        cropName: this.cropName,
        cropVariety: this.cropVariety,
        cropPrice: this.cropPrice,
        cropID: this.cropID,
        cropLocation: this.cropLocation,
      });
      console.log("Crop added successfully");
    } catch (error) {
      console.error("Error adding crop: ", error);
    }
  }

  async deleteCrop(farmerID) {
    try {
      const cropDoc = doc(db, "users", farmerID, "crops", this.cropID);
      await deleteDoc(cropDoc);
      console.log("Crop deleted successfully");
    } catch (error) {
      console.error("Error deleting crop: ", error);
    }
  }

  async updateCrop(farmerID, updatedData) {
    try {
      const cropDoc = doc(db, "users", farmerID, "crops", this.cropID);
      await updateDoc(cropDoc, updatedData);
      console.log("Crop updated successfully");
    } catch (error) {
      console.error("Error updating crop: ", error);
    }
  }

  async getCrop(farmerID) {
    try {
      const cropDoc = await getDoc(
        doc(db, "users", farmerID, "crops", this.cropID)
      );
      if (cropDoc.exists()) {
        console.log("Crop data:", cropDoc.data());
        return cropDoc.data();
      } else {
        console.log("No such crop!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching crop: ", error);
    }
  }
}
