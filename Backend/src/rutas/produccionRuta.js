const express = require('express');
const { route } = require('../../app');
const router = express.Router();

var produccionModel	= require('../modelos/produccionModel');

//-----------------------------------------------------------------------------------------------------
// LISTAR

module.exports = function()
{
    router.get("/", function (req, res)
    {
        produccionModel.getProduccion(function(error, data)
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
        produccionModel.getTipoProduccion(id, function (error, data)
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
    var produccionData =
    {
        idProduccion: null,
        idEncargado: req.body.idEncargado,
        noProductosMalos: req.body.noProductosMalos,
        idProducto: req.body.idProducto,
        fecha: req.body.fecha,
        total: req.body.total
    };
    
    produccionModel.insertProduccion(produccionData, function(error, data)
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
    var produccionData = 
    {
        idProduccion: req.body.idProduccion,
        idEncargado: req.body.idEncargado,
        noProductosMalos: req.body.noProductosMalos,
        idProducto: req.body.idProducto,
        fecha: req.body.fecha,
        total: req.body.total 
    };

    produccionModel.updateProduccion(produccionData, function(error, data)
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

//-----------------------------------------------------------------------------------------------
// INFORME DE CONFECCION POR ENCARGADO EN UN PERIODO DE TIEMPO 

router.get("/:id/:fechaIn/:fechaFi", function (req, res)
{
    var id = req.params.id;
    var fechaIn = req.params.fechaIn;
    var fechaFi = req.params.fechaFi;

    if(!isNaN(id))
    {
        produccionModel.getInforme(id, fechaIn, fechaFi, function (error, data)
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