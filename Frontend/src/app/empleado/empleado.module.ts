
/* empleado module: sirve para importar y/o 
declarar el componente */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';

import {ContactosComponent} from './contactos/contactos.component'; 
import{EncargadosComponent} from './encargados/encargados.component';

@NgModule({
  /*Aqui importe los componentes */
  declarations: [
    ContactosComponent,
    EncargadosComponent
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule
  ]
})
export class EmpleadoModule { }
