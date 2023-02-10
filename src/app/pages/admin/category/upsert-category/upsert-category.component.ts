import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, catchError, finalize, tap, throwError } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-upsert-category',
  templateUrl: './upsert-category.component.html',
  styleUrls: ['./upsert-category.component.scss'],
})
export class UpsertCategoryComponent implements OnInit {
  nameImage: string = 'Añada una imagen (requerido)';
  categoryForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    categoryImage: new FormControl('', [Validators.required]),
  });
  isLoading$ = new BehaviorSubject<boolean>(false);
  category: Category = this.dialogConfig.data?.category;
  labelName: string = 'Crear Categoria';

  onSelectFile(event: any) {
    this.nameImage = event.currentFiles[0].name;
    const file: File = event.currentFiles[0];
    const path: string = event.originalEvent.target.value;

    file['path'] = path;

    this.categoryForm.get('categoryImage').patchValue(file);
  }

  isValidField(field: string) {
    const error = this.categoryForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  onSubmit() {
    this.isLoading$.next(true);

    if (!this.category) {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  createCategory() {
    this.categoryService
      .createCategory(this.categoryForm.value)
      .pipe(
        finalize(() => this.isLoading$.next(false)),
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            detail: err.error.message,
          });

          return throwError(() => err);
        }),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            detail: 'Exito',
            data: 'Categoria creada con exito',
          });
          this.dialogRef.close('listen new data');
        })
      )
      .subscribe();
  }

  updateCategory() {
    this.categoryService
      .updateCategory({
        ...this.category,
        ...this.categoryForm.value,
      })
      .pipe(
        finalize(() => this.isLoading$.next(false)),
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            detail: err.error.message,
          });

          return throwError(() => err);
        }),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            detail: 'Exito',
            data: 'Categoria creada con exito',
          });
          this.dialogRef.close('listen new data');
        })
      )
      .subscribe();
  }

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef,
    private categoryService: CategoryService,
    private dialogConfig: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (!!this.category) {
      this.labelName = 'Actualizar Categoria';
      const split: string[] = this.category.categoryImage.split('.');
      const mime: string = split[split.length - 1];
      const length: number = this.category.categoryImage.split('/').length - 1;
      const name: string = this.category.categoryImage.split('/')[length];

      const blob = new Blob([this.category.categoryImage], {
        type: `image/${mime}`,
      });

      let file = new File([blob], name, { type: `image/${mime}` });

      this.nameImage = file.name;

      file['path'] = `C:\\fakepath\\${file.name}`;

      this.categoryForm.patchValue(this.category);
    }
  }
}
