import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListVerificationComponent } from './shopping-list-verification.component';

describe('ShoppingListVerificationComponent', () => {
  let component: ShoppingListVerificationComponent;
  let fixture: ComponentFixture<ShoppingListVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingListVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
