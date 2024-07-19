const { MongoClient, ObjectId } = require("mongodb");
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
      .updateMany(
        {},
        { $set: { bought: 0, quantity: 50 }, $unset: { __v: "" } }
      );
    console.log("Products updated:", updateProductsResult.modifiedCount);

    // Delete all users except the specified one
    const keepUserId = new ObjectId("668aacadf4cd3c03c1f6ba8a");
    const deleteUsersResult = await db
      .collection("users")
      .deleteMany({ _id: { $ne: keepUserId } });
    console.log("Users deleted:", deleteUsersResult.deletedCount);

    // Update the remaining user's productsBought field
    const updateUsersResult = await db
      .collection("users")
      .updateOne({ _id: keepUserId }, { $set: { productsBought: [] } });
    console.log("Remaining user updated:", updateUsersResult.modifiedCount);
  } catch (error) {
    console.error("Error initializing data:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

initializeData();
