import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieModule } from 'ngx-cookie';

import { CustomerAddComponent } from './customer-add.component';

describe('CustomerAddComponent', () => {
  let component: CustomerAddComponent;
  let fixture: ComponentFixture<CustomerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAddComponent ],
      imports: [
        CookieModule.withOptions(),
        // RouterTestingModule,
        HttpClientTestingModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
