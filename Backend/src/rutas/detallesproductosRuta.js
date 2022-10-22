const express = require('express');
const { route } = require('../../app');
const router = express.Router();

var detallesproductoModel	= require('../modelos/detallesproductosModel');

//-----------------------------------------------------------------------------------------------------
// LISTAR

module.exports = function()
{
    router.get("/", function (req, res)
    {
        detallesproductoModel.getDetalleProducto(function(error, data)
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
        detallesproductoModel.getDetalleProd(id, function (error, data)
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
    var detalleProdData =
    {
        idDetalleProducto: null,
        idProducto: req.body.idProducto,
        idMaterial: req.body.idMaterial,
        observacionesProducto: req.body.observacionesProducto,
        cantidad: req.body.cantidad
    };
   
    detallesproductoModel.insertDetalleProducto(detalleProdData, function(error, data)
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
    var detalleProData = 
    {
        idDetalleProducto: req.body.idDetalleProducto,
        idProducto: req.body.idProducto,
        idMaterial: req.body.idMaterial,
        observacionesProducto: req.body.observacionesProducto,
        cantidad: req.body.cantidad 
    };

    detallesproductoModel.updateDetalleProducto(detalleProData, function(error, data)
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

