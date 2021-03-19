import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
import protectedRouter from "./routes/protected";
import route from "./routes";
import gameRouter from "./routes/games";
import profileRouter from "./routes/profile";
// import protectedRouter from "./routes/protected";
const app = express();
// middleware for parsing bodies from URL
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

//with the credentials config above for cors:
//we don't need
// "Access-Control-Allow-Origin": "*",
//in now.json headers
//https://stackoverflow.com/questions/19743396/cors-cannot-use-wildcard-in-access-control-allow-origin-when-credentials-flag-i

console.log("NODE ENV", process.env.NODE_ENV);
app.use("/api/test", (req, res) => {
    res.send("hi");
});
app.use("/api", protectedRouter);
app.use("/api", route);
app.use("/api", gameRouter);
app.use("/api", profileRouter);
// app.use("/", protectedRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
