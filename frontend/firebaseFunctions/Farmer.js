import { db } from "./firebaseConfig";
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

class Farmer {
  constructor(emailID) {
    this.emailID = emailID;
    this.farmerID = uuidv4();
    this.crops = [];
  }

  async addFarmer() {
    try {
      await setDoc(doc(db, "users", this.farmerID), {
        emailID: this.emailID,
        farmerID: this.farmerID,
        crops: this.crops,
      });
      console.log("Farmer added successfully");
    } catch (error) {
      console.error("Error adding farmer: ", error);
    }
  }

  async deleteFarmer() {
    try {
      await deleteDoc(doc(db, "users", this.farmerID));
      console.log("Farmer deleted successfully");
    } catch (error) {
      console.error("Error deleting farmer: ", error);
    }
  }

  async updateFarmer() {
    try {
      await setDoc(
        doc(db, "users", this.farmerID),
        {
          emailID: this.emailID,
          farmerID: this.farmerID,
          crops: this.crops,
        },
        { merge: true }
      );
      console.log("Farmer updated successfully");
    } catch (error) {
      console.error("Error updating farmer: ", error);
    }
  }

  async getFarmer() {
    try {
      const farmerDoc = await getDoc(doc(db, "users", this.farmerID));
      if (farmerDoc.exists()) {
        console.log("Farmer data:", farmerDoc.data());
        return farmerDoc.data();
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
        collection(db, "users", this.farmerID, "crops")
      );
      const crops = [];
      cropsSnapshot.forEach((doc) => {
        crops.push(doc.data());
      });
      console.log("Crops data:", crops);
      return crops;
    } catch (error) {
      console.error("Error getting crops: ", error);
    }
  }
}
