import z from "zod";

const userschema = z.object({
    name : z.string() ,
    password : z.string() ,
    email : z.email()
})

const blogschema = z.object({
    title : z.string(),
    description : z.string(),
    done : z.boolean() ,
    authorid : z.number()
})

export {userschema , blogschema}
