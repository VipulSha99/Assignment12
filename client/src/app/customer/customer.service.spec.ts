import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieModule } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { customerModel } from './customer.model';

import { CustomerService } from './customer.service';

export const mockCustomer: customerModel[] = [{
    id:'uuid3',
    name:'testCustomerName',
    website:'testCustomerWebsite',
    address:'testCustomerAddress'
  }];

describe('CustomerService', () => {
  let service: CustomerService;
  let httpTestingController: HttpTestingController;
  const customerBaseUrl=environment.BASE_URL_CUSTOMERS;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            CookieModule.withOptions(),
            RouterTestingModule,
            HttpClientTestingModule,
          ],
    });
    service = TestBed.inject(CustomerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should read customers correctly on calling the getCustomer function", fakeAsync(() => {  
    let parameter = 'filter={"include":["users"]}';
    service.getCustomer().subscribe((customers) => {   
      expect(JSON.stringify(customers)).toEqual(JSON.stringify(mockCustomer));
    });
    let req = httpTestingController.expectOne(customerBaseUrl+'?'+parameter);
    expect(req.request.method).toEqual("GET");
    req.flush(mockCustomer)
  }));

  it("should delete customer correctly on calling the deleteCustomer function", fakeAsync(() => {
   
    service.deleteCustomer('uuid3').subscribe(() => {});
    let req = httpTestingController.expectOne(customerBaseUrl+`/uuid3`)
    expect(req.request.method).toEqual("DELETE");
  }));

  it("should post customer correctly on calling the postCustomer function", fakeAsync(() => {
  
    service.addCustomer(mockCustomer[0]).subscribe(user => {
      expect(JSON.stringify(user)).toEqual(JSON.stringify(mockCustomer[0]))
    });
    let req = httpTestingController.expectOne(customerBaseUrl)
    expect(req.request.method).toEqual("POST");
    req.flush(mockCustomer[0])
  }));

  it("should get Selected Customer correctly on calling the getSelectedCustomer function", fakeAsync(() => {
    let parameter = 'filter={"include":["users"]}';
    service.getSelectedCustomer('uuid3').subscribe((user) => {
      
      expect(JSON.stringify(user)).toEqual(JSON.stringify([mockCustomer[0]]));

    });
    let req = httpTestingController.expectOne(customerBaseUrl+'/uuid3?'+parameter);
    expect(req.request.method).toEqual("GET");
    req.flush(mockCustomer)
  }));

});
