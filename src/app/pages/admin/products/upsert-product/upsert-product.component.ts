import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-upsert-product',
  templateUrl: './upsert-product.component.html',
  styleUrls: ['./upsert-product.component.scss'],
})
export class UpsertProductComponent implements OnInit {
  nameImage: string = 'Añada una imagen (requerido)';
  labelName: string = 'Crear Producto';
  isLoading: boolean = false;
  productForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    haveStock: new FormControl(false),
    stock: new FormControl(null),
    price: new FormControl(0, [Validators.required]),
    truePrice: new FormControl(null, [Validators.required]),
    categories: new FormControl([], [Validators.required]),
    productImage: new FormControl(null, [Validators.required]),
  });
  product: Product = this.dialogConfig.data?.product;

  categories$ = this.categoryService.allCategory();

  onSelectFile(event: any) {
    this.nameImage = event.currentFiles[0].name;
    const file: File = event.currentFiles[0];
    const path: string = event.originalEvent.target.value;

    file['path'] = path;

    this.productForm.get('productImage').patchValue(file);
  }

  isValidField(field: string) {
    const error = this.productForm.get(field);
    return (error.touched || error.dirty) && error.invalid;
  }

  changeSwitch(checked: boolean) {
    const stock = this.productForm.get('stock');

    if (checked) {
      stock.addValidators([Validators.required]);
    } else {
      stock.setValidators([]);

      stock.reset();
    }

    stock.updateValueAndValidity();
  }

  onSubmit() {
    if (!this.product) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  createProduct() {
    this.isLoading = true;

    this.productService
      .createProduct(this.productForm.value)
      .pipe(
        finalize(() => (this.isLoading = false)),
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
            data: 'Producto creado con exito',
          });

          this.dialogRef.close('listen new data');
        })
      )
      .subscribe();
  }

  updateProduct() {
    this.isLoading = true;
    this.productService
      .updateProduct({
        ...this.product,
        ...this.productForm.value,
      })
      .pipe(
        finalize(() => (this.isLoading = false)),
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
            data: 'Producto actualizado con exito',
          });

          this.dialogRef.close('listen update data');
        })
      )
      .subscribe();
  }

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (!!this.product) {
      this.labelName = 'Actualizar Producto';
      const split: string[] = this.product.productImage.split('.');
      const mime: string = split[split.length - 1];
      const length: number = this.product.productImage.split('/').length - 1;
      const name: string = this.product.productImage.split('/')[length];

      const blob = new Blob([this.product.productImage], {
        type: `image/${mime}`,
      });

      let file = new File([blob], name, { type: `image/${mime}` });

      this.nameImage = file.name;

      this.productForm.patchValue(this.product);
    }
  }
}
