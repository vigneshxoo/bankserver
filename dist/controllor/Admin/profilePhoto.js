"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePhoto = void 0;
const cloudinary_1 = require("cloudinary");
const connectDb_1 = require("../../Db/connectDb");
const createAccount_1 = require("../../Db/createAccount");
console.log("Cloudinary configured with cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
const ProfilePhoto = async (req, res) => {
    try {
        console.log("profilepic");
        const currentuser = req.user?._id;
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        if (!req.file.mimetype.startsWith('image/')) {
            return res.status(400).json({ message: "Uploaded file is not an image" });
        }
        const arrayBuffer = req.file.buffer;
        const buffer = Buffer.from(arrayBuffer);
        await (0, connectDb_1.default)();
        const user = await createAccount_1.default.findById(currentuser);
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        const uploadResponse = await new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto", folder: "Banking" }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            }).end(buffer);
        });
        if (user.profileImg?.public_id) {
            await cloudinary_1.v2.uploader.destroy(user.profileImg.public_id);
        }
        user.profileImg = {
            url: uploadResponse.secure_url,
            public_id: uploadResponse.public_id,
        };
        user.save();
        return res.status(200).json({
            message: "Profile photo updated successfully",
            profileImg: user.profileImg,
        });
    }
    catch (error) {
        console.error("Profile upload error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.ProfilePhoto = ProfilePhoto;
//# sourceMappingURL=profilePhoto.js.map