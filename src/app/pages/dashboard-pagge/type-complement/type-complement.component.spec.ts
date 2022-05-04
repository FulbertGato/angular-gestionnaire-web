import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeComplementComponent } from './type-complement.component';

describe('TypeComplementComponent', () => {
  let component: TypeComplementComponent;
  let fixture: ComponentFixture<TypeComplementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeComplementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeComplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
