//Importacion de las librerias
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

//Se importa el Servicio

import { UrbanService } from '../Urban.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  styleUrls: ['./encargados.component.css']
})
export class EncargadosComponent implements OnInit {
  listEncargados: any = []; // Lista de encargados
  tituloListar = ""; // Titulo
  tablaEncargados: any = []; //Encabezados tabla listar encargados

  miEncargado: any = []; // Tipo de catalogo a buscar. 
  tituloMostrar = ""; // titulo
  tablaMostrar: any = []; // Encabezados de la tabla 
  comboMostrar: any = []; // combo para buscar

  tituloModificar = ""; // titulo
  misEncargados: any = []; // tipo de encargado a editar
  comboModificar: any =[]; // combo para modificar
 
  combo1: any = []; // para las llaves foraneas
  combo2: any = []; // para las llaves foraneas

  title="ENCARGADOS";
  controlLista = 1;
  buscarEvalor = 1;

  //--------------------------------------------------------------------------
  //FORM GROUP

  listaEncargados = new FormGroup(
  {

  });

  filtrarEncargado = new FormGroup(
  {

    combofiltro: new FormControl()

  });

  insertarEncargado = new FormGroup(
  {
    text1: new FormControl(),
    text2: new FormControl(),
    text3: new FormControl(),
    text4: new FormControl(),
    text5: new FormControl(),
    text6: new FormControl(),
    text7: new FormControl(),
    text8: new FormControl(),
    text9: new FormControl()
  });

  actualizarEn = new FormGroup(
  {
    buscarIdEncargado: new FormControl(),
    ntext1: new FormControl(),
    ntext2: new FormControl(),
    ntext3: new FormControl(),
    ntext4: new FormControl(),
    ntext5: new FormControl(),
    ntext6: new FormControl(),
    ntext7: new FormControl(),
    ntext8: new FormControl(),
    ntext9: new FormControl()
  });
  //---------------------------------------------------------------------------

  constructor
  (
    private formBuilder: FormBuilder,
    private server: UrbanService,
    Route: Router
  ) { }

  //-------------------------------------------------------------------------
  //LISTAR

