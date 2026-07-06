import dotenv from "dotenv"
dotenv.config();
import express, { Express } from "express";
import { connectDB } from "./config/database";
import cors from "cors"
import { clientRoutes } from "./routes/client/index.routes";


const server = async () => {
  const app: Express = express();
  const port = process.env.PORT || 3000;

  await connectDB();

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cors())

  clientRoutes(app)

  app.listen(port, () => {
    console.log(`App is listening on port: ${port}`)
  })
}

server();