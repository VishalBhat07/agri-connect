import { Farmer, Crop } from "./cropFarmer.js";

async function testFarmerCrop() {
  try {
    // Step 1: Create a Farmer
    console.log("Creating a new farmer...");
    const farmer = new Farmer("farmer@example.com");
    await farmer.addFarmer();
    console.log("Farmer created:", farmer);

    // Step 2: Add a Crop to the Farmer
    console.log("Adding a crop...");
    const crop = new Crop("Wheat", "Premium", 1000, "New York");
    await farmer.addCrop(crop);
    console.log("Crop added:", crop);

    // // Step 3: Fetch Farmer Data
    // console.log("Fetching farmer data...");
    // const fetchedFarmer = await Farmer.getFarmer(farmer.farmerID);
    // console.log("Fetched farmer:", fetchedFarmer);

    // // Step 4: Fetch Crops for the Farmer
    // console.log("Fetching crops for the farmer...");
    // const crops = await farmer.getCrops();
    // console.log("Fetched crops:", crops);

    // // Step 5: Update a Crop
    // console.log("Updating a crop...");
    // crop.cropPrice = 1200; // Update crop price
    // await crop.updateCrop(farmer.farmerID, { cropPrice: crop.cropPrice });
    // console.log("Crop updated:", crop);

    // // Step 6: Delete a Crop
    // console.log("Deleting a crop...");
    // await crop.deleteCrop(farmer.farmerID);
    // console.log("Crop deleted");

    // // Step 7: Delete the Farmer
    // console.log("Deleting the farmer...");
    // await farmer.deleteFarmer();
    // console.log("Farmer deleted");

  } catch (error) {
    console.error("Error in testFarmerCrop:", error);
  }

  return;

}

// Run the test
testFarmerCrop();
