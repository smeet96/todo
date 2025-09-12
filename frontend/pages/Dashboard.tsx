import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useEffect, useState } from "react"
import axios from "axios"


export const Dashboard = () => {
    const [title , setTitle] = useState()
    const [description , setDescription] = useState()

// useEffect (()=> {
//     const token = localStorage.getItem("token")
// })
console.log("Token from localStorage:", localStorage.getItem("token"));

return (
    <div className=" ">
        <div>
        <Input placeholder="study" label="Title" type="text" onChange={(e:any)=> {
         setTitle(e.target.value)
        }}/>
        <Input placeholder="math 2nd lesson revise" label="Description" type="text" onChange={(e:any) => {
            setDescription(e.target.value)
        }}/>
        <div className="pt-4">
        <Button button="Create todo" onClick={ async ()=> {
        await axios.post("http://localhost:3000/api/v1/blog/create" , {
            title,
            description,
        } , {
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        }
    )
        }}/>
        </div>
        </div>
        
    </div>
)
}

export default Dashboard