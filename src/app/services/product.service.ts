import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api: string = environment.apiDev;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/product/all`);
  }

  getImage(formData: FormData): Observable<File> {
    return this.http.post<File>(`${this.api}/product/productImage`, formData);
  }

  createProduct(product: Product) {
    const formData: FormData = new FormData();

    formData.append('productImage', product.productImage);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.getImage(formData).pipe(
      switchMap(() =>
        this.http.post(`${this.api}/product/create`, product, { headers })
      )
    );
  }

  updateProduct(product: Product) {
    const formData: FormData = new FormData();

    formData.append('productImage', product.productImage);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.getImage(formData).pipe(
      switchMap(() =>
        this.http.put(`${this.api}/product/update`, product, { headers })
      )
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.api}/product/${id}`);
  }
}
