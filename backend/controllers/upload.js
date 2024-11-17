const cloudinary = require("cloudinary");
const { error } = require("console");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRET,
});
const uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      const url = await uploadCloudinary(file, path);
      images.push(url);
      removeTemp(file.tempFilePath);
    }
    res.send(images);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const uploadCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTemp(file.tempFilePath);
          return res.status(400).send({
            message: "upload image failed",
          });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const removeTemp = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw err;
    }
  });
};

// In listImages
// expression(path) it will do search in the give expression
// execute() it will run the following code

const listImages = async (req, res) => {
    const { path, max, sort } = req.body;
    cloudinary.v2.search
      .expression(path) // Cloudinary prefers string
      .sort_by("created_at", sort)
      .max_results(max)
      .execute()
      .then((result) => {
        res.json(result); // Changed 'res' to 'result'
      })
      .catch((err) => {
        res.status(500).json({ error: err.error.message }); // Sending an error response
      });
    
};

module.exports = {
  uploadImages,
  listImages,
};
