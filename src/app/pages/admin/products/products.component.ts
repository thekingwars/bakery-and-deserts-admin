import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil, tap } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { UpsertProductComponent } from './upsert-product/upsert-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products$ = this.productService.findAll();
  unsubscribe$ = new Subject();

  openDialog() {
    const ref = this.dialogService.open(UpsertProductComponent, {
      header: 'Crear un Producto',
      width: '750px',
    });

    ref.onClose.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (value) {
        this.products$ = this.productService.findAll();
      }
    });
  }

  openUpdateDialog(product: Product) {
    const ref = this.dialogService.open(UpsertProductComponent, {
      header: 'Actualizar un Producto',
      width: '750px',
      data: {
        product,
      },
    });

    ref.onClose.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (value) {
        this.products$ = this.productService.findAll();
      }
    });
  }

  deleteProduct(id: string) {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      header: 'Eliminar Producto',
      message: '¿Estás seguro que desea eliminar este Producto?',
      accept: () => {
        this.productService
          .deleteProduct(id)
          .pipe(
            tap(() => {
              this.messageService.add({
                severity: 'success',
                detail: 'Producto eliminado con exito',
              });

              this.products$ = this.productService.findAll();
            })
          )
          .subscribe();
      },
      acceptLabel: 'Si, seguro',
      rejectLabel: 'No',
    });
  }

  constructor(
    private productService: ProductService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
}
