import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieModule } from 'ngx-cookie';

import { CustomerTableComponent } from './customer-table.component';

describe('CustomerTableComponent', () => {
  let component: CustomerTableComponent;
  let fixture: ComponentFixture<CustomerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTableComponent ],
      imports: [
        CookieModule.withOptions(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
