import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  password: string = '';
  formLogin: FormGroup = this.fb.group({
    email: new FormControl(this.password, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  isLoading: boolean = false;

  getErrorMessage(field: string) {
    let error: AbstractControl<any, any> = this.formLogin.get(field)!;
    let message;

    if (error?.errors?.['required']) {
      message = 'El campo es requerido';
    }
    if (error.hasError('minlength')) {
      message = 'Debe colocar un minimo de 6 caracteres';
    }
    if (error.hasError('email')) {
      message = 'El email es invalido';
    }

    return message;
  }

  isValidField(field: string) {
    const error = this.formLogin.get(field);
    return (error?.dirty || error?.touched) && error?.hasError('required');
  }

  onSubmit() {
    this.isLoading = true;

    this.userService
      .loginUser(this.formLogin.value)
      .pipe(
        finalize(() => (this.isLoading = false)),
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: err.error.message,
          });

          return throwError(() => err);
        }),
        tap((user) => {
          this.router.navigateByUrl('/').then((value) => {
            if (user.user.role === 'admin') {
              this.messageService.add({
                severity: 'info',
                summary: `Mucho Gusto!`,
                detail: `Bienvenido ${user.user.name}`,
              });
            }
          });
        })
      )
      .subscribe();
  }

  constructor(
    public layoutService: LayoutService,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}
}
