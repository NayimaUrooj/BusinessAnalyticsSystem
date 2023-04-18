import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";

export const getProducts = async(req, res) => {
    try {
       const products = await Product.find();
       const productsWithStats = await Promise.all(
        products.map(async(product) => {
            const stat = await ProductStat.find(
                {productId: product._id}
            )
            return { 
                ...product._doc,
                stat,
            }
        })
       )
       res.status(200).json(productsWithStats);
      } 
      catch (error) 
      {
        console.error(error); 
        let message = "An error occurred while fetching the products.";
        if (error.code === "ENOENT") {
            message = "The file or directory could not be found.";
        } else if (error.code === "EACCES") {
            message = "The file or directory could not be accessed.";
        }
         res.status(500).json({ message: message });
      }
}

export const getCustomers = async (req, res) => {

    try {
        const customers = await User.find();
       
        
         }
        
       catch (error) 
       {
         console.error(error); 
         let message = "An error occurred while fetching the products.";
         if (error.code === "ENOENT") {
             message = "The file or directory could not be found.";
         } else if (error.code === "EACCES") {
             message = "The file or directory could not be accessed.";
         }
          res.status(500).json({ message: message });
       }
}
