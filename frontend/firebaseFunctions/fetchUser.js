import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "./firebaseConfig.js"; // Import your Firebase config
import { Farmer } from "./cropFarmer.js";

export async function fetchFarmer(emailID) {
  try {
    // Validate input
    if (!emailID) {
      console.error("No email ID provided");
      return null;
    }

    // Create a query to find farmer by email
    const farmersQuery = query(
      collection(db, "farmers"),
      where("emailID", "==", emailID)
    );

    // Execute the query
    const farmersSnapshot = await getDocs(farmersQuery);

    // Check if a farmer is found
    if (!farmersSnapshot.empty) {
      // Get the first matching farmer document
      const farmerDoc = farmersSnapshot.docs[0];
      const farmerData = farmerDoc.data();

      // Create and return a Farmer object
      const farmer = new Farmer(farmerData.emailID);
      farmer.farmerID = farmerData.farmerID;
      return farmer;
    } else {
      console.log("No farmer found with the given email");
      return null;
    }
  } catch (error) {
    console.error("Error fetching farmer:", error);
    return null;
  }
}