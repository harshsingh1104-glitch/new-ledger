const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required for creating an account"],
        unique: [true, "email must be unique"],
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email"
        ]
    },
    name: {
        type: String,
        required: [true, "name must be provided for creating an account"],
        minlength:[3,"name must be at least 3 characters long"]
    },

    password: {
        type: String,
        required: [true, "password is required for creating an account"],
        minlength: [6, "password must be at least 6 characters long"],
        select: false
    }
}, { timestamps: true });

userschema.pre("save", async function (){
    if(!this.isModified("password")){
        return;
    }
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
})

    userschema.methods.comparepassword = async function (password){
        return await bcrypt.compare(password, this.password)

    }



    const usermodel = mongoose.model("User", userschema)

    module.exports = usermodel