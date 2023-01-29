import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { InplaceModule } from 'primeng/inplace';
import { ImageModule } from 'primeng/image';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';

import { UpsertCategoryComponent } from './upsert-category/upsert-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [CategoryComponent, UpsertCategoryComponent],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    BadgeModule,
    InplaceModule,
    ImageModule,
    ToolbarModule,
    DynamicDialogModule,
    FileUploadModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    MessageService,
    DialogService,
    DynamicDialogRef,
    ConfirmationService,
  ],
})
export class CategoryModule {}
