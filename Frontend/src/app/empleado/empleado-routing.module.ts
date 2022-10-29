
/* Empleado routing: se encarga de redireccionar a los 
componentes que se especifiquen con el fin de generar un lazyload 
(ayuda a volver los paquetes mas pequeños y reducir el tiempo de carga)*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {ContactosComponent} from './contactos/contactos.component'; 
import{EncargadosComponent} from './encargados/encargados.component';

const routes: Routes = [
  {
    path: 'contactos',
    component: ContactosComponent
  },
  {
    path: 'encargados',
    component: EncargadosComponent
  },
  {
    path: '**',                 //Siempre va a mandar a este componente si no encuentra nada en la _URL
    pathMatch:'full',
    redirectTo:'encargados'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
