const conexion = require("../conexion");
const connection = require("../conexion");

var encargadosModel = {};

//-------------------------------------------------------------------------------------------------------
// LISTAR

encargadosModel.getEncargados = function (callback)
{
    if(connection)
    {
        var sql =   "SELECT E.`idEncargado`, " +
                    "CONCAT(E.`primerNom`, ' ', E.`segNom`, ' ', E.`primApellido`, ' ', E.`segApellido`) AS 'encargado', " +
                    "C.`nombreCat` AS 'tipIdent', " +
                    "E.`numIdentificacion`, " +
                    "date_format(E.`fechaNacimiento`, '%d-%m-%Y') AS 'FechaNacimiento', " +
                    //"E.`fechaNacimiento`, " +
                    "D.`nombreCat` AS 'eps', " +
                    "E.`sueldo` " +
                    "FROM `encargados` AS E " +
                    "INNER JOIN `catalogos` AS C ON E.`tipoIdentificacion` = C.`idCatalogo` " +
                    "INNER JOIN `catalogos` AS D ON E.`eps` = D.`idCatalogo` " +
                    "ORDER BY `idEncargado`;";
                    
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
// MOSTRAR

encargadosModel.getEncargado = function (id, callback)
{
    if(connection)
    {
        var sql =   "SELECT E.`idEncargado`, " +
                    "CONCAT(E.`primerNom`, ' ', E.`segNom`, ' ', E.`primApellido`, ' ', E.`segApellido`) AS 'encargado', " +
                    "C.`nombreCat` AS 'tipIdent', " +
                    "E.`numIdentificacion`, " +
                    "date_format(E.`fechaNacimiento`, '%d-%m-%Y') AS 'FechaNacimiento', " +
                    //"E.`fechaNacimiento`, " +
                    "D.`nombreCat` AS 'eps', " +
                    "E.`sueldo` " +
                    "FROM `encargados` AS E " +
                    "INNER JOIN `catalogos` AS C ON E.`tipoIdentificacion` = C.`idCatalogo` " +
                    "INNER JOIN `catalogos`AS D ON E.`eps` = D.`idCatalogo` " +
                    "WHERE idEncargado = " + connection.escape(id) + ";";
        
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
//CREAR

encargadosModel.insertEncargado = function (encargadoData, callback)
{
    if(connection)
    {
        var sql = "INSERT INTO encargados SET ?"; 

        connection.query(sql, encargadoData, function (error, result)
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
//MODIFICAR

encargadosModel.updateEncargado = function (encargadoData, callback)
{
    if(connection)
    {
        var sql = "UPDATE encargados SET idEncargado = " + 
            connection.escape(encargadoData.idEncargado)
            + ", primerNom = " +
            connection.escape(encargadoData.primerNom)
            + ", segNom = " +
            connection.escape(encargadoData.segNom)
            + ", primApellido = " +
            connection.escape(encargadoData.primApellido)
            + ", segApellido = " +
            connection.escape(encargadoData.segApellido)
            + ", tipoIdentificacion = " +
            connection.escape(encargadoData.tipoIdentificacion)
            + ", numIdentificacion = " +
            connection.escape(encargadoData.numIdentificacion)
            + ", fechaNacimiento = " +
            connection.escape(encargadoData.fechaNacimiento)
            + ", eps = " +
            connection.escape(encargadoData.eps) 
            + ", sueldo = " +
            connection.escape(encargadoData.sueldo)
            + " WHERE idEncargado = " +
            connection.escape(encargadoData.idEncargado) + ";";
        
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

//------------------------------------------------------------------------------------------------------------
module.exports = encargadosModel;