const express = require('express');
const { route } = require('../../app');
const router = express.Router();

var materialModel= require('../modelos/materialesModel');

//-----------------------------------------------------------------------------------------------------
// LISTAR
module.exports = function()
{
    router.get("/", function (req, res)
    {
        materialModel.getMaterial(function(error, data)
        {
            res.status(200).json(data);
        });
    });
    
    return router;

}


//-------------------------------------------------------------------------------------------------------------------------------
// MOSTRAR

router.get("/:id", function (req, res)
{
    var id = req.params.id;

    if(!isNaN(id))
    {
        materialModel.getMateriales(id, function (error, data)
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
    var materialData =
    {
        idMaterial: null,
        nombreMaterial: req.body.nombreMaterial,
        tipoMaterial: req.body.tipoMaterial,
        colorMaterial: req.body.colorMaterial,
        existencias: req.body.existencias
    };
   
    materialModel.insertMaterial(materialData, function(error, data)
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
    var materialData = 
    {
        idMaterial: req.body.idMaterial,
        nombreMaterial: req.body.nombreMaterial,
        tipoMaterial: req.body.tipoMaterial,
        colorMaterial: req.body.colorMaterial,
        existencias: req.body.existencias
    };

    materialModel.updateMaterial(materialData, function(error, data)
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

