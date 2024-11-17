import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentpageComponent } from './studentdashboard.component';

describe('StudentpageComponent', () => {
  let component: StudentpageComponent;
  let fixture: ComponentFixture<StudentpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
