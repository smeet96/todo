import express, {Request , Response} from "express"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient
const blogRoute = express()
blogRoute.use(express.json())



blogRoute.post("/create" , async function (req,res ) {
    const body = await  req.body
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
})

// blogRoute.put("/updatetodo" , async (req,res)=> {
// const body = await req.body
// const userId = Number(req.id)

// const update = await prisma.todo.update({

// })
// })


export default blogRoute