import bcrypt from "bcryptjs";
import { Customer } from "../models/userModel.js";
import { createToken } from "../utils/token.js";
import { CustomerAddress } from "../models/addressModel.js";

export async function createCustomerAddress(req, res) {
try {
    const {Customer_name, House_name, Full_address, Landmark, City, State, Pincode, Phone_number} = req.body;
    if (!Customer_name || !House_name || !Full_address || !Landmark || !City || !State || !Pincode || !Phone_number) {
    return res.status(400).json({ message: "Please enter all fields" });  
    const newCustomerAddress = new CustomerAddress({
        Customer_name, House_name, Full_address, Landmark, City, State, Pincode, Phone_number ,
        userId : req.customers.id,
    })  
    await newCustomerAddress.save()
    res.status(201).json({ message: "Address added Successfully" });    
    }
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
}    
}


export async function deleteCustomerAddress(req, res) {
    try {
      const {addressId} =  req.params
      const userId = req.customers.id;
      const user = await Customer.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      const deleteAddress = await CustomerAddress.findByIdAndDelete( addressId )
      return res.status(200).json({ message: "Address Deleted Successfully"});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }