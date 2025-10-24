const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config(); // ✅ Load .env file first

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Create Storage Engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "printease_uploads", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "pdf", "docx"],
    resource_type: "auto", // ✅ Important for PDFs and DOCX
  },
});

// ✅ Initialize Multer
const parser = multer({ storage });

module.exports = { cloudinary, parser };
