const conexion = require("../conexion");
const connection = require("../conexion");

var contactosModel = {};

//-------------------------------------------------------------------------------------------------------
// LISTAR

contactosModel.getContactos = function (callback)
{
    if(connection)
    {
        var sql =   "SELECT C.`idContacto`, " +
                    "CONCAT(E.`primerNom`, ' ', E.`segNom`, ' ', E.`primApellido`, ' ', E.`segApellido`) AS 'encargado', " +
                    " C.`dato`, " +
                    "D.`nombreCat` AS 'tipoDato' " +
                    "FROM `contactos` AS C " + 
                    "INNER JOIN `encargados` AS E ON C.`idEncargado` = E.`idEncargado` " +
                    "INNER JOIN `catalogos` AS D ON C.`tipoDato` = D.`idCatalogo` " + 
                    " ORDER BY `idContacto`;";
                    
        connection.query(sql, function(error,rows)
        {
            if(error){
                throw error;
            }else{

                callback(null,rows);
                
            }
        });
    }
}

//----------------------------------------------------------------------------------------------------------------------------------
// MOSTRAR ID

contactosModel.getContacto = function (id, callback)
{
    if(connection)
    {
        var sql =   "SELECT C.`idContacto`, " +
                    "CONCAT(E.`primerNom`, ' ', E.`segNom`, ' ', E.`primApellido`, ' ', E.`segApellido`) AS 'encargado', " +
                    " C.`dato`, " +
                    "D.`nombreCat` AS 'tipoDato' " +
                    "FROM `contactos` AS C " + 
                    "INNER JOIN `encargados` AS E ON C.`idEncargado` = E.`idEncargado` " +
                    "INNER JOIN `catalogos` AS D ON C.`tipoDato` = D.`idCatalogo` " + 
                    "WHERE C.idContacto = " + connection.escape(id) + ";";
        
        //console.log("Estamos aca 14 " + id);
        
        connection.query(sql, function (error, rows)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null,rows);
                
            }
        });
    }
}

//----------------------------------------------------------------------------------------------------------------------------------
// CREAR

contactosModel.insertContacto = function (contactoData, callback)
{
    if(connection)
    {
        var sql = "INSERT INTO contactos SET ?"; 

        connection.query(sql, contactoData, function (error, result)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Registro Insertado"});
            }
        });
    }
}

//-----------------------------------------------------------------------------------------------------
// MODIFICAR

contactosModel.updateContacto = function (contactoData, callback)
{
    if(connection)
    {
        var sql = "UPDATE contactos SET idContacto = " + 
            connection.escape(contactoData.idContacto)
            + ", idEncargado = " +
            connection.escape(contactoData.idEncargado)
            + ", dato = " +
            connection.escape(contactoData.dato)
            + ", tipoDato = " +
            connection.escape(contactoData.tipoDato)
            + " WHERE idContacto = " +
            connection.escape(contactoData.idContacto) + ";";
        
        connection.query(sql, function (error, result)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg":"Registro Actualizado"});
            }
        });
    }
}

//----------------------------------------------------------------------------------------------------------------------------------
// MOSTRAR ENCARGADO

contactosModel.getContactoEncargado = function (id, callback)
{
    if(connection)
    {
        var sql =   "SELECT C.`idContacto`, " +
                    "CONCAT(E.`primerNom`, ' ', E.`segNom`, ' ', E.`primApellido`, ' ', E.`segApellido`) AS 'encargado', " +
                    " C.`dato`, " +
                    "D.`nombreCat` AS 'tipoDato' " +
                    "FROM `contactos` AS C " + 
                    "INNER JOIN `encargados` AS E ON C.`idEncargado` = E.`idEncargado` " +
                    "INNER JOIN `catalogos` AS D ON C.`tipoDato` = D.`idCatalogo` " + 
                    "WHERE E.idEncargado = " + connection.escape(id) + ";";
        
        //console.log("Estamos aca 14 " + id);
        
        connection.query(sql, function (error, rows)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null,rows);
                
            }
        });
    }
}
//------------------------------------------------------------------------------------------------------------
module.exports = contactosModel;