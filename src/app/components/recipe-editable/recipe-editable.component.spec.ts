import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditableComponent } from './recipe-editable.component';

describe('RecipeEditableComponent', () => {
  let component: RecipeEditableComponent;
  let fixture: ComponentFixture<RecipeEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
