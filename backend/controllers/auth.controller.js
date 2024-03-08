import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generatetokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req,res)=>{
    

    try{
        const {fullName, username , email, password , confirmPassword, gender,profilePicture } = req.body;

        console.log(req.body.profilePicture);


        
        if(password !==confirmPassword){
            return res.status(400).json({error:"Password don't match"});
        }
        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"Username/Email already exists"});
        }

        
        //hash password here
        const salt = await bcrypt.genSalt(10); //the higher rate more secure but slow
        const hashedPassword = await bcrypt.hash(password, salt);


        // default profile pic
       

        const boyProfilePic= `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic= `https://avatar.iran.liara.run/public/girl?username=${username}`;
        

        //
        const defaultProfilePic = gender === "male"? boyProfilePic : girlProfilePic;
        //

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            gender,
            // profilePic: (gender === "male" ? boyProfilePic :girlProfilePic), 
            profilePic: profilePicture || defaultProfilePic,
        });



        if(newUser){
            //generate JWT token
            generatetokenAndSetCookie(newUser._id,res); 

            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }else{
            res.status(400).json({error:"Invalid user data"});
        }



    } catch (error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal Server ErrorsZ"});

    }
};


export const login = async(req,res)=>{
    try {
        const{username, password}=req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        }

        generatetokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullName:user.fullName,
            username:user.username,
            email: user.email,
            profilePic:user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error:"Internal Server ErrorsX"});
    }

};

export const logout =  (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"LoggedOut successfully"});
    } catch (error) {
        console.log("Error in Logout controller", error.message);
        res.status(500).json({error:"Internal Server ErrorsY"});
        
    }

};



