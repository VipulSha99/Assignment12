import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { role } from './role.model';

import { RoleService } from './role.service';

export const mockRole: role[] = [{
    key:'uuid2',
    role: 'admin',
    description: 'administrative right'
  }];

describe('RoleService', () => {
  let service: RoleService;
  let httpTestingController: HttpTestingController;
  const roleBaseURL=environment.apiURL+'/roles';

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
          ],
    });
    
    service = TestBed.inject(RoleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should read roles correctly on calling the getRole function", fakeAsync(() => {
    service.getRole().subscribe((roles) => {     
      expect(JSON.stringify(roles)).toEqual(JSON.stringify(mockRole));
    });
    let req = httpTestingController.expectOne(roleBaseURL);
    expect(req.request.method).toEqual("GET");
    req.flush(mockRole)
  }));
});
