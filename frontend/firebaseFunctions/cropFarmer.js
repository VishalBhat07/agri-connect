import { db } from "./firebaseConfig.js";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // For unique IDs

// Crop class
export class Crop {
  constructor(cropName, cropVariety, cropPrice, cropWeight, cropLocation) {
    this.cropName = cropName;
    this.cropVariety = cropVariety;
    this.cropPrice = cropPrice;
    this.cropWeight = cropWeight;
    this.cropID = uuidv4();
    this.cropLocation = cropLocation;
  }

  toJSON() {
    return {
      cropName: this.cropName,
      cropVariety: this.cropVariety,
      cropPrice: this.cropPrice,
      cropWeight: this.cropWeight,
      cropLocation: this.cropLocation,
      cropID: this.cropID,
    };
  }

  static fromJSON(json) {
    return new Crop(
      json.cropName,
      json.cropVariety,
      json.cropPrice,
      json.cropWeight,
      json.cropLocation
    );
  }
}

// Farmer class
export class Farmer {
  constructor(emailID) {
    this.emailID = emailID;
    this.farmerID = uuidv4();
    this.crops = [];
  }

  // Add farmer to Firestore
  async addFarmer() {
    try {
      await setDoc(doc(db, "farmers", this.farmerID), {
        emailID: this.emailID,
        farmerID: this.farmerID,
      });
      console.log("Farmer added successfully");
    } catch (error) {
      console.error("Error adding farmer: ", error);
    }
  }

  // Delete farmer from Firestore
  async deleteFarmer() {
    try {
      await deleteDoc(doc(db, "farmers", this.farmerID));
      console.log("Farmer deleted successfully");
    } catch (error) {
      console.error("Error deleting farmer: ", error);
    }
  }

  // Add a crop to Firestore and to the local crops array
  async addCrop(crop) {
    if (!(crop instanceof Crop)) {
      console.error("Invalid crop object");
      return;
    }

    try {
      const cropRef = doc(db, "farmers", this.farmerID, "crops", crop.cropID);
      await setDoc(cropRef, crop.toJSON());
      this.crops.push(crop);
      console.log("Crop added successfully");
    } catch (error) {
      console.error("Error adding crop:", error);
    }
  }

  // Delete a crop from Firestore and remove it from the local crops array
  async deleteCrop(cropID) {
    try {
      const cropRef = doc(db, "farmers", this.farmerID, "crops", cropID);
      await deleteDoc(cropRef);
      this.crops = this.crops.filter((crop) => crop.cropID !== cropID);
      console.log("Crop deleted successfully");
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  }

  // Update a crop in Firestore and the local crops array
  async updateCrop(updatedCrop) {
    if (!(updatedCrop instanceof Crop)) {
      console.error("Invalid crop object");
      return;
    }

    try {
      const cropRef = doc(
        db,
        "farmers",
        this.farmerID,
        "crops",
        updatedCrop.cropID
      );
      await setDoc(cropRef, updatedCrop.toJSON()); // Merge updates with existing data

      // Update the local crops array
      const cropIndex = this.crops.findIndex(
        (crop) => crop.cropID === updatedCrop.cropID
      );
      if (cropIndex !== -1) {
        this.crops[cropIndex] = updatedCrop; // Replace with the updated crop object
      }
      console.log("Crop updated successfully");
    } catch (error) {
      console.error("Error updating crop:", error);
    }
  }

  // Get all crops for the farmer from Firestore
  async getCrops() {
    try {
      const cropsSnapshot = await getDocs(
        collection(db, "farmers", this.farmerID, "crops")
      );
      this.crops = cropsSnapshot.docs.map((doc) => Crop.fromJSON(doc.data()));
      console.log("Crops data:", this.crops);
      return this.crops;
    } catch (error) {
      console.error("Error getting crops:", error);
    }
  }

  // Retrieve farmer details from Firestore
  static async getFarmer(farmerID) {
    try {
      const farmerDoc = await getDoc(doc(db, "farmers", farmerID));
      if (farmerDoc.exists()) {
        const data = farmerDoc.data();
        const farmer = new Farmer(data.emailID);
        farmer.farmerID = data.farmerID;
        console.log("Farmer data:", data);
        return farmer;
      } else {
        console.log("No such farmer!");
        return null;
      }
    } catch (error) {
      console.error("Error getting farmer: ", error);
    }
  }
}
