const conexion = require("../conexion");
const connection = require("../conexion");

var produccionModel = {};

//-------------------------------------------------------------------------------------------------------
// LISTAR
produccionModel.getProduccion = function (callback)
{
    if(connection)
    {
        var sql =   "SELECT P.`idProduccion`, " +
                    "CONCAT(E.`primerNom`,' ',E.`segNom`, ' ',E.`primApellido`, ' ',E.`segApellido`) AS 'nombreEncargado', " +
                    "P.`noProductosMalos`, " +
                    "P.`total`- P.`noProductosMalos` AS 'noProductosBuenos', " +
                    "O.`nombreProducto`, " +
                    "date_format(p.`fecha`, '%d-%m-%Y') AS 'fecha', " +
                    "P.`total` " +
                    "FROM	`produccion` AS P " +
                    "INNER JOIN `encargados` AS E ON P.`idEncargado` = E.`idEncargado` " +
                    "INNER JOIN `productos` AS O ON P.`idProducto` = O.`idProducto` " + 
                    "ORDER BY `idProduccion`;";
                    
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
//--------------------------------------------------------------------------------------------------
//MOSTRAR

produccionModel.getTipoProduccion = function (id, callback)
{
    if(connection)
    {
        var sql =   "SELECT P.`idProduccion`, " +
                    "CONCAT(E.`primerNom`,' ',E.`segNom`, ' ',E.`primApellido`, ' ',E.`segApellido`) AS 'nombreEncargado', " +
                    "P.`noProductosMalos`, " +
                    "P.`total`- P.`noProductosMalos` AS 'noProductosBuenos', " +
                    "O.`nombreProducto`, " +
                    "date_format(p.`fecha`, '%d-%m-%Y') AS 'fecha', " +
                    "P.`total` " +
                    "FROM	`produccion` AS P " +
                    "INNER JOIN `encargados` AS E ON P.`idEncargado` = E.`idEncargado` " +
                    "INNER JOIN `productos` AS O ON P.`idProducto` = O.`idProducto` " + 
                    "WHERE idProduccion = " + connection.escape(id) + ";";
            
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

produccionModel.insertProduccion = function (produccionData, callback)
{
    if(connection)
    {
        var sql = "INSERT INTO produccion SET ?"; 

        connection.query(sql, produccionData, function (error, result)
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

produccionModel.updateProduccion = function (produccionData, callback)
{
    if(connection)
    {
        var sql = "UPDATE produccion SET idEncargado = " + 
            connection.escape(produccionData.idEncargado)
            + ", noProductosMalos = " +
            connection.escape(produccionData.noProductosMalos)
            + ", idProducto = " +
            connection.escape(produccionData.idProducto)
            + ", fecha = " +
            connection.escape(produccionData.fecha)
            + ", total = " +
            connection.escape(produccionData.total)
            + " WHERE idProduccion = " +
            connection.escape(produccionData.idProduccion) + ";";
        
        connection.query(sql, function (error, result)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg":"Registro Actualizado Exitosamente"});
            }
        });
    }
}

//-----------------------------------------------------------------------------------------------------------------
// INFORME DE CONFECCION POR ENCARGADO EN UN PERIODO DE TIEMPO 

produccionModel.getInforme = function (id, fechaIn, fechaFi, callback)
{
    if(connection)
    {
        var sql =   "SELECT P.`idProduccion`, " +
                    "CONCAT(A.`primerNom`, ' ', A.`segNom`, ' ', A.`primApellido`, ' ', A.`segApellido`) AS 'encargado', " +
                    "P.`noProductosMalos`, " +
                    "P.`total`- P.`noProductosMalos` AS 'noProductosBuenos', " +
                    "B.`nombreProducto` AS 'idProducto', " +
                    "date_format(P.`fecha`, '%d-%m-%Y') AS 'Fecha', " +
                    "P.`total` " +
                    "FROM `encargados` AS E, " +
                    "`produccion` AS P " +
                    "INNER JOIN `productos` AS B ON B.`idProducto` = P.`idProducto` " +
                    "INNER JOIN `encargados` AS A ON A.`idEncargado` = P.`idEncargado` " +
                    "WHERE P.`idEncargado` = E.`idEncargado` " +
                    "AND E.`idEncargado` = " + connection.escape(id) + 
                    "AND P.`fecha` BETWEEN " + connection.escape(fechaIn) + "AND" + connection.escape(fechaFi) + ";";
        
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
//---------------------------------------------------------------------------------------------------------------------
module.exports = produccionModel;