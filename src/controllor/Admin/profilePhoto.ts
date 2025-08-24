import { Response, Request } from "express";

import { v2 as cloudinary } from 'cloudinary';
import connectDB from "../../Db/connectDb";
import Account from "../../Db/createAccount";
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}
console.log("Cloudinary configured with cloud name:", process.env.CLOUDINARY_CLOUD_NAME);

export const ProfilePhoto = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        console.log("profilepic")
        const currentuser = req.user?._id

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        if (!req.file.mimetype.startsWith('image/')) {
            return res.status(400).json({ message: "Uploaded file is not an image" });
        }
        const arrayBuffer = req.file.buffer;
        const buffer = Buffer.from(arrayBuffer);
        await connectDB()
        const user = await Account.findById(currentuser)
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        const uploadResponse = await new Promise<{ secure_url: string, public_id: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: "auto", folder: "Banking" }, (error, result) => {
                if (error) reject(error);
                else resolve(result as { secure_url: string, public_id: string });
            }).end(buffer);
        });


        if (user.profileImg?.public_id) {
            await cloudinary.uploader.destroy(user.profileImg.public_id);
        }
        user.profileImg = {
            url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id,
        };
        user.save()

        return res.status(200).json({
            message: "Profile photo updated successfully",
            profileImg: user.profileImg,
        });

    } catch (error: any) {
        console.error("Profile upload error:", error);
        res.status(500).json({ message: "Server error", error: error.message });

    }
}