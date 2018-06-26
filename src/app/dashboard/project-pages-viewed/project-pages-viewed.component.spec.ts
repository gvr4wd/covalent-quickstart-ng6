import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectPagesViewedComponent} from './project-pages-viewed.component';

describe('ProjectPagesViewedComponent', () => {
  let component: ProjectPagesViewedComponent;
  let fixture: ComponentFixture<ProjectPagesViewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPagesViewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPagesViewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
