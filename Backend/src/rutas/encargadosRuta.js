const express = require('express');
const router = express.Router();

var encargadosModel	= require('../modelos/encargadosModel');

//-----------------------------------------------------------------------------------------------------
// LISTAR

module.exports = function()
{
    router.get("/", function (req, res)
    {
        encargadosModel.getEncargados(function(error, data)
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
        encargadosModel.getEncargado(id, function (error, data)
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
// MOSTRAR FRONT-END

router.get("/encarg/:id", function (req, res)
{
    var id = req.params.id;

    if(!isNaN(id))
    {
        encargadosModel.getEncargadoFront(id, function (error, data)
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
    var encargadoData =
    {
        idEncargado: null,
        primerNom: req.body.primerNom,
        segNom: req.body.segNom,
        primApellido: req.body.primApellido,
        segApellido: req.body.segApellido,
        tipoIdentificacion: req.body.tipoIdentificacion,
        numIdentificacion: req.body.numIdentificacion,
        fechaNacimiento: req.body.fechaNacimiento,
        eps: req.body.eps,
        sueldo: req.body.sueldo
        
    };
    
    encargadosModel.insertEncargado(encargadoData, function(error, data)
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
    var encargadoData = 
    {
        idEncargado: req.body.idEncargado,
        primerNom: req.body.primerNom,
        segNom: req.body.segNom,
        primApellido: req.body.primApellido,
        segApellido: req.body.segApellido,
        tipoIdentificacion: req.body.tipoIdentificacion,
        numIdentificacion: req.body.numIdentificacion,
        fechaNacimiento: req.body.fechaNacimiento,
        eps: req.body.eps,
        sueldo: req.body.sueldo
    };
    
    encargadosModel.updateEncargado(encargadoData, function(error, data)
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


