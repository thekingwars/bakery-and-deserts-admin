import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule, CategoryModule, ProductsModule],
  providers: [],
})
export class AdminModule {}
