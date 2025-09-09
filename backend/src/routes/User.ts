import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { userschema } from "../zod";
import dotenv from "dotenv";
import { email } from "zod";
dotenv.config({ path: "./src/.env" })

const pass = process.env.JWT_PASSWORD as string
console.log(pass)
const prisma = new PrismaClient()
const userRouter = express.Router();
userRouter.use(express.json());


userRouter.post("/signup" , async function (req,res) {
    const body =  req.body
    const check = userschema.safeParse(body)
    if(!check.success){ return res.status(401).json("invalid credentials")}

    const User = await prisma.user.create({
        data : {
            name : body.name,
            password : body.password,
            email : body.email,  
        }
    })
   if (!User) {
    res.json("error while signing up")
   } else {
    res.json("signed up")
   }
})


const signinschema = userschema.pick({
    email : true ,
    password : true
})

userRouter.post("/signin" , async function (req,res) {
    const body = await req.body
    const check = signinschema.safeParse(body)
    if(!check.success){return res.status(401).json("invalid credentials")}
  console.log(body)

    const signin = await prisma.user.findUnique({
        where : {
            email : body.email,
            password : body.password
        }
    })
if(!signin) {
    res.status(401).json("try different credentials")
} else {
    if (!pass) {
        res.status(500).json({ error: "JWT secret is not defined" });
        return;
    }
    const assign = jwt.sign({id : signin.id}, pass);
    res.json({token : assign});
}
})


export default userRouter