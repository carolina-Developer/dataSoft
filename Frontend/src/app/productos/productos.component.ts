import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UrbanService } from '../Urban.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']  
})

export class ProductosComponent implements OnInit {

  /*Variables ------------------------------------------------------------------ */

  title = "MANEJO DE PRODUCTOS";

  Productos: any = [];               //Lista de Tipos de Producto
  TituloProductos = "";              //Titulo Lista de Tipos de Producto
  TablaProductos: any = [];          //Encabezados tabla Lista de Tipos de Producto 

  MiProductos: any = [];             //Tipo de Producto Buscado
  TituloProducto = "";               //Titulo de Tipo de Producto Buscado
  TabBusProductos: any = [];         //Encabezados tabla Tipo de Producto Buscado 
  comboListaProductos: any = [];     //Combo Buscar Tipo de Documento

  
  TituloProductosEdit = "";          //Titulo de Tipo de Producto a Editar
  MiProductosE: any = [];            //Tipo de Producto a Editar
  comboEditarProductos: any = [];    //Combo Editar Tipo de Producto

  controlLista = 1;                  //Control para limpiar la lista
  BuscarEvalor = 1;                  //Control para carga del valor a buscar

  /*Form groups ------------------------------------------------------------------ */

  ListaProducto =  new FormGroup (
    {
  
    });
  
    filtrarProducto =  new FormGroup(
    {
      combofiltro: new FormControl()
    });
  
    
    InsertarGProducto =  new FormGroup(
    {
      textProducto: new FormControl(), 
      textIniProducto:new FormControl()
    });
  
    
    ActualizarAProducto =  new FormGroup(
    {
      BuscarIdProducto:new FormControl(),  
      textnuevoProducto:new FormControl(), 
      textnuevoinicialesProducto: new FormControl()
    });

  /*Contructor ----------------------------------------------------------------- */
  constructor(
    private formBuilder: FormBuilder, 
    private servi: UrbanService,
    Route : Router
  ) { }
  
  /*CRUD ----------------------------------------------------------------------- */

    /* Lista Tipos de productos inicial */
    public consultaProductosI()
    {
        this.servi.getProducto().subscribe((data: any) => 
        {

            let dat = data;
          
            this.Productos = data;
            this.TituloProductos = "LISTA DE PRODUCTOS";
            this.TablaProductos[0] = "indicador";
            this.TablaProductos[1] = "nombre";
            this.TablaProductos[2] = "tipo";
            this.TablaProductos[3] = "talla";
            this.TablaProductos[4] = "color";
        });
    }

    /*Lista Tipos de productos. */
    public consultaProducto(op:any)
    {
     
      if(this.controlLista == 1)
      {
         
          this.servi.getProducto().subscribe((data: any) => {
            
            if (op == 1)
            {
            
                this.Productos = data;
                this.TituloProductos = "LISTA DE PRODUCTOS";
                this.TablaProductos[0] = "indicador";
                this.TablaProductos[1] = "nombre";
                this.TablaProductos[2] = "tipo";
                this.TablaProductos[3] = "talla";
                this.TablaProductos[4] = "color";
                
              }
              else if(op == 2)
              {
                this.comboListaProductos = data;
                this.MiProductos = null;
                this.TituloProducto = "";
                this.TabBusProductos[0] = "";
                this.TabBusProductos[1] = "";
                this.TabBusProductos[2] = "";
                this.TabBusProductos[3] = "";
                this.TabBusProductos[4] = "";
                
              }
              else if(op == 3)
              { 
                this.comboEditarProductos  = data;
                this.MiProductosE = null;
                this.TituloProductosEdit = ""; 
                
                console.error(" El listado 5 " );
              }              

        },
          error => { console.error(error + " ") });
      }
      else
      {
        this.Productos = null;
        this.TituloProducto = "";
        this.TablaProductos[0] = "";
        this.TablaProductos[1] = "";
        this.TablaProductos[2] = "";
        this.TablaProductos[3] = "";
        this.TablaProductos[4] = "";   
        this.controlLista = 1; 
      }
    
    }

    /*Consulta un tipo de producto por medio de su id. */
      public buscarProducto() 
      {

        var filtovalor = this.filtrarProducto.getRawValue()['combofiltro'];
        
        this.servi.getProductos('/' + filtovalor).subscribe((data: {}) => {
          
          this.MiProductos = data;


          this.TituloProducto = "TIPO DE PRODUCTO SELECCIONADO";
          this.TabBusProductos[0] = "indicador";
          this.TabBusProductos[1] = "nombre";
          this.TabBusProductos[2] = "tipo";
          this.TabBusProductos[3] = "talla";
          this.TabBusProductos[4] = "color";


        },
          error => { console.log(error) });

      }

    /*Para insertar un nuevo producto */
      public InsertarProducto() {

        var datosvalo1 = this.InsertarGProducto.getRawValue()['textProduct'];
        var datosvalo2 = this.InsertarGProducto.getRawValue()['textTipProduct'];
        var datosvalo3 = this.InsertarGProducto.getRawValue()['textTalla'];
        var datosvalo4 = this.InsertarGProducto.getRawValue()['textIniColor'];
  
        var cadena = { "textIniColor":datosvalo4,"textTalla":datosvalo3,"textTipProduct": datosvalo2, "textProduct":datosvalo1 };
      
        this.servi.insertProducto(cadena).then
          ( res => {
              console.log(res)
            }
          ).catch(err => {
            console.log(err)
          });
          this.InsertarGProducto.reset();
      }
    
    /*Consulta un producto por medio de su id para editarlo */  
      buscarEditarProducto() 
      {
        if ( this.BuscarEvalor != 0)
        {
          this.BuscarEvalor = this.ActualizarAProducto.getRawValue()['BuscarIdProducto'];
          
        }
        
        this.servi.getProductos('/' + this.BuscarEvalor).subscribe((data: {}) => {

          this.MiProductosE = data; 
          this.TituloProductosEdit = "PRODUCTO A EDITAR";   
          
        }, error => { console.log(error) });

      }
    /*Actualiza el producto*/
    public ActualizarProducto() 
      {
      
        var nuevoProdcut = this.ActualizarAProducto.getRawValue()['textnuevoproduct'];
        var nuevoiniproduct = this.ActualizarAProducto.getRawValue()['textnuevoinicialesproduct'];
      
        var cadena = { "id_producto": this.BuscarEvalor,"producto":nuevoProdcut ,"iniciales_producto": nuevoiniproduct };
        
        this.servi.updateProducto(cadena).then
          (
            res => {
              console.log("res  ",res)
            }
          ).catch(err => {
            console.log(err)
          });
      
          this.BuscarEvalor = 0;
          this.ActualizarAProducto.reset();   
      
      }  

    /*Limpiar la lista ----------------------------------------------------------- */
      public LimpiarLista() 
      {
        this.controlLista = 0;
      }

    

  /*ngOnInit ------------------------------------------------------------------- */
  ngOnInit(): void 
  {
    this.ListaProducto = this.formBuilder.group(
      {
  
      });   

      
    this.filtrarProducto = this.formBuilder.group(
    {
      combofiltro: []
    });

    
    this.InsertarGProducto = this.formBuilder.group(
    {
      textProduct: [], 
      textIniProduct:[]
    });
    this.formBuilder.group

    
    this.ActualizarAProducto = this.formBuilder.group(
    {
      BuscarIdProduct: [], 
      textnuevoProduct: [], 
      textnuevoinicialesProduct: []
    });
    this.formBuilder.group
  }

}
