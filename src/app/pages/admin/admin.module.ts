import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoryModule } from './category/category.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule, CategoryModule],
  providers: [],
})
export class AdminModule {}
