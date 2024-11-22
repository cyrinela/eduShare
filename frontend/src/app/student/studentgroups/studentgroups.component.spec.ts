import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentgroupsComponent } from './studentgroups.component';

describe('StudentgroupsComponent', () => {
  let component: StudentgroupsComponent;
  let fixture: ComponentFixture<StudentgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentgroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
