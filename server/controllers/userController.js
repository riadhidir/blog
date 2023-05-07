import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password )
        return res.status(400).json({ message: "all fields are required" });
    //check if user exists
    const userExists = await User.exists({ username });
    if (userExists) return res.sendStatus(409);
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            username,
            password: hashedPassword,
            role,
        });
        res.status(201).json({ success: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const {  username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ message: "all fields are required" });
    const foundUser = await User.findOne({ username });
    if (!foundUser) return res.sendStatus(401);
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const accessToken = generateAccessToken(foundUser._id, foundUser.role);
        const refreshToken = generateRefreshToken(foundUser._id);
        await User.findByIdAndUpdate(foundUser._id, { refreshToken });
        // res.cookie('jwt',refreshToken, { httpOnly:true,sameSite:'None', secure:true, maxAge: 24*60*60*1000});
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: true,
            maxAge: 24 * 60 * 60 * 1000, //1 day
        });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
};

export const getMe = async (req, res) => {
    const { _id, email } = await User.findById(req.user);
    res.status(200).json({ id: _id, email });
};

export const refreshLogin = async (req, res) => {
    
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });
    console.log(foundUser);
    if (!foundUser) return res.sendStatus(403); //forbidden
    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.id !== decoded.id) return res.sendStatus(403);
            const accessToken = generateAccessToken(decoded.id, foundUser.role);
            res.json({ accessToken });
        }
    );
};

export const logout = async (req, res) => {
    //on client, also delete thee accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //successful and no content
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken });
    //is refreshToken in db?
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true, sameSite: true });
        return res.sendStatus(204);
    }
    //delete the refresh token in db
    await User.findByIdAndUpdate(foundUser.id, { refreshToken: "" });
    res.clearCookie("jwt", { httpOnly: true, sameSite: true }); //secure:true - only serves on https
    return res.sendStatus(204);
};

//generate tokens

const generateAccessToken = (id, role) => {
    return jwt.sign(
        {
            UserInfo: {
                id,
                role,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "5m",
        }
    ); //5-15 min
};
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    }); 
};
