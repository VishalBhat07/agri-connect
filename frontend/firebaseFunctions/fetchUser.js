import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "./firebaseConfig"; // Import your Firebase config

export async function fetchFarmer() {
  let filteredFarmers = []; // Initialize an empty array to store filtered farmers

  // Wait for the authentication state to change
  const user = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user); // Resolve the currently logged-in user
    });
  });

  if (user) {
    try {
      const userEmail = user.email; // Get the email of the logged-in user
      const farmersSnapshot = await getDocs(collection(db, "users")); // Fetch all farmers

      farmersSnapshot.forEach((doc) => {
        const farmerData = doc.data();
        if (farmerData.emailID === userEmail) {
          filteredFarmers.push(farmerData); // Add matching farmers to the array
        }
      });

      console.log("Filtered Farmers for current user:", filteredFarmers);
    } catch (error) {
      console.error("Error fetching farmers:", error);
    }
  } else {
    console.log("No user is logged in");
  }

  return filteredFarmers; // Return the filtered farmers
}
