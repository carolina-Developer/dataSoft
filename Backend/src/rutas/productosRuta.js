const express = require('express');
const router = express.Router();

var productosModel	= require('../modelos/productosModel');

//-----------------------------------------------------------------------------------------------------
// LISTAR
module.exports = function()
{
    router.get("/", function (req, res)
    {
        productosModel.getProducto(function(error, data)
        {
            res.status(200).json(data);
        });
    });
    
    return router;

}


//-------------------------------------------------------------------------------------------------------------------------------
// MOSTRAR ID

router.get("/:id", function (req, res)
{
    var id = req.params.id;

    if(!isNaN(id))
    {
        productosModel.getProductos(id, function (error, data)
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
    var productoData =
    {
        idProducto: null,
        nombreProducto: req.body.nombreProducto,
        tipoProducto: req.body.tipoProducto,
        talla: req.body.talla,
        color: req.body.color
    };
   
    productosModel.insertProducto(productoData, function(error, data)
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
    var productoData = 
    {
        idProducto: req.body.idProducto,
        nombreProducto: req.body.nombreProducto,
        tipoProducto: req.body.tipoProducto, 
        talla: req.body.talla,
        color: req.body.color
    };

    productosModel.updateProducto(productoData, function(error, data)
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

//-------------------------------------------------------------------------------------------------------------------------------
// MOSTRAR TALLA

router.get("/talla/:id", function (req, res)
{
    var id = req.params.id;

    if(!isNaN(id))
    {
        productosModel.getProductosTalla(id, function (error, data)
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

//-----------------------------------------------------------------------------------------------
// INFORME DE CAMISETAS POR TALLA EN UN PERIODO DE TIEMPO

router.get("/:id/:fechaIn/:fechaFi", function (req, res)
{
    var id = req.params.id;
    var fechaIn = req.params.fechaIn;
    var fechaFi = req.params.fechaFi;

    if(!isNaN(id))
    {
        productosModel.getInformeP(id, fechaIn, fechaFi, function (error, data)
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
