//Importacion de las librerias
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

//Se importa el Servicio

import { UrbanService } from '../Urban.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

// Archivos del actual componente
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  cat: any = []; //Lista de catalogos
  tituloCat = ""; // Titulo
  tablaCat: any = []; // Encabezados de la tabla catalogos

  miCat: any = []; // Tipo de catalogo a buscar
  tituloCatalo = ""; // Titulo
  tablaBusCat: any = []; //Encabezados de la tabla catalogos
  comboListarCat: any = []; //Combo para buscar

  TituloEditCat = ""; // Titulo
  miCatalogo: any = []; //Tipo de catalogo a editar
  comboEditarCat: any =[]; // combo editar catalogo

  title ="CATALOGOS";

  controlLista = 1;  // Control para limpiar la lista
  buscarEvalor = 1; // Control para buscar
  buscarEE = 0;
  combo2: any = []; 
  combo3: any = []; 

  //--------------------------------------------------------------------------
  //FORM GROUP
  listaCatalogos = new FormGroup(
  {

  });

  filtrarCat = new FormGroup(
  {

    combofiltro: new FormControl()

  });

  insertarCatalogo = new FormGroup(  
  {
    
    text1: new FormControl(),
    text2: new FormControl(),
    text3: new FormControl()

  });

  actualizarCatalogo = new FormGroup(
  {

    buscarIdCat: new FormControl(),
    filtro1: new FormControl(), 
    ntext1: new FormControl(),
    ntext2: new FormControl(),
    ntext3: new FormControl()

  });

  //--------------------------------------------------------------------------
  constructor
  (
    private formBuilder: FormBuilder,
    private server: UrbanService,
    Route: Router
  ) { }

  //-------------------------------------------------------------------------
  //LISTAR

  public listarCat(op:any)
  {
    if(this.controlLista == 1)
    {
      this.server.getCatalogo().subscribe((data:any) =>{
        if(op == 1)
        {
          this.cat = data;
          this.tituloCat= "LISTA DE CATALOGOS";
          this.tablaCat[0] = "ID Catalogo";
          this.tablaCat[1] = "Nombre Catalogo";
          this.tablaCat[2] = "Catalogo";
        
        }
        else if(op == 2)
        {
          this.comboListarCat = data;
          this.miCat = null;
          this.tituloCatalo ="";
          this.tablaBusCat[0] = "";
          this.tablaBusCat[1] = "";
          this.tablaBusCat[2] = "";
        }
        else if(op == 3)
        {
          this.comboEditarCat = data;
          this.miCatalogo = null;
          this.TituloEditCat ="";
        }
      },
        error => {console.log(error + " ")});
    }
    else
    {
      this.cat = null;
      this.tituloCat = "";
      this.tablaCat[0] = "";
      this.tablaCat[1] = "";
      this.tablaCat[2] = "";
      this.tablaCat[3] = "";
      this.controlLista = 1;
    }
  }

  //-------------------------------------------------------------------------
  //Para limpiar la lista

  public LimpiarLista(){
  
    this.controlLista = 0;
  
  }

  //-------------------------------------------------------------------------
  //MOSTRAR

  public buscarCatalogo()
  {
    var filtroValor = this.filtrarCat.getRawValue()['combofiltro'];
    this.server.getCatalogos('/' + filtroValor).subscribe((data:{}) => {
    this.miCat = data;
    this.tituloCatalo ="CATALOGO";
    this.tablaBusCat[0] = "ID Catalogo";
    this.tablaBusCat[1] = "Nombre Catalogo";
    this.tablaBusCat[2] = "Catalogo";
    },
      error => {console.log(error)});
  }

  //-------------------------------------------------------------------------
  //CREAR

  public insertarCat()
  {
    var valor1 = this.insertarCatalogo.getRawValue()['text1'];
    var valor2 = this.insertarCatalogo.getRawValue()['text2'];
    var valor3 = this.insertarCatalogo.getRawValue()['text3'];

    var cadena = { "nombreCat":valor1, "tipoCatalogo":valor2, "llaveForanea":valor3 };

    this.server.insertCat(cadena).then
    (
      res => {
        console.log(res)
      }
    ).catch(err => {
      console.log(err)
    });
    this.insertarCatalogo.reset(); 
  }

  //-------------------------------------------------------------------------
  //MODIFICAR

  //-------------------------------------------------------------------------
  //FILTRO Catalogos

  public Filtro2(){

    this.server.getCatalogos('/' + 1).subscribe((data:any) =>{
      this.combo2 = data;
    },
    error => {console.log(error)});
  }
  
  //-------------------------------------------------------------------------

  public Filtro3(){

    this.buscarEE = this.actualizarCatalogo.getRawValue()['filtro1'];
    
    this.server.getCatalogos('/' + this.buscarEE).subscribe((data:any) =>{
      this.combo3 = data;
    },
    error => {console.log(error)});
  }

  //Buscar id para modificar
  //--------------------------------------------------------------------------
  buscarCat()
  {
    if(this.buscarEvalor != 0)
    {
      this.buscarEvalor = this.actualizarCatalogo.getRawValue()['buscarIdCat'];
    }

    this.server.getCatalogosId('/' + this.buscarEvalor).subscribe((data:{}) =>{
      this.miCatalogo = data;
      this.TituloEditCat = "DATOS";
    }, error => {console.log(error)});
  }

  //Modificar catalogo

  public actualizarCat()
  {
    var nuevo1 = this.actualizarCatalogo.getRawValue()['ntext1'];
    var nuevo2 = this.actualizarCatalogo.getRawValue()['ntext2'];
    var nuevo3 = this.actualizarCatalogo.getRawValue()['ntext3'];

    var cadena = {"idCatalogo":this.buscarEvalor, "nombreCat":nuevo1, "tipoCatalogo":nuevo2, "llaveForanea":nuevo3 };
  
    this.server.updateCat(cadena).then
    (
      res => {
        console.log("res ", res)
      }
    ).catch(err =>{
      console.log(err)
    });

    this.actualizarCatalogo.reset();
  }

  //-----------------------------------------------------------------------------------------------------------
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML

  ngOnInit(): void 
  {
    this.listaCatalogos = this.formBuilder.group(
    {

    });

    this.filtrarCat = this.formBuilder.group(
    {

      combofiltro: []

    });

    this.insertarCatalogo = this.formBuilder.group(
    {

      text1: [],
      text2: [],
      text3: []   

    });

    this.actualizarCatalogo = this.formBuilder.group(
    {
      
      buscarIdCat: [],
      filtro1: [], 
      ntext1: [],
      ntext2: [],
      ntext3: []
      
    });

  }

}