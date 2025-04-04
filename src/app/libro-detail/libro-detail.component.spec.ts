import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroDetailComponent } from './libro-detail.component';

describe('LibroDetailComponent', () => {
  let component: LibroDetailComponent;
  let fixture: ComponentFixture<LibroDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
