import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UrbanService } from '../Urban.service';

@Component({
  selector: 'app-detallesproductos',
  templateUrl: './detallesproductos.component.html',
  styleUrls: ['./detallesproductos.component.css']
})

export class DetallesproductosComponent implements OnInit {

  /* Variables */

  title = "Detalles Producto";

  //listar 
  detalle: any = [];              //Lista Detalle producto
  TituloDetalle = "";             //Titulo Lista Detalle producto 
  TablaDetalle: any = [];         //Encabezados tabla Lista Detalle producto 

  //Mostrar
  Midetalle: any = [];            //Tipo detalle producto Buscado
  TitDetalle = "";                //Nombre detalle producto buscado
  TabBusDetalle: any = [];        //Encabezados tabla detalle producto Buscado 
  comboListaDetalle: any = [];    //Combo Buscar detalle producto

  //Actualizar
  TituloDetalleEdit = "";         //Titulo detalle producto a Editar
  MiDetalleE: any = [];           //detalle producto a Editar
  comboEditarDetalle: any = [];   //Combo Editar detalle producto

  controlLista = 1;               //Control para limpiar la lista
  BuscarEvalor = 1;               //Control para carga del valor a buscar

  combo1: any = [];
  combo2: any = [];
  /*
  Form Groups
  */

    ListaDetalle =  new FormGroup (
      {

      });

      filtrarDetalle =  new FormGroup(
      {
        combofiltro: new FormControl()
      });

      InsertarGDetalle =  new FormGroup(
      {
        textDproducto: new FormControl(), 
        textDmaterial:new FormControl(),
        textDobservaciones: new FormControl(), 
        textDcantidad:new FormControl()
      });
    
      ActualizarADetalle =  new FormGroup(
      {
        buscarIdDetalle:new FormControl(),  
        textDproductoA: new FormControl(), 
        textDmaterialA:new FormControl(),
        textDobservacionesA: new FormControl(), 
        textDcantidadA:new FormControl()
      });

  /*
  Constructor
  */

    constructor(
      private formBuilder: FormBuilder, 
      private servi: UrbanService,
      Route : Router
    ) { }

  /*    
  CRUL Detalles productos     
  */
 

  /*  
  Lista Detalle Producto
  */

  public consultaDetalleL(op:any)
  {
    this.servi.getDetalleProducto().subscribe((data:any) =>
    {
      let dat= data;
    this.detalle = data;
    this.TituloDetalle = "Detalles Productos";
    this.TablaDetalle[0]="Id Detalle";
    this.TablaDetalle[1]="Producto";
    this.TablaDetalle[2]="Material";
    this.TablaDetalle[3]="Observaciones";
    this.TablaDetalle[4]="Cantidad"; 
    });
  }

  /* 
  Lista detalle produccion 
  */

  public consultaDetalle(op:any)
  {
    if(this.controlLista == 1)
  {
      this.servi.getDetalleProducto().subscribe((data:any) =>
      {
        if(op == 1)
        {
          let dat = data;
          this.detalle = data;
          this.TituloDetalle = "LISTA DETALLE PRODUCTO";
          this.TablaDetalle[0]="Id Detalle";
          this.TablaDetalle[1]="Producto";
          this.TablaDetalle[2]="Material";
          this.TablaDetalle[3]="Observaciones";
          this.TablaDetalle[4]="Cantidad";
        }
        else if(op == 2)
        {
          this.comboListaDetalle = data;
          this.Midetalle = null;
          this.TitDetalle = "";
          this.TabBusDetalle[0] = "";
          this.TabBusDetalle[1] = "";
          this.TabBusDetalle[2] = "";
          this.TabBusDetalle[3] = "";
          this.TabBusDetalle[4] = "";
        }
        else if(op == 3)

        {
          this.comboEditarDetalle = data;
          this.MiDetalleE = null;
          this.TituloDetalleEdit = "";
        }
      },      
      error => {console.error(error + " ")});      
  }
  else
  {
    this.detalle = null;
    this.TituloDetalle = "";
    this.TablaDetalle[0]="";
    this.TablaDetalle[1]="";
    this.TablaDetalle[2]="";
    this.TablaDetalle[3]="";
    this.TablaDetalle[4]="";
    this.controlLista = 1;
  }
  }

