import { Document, Model } from "mongoose";
export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
}
declare const User: Model<UserDocument>;
export default User;
//# sourceMappingURL=UserShcema.d.ts.map