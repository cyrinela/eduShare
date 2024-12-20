import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCategorieComponent } from './admin-add-categorie.component';

describe('AdminAddCategorieComponent', () => {
  let component: AdminAddCategorieComponent;
  let fixture: ComponentFixture<AdminAddCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddCategorieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
