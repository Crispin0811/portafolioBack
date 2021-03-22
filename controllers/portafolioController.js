const cloudinary = require("../config/cloudinary");
const Portafolio = require("../models/portafolioModel");
const fs = require("fs");

const getPortafolios = async (req, res) => {
  try {
    const portafolios = await Portafolio.findAll();

    return res.json({
      mensaje: "Todo OK",
      portafolios,
    });
  } catch (error) {
    return res.status(404).json({
      mensaje: "Algo salio mal",
      error,
    });
  }
};
const addPortafolio = async (req, res) => {
  const uploader = async (path) =>
    await cloudinary.uploads(path, "Portafolio/imagenes");

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    // console.log(urls);

    let urlImgs = "";
    if (urls[0] != undefined) {
      urlImgs = urls[0].url;
    } else {
      urlImgs = undefined;
    }

    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const urlGit = req.body.urlGit;
    const tipo = req.body.tipo;
    const urlImg = urlImgs;

    Portafolio.create({
      titulo,
      descripcion,
      urlGit,
      urlImg,
      tipo,
    })
      .then(() => {
        return res.json({
          mensaje: "ok guardado",
        });
      })
      .catch((e) => {
        console.log(e);
      });

    
  } else {
    return res.json({
      mensaje: "falla guardado",
    });
  }
};

module.exports = {
  getPortafolios,
  addPortafolio,
};
