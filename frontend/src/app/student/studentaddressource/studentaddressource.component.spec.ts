import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentaddressourceComponent } from './studentaddressource.component';

describe('StudentaddressourceComponent', () => {
  let component: StudentaddressourceComponent;
  let fixture: ComponentFixture<StudentaddressourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentaddressourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentaddressourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
