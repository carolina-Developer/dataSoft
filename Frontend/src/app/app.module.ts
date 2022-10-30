import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './appcomponent/app.component';

//librerias para consumir el servicio

import {HttpModule, } from '@angular/http';
import {HttpClientModule, } from '@angular/common/http';
import {RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Servicio 
import { UrbanService } from './Urban.service';

///Componentes 

import { ProductosComponent } from './productos/productos.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';


//Rutas
const appRoutes: Routes =
[
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'Inicio'
  },
  {
    path: 'empleado',
    loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule)
  },
  {
    path: 'productividad',
    loadChildren: () => import('./productividad/productividad.module').then(m => m.ProductividadModule)
  },
  {
    path: 'global',
    loadChildren: () => import('./global/global.module').then(m => m.GlobalModule)
  },
  { 
    path: 'Inicio',
    component: MenuInicioComponent,
  },
 
  {
    path: 'productos',
    component: ProductosComponent,
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    MenuInicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [UrbanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
