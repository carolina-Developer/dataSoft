import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { UrbanService } from '../Urban.service';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css'],
})
export class ProduccionComponent implements OnInit {
  /* Variables */

  title = "PRODUCCION";

  //listar
  produccion: any = []; //Lista de Tipos de produccion
  TituloProduccion = ""; //Titulo Lista de Tipos de produccion
  TablaProduccion: any = []; //Encabezados tabla Lista de Tipos de produccion

  //Mostrar
  Miproduccion: any = [];             //Tipo de produccion Buscado
  TitProduccion = "";              //Nombre de produccion buscado
  TabBusProduccion: any = [];        //Encabezados tabla Tipo de produccion Buscado 
  comboListaProduccion: any = [];     //Combo Buscar Tipo de produccion
  
  //Actualizar
  TituloProduccionEdit = "";      //Titulo de Tipo de produccion a Editar
  MiProduccionE: any = [];            //Tipo de produccion a Editar
  comboEditarProduccion: any = [];    //Combo Editar produccion

  controlLista = 1; //Control para limpiar la lista
  BuscarEvalor = 1; //Control para carga del valor a buscar

  combo3: any = [];
  combo4: any = [];
  combo5: any = [];

  /*--------------------------------*/
  /*        Form Groups             */
  /*--------------------------------*/
  ListaProduccion = new FormGroup({});

  filtrarProduccion = new FormGroup({
    combofiltro: new FormControl(),
  });

  InsertarGProduccion = new FormGroup({
    textEncargadoProduc: new FormControl(),
    textProducMalos: new FormControl(),
    textProducto: new FormControl(),
    textFecha: new FormControl(),
    textTotal: new FormControl(),
  });

  ActualizarAProduccion = new FormGroup({
    buscarIdProduccionA: new FormControl(),
    textEncargadoProducA: new FormControl(),
    textProducMalosA: new FormControl(),
    textProductoA: new FormControl(),
    textFechaA: new FormControl(),
    textTotalA: new FormControl(),
  });

  /*--------------------------------*/
  /*         Constructor            */
  /*--------------------------------*/
  constructor(
    private formBuilder: FormBuilder,
    private servi: UrbanService,
    Route: Router
  ) {}

  /*--------------------------------*/
  /*       CRUD PRODUCCION          */
  /*--------------------------------*/

  /*  Lista produccion ********/
  public consultaProduccionI() {
    this.servi.getProduccion().subscribe((data: any) => {
      let dat = data;

      this.produccion = data;
      this.TituloProduccion = "LISTA PRODUCCION";
      this.TablaProduccion[0] = "Id";
      this.TablaProduccion[1] = "Encargado";
      this.TablaProduccion[2] = "Productos malos";
      this.TablaProduccion[3] = "Tipo camiseta";
      this.TablaProduccion[4] = "Fecha";
      this.TablaProduccion[5] = "Total";
    });
  }

