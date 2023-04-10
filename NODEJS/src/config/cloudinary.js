import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: "dbktpvcfz",
  api_key: "773215578244178",
  api_secret: "oAgf-8gPwG7e49wC-GuoaMYegCs",
});

export default cloudinary;
