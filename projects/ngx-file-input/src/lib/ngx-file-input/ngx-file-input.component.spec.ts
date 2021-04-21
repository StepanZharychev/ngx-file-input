import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFileInputComponent } from './ngx-file-input.component';

describe('NgxFileInputComponent', () => {
  let component: NgxFileInputComponent;
  let fixture: ComponentFixture<NgxFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxFileInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
