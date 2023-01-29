import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil, tap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { UpsertCategoryComponent } from './upsert-category/upsert-category.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories$ = this.categoryService.allCategory();
  unsubscribe$ = new Subject();

  openDialog() {
    const ref = this.dialogService.open(UpsertCategoryComponent, {
      header: 'Crear una Categoria',
      width: '750px',
    });

    ref.onClose.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (value) {
        this.categories$ = this.categoryService.allCategory();
      }
    });
  }

  openUpdateDialog(category: Category) {
    const ref = this.dialogService.open(UpsertCategoryComponent, {
      header: 'Actualizar una Categoria',
      width: '750px',
      data: {
        category,
      },
    });

    ref.onClose.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (value) {
        this.categories$ = this.categoryService.allCategory();
      }
    });
  }

  deleteCategory(id: string) {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      header: 'Eliminar Categoria',
      message: '¿Estás seguro que desea eliminar esta categoría?',
      accept: () => {
        this.categoryService
          .deleteCategory(id)
          .pipe(
            tap(() => {
              this.messageService.add({
                severity: 'success',
                detail: 'Categoria eliminada con exito',
              });

              this.categories$ = this.categoryService.allCategory();
            })
          )
          .subscribe();
      },
      acceptLabel: 'Si, seguro',
      rejectLabel: 'No',
    });
  }

  constructor(
    private categoryService: CategoryService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next('');
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {}
}
