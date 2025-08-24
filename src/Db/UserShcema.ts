import mongoose,{model,Schema,Document, Model} from "mongoose";

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;

}
const user=new Schema<UserDocument>({
    username:{
        type:String,
        required:true,
        unique:true,
    },
  
     email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
      
    },

})

const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", user);
export default User;