import { readFile } from "fs/promises";
import { join } from "path";
import mongoose from "mongoose";
import connectDB from "./db/connect.js";
import { product, testingProduct } from "./models/product.js";

const uri = "mongodb+srv://pinkyp9425:wBfDjc1JbEKeaPR2@nidhiapi.kztejtn.mongodb.net/nidhiAPI?retryWrites=true&w=majority&appName=nidhiAPI";

const start = async () => {
    try {
        await connectDB(uri);

        const filePath = join(process.cwd(), "products.json");
        const data = await readFile(filePath, "utf-8");
        const productsjson = JSON.parse(data);

        await product.deleteMany();
        await testingProduct.deleteMany();

        await product.insertMany(productsjson);
        console.log("Products inserted into DB!");

        await testingProduct.insertMany(productsjson);
        console.log("Products inserted into Testing DB!");

    } catch (error) {
        console.error("Error inserting products:", error);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed.");
    }
};

start();
