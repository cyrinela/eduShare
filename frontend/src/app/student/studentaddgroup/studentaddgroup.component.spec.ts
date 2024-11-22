import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentaddgroupComponent } from './studentaddgroup.component';

describe('StudentaddgroupComponent', () => {
  let component: StudentaddgroupComponent;
  let fixture: ComponentFixture<StudentaddgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentaddgroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentaddgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
