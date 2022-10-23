import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UrbanService {

  private Url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  private extractData(res: Response) 
  {
     let body = JSON.parse('' + res);

     return body || {};
   }

   private handleError<T>(operation = 'operation', result?: T) 
   { 
      return (error: any): Observable<T> => {
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T)

    };
   }

   
   /*Servicio CRUD PRODUCTO */


   /*Metodo listar productos */

   getProducto(): Observable<any>
   {
 
     return this.http.get(this.Url + "/productos" , httpOptions);
    
   }

   /*Método mostrar un solo prodcto */

   getProductos(id:any): Observable<any> {
  
    return this.http.get(this.Url + "/productos"+id , httpOptions);
  }

  /*Método para insertar un nuevo producto */

  async insertProducto(productoData:any): Promise<any> {
  
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/productos", productoData, httpOptions).toPromise()
    });
  }

  /*Método para modificar un producto */

  async updateProducto(productoData:any): Promise<any> {
  
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/productos", productoData, httpOptions).toPromise()
    });
  }


  /*Servicio CRUD  MATERIALES */


  /*Método Listar de los Tipos de materiales */

  getMaterial(): Observable<any>
  {

    return this.http.get(this.Url + "/materiales" , httpOptions);
   
  }

  /*Método mostrar un solo material */
  getMateriales(id:any): Observable<any> {

    return this.http.get(this.Url + "/materiales"+id , httpOptions);
  }

  /*Método para insertar un nuevo material */

  async insertMaterial(materialData:any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/materiales", materialData, httpOptions).toPromise()
    });
  }

  /*Método para modificar un material */

  async updateMaterial(materialData:any): Promise<any> {
  
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/materiales", materialData, httpOptions).toPromise()
    });
  }

}
