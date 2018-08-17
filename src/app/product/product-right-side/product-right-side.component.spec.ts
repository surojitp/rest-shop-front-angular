import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRightSideComponent } from './product-right-side.component';

describe('ProductRightSideComponent', () => {
  let component: ProductRightSideComponent;
  let fixture: ComponentFixture<ProductRightSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRightSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRightSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
