const fs = require('fs');

module.exports  = async function (req, res, next) {
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).send({ msg: "no files selected" });
    }
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (
        file.mimetype !== "image/jpg" &&
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/gif" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).send({
            msg:"Unsupported format!"
        });
      }
      if(file.size>1024*1024*5){
        removeTmp(file.tempFilePath);
        return res.status(400).send({
            msg:"file size too high"
        });
      }
    });
    next();

  } catch (error) {
    return res.status(500).send({
        msg:error.message
    })
  }
};

function removeTmp(path){
    fs.unlink(path,(error)=>{
        if(error){
            throw error;
        }
    })
}
