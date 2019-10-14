const express = require('express');

let { verificaToken, verificaAdmRol } = require('../middlewares/autenticacion');

let app = express();

const Categoria = require('../models/categoria');

//===================================
// Mostrar todas las categorias
// ==================================
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario','nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categorias
            });
        });
});

//===================================
// Mostrar Una categoria por ID
// ==================================
app.get('/categoria/:id', verificaToken, (req, res) => {
    
    let id = req.params.id;

    Categoria.findById(id,(err,categoriaDB)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err:{
                    message:'El id no es valido'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

//===================================
// Mostrar Una categoria por ID
// ==================================
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

//===================================
// Mostrar Una categoria por ID
// ==================================
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let desCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, desCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

//===================================
// Mostrar Una categoria por ID
// ==================================
app.delete('/categoria/:id', [verificaToken, verificaAdmRol], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria borrada'
        });



    });
});
module.exports = app;