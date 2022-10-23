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

import { CatalogoComponent } from './catalogo/catalogo.component';
import { ContactosComponent } from './contactos/contactos.component';
import { DetallesproductosComponent } from './detallesproductos/detallesproductos.component';
import { EncargadosComponent } from './encargados/encargados.component';
import { MaterialesComponent } from './materiales/materiales.component';
import { ProduccionComponent } from './produccion/produccion.component';
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
    path: 'Inicio',
    component: MenuInicioComponent,
  },
  {
    path: 'catalogo',
    component: CatalogoComponent,
  },
  {
    path: 'contactos',
    component: ContactosComponent,
  },
  {
    path: 'detallesproductos',
    component: DetallesproductosComponent,
  },
  {
    path: 'encargados',
    component: EncargadosComponent,
  },
  {
    path: 'materiales',
    component: MaterialesComponent,
  },
  {
    path: 'produccion',
    component: ProduccionComponent,
  },
  {
    path: 'productos',
    component: ProductosComponent,
  }
]

@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    ContactosComponent,
    DetallesproductosComponent,
    EncargadosComponent,
    MaterialesComponent,
    ProduccionComponent,
    ProductosComponent,
    MenuInicioComponent
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
