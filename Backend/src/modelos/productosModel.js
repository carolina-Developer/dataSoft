const conexion = require("../conexion");
const connection = require("../conexion");

var productosModel = {};

//-------------------------------------------------------------------
//LISTAR

productosModel.getProducto = function(callback)
{
    if(connection)
    {
        var sql =   "SELECT P.`idProducto`, " + 
                    "P.`nombreProducto`, " + 
                    "D.`nombreCat` AS 'tipoProducto', " +
                    "P.`talla`, " + 
                    "C.`nombreCat` AS 'color' " +
                    "FROM `productos` AS P " +
                    "INNER JOIN `catalogos` AS D ON P.`tipoProducto` = D.`idCatalogo` " +
                    "INNER JOIN `catalogos` AS C ON P.`color` = C.`idCatalogo` " +
                    "ORDER BY `idProducto`;";

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
//MOSTRAR ID

productosModel.getProductos = function(id, callback)
{
    if(connection)
    {
        
        var sql =   "SELECT P.`idProducto`, " + 
                    "P.`nombreProducto`, " + 
                    "P.`tipoProducto`, " +
                    "D.`nombreCat` AS 'tipoProducto', " +
                    "P.`talla`, " + 
                    "C.`nombreCat` AS 'color' " +
                    "FROM `productos` AS P " +
                    "INNER JOIN `catalogos` AS D ON P.`tipoProducto` = D.`idCatalogo` " +
                    "INNER JOIN `catalogos` AS C ON P.`color` = C.`idCatalogo` " +
                    "WHERE P.idProducto = " + connection.escape(id) + ";";

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

productosModel.insertProducto = function(productoData,callback)
{
    if(connection)
    {
        
        var sql = "INSERT INTO productos  SET ?";

        connection.query(sql, productoData, function(error, result)
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

productosModel.updateProducto = function(productoData, callback)
{
    if(connection){
        
    var sql = "UPDATE productos SET idProducto = " + 
        connection.escape(productoData.idProducto)
        + ", nombreProducto = " +
        connection.escape(productoData.nombreProducto)
        + ", tipoProducto = " +
        connection.escape(productoData.tipoProducto)
        + ", talla = " +
        connection.escape(productoData.talla)
        + ", color = " +
        connection.escape(productoData.color)
        + " WHERE idProducto = " +
        connection.escape(productoData.idProducto) + ";";


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

//-------------------------------------------------------------------
//MOSTRAR TALLA 

productosModel.getProductosTalla = function(id, callback)
{
    if(connection)
    {
        
        var sql =   "SELECT P.`idProducto`, " + 
                    "P.`nombreProducto`, " + 
                    "D.`nombreCat` AS 'tipoProducto', " +
                    "P.`talla`, " + 
                    "C.`nombreCat` AS 'color' " +
                    "FROM `productos` AS P " +
                    "INNER JOIN `catalogos` AS D ON P.`tipoProducto` = D.`idCatalogo` " +
                    "INNER JOIN `catalogos` AS C ON P.`color` = C.`idCatalogo` " +
                    "WHERE P.talla = " + connection.escape(id) + ";";

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

//-----------------------------------------------------------------------------------------------------------------
// INFORME DE CAMISETAS POR TALLA EN UN PERIODO DE TIEMPO

productosModel.getInforme = function(id, fechaIn, fechaFi, callback)
{
    if(connection)
    {
        
        var sql =   "SELECT P.`idProducto`, " + 
                    "P.`nombreProducto`, " + 
                    "D.`nombreCat` AS 'tipoProducto', " + 
                    "P.`talla`, " + 
                    "E.`nombreCat`AS 'color', " +
                    "date_format(C.`fecha`, '%d-%m-%Y') AS 'Fecha', " +  
                    "C.`noProductosMalos`, " +
                    "C.`total`- C.`noProductosMalos` AS 'noProductosBuenos', " + 
                    "C.`total`" +
                    "FROM `produccion` AS C, " +
                    "`productos` AS P " +
                    "INNER JOIN `catalogos` AS D ON P.`tipoProducto` = D.`idCatalogo` " + 
                    "INNER JOIN `catalogos` AS E ON P.`color` = E.`idCatalogo` " +
                    "WHERE P.`idProducto` = C.`idProducto` " +
                    "AND P.`talla` = " + connection.escape(id) + 
                    "AND C.`fecha` BETWEEN " + connection.escape(fechaIn) + "AND" + connection.escape(fechaFi) + 
                    "ORDER BY C.`fecha` ASC " + ";" ;
    
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

//-------------------------------------------------------------------------------------
module.exports = productosModel; 