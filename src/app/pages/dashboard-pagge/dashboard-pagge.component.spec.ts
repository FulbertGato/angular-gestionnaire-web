import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPaggeComponent } from './dashboard-pagge.component';

describe('DashboardPaggeComponent', () => {
  let component: DashboardPaggeComponent;
  let fixture: ComponentFixture<DashboardPaggeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPaggeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPaggeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
