import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import {UrbanService} from '../Urban.service'

@Component({
  selector: 'app-materiales',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})

export class MaterialesComponent implements OnInit {
    /*Variables ------------------------------------------------------------------ */
  
    title = 'MANEJO DE PRODUCTOS';
  
    Material: any = []; //Lista de Tipos de Producto
    TituloMateriales = ''; //Titulo Lista de Tipos de Producto
    TablaMateriales: any = []; //Encabezados tabla Lista de Tipos de Producto
  
    MiMaterial: any = []; //Tipo de Producto Buscado
    TituloMaterial = ''; //Titulo de Tipo de Producto Buscado
    TabBusMaterial: any = []; //Encabezados tabla Tipo de Producto Buscado
    comboListaMaterial: any = []; //Combo Buscar Tipo de Documento
  
    TituloMaterialEdit = ''; //Titulo de Tipo de Producto a Editar
    MiMaterialE: any = []; //Tipo de Producto a Editar
    comboEditarMaterial: any = []; //Combo Editar Tipo de Producto
  
    controlLista = 1; //Control para limpiar la lista
    BuscarEvalor = 1; //Control para carga del valor a buscar
  
    combo3: any = []; //Guardar data para mostrar tipo de productos
    combo4: any = []; //Guardar data para mostrar tipo de colores
    combo5: any = []; //Guardar data para mostrar tipo de productos
  
    /*Form groups ------------------------------------------------------------------ */
  
    ListaMaterial = new FormGroup({});
  
    filtrarMaterial = new FormGroup({
      combofiltro: new FormControl(),
    });
  
    InsertarGMaterial = new FormGroup({
      textNomMaterial: new FormControl(),
      textTipMaterial: new FormControl(),
      textColor: new FormControl(),
      textExistencias: new FormControl(),
    });
  
    ActualizarAMaterial = new FormGroup({
      BuscarIdMaterial: new FormControl(),
      textNewNomMaterial: new FormControl(),
      textNewTipMaterial: new FormControl(),
      textNewColor: new FormControl(),
      textNewExistencias: new FormControl(),
    });
  
    /*Contructor ----------------------------------------------------------------- */
    constructor(
      private formBuilder: FormBuilder,
      private servi: UrbanService,
      Route: Router
    ) {}
  
    /*CRUD ----------------------------------------------------------------------- */
  
    /* Lista Tipos de productos inicial */
    public consultaMaterialesI() {
      this.servi.getMaterial().subscribe((data: any) => {
        let dat = data;
  
        this.Material = data;
        this.TituloMateriales = 'LISTA DE MATERIALES';
        this.TablaMateriales[0] = 'ID';
        this.TablaMateriales[1] = 'Nombre material';
        this.TablaMateriales[2] = 'Tipo Material';
        this.TablaMateriales[3] = 'Color Material';
        this.TablaMateriales[4] = 'Existencias';
      });
    }
  
    /*Lista Tipos de productos. */
    public consultaMaterial(op: any) {
      if (this.controlLista == 1) {
        this.servi.getMaterial().subscribe(
          (data: any) => {
            if (op == 1) {

              this.Material = data;
              this.TituloMateriales = 'LISTA DE MATERIALES';
              this.TablaMateriales[0] = 'ID';
              this.TablaMateriales[1] = 'Nombre material';
              this.TablaMateriales[2] = "Tipo Material";
              this.TablaMateriales[3] = 'Color Material';
              this.TablaMateriales[4] = 'Existencias';

            } else if (op == 2) {

              this.comboListaMaterial = data;
              this.MiMaterial = null;
              this.TituloMaterial = '';
              this.TabBusMaterial[0] = '';
              this.TabBusMaterial[1] = '';
              this.TabBusMaterial[2] = '';
              this.TabBusMaterial[3] = '';
              this.TabBusMaterial[4] = '';

            } else if (op == 3) {

              this.comboEditarMaterial = data;
              this.MiMaterialE = null;
              this.TituloMaterialEdit = '';

            }
          },
          (error) => {
            console.error(error + ' ');
          }
        );
      } else {
        this.Material = null;
        this.TituloMaterial = '';
        this.TablaMateriales[0] = '';
        this.TablaMateriales[1] = '';
        this.TablaMateriales[2] = '';
        this.TablaMateriales[3] = '';
        this.TablaMateriales[4] = '';
        this.controlLista = 1;
      }
    }
  
