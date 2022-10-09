import mongoose from "mongoose";

interface UserAttrs{
    email: string;
    password: string;
}
//An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<any>{
    build(attrs: UserAttrs): any;
}
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
//Add custom function built in to a model
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<any, UserModel>('User', userSchema);

export {User};