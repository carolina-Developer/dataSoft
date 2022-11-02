const express = require('express');
const router = express.Router();

var contactosModel	= require('../modelos/contactosModel');

//-----------------------------------------------------------------------------------------------------
// LISTAR

module.exports = function()
{
    router.get("/", function (req, res)
    {
        contactosModel.getContactos(function(error, data)
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
        contactosModel.getContacto(id, function (error, data)
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

router.get("/contac/:id", function (req, res)
{
    var id = req.params.id;

    if(!isNaN(id))
    {
        contactosModel.getContactoFront(id, function (error, data)
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
    var contactoData =
    {
        idContacto: null,
        idEncargado: req.body.idEncargado,
        dato: req.body.dato,
        tipoDato: req.body.tipoDato

    };
    
    contactosModel.insertContacto(contactoData, function(error, data)
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
    var contactoData = 
    {
        idContacto: req.body.idContacto,
        idEncargado: req.body.idEncargado,
        dato: req.body.dato,
        tipoDato: req.body.tipoDato
    };
    
    contactosModel.updateContacto(contactoData, function(error, data)
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
// MOSTRAR ENCARGADO

router.get("/encargado/:id", function (req, res)
{
    var id = req.params.id;

    if(!isNaN(id))
    {
        contactosModel.getContactoEncargado(id, function (error, data)
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

