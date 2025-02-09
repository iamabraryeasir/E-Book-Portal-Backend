import multer from "multer";
import crypto from "node:crypto";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/temp/");
  },
  filename: function (req, file, cb) {
    const uniqueString = crypto.randomBytes(32).toString("hex");
    const fileExtension = file.originalname.split(".").pop();
    cb(null, `${uniqueString}.${fileExtension}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10mb in bytes
});
