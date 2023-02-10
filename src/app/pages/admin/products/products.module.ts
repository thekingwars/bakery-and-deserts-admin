import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';

import { UpsertProductComponent } from './upsert-product/upsert-product.component';

@NgModule({
  declarations: [ProductsComponent, UpsertProductComponent],
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
    InputNumberModule,
    InputSwitchModule,
    AutoCompleteModule,
    MultiSelectModule,
  ],
  providers: [
    MessageService,
    DialogService,
    DynamicDialogRef,
    ConfirmationService,
  ],
})
export class ProductsModule {}
