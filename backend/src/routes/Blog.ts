import express, {Request , Response} from "express"
import { PrismaClient } from "@prisma/client"
import { blogschema } from "../zod"
const prisma = new PrismaClient
const blogRoute = express.Router()
blogRoute.use(express.json())



blogRoute.post("/create" , async function (req,res ) {
    const body = await  req.body
    const check = blogschema.safeParse(body)
    if(!check.success){return res.status(401).json("invalid schema")}
    const userId = Number(req.id) 

    const create  = await prisma.todo.create({
        data : {
            title : body.title,
            description : body.description,
            done : false,
            authorid : userId
        }
    })

    if(create){res.json("post created succesfully")}
})

blogRoute.get("/gettodo" , async (req,res) => {
    const userId = Number(req.id)

    const find = await prisma.todo.findMany({
        where : {authorid : userId}
    })
    res.json({todos : find})
})

export default blogRoute
