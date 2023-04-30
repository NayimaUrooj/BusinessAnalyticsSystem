import { Password } from "@mui/icons-material";
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";


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
        const customers = await User.find({role: "user"}).select("-password");
        res.status(200).json(customers)
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

export const getTransactions = async (req, res) => {

    try {
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
        const generateSort = () => {
          const sortParsed = JSON.parse(sort);
          const sortFormatted = {
            [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
          };
    
          return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};
    
        const transactions = await Transaction.find({
          $or: [
            { cost: { $regex: new RegExp(search, "i") } },
            { userId: { $regex: new RegExp(search, "i") } },
          ],
        })
          .sort(sortFormatted)
          .skip(page * pageSize)
          .limit(pageSize);
    
        const total = await Transaction.countDocuments({
          name: { $regex: search, $options: "i" },
        });
    
        res.status(200).json({
          transactions,
          total,
        });
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

export const getGeography = async (req, res) => {

    try {
        const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.status(200).json(formattedLocations);
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