    /*Consulta un tipo de producto por medio de su id. */
    public buscarMaterial() {
      var filtovalor = this.filtrarMaterial.getRawValue()['combofiltro'];
  
      this.servi.getMateriales('/' + filtovalor).subscribe(
        (data: {}) => {
          this.MiMaterial = data;
  
          this.TituloMaterial = 'Tipo de producto seleccionado';
          this.TabBusMaterial[0] = 'ID';
          this.TabBusMaterial[1] = 'Nombre material';
          this.TabBusMaterial[2] = 'Tipo Material';
          this.TabBusMaterial[3] = 'Color Material';
          this.TabBusMaterial[4] = 'Existencias';
        },
        (error) => {
          console.log(error);
        }
      );
    }
  
    /*Para insertar un nuevo producto */
    public InsertarMaterial() {
      var dato1 = this.InsertarGMaterial.getRawValue()['textNomMaterial'];
      var dato2 = this.InsertarGMaterial.getRawValue()['textTipMaterial'];
      var dato3 = this.InsertarGMaterial.getRawValue()['textColor'];
      var dato4 = this.InsertarGMaterial.getRawValue()['textExistencias'];
  
      var cadena = {
        "nombreMaterial": dato1,  
        "tipoMaterial": dato2,
        "colorMaterial": dato3,
        "existencias": dato4, 
      };
  
      this.servi
        .insertMaterial(cadena)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.InsertarGMaterial.reset();
    }
  
    /*Consulta un producto por medio de su id para editarlo */
    buscarEditarMaterial() {
      if (this.BuscarEvalor != 0) {
        this.BuscarEvalor =
          this.ActualizarAMaterial.getRawValue()['BuscarIdMaterial'];
      }
  
      this.servi.getMateriales('/' + this.BuscarEvalor).subscribe(
        (data: {}) => {
          this.MiMaterialE = data;
          this.TituloMaterialEdit = 'MATERIAL A EDITAR';
        },
        (error) => {
          console.log(error);
        }
      );
    }
    /*Actualiza el producto*/
    public ActualizarMaterial() {
      var newMaterial = this.ActualizarAMaterial.getRawValue()['textNewNomMaterial'];
      var newTipMaterial = this.ActualizarAMaterial.getRawValue()['textNewTipMaterial'];
      var newColor = this.ActualizarAMaterial.getRawValue()['textNewColor'];
      var newExistencia = this.ActualizarAMaterial.getRawValue()['textNewExistencias'];
  
      var cadena = {
        "idMaterial": this.BuscarEvalor,
        "nombreMaterial": newMaterial,
        "tipoMaterial": newTipMaterial,
        "colorMaterial": newColor,
        "existencias": newExistencia,
      };
  
      this.servi
        .updateMaterial(cadena)
        .then((res) => {
          console.log('res  ', res);
        })
        .catch((err) => {
          console.log(err);
        });
  
      this.BuscarEvalor = 0;
      this.ActualizarAMaterial.reset();
    }
  
    /*Filtro tipo de producto -----------------------------------------------------------*/
    public filtroTipoMaterial(){
      this.servi.getCatalogos('/' +6).subscribe((data: any) => {
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
      this.ListaMaterial = this.formBuilder.group({});
  
      this.filtrarMaterial = this.formBuilder.group({
        combofiltro: [],
      });
  
      this.InsertarGMaterial = this.formBuilder.group({
        textNomMaterial: [],
        textTipMaterial: [],
        textColor: [],
        textExistencias: [],
      });
      this.formBuilder.group;
  
      this.ActualizarAMaterial = this.formBuilder.group({
        BuscarIdMaterial: [],
        textNewNomMaterial: [],
        textNewTipMaterial: [],
        textNewColor: [],
        textNewExistencias: [],
      });
      this.formBuilder.group;
    }
  }
  
