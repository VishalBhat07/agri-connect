import { Farmer, Crop } from "./cropFarmer.js"; // Ensure the classes are imported correctly

// Main function to execute the required operations
async function main() {
  try {
    // Create two farmers
    const farmer1 = new Farmer("test1@gmail.com");
    const farmer2 = new Farmer("test2@gmail.com");

    // Add farmers to Firestore
    await farmer1.addFarmer();
    await farmer2.addFarmer();

    // Create crops for farmer1
    const crop1Farmer1 = new Crop("Wheat", "Durum", 100, 50, "Kansas");
    const crop2Farmer1 = new Crop("Rice", "Basmati", 200, 30, "California");
    const crop3Farmer1 = new Crop("Corn", "Sweet", 150, 40, "Nebraska");

    // Add crops to farmer1
    await farmer1.addCrop(crop1Farmer1);
    await farmer1.addCrop(crop2Farmer1);
    await farmer1.addCrop(crop3Farmer1);

    // Create crops for farmer2
    const crop1Farmer2 = new Crop("Barley", "Two-row", 120, 25, "Texas");
    const crop2Farmer2 = new Crop("Soybean", "Glycine max", 180, 35, "Iowa");
    const crop3Farmer2 = new Crop("Peanut", "Valencia", 220, 20, "Georgia");

    // Add crops to farmer2
    await farmer2.addCrop(crop1Farmer2);
    await farmer2.addCrop(crop2Farmer2);
    await farmer2.addCrop(crop3Farmer2);

    // Display all farmers and their crops
    const farmers = [farmer1, farmer2];

    for (const farmer of farmers) {
      console.log(`Farmer: ${farmer.emailID}`);
      const crops = await farmer.getCrops();
      console.log("Crops:");
      crops.forEach((crop) => {
        console.log(
          `  - ${crop.cropName}, Variety: ${crop.cropVariety}, Price: $${crop.cropPrice}, Weight: ${crop.cropWeight}kg, Location: ${crop.cropLocation}`
        );
      });
    }
  } catch (error) {
    console.error("Error during operations:", error);
  }
}

// Run the main function
main();
