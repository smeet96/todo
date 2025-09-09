import express, {Request , Response} from "express"
import { PrismaClient } from "@prisma/client"
import { blogschema } from "../zod"
const prisma = new PrismaClient
const blogRoute = express.Router()
blogRoute.use(express.json())



blogRoute.post("/create" , async function (req,res ) {
    const body = await  req.body
    const userId = Number(req.id)
    const check = blogschema.safeParse(body)
    if(!check.success){
        return res.status(401).json("invalid schema")
    }
       
 const {title , description } = check.data
    const create  = await prisma.todo.create({
        data : {
            title ,
            description ,
            done : false,
            authorid : userId
        }
    })

    if(create){ 
        return res.json("todo created succesfully")
    } else {
        return res.json("error while creating todo")
    }
})


blogRoute.get("/gettodo" , async (req,res) => {
    const userId = Number(req.id)

    const find = await prisma.todo.findMany({
        where : {authorid : userId}
    })
    res.json({todos : find})
})

export default blogRoute
