const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const hashToHex = (password, salt) => {
    if (!process.env.HASH_SECRET) {
        throw Error("Hash secret not found in .env file");
    }

    return crypto 
        .createHmac("sha256", [salt,password].join("/"))
        .update(process.env.HASH_SECRET)
        .digest("hex");
};

const randomBase64 = () => {
        return crypto.randomBytes(128).toString("base64");
    };

    const decodeSessionJwt = (req, res) => {
        if(!process.env.JWT_VERIFICATION_SECRET){
            throw new Error("JWT_VERIFICATION_SECRET not found in .env file");
        }

        const sessionJwt = req.cookies["PAW_20"];

        if(!sessionJwt) {
            throw new Error("Cookie not found");
        }

        const decodeToken = jwt.verify(
            sessionJwt,
            process.env.JWT_VERIFICATION_SECRET,
        );

        if(!decodeToken){
            throw new Error("Invalid token");
        }

        return decodeToken;
};

const sendCookie = (res, cookie) => {
        res.cookie("PAW_20", cookie, {
            path: "/",
            maxAge: 24 * 60 * 60 * 1000, 
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
};

    module.exports = {
        hashToHex,
        randomBase64,
        decodeSessionJwt,
        sendCookie,
    };