import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserToken } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api: string = environment.apiDev;

  constructor(private http: HttpClient) {}

  loginUser(user: User): Observable<UserToken> {
    return this.http.post<UserToken>(`${this.api}/auth/login`, user).pipe(
      map((user) => {
        localStorage.setItem('token', user.access_token);

        return user;
      })
    );
  }

  currentUser() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.api}/user/current`, { headers });
  }
}
