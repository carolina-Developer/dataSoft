const express = require('express');
const { route } = require('../../app');
const router = express.Router();

var catalogosModel	= require('../modelos/catalogosModel');

//-----------------------------------------------------------------------------------------------------
// LISTAR
module.exports = function()
{
    router.get("/", function (req, res)
    {
        catalogosModel.getCatalogo(function(error, data)
        {
            res.status(200).json(data);
        });
    });
    
    return router;

}


//-------------------------------------------------------------------------------------------------------------------------------
// MOSTRAR CATALOGO POR LLAVE

router.get("/:id", function (req, res)
{
    var id = req.params.id;

    if(!isNaN(id))
    {
        catalogosModel.getCatalogos(id, function (error, data)
        {
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).json(data);
            }
            else
            {
                res.json(404, {"msg": "Registro no existe"});
            }
        
        });
    }
    else
    {
        res.status(500).json({"msg":"error"});
    }
    
});


//-------------------------------------------------------------------------------------------------------------------------------
// MOSTRAR CATALOGO POR ID

router.get("/catalo/:id", function (req, res)
{
    var id = req.params.id;

    if(!isNaN(id))
    {
        catalogosModel.getCatalogosId(id, function (error, data)
        {
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).json(data);
            }
            else
            {
                res.json(404, {"msg": "Registro no existe"});
            }
        
        });
    }
    else
    {
        res.status(500).json({"msg":"error"});
    }
    
});

//----------------------------------------------------------------------------------------------------------
// CREAR

router.post("/", function(req, res)
{
    var catalogoData =
    {
        idCatalogo: null,
        nombreCat: req.body.nombreCat,
        tipoCatalogo: req.body.tipoCatalogo,
        llaveForanea: req.body.llaveForanea
    };
  
    catalogosModel.insertCat(catalogoData, function(error, data)
    {
        if(data)
        {
            res.status(200).json(data);
        }
        else
        {
            res.status(500).send({error: "boo:("});
        }
    });
});

//-----------------------------------------------------------------------------------------------------
// MODIFICAR

router.put("/", function(req,res)
{
    var catalogoData = 
    {
        idCatalogo: req.body.idCatalogo,
        nombreCat: req.body.nombreCat,
        tipoCatalogo: req.body.tipoCatalogo,
        llaveForanea: req.body.llaveForanea
    };
    
    catalogosModel.updateCat(catalogoData, function(error, data)
    {
        if(data && data.msg)
        {
            res.status(200).json(data);
        }
        else
        {
            res.status(500).send({error:"boo:("});
        }
    });
});

