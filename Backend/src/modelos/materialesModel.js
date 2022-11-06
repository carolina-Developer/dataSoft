const conexion = require("../conexion");
const connection = require("../conexion");

var materialModel = {};

//-------------------------------------------------------------------
//LISTAR

materialModel.getMaterial = function(callback)
{
    if(connection){

        var sql =   "SELECT M.`idMaterial`, " +
                    "M.`nombreMaterial`, " + 
                    "C.`nombreCat` AS 'tipoMaterial', " + 
                    "D.`nombreCat` AS 'colorMaterial', " + 
                    "M.`existencias` " + 
                    "FROM `materiales` AS M "+
                    "INNER JOIN `catalogos` AS C ON M.`tipoMaterial` = C.`idCatalogo` " +
                    "INNER JOIN `catalogos` AS D ON M.`colorMaterial` = D.`idCatalogo`" +
                    "ORDER BY `idMaterial`;"; 


        connection.query(sql,function(error,rows)
        {
            if(error){
                throw error;
            }else{

                callback(null,rows);
            }
        });
    }
}

//-------------------------------------------------------------------
// MOSTRAR 

materialModel.getMateriales = function(id, callback)
{
    if(connection)
    {
        
        var sql =   "SELECT M.`idMaterial`, " +
                    "M.`nombreMaterial`, " + 
                    "C.`nombreCat` AS 'TipoMaterial', " + 
                    "M.`tipoMaterial`, " +
                    "D.`nombreCat` AS 'ColorMaterial', " + 
                    "M.`colorMaterial`, " +
                    "M.`existencias` " + 
                    "FROM `materiales` AS M "+
                    "INNER JOIN `catalogos` AS C ON M.`tipoMaterial` = C.`idCatalogo` " +
                    "INNER JOIN `catalogos` AS D ON M.`colorMaterial` = D.`idCatalogo`" +
                    "WHERE idMaterial = " + connection.escape(id) + ";";
        
        connection.query(sql,function(error, rows)
        {
            if(error){
                throw error;
            }else{

                callback(null,rows);
            }
        });
    }
}

//-------------------------------------------------------------------
//CREAR

materialModel.insertMaterial = function(materialData,callback)
{
    if(connection)
    {
        
        var sql = "INSERT INTO materiales  SET ?";

        connection.query(sql, materialData, function(error, result)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg":"Registro Insertado"});
            }
        });
    }
}

//-------------------------------------------------------------------
// MODIFICAR

materialModel.updateMaterial = function(materialData, callback)
{
    if(connection){
        
    var sql = "UPDATE materiales SET idMaterial = " + 
        connection.escape(materialData.idMaterial)
        + ", nombreMaterial = " +
        connection.escape(materialData.nombreMaterial)
        + ", tipoMaterial = " +
        connection.escape(materialData.tipoMaterial)
        + ", colorMaterial = " +
        connection.escape(materialData.colorMaterial)
        + ", existencias = " +
        connection.escape(materialData.existencias)
        + " WHERE idMaterial = " +
        connection.escape(materialData.idMaterial) + ";";


        connection.query(sql, function(error, result)
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

//--------------------------------------------------------------------------
module.exports = materialModel;