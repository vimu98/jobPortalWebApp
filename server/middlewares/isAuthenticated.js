import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("body: ",req.body )
        console.log("cookie: ",req.cookies )
        console.log("id: ",req.id)
       // console.log("hi achi", token)
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
       // console.log("hi achi", decode)
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        console.log("hi achi", decode.userId)
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;