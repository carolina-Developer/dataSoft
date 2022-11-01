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
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  /*Variables ------------------------------------------------------------------ */

  title = 'MANEJO DE PRODUCTOS';

  Productos: any = []; //Lista de Tipos de Producto
  TituloProductos = ''; //Titulo Lista de Tipos de Producto
  TablaProductos: any = []; //Encabezados tabla Lista de Tipos de Producto

  MiProductos: any = []; //Tipo de Producto Buscado
  TituloProducto = ''; //Titulo de Tipo de Producto Buscado
  TabBusProductos: any = []; //Encabezados tabla Tipo de Producto Buscado
  comboListaProductos: any = []; //Combo Buscar Tipo de Documento

  TituloProductosEdit = ''; //Titulo de Tipo de Producto a Editar
  MiProductosE: any = []; //Tipo de Producto a Editar
  comboEditarProductos: any = []; //Combo Editar Tipo de Producto

  controlLista = 1; //Control para limpiar la lista
  BuscarEvalor = 1; //Control para carga del valor a buscar

  combo3: any = []; //Guardar data para mostrar tipo de productos
  combo4: any = []; //Guardar data para mostrar tipo de colores
  combo5: any = []; //Guardar data para mostrar tipo de productos

  /*Form groups ------------------------------------------------------------------ */

  ListaProducto = new FormGroup({});

  filtrarProducto = new FormGroup({
    combofiltro: new FormControl(),
  });

  InsertarGProducto = new FormGroup({
    textNomProduct: new FormControl(),
    textTipProduct: new FormControl(),
    textTalla: new FormControl(),
    textColor: new FormControl(),
  });

  ActualizarAProducto = new FormGroup({
    BuscarIdProducto: new FormControl(),
    textnuevoProducto: new FormControl(),
    textnuevoTipProduct: new FormControl(),
    textnuevoTalla: new FormControl(),
    textnuevoColor: new FormControl(),
  });

  /*Contructor ----------------------------------------------------------------- */
  constructor(
    private formBuilder: FormBuilder,
    private servi: UrbanService,
    Route: Router
  ) {}

  /*CRUD ----------------------------------------------------------------------- */

  /* Lista Tipos de productos inicial */
  public consultaProductosI() {
    this.servi.getProducto().subscribe((data: any) => {
      let dat = data;

      this.Productos = data;
      this.TituloProductos = 'LISTA DE PRODUCTOS';
      this.TablaProductos[0] = 'ID';
      this.TablaProductos[1] = 'Nombre';
      this.TablaProductos[2] = 'Tipo';
      this.TablaProductos[3] = 'Talla';
      this.TablaProductos[4] = 'Color';
    });
  }

  /*Lista Tipos de productos. */
  public consultaProducto(op: any) {
    if (this.controlLista == 1) {
      this.servi.getProducto().subscribe(
        (data: any) => {
          if (op == 1) {
            this.Productos = data;
            this.TituloProductos = 'LISTA DE PRODUCTOS';
            this.TablaProductos[0] = 'ID';
            this.TablaProductos[1] = 'Nombre';
            this.TablaProductos[2] = "Tipo";
            this.TablaProductos[3] = 'Talla';
            this.TablaProductos[4] = 'Color';
          } else if (op == 2) {
            this.comboListaProductos = data;
            this.MiProductos = null;
            this.TituloProducto = '';
            this.TabBusProductos[0] = '';
            this.TabBusProductos[1] = '';
            this.TabBusProductos[2] = '';
            this.TabBusProductos[3] = '';
            this.TabBusProductos[4] = '';
          } else if (op == 3) {
            this.comboEditarProductos = data;
            this.MiProductosE = null;
            this.TituloProductosEdit = '';

            console.error(' El listado 5 ');
          }
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.Productos = null;
      this.TituloProducto = '';
      this.TablaProductos[0] = '';
      this.TablaProductos[1] = '';
      this.TablaProductos[2] = '';
      this.TablaProductos[3] = '';
      this.TablaProductos[4] = '';
      this.controlLista = 1;
    }
  }

  /*Consulta un tipo de producto por medio de su id. */
  public buscarProducto() {
    var filtovalor = this.filtrarProducto.getRawValue()['combofiltro'];

    this.servi.getProductos('/' + filtovalor).subscribe(
      (data: {}) => {
        this.MiProductos = data;

        this.TituloProducto = 'Tipo de producto seleccionado';
        this.TabBusProductos[0] = 'ID';
        this.TabBusProductos[1] = 'Nombre';
        this.TabBusProductos[2] = 'Tipo';
        this.TabBusProductos[3] = 'Talla';
        this.TabBusProductos[4] = 'Color';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /*Para insertar un nuevo producto */
  public InsertarProducto() {
    var dato1 = this.InsertarGProducto.getRawValue()['textNomProduct'];
    var dato2 = this.InsertarGProducto.getRawValue()['textTipProduct'];
    var dato3 = this.InsertarGProducto.getRawValue()['textTalla'];
    var dato4 = this.InsertarGProducto.getRawValue()['textColor'];

    var cadena = {
      "nombreProducto": dato1,  
      "tipoProducto": dato2,
      "talla": dato3,
      "color": dato4, 
    };

    this.servi
      .insertProducto(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.InsertarGProducto.reset();
  }

  /*Consulta un producto por medio de su id para editarlo */
  buscarEditarProducto() {
    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor =
        this.ActualizarAProducto.getRawValue()['BuscarIdProducto'];
    }

    this.servi.getProductos('/' + this.BuscarEvalor).subscribe(
      (data: {}) => {
        this.MiProductosE = data;
        this.TituloProductosEdit = 'PRODUCTO A EDITA';
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /*Actualiza el producto*/
  public ActualizarProducto() {
    var nuevoProdcut = this.ActualizarAProducto.getRawValue()['textnuevoProducto'];
    var nuevoTipProduct = this.ActualizarAProducto.getRawValue()['textnuevoTipProduct'];
    var nuevoTalProduct = this.ActualizarAProducto.getRawValue()['textnuevoTalla'];
    var nuevoColProduct = this.ActualizarAProducto.getRawValue()['textnuevoColor'];

    var cadena = {
      "idProducto": this.BuscarEvalor,
      "nombreProducto": nuevoProdcut,
      "tipoProducto": nuevoTipProduct,
      "talla": nuevoTalProduct,
      "color": nuevoColProduct,
    };

    this.servi
      .updateProducto(cadena)
      .then((res) => {
        console.log('res  ', res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.BuscarEvalor = 0;
    this.ActualizarAProducto.reset();
  }

  /*Filtro tipo de producto -----------------------------------------------------------*/
  public filtroTipoProduct(){
    this.servi.getCatalogos('/' +5).subscribe((data: any) => {
      this.combo3 = data;
    },
      error => {console.log(error)}
    );
  }

  /*Filtro tipo color */

  public filtroTipoColor(){
    this.servi.getCatalogos('/' +3).subscribe((data: any) => {
      this.combo4 = data;
    },
      error => {console.log(error)}
    );
  }

  /*Limpiar la lista ----------------------------------------------------------- */
  public LimpiarLista() {
    this.controlLista = 0;
  }

  /*ngOnInit ------------------------------------------------------------------- */
  ngOnInit(): void {
    this.ListaProducto = this.formBuilder.group({});

    this.filtrarProducto = this.formBuilder.group({
      combofiltro: [],
    });

    this.InsertarGProducto = this.formBuilder.group({
      textNomProduct: [],
      textTipProduct: [],
      textTalla: [],
      textColor: [],
    });
    this.formBuilder.group;

    this.ActualizarAProducto = this.formBuilder.group({
      BuscarIdProducto: [],
      textnuevoProducto: [],
      textnuevoTipProduct: [],
      textnuevoTalla: [],
      textnuevoColor: [],
    });
    this.formBuilder.group;
  }
}