  /* Lista tipo de produccion */
  public consultaProduccion(op: any) {
    if (this.controlLista == 1) {
      this.servi.getProduccion().subscribe(
        (data: any) => {
          if (op == 1) {
            let dat = data;
            this.produccion =  data;
            this.TituloProduccion = "LISTA PRODUCCION";
            this.TablaProduccion[0] = "Id";
            this.TablaProduccion[1] = "Encargado";
            this.TablaProduccion[2] = "Productos malos";
            this.TablaProduccion[3] = "Tipo camiseta";
            this.TablaProduccion[4] = "Fecha";
            this.TablaProduccion[5] = "Total";
          } else if (op == 2) {
            this.comboListaProduccion = data;
            this.Miproduccion = null;
            this.TitProduccion = "";
            this.TabBusProduccion[0] = "";
            this.TabBusProduccion[1] = "";
            this.TabBusProduccion[2] = "";
            this.TabBusProduccion[3] = "";
            this.TabBusProduccion[4] = "";
            this.TabBusProduccion[5] = "";
          } else if (op == 3) {
            this.comboEditarProduccion = data;
            this.MiProduccionE = null;
            this.TituloProduccionEdit = "";

            console.error(' El listado 5 ');
          }
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.produccion = null;
      this.TituloProduccion = "";
      this.TablaProduccion[0] = "";
      this.TablaProduccion[1] = "";
      this.TablaProduccion[2] = "";
      this.TablaProduccion[3] = "";
      this.TablaProduccion[4] = "";
      this.TablaProduccion[5] = "";
      this.controlLista = 1;
    }
  }

  /* Mostrar produccion por id */
  public buscarProduccion() {
    var filtovalor = this.filtrarProduccion.getRawValue()['combofiltro'];
    this.servi.getTipoProduccion("/" + filtovalor).subscribe(
      (data: {}) => {
        this.Miproduccion = data;

        this.TitProduccion = 'Produccion Seleccionada';
        this.TabBusProduccion[0] = 'Indicador';
        this.TabBusProduccion[1] = 'Encargado';
        this.TabBusProduccion[2] = 'productos malos';
        this.TabBusProduccion[3] = 'nombre producto';
        this.TabBusProduccion[4] = 'Fecha';
        this.TabBusProduccion[5] = 'Total';

      },
      (error) => {
        console.log(error);
      }
    );
  }

  /* Insertar una nueva produccion */
  public InsertarProduccion() {

    var dato1 = this.InsertarGProduccion.getRawValue()['textEncargadoProduc'];
    var dato2 = this.InsertarGProduccion.getRawValue()['textProducMalos'];
    var dato3 = this.InsertarGProduccion.getRawValue()['textProducto'];
    var dato4 = this.InsertarGProduccion.getRawValue()['textFecha'];
    var dato5 = this.InsertarGProduccion.getRawValue()['textTotal'];

    var cadena = {
      "nombreEncargado": dato1,
      "noProductosMalos": dato2,
      "nombreProducto": dato3,
      "fecga": dato4,
      "total": dato5,
    };

    this.servi
      .insertProduccion(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.InsertarGProduccion.reset();
  }

  /* Consultar Una produccion por el id para modificarla */
  buscarEditProduccion() {
    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor =
        this.ActualizarAProduccion.getRawValue()['buscarIdProduccionA'];
    }
    this.servi.getTipoProduccion("/" + this.BuscarEvalor).subscribe(
      (data: {}) => {
        this.MiProduccionE = data;
        this.TituloProduccionEdit = 'Produccion a editar';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /* Actualizar Produccion */
  public ActualizaProduccion() {
    var nuevo1 = this.ActualizarAProduccion.getRawValue()['textEncargadoProducA'];
    var nuevo2 = this.ActualizarAProduccion.getRawValue()['textProducMalosA'];
    var nuevo3 = this.ActualizarAProduccion.getRawValue()['textProductoA'];
    var nuevo4 = this.ActualizarAProduccion.getRawValue()['textFechaA'];
    var nuevo5 = this.ActualizarAProduccion.getRawValue()['textTotalA'];

    var cadena = {
      "idProduccion": this.BuscarEvalor,
      "nombreEncargado": nuevo1,
      "noProductosMalos": nuevo2,
      "nombreProducto": nuevo3,
      "fecha": nuevo4,
      "total": nuevo5,
    };

    this.servi
      .updateProduccion(cadena)
      .then((res) => {
        console.log('res ', res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.BuscarEvalor = 0;
    this.ActualizarAProduccion.reset();
  }


  /*--------------------------------*/
  /*         Limpiar Lista          */
  /*--------------------------------*/
  public LimpiarLista() {
    this.controlLista = 0;
  }

  /*Filtro encargado nombre -----------------------------------------------------------*/
  public filtroEncargado(){
    this.servi.getEncargados().subscribe((data: any) => {
      this.combo3 = data;
    },
      error => {console.log(error)}
    );
  }

  /*Filtro tipo de producto -----------------------------------------------------------*/
  public filtroProducto(){
    this.servi.getProducto().subscribe((data: any) => {
      this.combo4 = data;
    },
      error => {console.log(error)}
    );
  }

  /*--------------------------------*/
  /*           ngOnInit             */
  /*--------------------------------*/
  ngOnInit(): void {
    this.ListaProduccion = this.formBuilder.group({});

    this.filtrarProduccion = this.formBuilder.group({
      combofiltro: [],
    });

    this.InsertarGProduccion = this.formBuilder.group({
      textEncargadoProduc: [],
      textProducMalos: [],
      textProducto: [],
      textFecha: [],
      textTotal: [],
    });
    this.formBuilder.group;

    this.ActualizarAProduccion = this.formBuilder.group({
      buscarIdProduccionA: [],
      textEncargadoProducA: [],
      textProducMalosA: [],
      textProductoA: [],
      textFechaA: [],
      textTotalA: [],
    });
    this.formBuilder.group;
  }
}
