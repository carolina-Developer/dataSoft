import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {DetallesProductoComponent} from './detallesProducto/detallesProducto.component';
import{MaterialComponent} from './material/material.component'
import{ProduccionComponent} from './produccion/produccion.component'
import {ProductoComponent} from './producto/producto.component'

const routes: Routes = [
  {
    path: 'detallesProducto',
    component: DetallesProductoComponent
  },
  {
    path: 'material',
    component: MaterialComponent
  },
  {
    path: 'produccion',
    component: ProduccionComponent
  },
  {
    path: 'producto',
    component: ProductoComponent
  },
  {
    path: '**',                 //Siempre va a mandar a este componente si no encuentra nada en la _URL
    pathMatch:'full',
    redirectTo:'produccion'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductividadRoutingModule { }
