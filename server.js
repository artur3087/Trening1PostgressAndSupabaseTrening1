// Importing necessary things below: //

import express from "express";
import cors from "cors";
import pg from "pg";   // pg is a postgress //
import dotenv from "dotenv";

// Running dotenv below, which allow us to use the environment's variables //

dotenv.config() 

// coding / declaring PORT below //

const PORT = 8080;

// declaring app variable and its functionality below: //

const app = express()
app.use(cors());



// Connecting to database below: //  NOT SECURE METHOD BELOW // This needs to be done in seperated file //
const dbConnectionString = process.env.DATABASE_URL
export const db = new pg.Pool({connectionString: dbConnectionString});



// Creating endpoints below: //

// Checks //
app.get("/", (request, response) => { // This function is runned whenever someone is going to endpoint "/" with get method // This function automatically takes requests and responses //
    response.json("This is my root route, dude!")  // Here I coded a response to request //
});
// Making request to my API for real below //

app.get("/horrors", async (request, response) => {   // Here I have to change it to async function //
    const result = await db.query("SELECT * FROM horrors");
    response.json(result.rows);  // Instead RETURN I need to use response.json here //
});



// Below: starting my server. Making it listen on specific PORT declared above //

// FIRST method of doinn this below //

// app.listen(PORT, function() {
//     console.log("App is running on PORT 8080")
// })

// SECOND method of doing this, by using ARROW FUNCTIONS below: //

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`)) // THIS start listening to PORT and run a FUNCTION, which gives information in console that App is listening on this PORT (here number 8080) //
// $ sign allow using variables above // REMEMBER TO USE ` instead "" //

// When going into browser and localhost:8080 we will get error 'Cannot GET /'. This is good because it means that it works enough to show this notification. If we will type in URL something else, it will give nothing to us like that //



