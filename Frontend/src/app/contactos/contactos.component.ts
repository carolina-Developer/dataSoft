//Importacion de las librerias
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

//Se importa el Servicio

import { UrbanService } from '../Urban.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})

export class ContactosComponent implements OnInit {
  contac: any = []; // Listar contactos
  tituloContactos=""; // Titulo
  tablaContac: any = []; // Encabezados de la tabla contactos

  miContacto: any = []; //tipo de contacto a buscar
  tituloMostrar =""; // titulo
  tablaMostrar: any = []; // encabezados de la tabla mostrar
  comboMostrar: any = []; // combo para buscar

  miEncargado: any = []; // tipo de contacto encarcado a buscar
  tituloContacEncar =""; // titulo
  tablaConEn: any = []; // Encabezados de la tabla contacto Encargado

  tituloModificar =""; //Titulo Modificar.
  misContactos: any = []; //Tipo de contacto a editar
  comboModificar: any = []; //Combo para modificar

  combo1: any = []; 
  combo2: any = []; 
  combo3: any = []; 

  title="CONTACTOS";
  
  controlLista = 1;  // Control para limpiar la lista
  buscarEvalor = 1; // Control para buscar
  //--------------------------------------------------------------------------
  //FORM GROUP

  listarContactos = new FormGroup(
  {

  });

  filtrarContact = new FormGroup(
  {

    combofiltro: new FormControl()

  });

  filtrarEncargado = new FormGroup(
  {

    comboEncargado: new FormControl()

  });

  insertContact = new FormGroup(
  {
    text1: new FormControl(),
    text2: new FormControl(),
    text3: new FormControl()

  });

  actualizarContact = new FormGroup(
  {
    buscarContact: new FormControl(),
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

 public listarContact(op:any)
 {
    if(this.controlLista == 1)
    {
      this.server.getContactos().subscribe((data:any) =>{
        if(op == 1)
        {
          this.contac = data;
          this.tituloContactos = "LISTA DE CONTACTOS";
          this.tablaContac[0] = "ID Contacto";
          this.tablaContac[1] = "Encargado";
          this.tablaContac[2] = "Dato";
          this.tablaContac[3] = "Tipo Dato";

        }
        else if(op == 2)
        {
          this.comboMostrar = data;
          this.miContacto = null;
          this.tituloMostrar = "";
          this.tablaMostrar[0] = "";
          this.tablaMostrar[1] = "";
          this.tablaMostrar[2] = "";
          this.tablaMostrar[3] = "";

        }
        else if (op == 3)
        {
          this.comboModificar = data;
          this.misContactos = null;
          this.tituloModificar = "";
        }
      },
        error => {console.log(error + " ")});
    }
    else
    {
      this.contac = null;
      this.tituloContactos = "";
      this.tablaContac[0] = "";
      this.tablaContac[1] = "";
      this.tablaContac[2] = "";
      this.tablaContac[3] = "";
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

  public buscarContacto()
  {
    var filtroValor = this.filtrarContact.getRawValue()['combofiltro'];
    this.server.getContacto('/' + filtroValor).subscribe((data:{}) =>{
    this.miContacto = data;
    this.tituloMostrar = "CONTACTO";
    this.tablaMostrar[0] = "ID Contacto";
    this.tablaMostrar[1] = "Encargado";
    this.tablaMostrar[2] = "Dato";
    this.tablaMostrar[3] = "Tipo Dato";
    },
      error => {console.log(error)});
  }

  //-------------------------------------------------------------------------
  //MOSTRAR POR ENCARGADO

  public listar2()
  {
    this.server.getEncargados().subscribe((data:any) =>{
      this.combo1 = data;
    },
    error => {console.log(error)});
  }
  //----------------------------------------------------------
  public buscarContacEncargado()
  {
    var filtroEnca = this.filtrarEncargado.getRawValue()['comboEncargado'];
    this.server.getContactoEncargado('/' + filtroEnca).subscribe((data:{}) =>{
    this.miEncargado = data;
    this.tituloContacEncar = "CONTACTOS";
    this.tablaConEn[0] = "ID Contacto";
    this.tablaConEn[1] = "Encargado";
    this.tablaConEn[2] = "Dato";
    this.tablaConEn[3] = "Tipo Dato";

    },
      error => {console.log(error)});
  }

  //-------------------------------------------------------------------------
  //FILTRO ENCARGADOS

  public filtro1()
  {
    this.server.getEncargados().subscribe((data:any) =>{
      this.combo2 = data;
    },
    error => {console.log(error)});
  }

  //-------------------------------------------------------------------------
  //FILTRO TIPO DATO

  public Filtro2(){

    this.server.getCatalogos('/' + 7).subscribe((data:any) =>{
      this.combo3 = data;
    },
    error => {console.log(error)});
  }

  //-------------------------------------------------------------------------
  //CREAR

  public insertContacto()
  {
    var valor1 = this.insertContact.getRawValue()['text1'];
    var valor2 = this.insertContact.getRawValue()['text2'];
    var valor3 = this.insertContact.getRawValue()['text3'];

    var cadena = {"idEncargado":valor1, "dato":valor2, "tipoDato":valor3 };

    this.server.insertContacto(cadena).then
    (
      res => {
        console.log(res)
      }
    ).catch(err => {
      console.log(err)
    });
    this.insertContact.reset();
  }
  
  //-------------------------------------------------------------------------
  //MODIFICAR

  //Buscar id para modificar

  buscarCont()
  {
    if(this.buscarEvalor != 0)
    {
      this.buscarEvalor = this.actualizarContact.getRawValue()['buscarContact'];
    }

    this.server.getContactoFront('/' + this.buscarEvalor).subscribe((data:[]) => {
      this.misContactos = data;
      this.tituloModificar = "DATOS";
    }, error => {console.log(error)});

  }

  //Modificar contacto

  public actualizarConta()
  {
    var nuevo1 = this.actualizarContact.getRawValue()['ntext1'];
    var nuevo2 = this.actualizarContact.getRawValue()['ntext2'];
    var nuevo3 = this.actualizarContact.getRawValue()['ntext3'];

    var cadena = { "idContacto":this.buscarEvalor, "idEncargado":nuevo1, "dato":nuevo2, "tipoDato":nuevo3};

    this.server.updateContacto(cadena).then
    (
      res => {
        console.log("res ", res)
      }
    ).catch(err =>{
      console.log(err)
    });

    this.actualizarContact.reset();
  }

  //-----------------------------------------------------------------------------------------------------------
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
  
  ngOnInit(): void 
  {
    this.listarContactos = this.formBuilder.group(
    {

    });

    this.filtrarContact = this.formBuilder.group(
    {

      combofiltro: []

    });

    this.filtrarEncargado = this.formBuilder.group(
    {

      comboEncargado: []

    });

    this.insertContact = this.formBuilder.group(
    {
      text1: [],
      text2: [],
      text3: []
    });

    this.actualizarContact = this.formBuilder.group(
    {
      buscarContact: [],
      ntext1: [],
      ntext2: [],
      ntext3: []
    });

  }
}

