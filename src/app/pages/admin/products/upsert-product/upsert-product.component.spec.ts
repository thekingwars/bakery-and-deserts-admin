import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertProductComponent } from './upsert-product.component';

describe('UpsertProductComponent', () => {
  let component: UpsertProductComponent;
  let fixture: ComponentFixture<UpsertProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
