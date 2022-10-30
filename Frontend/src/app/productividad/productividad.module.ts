import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductividadRoutingModule } from './productividad-routing.module';

import {DetallesProductoComponent} from './detallesProducto/detallesProducto.component';
import {MaterialComponent} from './material/material.component';
import {ProduccionComponent} from './produccion/produccion.component';
import {ProductoComponent} from './producto/producto.component';

@NgModule({
  declarations: [
    DetallesProductoComponent,
    MaterialComponent, 
    ProduccionComponent, 
    ProductoComponent
  ],
  imports: [
    CommonModule,
    ProductividadRoutingModule
  ]
})
export class ProductividadModule { }
