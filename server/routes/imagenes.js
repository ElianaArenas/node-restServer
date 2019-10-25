const express = require('express');
const path = require('path');
const fs = require('fs');
const {verificaToken,verificaTokenImg} = require('../middlewares/autenticacion');

let app = express();

app.get('/imagen/:tipo/:img',verificaTokenImg,(req,res)=>{

    let tipo = req.params.tipo;
    let img = req.params.img;
    let kyaraImg = path.resolve(__dirname,'../assets/kyara.png')
    let pathImagen = path.resolve(__dirname,`../../uploads/${tipo}/${img}`);

    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen);
    }else{
        res.sendFile(kyaraImg);
    }
   
});


module.exports = app;