  public listarEncargados(op:any)
  {
    if(this.controlLista == 1)
    {
      this.server.getEncargados().subscribe((data:any) =>{
        if(op == 1)
        {
          this.listEncargados = data;
          this.tituloListar = "LISTA DE ENCARGADOS";
          this.tablaEncargados[0] = "ID Encargado";
          this.tablaEncargados[1] = "Encargado";
          this.tablaEncargados[2] = "Tipo Identificacion";
          this.tablaEncargados[3] = "Numero Identificacion";
          this.tablaEncargados[4] = "Fecha Nacimiento";
          this.tablaEncargados[5] = "Eps";
          this.tablaEncargados[6] = "Sueldo";

        }  
        else if(op == 2)
        {
          this.comboMostrar = data;
          this.miEncargado = null;
          this.tituloMostrar = "";
          this.tablaMostrar[0] = "";
          this.tablaMostrar[1] = "";
          this.tablaMostrar[2] = "";
          this.tablaMostrar[3] = "";
          this.tablaMostrar[4] = "";
          this.tablaMostrar[5] = "";
          this.tablaMostrar[6] = "";
        }
        else if(op == 3)
        {
          this.comboModificar = data;
          this.misEncargados = null;
          this.tituloModificar = "";
        }
      },
        error => {console.log(error + " ")});
    }
    else
    {
      this.listEncargados = null;
      this.tituloListar = "";
      this.tablaEncargados[0] = "";
      this.tablaEncargados[1] = "";
      this.tablaEncargados[2] = "";
      this.tablaEncargados[3] = "";
      this.tablaEncargados[4] = "";
      this.tablaEncargados[5] = "";
      this.tablaEncargados[6] = "";
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

  public buscarEncargado()
  {
    var filtroValor = this.filtrarEncargado.getRawValue()['combofiltro'];
    this.server.getEncargado('/' + filtroValor).subscribe((data:{}) => {
    this.miEncargado = data;
    this.tituloMostrar ="ENCARGADO";
    this.tablaMostrar[0] = "ID Encargado";
    this.tablaMostrar[1] = "Encargado";
    this.tablaMostrar[2] = "Tipo Identificacion";
    this.tablaMostrar[3] = "Numero Identificacion";
    this.tablaMostrar[4] = "Fecha Nacimiento";
    this.tablaMostrar[5] = "Eps";
    this.tablaMostrar[6] = "Sueldo";
    },
    error => {console.log(error)});
  }

  //-------------------------------------------------------------------------
  //FILTRO IDENTIFICACION

  public Filtro1(){

    this.server.getCatalogos('/' + 2).subscribe((data:any) =>{
      this.combo1 = data;
    },
    error => {console.log(error)});
  }

  //-------------------------------------------------------------------------
  //FILTRO EPS

  public Filtro2(){

    this.server.getCatalogos('/' + 4).subscribe((data:any) =>{
      this.combo2 = data;
    },
    error => {console.log(error)});
  }

  //-------------------------------------------------------------------------
  //CREAR

  public inseEncargado()
  {
    var valor1 = this.insertarEncargado.getRawValue()['text1'];
    var valor2 = this.insertarEncargado.getRawValue()['text2'];
    var valor3 = this.insertarEncargado.getRawValue()['text3'];
    var valor4 = this.insertarEncargado.getRawValue()['text4'];
    var valor5 = this.insertarEncargado.getRawValue()['text5'];
    var valor6 = this.insertarEncargado.getRawValue()['text6'];
    var valor7 = this.insertarEncargado.getRawValue()['text7'];
    var valor8 = this.insertarEncargado.getRawValue()['text8'];
    var valor9 = this.insertarEncargado.getRawValue()['text9'];

    var cadena = { "primerNom":valor1, "segNom":valor2,"primApellido":valor3,
                    "segApellido":valor4, "tipoIdentificacion":valor5, 
                    "numIdentificacion":valor6, "fechaNacimiento":valor7, 
                    "eps":valor8, "sueldo":valor9};

    this.server.insertEncargado(cadena).then
    (
      res => {
        console.log(res)
      }
    ).catch(err => {
      console.log(err)
    });
    this.insertarEncargado.reset();
  }

  //-------------------------------------------------------------------------
  //MODIFICAR

  //Buscar id para modificar

  buscarEncarg()
  {
    if(this.buscarEvalor != 0)
    {
      this.buscarEvalor = this.actualizarEn.getRawValue()['buscarIdEncargado'];
    }

    this.server.getEncargadoFront('/' + this.buscarEvalor).subscribe((data:[]) =>{
      this.misEncargados = data;
      this.tituloModificar = "DATOS";
      //console.log(this.misEncargados);
    }, error => {console.log(error)});
  }

  //Modificar encargado

  public actualizarEnc()
  {
    var nuevo1 = this.actualizarEn.getRawValue()['ntext1'];
    var nuevo2 = this.actualizarEn.getRawValue()['ntext2'];
    var nuevo3 = this.actualizarEn.getRawValue()['ntext3'];
    var nuevo4 = this.actualizarEn.getRawValue()['ntext4'];
    var nuevo5 = this.actualizarEn.getRawValue()['ntext5'];
    var nuevo6 = this.actualizarEn.getRawValue()['ntext6'];
    var nuevo7 = this.actualizarEn.getRawValue()['ntext7'];
    var nuevo8 = this.actualizarEn.getRawValue()['ntext8'];
    var nuevo9 = this.actualizarEn.getRawValue()['ntext9'];

    var cadena = { "idEncargado":this.buscarEvalor,"primerNom":nuevo1, "segNom":nuevo2,"primApellido":nuevo3,
                    "segApellido":nuevo4, "tipoIdentificacion":nuevo5, 
                    "numIdentificacion":nuevo6, "fechaNacimiento":nuevo7, 
                    "eps":nuevo8, "sueldo":nuevo9};

    this.server.updateEncargado(cadena).then
    (
      res => {
        console.log("res ", res)
      }
    ).catch(err =>{
      console.log(err)
    });

    //this.buscarEvalor = 0;
    this.actualizarEn.reset();
      
  }

  //-----------------------------------------------------------------------------------------------------------
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
  ngOnInit(): void 
  {
    this.listaEncargados = this.formBuilder.group(
    {

    });

    this.filtrarEncargado = this.formBuilder.group(
    {

      combofiltro: []

    });

    this.insertarEncargado = this.formBuilder.group(
    {
      text1: [],
      text2: [],
      text3: [],
      text4: [],
      text5: [],
      text6: [],
      text7: [],
      text8: [],
      text9: []

    });

    this.actualizarEn = this.formBuilder.group(
    {
      buscarIdEncargado: [],
      ntext1: [],
      ntext2: [],
      ntext3: [],
      ntext4: [],
      ntext5: [],
      ntext6: [],
      ntext7: [],
      ntext8: [],
      ntext9: []

    });

  }

}

  
