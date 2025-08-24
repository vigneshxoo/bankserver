import { Request,Response } from "express"
export const logout=async(req:Request,res:Response)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        return res.status(200).json({message:"logout sucessfully"})
        
    } catch (error) {
        
    }
}