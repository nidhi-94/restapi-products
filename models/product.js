import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: { type: String, required: [true, "name must be provided"] },
    price: {type: Number, required: [true, "price must be provided"]},
    featured: {type: Boolean, default: false},
    rating: {type: Number, default: 4.9},
    createdAt: { type: Date, default: Date.now() },
    company: { 
        type: String, 
        enum: { 
            values: ["apple", "samsung", "redmi", "mi", "oneplus", "huawei", "asus", "vivo", "xiaomi"], 
            message: "{VALUE} is not supported"
        }
    }
    
});

export const product = mongoose.model("Product", productSchema);
export const testingProduct = mongoose.model("TestingProduct", productSchema);