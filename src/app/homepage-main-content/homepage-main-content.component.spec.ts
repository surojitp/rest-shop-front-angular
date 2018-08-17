import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageMainContentComponent } from './homepage-main-content.component';

describe('HomepageMainContentComponent', () => {
  let component: HomepageMainContentComponent;
  let fixture: ComponentFixture<HomepageMainContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageMainContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
