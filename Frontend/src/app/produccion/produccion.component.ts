//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UrbanService } from '../Urban.service';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})

export class ProduccionComponent implements OnInit 
{
  /* Variables */

  title = " PRODUCCION";
  
  //listar 
  produccion: any = [];              //Lista de Tipos de produccion
  TituloProduccion = "";             //Titulo Lista de Tipos de produccion
  TablaProduccion: any = [];        //Encabezados tabla Lista de Tipos de produccion 
  
  //Mostrar
  Miproduccion: any = [];             //Tipo de produccion Buscado
  TitProduccion = "";              //Nombre de produccion buscado
  TabBusProduccion: any = [];        //Encabezados tabla Tipo de produccion Buscado 
  comboListaProduccion: any = [];     //Combo Buscar Tipo de Documento
  
  //Actualizar
  TituloProduccionEdit = "";      //Titulo de Tipo de Documento a Editar
  MiProduccionE: any = [];            //Tipo de Documento a Editar
  comboEditarProduccion: any = [];    //Combo Editar Tipo de Documento

  controlLista = 1;               //Control para limpiar la lista
  BuscarEvalor = 1;               //Control para carga del valor a buscar

/*--------------------------------*/
/*        Form Groups             */
/*--------------------------------*/
  ListaProduccion =  new FormGroup (
    {
  
    });
  
