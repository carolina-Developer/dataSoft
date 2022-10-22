const connection = require("../conexion");

var detallesproductoModel = {};

//-------------------------------------------------------------------------------------------------------
// LISTAR

detallesproductoModel.getDetalleProducto = function (callback)
{
    if(connection)
    {
        var sql =   "SELECT D.`idDetalleProducto`, " +
                    "P.`nombreProducto`, " +
                    "M.`nombreMaterial`, " +
                    "D.`observacionesProducto`, " +
                    "D.`cantidad` " +
                    "FROM `detallesproducto`AS D " +
                    "INNER JOIN `materiales` AS M ON D.idMaterial = M.idMaterial " +
                    "INNER JOIN `productos` AS P ON D.idProducto = P.idProducto " +
                    "ORDER BY `idDetalleProducto`;";
                    
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

detallesproductoModel.getDetalleProd = function (id, callback)
{
    if(connection)
    {
        var sql = "SELECT D.`idDetalleProducto`, " +
                "P.`nombreProducto`, " +
                "M.`nombreMaterial`, " +
                "D.`observacionesProducto`, " +
                "D.`cantidad` " +
                "FROM `detallesproducto`AS D " +
                "INNER JOIN `materiales` AS M ON D.idMaterial = M.idMaterial " +
                "INNER JOIN `productos` AS P ON D.idProducto = P.idProducto " +
                "WHERE idDetalleProducto = " + connection.escape(id) + ";";
        
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

detallesproductoModel.insertDetalleProducto = function (detalleProdData, callback)
{
    if(connection)
    {
        var sql = "INSERT INTO detallesproducto SET ?"; 

        connection.query(sql, detalleProdData, function (error, result)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Detalle del producto Insertado"});
            }
        });
    }
}

//-----------------------------------------------------------------------------------------------------
// MODIFICAR

detallesproductoModel.updateDetalleProducto = function (detalleProData, callback)
{
    if(connection)
    {
        var sql = "UPDATE detallesproducto SET idProducto = " + 
            connection.escape(detalleProData.idProducto)
            + ", idMaterial = " +
            connection.escape(detalleProData.idMaterial)
            + ", observacionesProducto = " +
            connection.escape(detalleProData.observacionesProducto)
            + ", cantidad = " +
            connection.escape(detalleProData.cantidad)
            + " WHERE idDetalleProducto = " +
            connection.escape(detalleProData.idDetalleProducto) + ";";
        
        connection.query(sql, function (error, result)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg":"Detalle del producto Actualizado Exitosamente"});
            }
        });
    }
}


module.exports = detallesproductoModel;