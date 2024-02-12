import express from 'express'
import mongoose from "mongoose";
import router from "./routes/router.js";
import User from "./models/user.js";

const PORT = 5000;
const DB_URL = "mongodb+srv://bambo20023:bambo@voices1passive.fvnyiid.mongodb.net/?retryWrites=true&w=majority"
const app = express()

app.use(express.json())
app.use('/api', router)
async function startApp(){
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('server started on port: ' + PORT) )
    }



startApp()
    .catch((error) => {
    console.log(error)
})
