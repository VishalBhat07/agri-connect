import { db } from "./firebaseConfig.js";
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // For unique IDs

export class Crop {
  constructor(cropName, cropVariety, cropPrice, cropLocation) {
    this.cropName = cropName;
    this.cropVariety = cropVariety;
    this.cropPrice = cropPrice;
    this.cropID = uuidv4();
    this.cropLocation = cropLocation;
  }

  async addCrop(farmerID) {
    try {
      const cropRef = collection(db, "farmers", farmerID, "crops");
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
      const cropDoc = doc(
        db,
        "users",
        "farmers",
        farmerID,
        "crops",
        this.cropID
      );
      await deleteDoc(cropDoc);
      console.log("Crop deleted successfully");
    } catch (error) {
      console.error("Error deleting crop: ", error);
    }
  }

  async updateCrop(farmerID, updatedData) {
    try {
      const cropDoc = doc(
        db,
        "users",
        "farmers",
        farmerID,
        "crops",
        this.cropID
      );
      await updateDoc(cropDoc, updatedData);
      console.log("Crop updated successfully");
    } catch (error) {
      console.error("Error updating crop: ", error);
    }
  }

  async getCrop(farmerID) {
    try {
      const cropDoc = await getDoc(
        doc(db, "farmers", farmerID, "crops", this.cropID)
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

  toJSON() {
    return {
      cropName: this.cropName,
      cropVariety: this.cropVariety,
      cropPrice: this.cropPrice,
      cropLocation: this.cropLocation,
      cropID: this.cropID,
    };
  }

  static fromJSON(json) {
    return new Crop(
      json.cropName,
      json.cropVariety,
      json.cropPrice,
      json.cropLocation,
      json.cropID
    );
  }
}

export class Farmer {
  constructor(emailID) {
    this.emailID = emailID;
    this.farmerID = uuidv4();
    this.crops = []; // Array of Crop objects
  }

  async addFarmer() {
    try {
      await setDoc(doc(db, "farmers", this.farmerID), {
        emailID: this.emailID,
        farmerID: this.farmerID,
        crops: this.crops.map((crop) => crop.toJSON()), // Serialize crops
      });
      console.log("Farmer added successfully");
    } catch (error) {
      console.error("Error adding farmer: ", error);
    }
  }

  async deleteFarmer() {
    try {
      await deleteDoc(doc(db, "farmers", this.farmerID));
      console.log("Farmer deleted successfully");
    } catch (error) {
      console.error("Error deleting farmer: ", error);
    }
  }

  async updateFarmer() {
    try {
      await setDoc(
        doc(db, "farmers", this.farmerID),
        {
          emailID: this.emailID,
          farmerID: this.farmerID,
          crops: this.crops.map((crop) => crop.toJSON()), // Serialize crops
        },
        { merge: true }
      );
      console.log("Farmer updated successfully");
    } catch (error) {
      console.error("Error updating farmer: ", error);
    }
  }

  static async getFarmer(farmerID) {
    try {
      const farmerDoc = await getDoc(doc(db, "farmers", farmerID));
      if (farmerDoc.exists()) {
        const data = farmerDoc.data();
        this.emailID = data.emailID;
        this.farmerID = data.farmerID;
        this.crops = data.crops.map((crop) => Crop.fromJSON(crop)); // Deserialize crops
        console.log("Farmer data:", data);
        return this;
      } else {
        console.log("No such farmer!");
        return null;
      }
    } catch (error) {
      console.error("Error getting farmer: ", error);
    }
  }

  async getCrops() {
    try {
      const cropsSnapshot = await getDocs(
        collection(db, "farmers", this.farmerID, "crops")
      );
      this.crops = []; // Clear the existing crops
      cropsSnapshot.forEach((doc) => {
        const cropData = doc.data();
        this.crops.push(Crop.fromJSON(cropData)); // Deserialize each crop
      });
      console.log("Crops data:", this.crops);
      return this.crops;
    } catch (error) {
      console.error("Error getting crops: ", error);
    }
  }

  // Add a new crop to the farmer
  async addCrop(crop) {
    if (!(crop instanceof Crop)) {
      console.error("Invalid crop object");
      return;
    }

    try {
      const cropRef = doc(
        db,
        "farmers",
        this.farmerID,
        "crops",
        crop.cropID
      );
      await setDoc(cropRef, crop.toJSON()); // Serialize crop
      this.crops.push(crop); // Add crop to the local array
      console.log("Crop added successfully");
    } catch (error) {
      console.error("Error adding crop:", error);
    }
  }
}