  /* 
  Mostrar detalle producto por id 
  */

public mostrarDetalle ()
{

  var filtovalor = this.filtrarDetalle.getRawValue()['combofiltro'];
  this.servi.getDetalleProd('/' + filtovalor).subscribe((data : {}) => {
    
    this.Midetalle = data;
    this.TitDetalle = "DETALLE PRODUCTO";
    this.TabBusDetalle[0] = "Id Detalle";
    this.TabBusDetalle[1] = "Producto";
    this.TabBusDetalle[2] = "Material";
    this.TabBusDetalle[3] = "Observaciones";
    this.TabBusDetalle[4] = "Cantidad";

  },
  error => {console.log(error) });
}


/*Filtro prodcutos -----------------------------------------------------------*/
public filtroProducto(){
  this.servi.getProducto().subscribe((data: any) => {
    this.combo1 = data;
  },
    error => {console.log(error)}
  );
}

/*Filtro prodcutos -----------------------------------------------------------*/
public filtroMaterial(){
  this.servi.getMaterial().subscribe((data: any) => {
    this.combo2 = data;
  },
    error => {console.log(error)}
  );
}


/* 
Insertar detalle producto 
*/

public insertarDetalle()
{
  var dato1 = this.InsertarGDetalle.getRawValue()['textDproducto']
  var dato2 = this.InsertarGDetalle.getRawValue()['textDmaterial']
  var dato3 = this.InsertarGDetalle.getRawValue()['textDobservaciones']
  var dato4 = this.InsertarGDetalle.getRawValue()['textDcantidad']

  var cadena = {"cantidad":dato4,"observacionesProducto":dato3,"idMaterial":dato2,"idProducto":dato1}

  this.servi.insertDetalleProducto(cadena).then
  (res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  });
  this.InsertarGDetalle.reset();
}

/* 
Consultar detalle produccion por id para modificarla 
*/

buscarEditDetalle()
{
  if(this.BuscarEvalor != 0)
  {
    this.BuscarEvalor = this.ActualizarADetalle.getRawValue()['buscarIdDetalle'];

  }
  this.servi.getDetalleProd('/' + this.BuscarEvalor).subscribe((data: {}) =>{

    this.MiDetalleE = data;
    this.TituloDetalleEdit = "DETALLE PRODUCTO";

  }, error => {console.log(error) });

}

/* 
Actualizar detalle produccion 
*/

public ActualizarDetalle()
{

  var nuevo1 = this.ActualizarADetalle.getRawValue()['textDproductoA'];
  var nuevo2 = this.ActualizarADetalle.getRawValue()['textDmaterialA'];
  var nuevo3 = this.ActualizarADetalle.getRawValue()['textDobservacionesA'];
  var nuevo4 = this.ActualizarADetalle.getRawValue()['textDcantidadA'];

  var cadena = {"idDetalleProducto":this.BuscarEvalor, "idProducto":nuevo1, "idMaterial":nuevo2,"observacionesProducto":nuevo3, "cantidad":nuevo4}

  this.servi.updateDetalleProducto(cadena).then
    (
      res =>{
        console.log("res ",res)
      }
    ).catch(err => {
      console.log(err)
    });

    //this.BuscarEvalor = 0;
    this.ActualizarADetalle.reset();

}

  /*
  Limpiar Lista
  */

  public LimpiarLista() 
  {
    this.controlLista = 0;
  }

  /*
  ngOnInit
  */
  ngOnInit(): void 
  {
    this.ListaDetalle = this.formBuilder.group(
      {
  
      });
    
    this.filtrarDetalle = this.formBuilder.group(
      {
        combofiltro: []
      });
  
    this.InsertarGDetalle = this.formBuilder.group(
      {
        textDproducto: [],
        textDmaterial: [],
        textDobservaciones: [],
        textDcantidad: []

      });
      this.formBuilder.group
  
    this.ActualizarADetalle = this.formBuilder.group(
      {
        buscarIdDetalle: [], 
        textDproductoA: [], 
        textDmaterialA: [],
        textDobservacionesA: [],
        textDcantidadA: []
      });
      this.formBuilder.group
  }

}
