import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, of, tap, withLatestFrom } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class JwtGuard implements CanActivate {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userService.currentUser().pipe(
      map((user: Partial<User>) => {
        return user.role === 'admin';
      }),
      tap((isAdmin) => {
        if (!isAdmin) {
          this.messageService.add({
            severity: 'error',
            summary: 'No tienes autorizacion',
            detail: 'Debes ser admin para acceder',
          });

          this.router.navigate(['login']);
        }
      }),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'No tienes autorizacion',
          detail: err['error']['message'],
        });

        localStorage.removeItem('token');

        this.router.navigate(['login']);

        return of(false);
      })
    );
  }
}
