import { config } from "dotenv";


//path to retrive
config({ path: ".env" });

//retrievs the detail from .env file

export const PORT = <string>process.env.PORT;
export const DBURL = <string>process.env.DBURL;
export const MAIL = <string>process.env.MAIL;
export const PASSWORD = <string>process.env.PASSWORD;
