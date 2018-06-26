import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectDiskUsageComponent} from './project-disk-usage.component';

describe('ProjectDiskUsageComponent', () => {
  let component: ProjectDiskUsageComponent;
  let fixture: ComponentFixture<ProjectDiskUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDiskUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDiskUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
