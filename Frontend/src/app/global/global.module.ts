import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalRoutingModule } from './global-routing.module';

import {CatalogoComponent} from './catalogo/catalogo.component';

@NgModule({
  declarations: [
    CatalogoComponent
  ],
  imports: [
    CommonModule,
    GlobalRoutingModule
  ]
})
export class GlobalModule { }
