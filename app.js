import express from "express";
import productRoutes from "./routes/products.js";
import connectDB from "./db/connect.js";

const uri = "mongodb+srv://pinkyp9425:wBfDjc1JbEKeaPR2@nidhiapi.kztejtn.mongodb.net/nidhiAPI?retryWrites=true&w=majority&appName=nidhiAPI";

const app = express();  

const PORT = process.env.PORT ||5000;
app.get("/", (req, res) => {
    res.send("Hi, I'm live");
});

 
//middleware
app.use("/api/products", productRoutes); 

const startServer = async () => {
    
    try {
        if (!uri) {
            throw new Error("MONGO_URL is not defined. Set it in your environment variables.");
        }
        await connectDB(uri);
        console.log("Database connected sucessfully");

        app.listen(PORT, () => {
            console.log(`server is running on port: ${PORT}`);
        })
        
    } catch (error) {
        console.error("Database connection failed",error);
        process.exit(1);
    }
}
startServer();



