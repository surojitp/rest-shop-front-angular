import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurClintComponent } from './our-clint.component';

describe('OurClintComponent', () => {
  let component: OurClintComponent;
  let fixture: ComponentFixture<OurClintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurClintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurClintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
