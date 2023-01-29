import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api: string = environment.apiDev;

  constructor(private http: HttpClient) {}

  allCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.api}/category`);
  }

  createCategory(category: Category) {
    const formData: FormData = new FormData();
    const file: File = category.categoryImage;

    formData.append('name', category.name);
    formData.append('categoryImage', file);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.post(`${this.api}/category/create`, formData, { headers });
  }

  updateCategory(category: Category) {
    const formData: FormData = new FormData();
    const file: File = category.categoryImage;

    formData.append('name', category.name);
    formData.append('categoryImage', file);
    formData.append('_id', category._id);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.put(`${this.api}/category/update`, formData, { headers });
  }

  deleteCategory(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.delete(`${this.api}/category/${id}`, { headers });
  }
}