    filtrarProduccion =  new FormGroup(
    {
      combofiltro: new FormControl()
    });
  
    
    InsertarGProduccion =  new FormGroup(
    {
      textEncargadoProduc: new FormControl(), 
      textProducMalos:new FormControl(),
      textProducto: new FormControl(), 
      textFecha:new FormControl(),
      TextTotal:new FormControl()
    });
  
    
    ActualizarAProduccion =  new FormGroup(
    {
      BuscarIdProduccion:new FormControl(),  
      textEncargadoProduc: new FormControl(), 
      textProducMalos:new FormControl(),
      textProducto: new FormControl(), 
      textFecha:new FormControl(),
      TextTotal:new FormControl()
    });

/*--------------------------------*/
/*         Constructor            */
/*--------------------------------*/
  constructor(
    private formBuilder: FormBuilder, 
    private servi: UrbanService,
    Route : Router
  ) { }

/*--------------------------------*/
/*       CRUD PRODUCCION          */
/*--------------------------------*/

/*  Lista produccion ********/
public consultaProduccionI()
{
  this.servi.getProduccion().subscribe((data:any) =>
  {
    let dat= data;
    this.produccion = data;
    this.TituloProduccion = "LISTA PRODUCCION";
    this.TablaProduccion[0]="Indicador";
    this.TablaProduccion[1]="Encargado";
    this.TablaProduccion[2]="Productos Malos";
    this.TablaProduccion[4]="Tipo de camiseta";
    this.TablaProduccion[5]="Fecha";
    this.TablaProduccion[6]="Total";
  });
}

/* Lista tipo de produccion */
public consultaProduccion(op:any)
{
  if(this.controlLista == 1)
  {
      this.servi.getProduccion().subscribe((data:any) =>
      {
        if(op == 1)
        {
          let dat = data;
          this.produccion = data;
          this.TituloProduccion = "LISTA PRODUCCION";
          this.TablaProduccion[0]="Indicador";
          this.TablaProduccion[1]="Encargado";
          this.TablaProduccion[2]="Productos Malos";
          this.TablaProduccion[3]="Tipo de ";
          this.TablaProduccion[4]="Fecha";
          this.TablaProduccion[5]="Total";
        }
        else if(op == 2)
        {
          this.comboListaProduccion = data;
          this.Miproduccion = null;
          this.TitProduccion = "";
          this.TabBusProduccion[0] = "";
          this.TabBusProduccion[1] = "";
          this.TabBusProduccion[2] = "";
          this.TabBusProduccion[3] = "";
          this.TabBusProduccion[4] = "";
          this.TabBusProduccion[5] = "";
        }
        else if(op == 3)

        {
          this.comboEditarProduccion = data;
          this.MiProduccionE = null;
          this.TituloProduccionEdit = "";
        }
      },      
      error => {console.error(error + " ")});      
  }
  else
  {
    this.produccion = null;
    this.TituloProduccion = "";
    this.TablaProduccion[0]="";
    this.TablaProduccion[1]="";
    this.TablaProduccion[2]="";
    this.TablaProduccion[3]="";
    this.TablaProduccion[4]="";
    this.TablaProduccion[5]="";
    this.controlLista = 1;
  }
}

/* Mostrar produccion por id */
public Mproduccion ()
{

  var filtovalor = this.filtrarProduccion.getRawValue()['combofiltro'];
  this.servi.getTipoProduccion('/' + filtovalor).subscribe((data : {}) => {
    
    this.Miproduccion = data;

    this.TitProduccion = "Produccion Seleccionada";
    this.TabBusProduccion[0] = "Indicador";
    this.TabBusProduccion[1] = "Encargado";
    this.TabBusProduccion[2] = "Productos Malos";
    this.TabBusProduccion[3] = "Nombre Producto";
    this.TabBusProduccion[4] = "Fecha";
    this.TabBusProduccion[5] = "Total";

  },
  error => {console.log(error) });

}

/* Insertar una nueva produccion */
public InsertarProduccion()
{

  var dato1 = this.InsertarGProduccion.getRawValue()['textEncargado'];
  var dato2 = this.InsertarGProduccion.getRawValue()['textProductMalo'];
  var dato3 = this.InsertarGProduccion.getRawValue()['textProducto'];
  var dato4 = this.InsertarGProduccion.getRawValue()['textFecha'];
  var dato5 = this.InsertarGProduccion.getRawValue()['textTotal'];

  var cadena = {"textTotal":dato5,"textFecha":dato4,"textProducto":dato3,"textProductMalo":dato2,"textEncargado":dato1}

  this.servi.insertProduccion(cadena).then
    ( res => {
      console.log(res)
    }
    ).catch(err => {
      console.log(err)
    });
    this.InsertarGProduccion.reset();
}

/* Consultar Una produccion por el id para modificarla */
buscarEditProduccion()
{
  if(this,this.BuscarEvalor != 0)
  {
    this.BuscarEvalor = this.ActualizarAProduccion.getRawValue()['BuscarIdProduccion'];

  }
  this.servi.getTipoProduccion('/' + this.BuscarEvalor).subscribe((data: {}) =>{

    this.MiProduccionE = data;
    this.TituloProduccionEdit = "Produccion ";

  }, error => {console.log(error) });

}

/* Actualizar Produccion */
public ActualizaProduccion()
{

  var nuevo1 = this.ActualizarAProduccion.getRawValue()['textNewEncargado'];
  var nuevo2 = this.ActualizarAProduccion.getRawValue()['textNewProducMalos'];
  var nuevo3 = this.ActualizarAProduccion.getRawValue()['textNewProducto'];
  var nuevo4 = this.ActualizarAProduccion.getRawValue()['textNewFecha'];
  var nuevo5 = this.ActualizarAProduccion.getRawValue()['textNewTotal'];

  var cadena = {"textNewTotal":nuevo5,"textNewFecha":nuevo4,"textNewProducto":nuevo3,"textNewProducMalos":nuevo2,"textNewEncargado":nuevo1};

  this.servi.updateProduccion(cadena).then
    (
      res =>{
        console.log("res ",res)
      }
    ).catch(err => {
      console.log(err)
    });

    this.BuscarEvalor = 0;
    this.ActualizarAProduccion.reset();

}

/*--------------------------------*/
/*         Limpiar Lista          */
/*--------------------------------*/
public LimpiarLista() 
{
  this.controlLista = 0;
}

/*--------------------------------*/
/*           ngOnInit             */
/*--------------------------------*/
ngOnInit(): void
{
  this.ListaProduccion = this.formBuilder.group(
    {

    });
  
  this.filtrarProduccion = this.formBuilder.group(
    {
      combofiltro: []
    });

  this.InsertarGProduccion = this.formBuilder.group(
    {
      textProduccion: [],
      textIniProduccion: [],
      textEncargado: [],
      textProductMalo: [],
      textProducto: [],
      textFecha: [],
      textTotal: []
    });
    this.formBuilder.group

  this.ActualizarAProduccion = this.formBuilder.group(
    {
      BuscarIdProduccion: [], 
      textNewEncargado: [], 
      textNewProducMalos: [],
      textNewProducto: [],
      textNewFecha: [],
      textNewTotal: []
    });
    this.formBuilder.group
}
}
