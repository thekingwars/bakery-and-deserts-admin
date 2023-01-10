import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtGuard implements CanActivate {
  constructor(private router: Router, private messageService: MessageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');

    if (!token) {
      this.messageService.add({
        severity: 'error',
        summary: 'No tienes autorizacion',
        detail: 'Debes ser admin para acceder',
      });

      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
