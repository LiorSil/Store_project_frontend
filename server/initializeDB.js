const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.DB_URL;
const dbName = "myStore";

async function initializeData() {
  const client = new MongoClient(uri, {});

  try {
    await client.connect();
    console.log(`Connected to database: ${dbName}`);

    const db = client.db(dbName);

    // Delete all documents in the 'orders' collection
    const deleteOrdersResult = await db.collection("orders").deleteMany({});
    console.log("Orders deleted:", deleteOrdersResult.deletedCount);

    // Update the 'products' collection
    const updateProductsResult = await db
      .collection("products")
      .updateMany({}, { $set: { bought: 0, quantity: 30 } });
    console.log("Products updated:", updateProductsResult.modifiedCount);

    // Update the 'users' collection
    const updateUsersResult = await db
      .collection("users")
      .updateMany({}, { $set: { productsBought: [] } });
    console.log("Users updated:", updateUsersResult.modifiedCount);
  } catch (error) {
    console.error("Error initializing data:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

initializeData();
