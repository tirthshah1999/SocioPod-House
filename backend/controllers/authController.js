const optService = require("../services/otpService");
const hashService = require("../services/hashService");

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
            await optService.sendBySms(phone, otp);
            return res.json({
                hash: `${hash}.${expires}`,  // we can split and check is opt expire
                phone
            })
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'failed to send message'});
        }
    }

    verifyOtp(req, res){
        const {otp, hash, phone} = req.body;
        if(!otp || !hash || !phone){
            res.status(400).json({ message: 'All fields are required!' });
        }

        const [hashedOtp, expires] = hash.split(".");
        if(Date.now() > expires){
            res.status(400).json({ message: 'OTP expired!' });
        }

        const data = `${phone}.${otp}.${expires}`;
        const isValid = optService.verifyOtp(hashedOtp, data);
        if (!isValid) {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    }
}

module.exports = new AuthController();