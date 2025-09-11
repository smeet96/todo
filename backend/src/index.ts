import userRouter from "./routes/User";
import blogRoute from "./routes/Blog";
import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();
const app = express();
const pass = process.env.JWT_PASSWORD!;


declare module "express-serve-static-core" {
  interface Request {
    id?: string;
  }
}

const corsOptions = {
origin: 'http://localhost:5173',
credentials: true,
optionSuccessStatus: 200
};

app.use(cors(corsOptions))

app.use("/api/v1/blog/", (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json("unauthorized");
  }

  const token = auth.split(" ")[1]; 
  try {
    const decoded = jwt.verify(token, pass) as { id: string };
    req.id = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json("invalid or expired token");
  }
});


app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
