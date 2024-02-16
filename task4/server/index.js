import express from 'express'
import mongoose from "mongoose";
import router from "./routes/router.js";
import cors from 'cors'

const PORT = 5000;
const DB_URL = "mongodb+srv://bambo20023:bambo@voices1passive.fvnyiid.mongodb.net/?retryWrites=true&w=majority"
const app = express()

app.use(cors());
app.use(express.json())
app.use('/api', router)
async function startApp(){
        await mongoose.connect(DB_URL)
       await app.listen(PORT, () => console.log('server started on port: ' + PORT) )
    }



startApp()
    .catch((error) => {
    console.log(error)
})

