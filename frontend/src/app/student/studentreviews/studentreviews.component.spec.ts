import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentreviewsComponent } from './studentreviews.component';

describe('StudentreviewsComponent', () => {
  let component: StudentreviewsComponent;
  let fixture: ComponentFixture<StudentreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentreviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
