const optService = require("../services/otpService");
const hashService = require("../services/hashService");
const userService = require("../services/userService");
const tokenService = require("../services/tokenService");
const UserDTO = require("../dtos/userDTO");

class AuthController{
    async sendOtp(req, res){
        const {phone} = req.body;
        if(!phone){
            res.status(400).json({message: 'Phone field is required'});
        }

        // Generate Otp
        const otp = optService.generateOtp();
        const ttl = 1000 * 60; // otp valid for 1 min
        const expires = Date.now() + ttl;  // expire time (Current time + 1 min)
        const data = `${phone}.${otp}.${expires}`;
        
        // Hash Otp for client side (react)
        const hash = hashService.hashOtp(data);

        // Send Otp
        try{
            // await optService.sendBySms(phone, otp);
            return res.json({
                hash: `${hash}.${expires}`,  // we can split and check is opt expire
                phone,
                otp
            })
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'failed to send message'});
        }
    }

    async verifyOtp(req, res){
        const {otp, hash, phone} = req.body;
        if(!otp || !hash || !phone){
            res.status(400).json({ message: 'All fields are required!' });
        }

        const [hashedOtp, expires] = hash.split(".");
        if(Date.now() > +expires){   // expires is string so converted into number
            res.status(400).json({ message: 'OTP expired!' });
        }

        const data = `${phone}.${otp}.${expires}`;
        const isValid = optService.verifyOtp(hashedOtp, data);
        if (!isValid) {
            res.status(400).json({ message: 'Invalid OTP' });
        }

        // Valid Otp so create user
        let user;
        try{
            user = await userService.findUser({phone});
            if(!user){    // user is not there in db so create user
                user = await userService.createUser({phone});
            }
        }catch(err){
            console.log(err);
            res.status(500).json({ message: 'Db error' });
        }

        const {accessToken, refreshToken} = tokenService.generateTokens({
            _id: user._id,
            activated: false
        });

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,   // valid for 30 days
            httpOnly: true,
        })

        const userDTO = new UserDTO(user);
        res.json({accessToken, user: userDTO});
    }
}

module.exports = new AuthController();