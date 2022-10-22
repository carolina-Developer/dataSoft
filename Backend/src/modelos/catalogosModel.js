const connection = require("../conexion");

var catalogosModel = {};

//-------------------------------------------------------------------------------------------------------
// LISTAR

catalogosModel.getCatalogo = function (callback)
{
    if(connection)
    {
        var sql =   "SELECT C.`idCatalogo`, " + 
                    "C.`nombreCat`, "+
                    //"C.`tipoCatalogo`, " +
                    "D.`nombreCat`  AS 'catalogo' " +
                    " FROM `catalogos` AS C " +
                    "INNER JOIN `catalogos` AS D ON C.`llaveForanea` = D.`idCatalogo` " +
                    "ORDER BY `idCatalogo`;";

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
// MOSTRAR CATALOGO

catalogosModel.getCatalogos = function (id, callback)
{
    if(connection)
    {
        var sql =   "SELECT C.`idCatalogo`, " + 
                    "C.`nombreCat`, "+
                    //"C.`tipoCatalogo`, " +
                    "D.`nombreCat`  AS 'catalogo' " +
                    "FROM `catalogos` AS C " +
                    "INNER JOIN `catalogos` AS D ON C.`llaveForanea` = D.`idCatalogo` " +
                    "WHERE C.llaveForanea = " + connection.escape(id) + ";";

        console.log("Estamos aca 14 " + id);
        
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

catalogosModel.insertCat = function (catalogoData, callback)
{
    if(connection)
    {
        var sql = "INSERT INTO catalogos SET ?"; 

        connection.query(sql, catalogoData, function (error, result)
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

catalogosModel.updateCat = function (catalogoData, callback)
{
    if(connection)
    {
        var sql = "UPDATE catalogos SET nombreCat = " + 
            connection.escape(catalogoData.nombreCat)
            + ", tipoCatalogo = " +
            connection.escape(catalogoData.tipoCatalogo)
            + ", llaveForanea = " +
            connection.escape(catalogoData.llaveForanea)
            + " WHERE idCatalogo = " +
            connection.escape(catalogoData.idCatalogo) + ";";
        
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
module.exports = catalogosModel;