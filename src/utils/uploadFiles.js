import multer from "multer";
import path from "path";
import fs from "fs";
import error from "../errors/customErrors.js";

export const ensureDirectoriesExist = () => {
  const directories = ["public/uploads/profiles", "public/uploads/products", "public/uploads/documents"];
  directories.forEach((dir) => {
    console.log(dir);
    if (!fs.existsSync(dir)) {
      console.log(dir);
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

ensureDirectoriesExist();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  
    if (file.fieldname === "profile") {
      cb(null, "./public/uploads/profiles");
    } else if (file.fieldname === "documents") {
      cb(null, "./public/uploads/documents");
    } else if (file.fieldname === "imgProducts") {
      cb(null, "./public/uploads/products");
    } else {
      cb(error.badRequestError("Invalid fieldname"), null);
    }
  },

  filename: function (req, file, cb) {
    // Esta función se encarga de renombrar el archivo
    const userId = req.user._id;
    const extension = path.extname(file.originalname); // Esto obtiene la extension del archivo subido
    const basename = path.basename(file.originalname, extension); // Esto obtiene el nombre del archivo sin la extension
    cb(null, `${basename}-${userId}${extension}`);
  },
});

export const upload = multer({ storage: storage });
