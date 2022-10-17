import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { CookieModule } from 'ngx-cookie';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { mockUser } from './user.service.spec';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [
        CookieModule.withOptions(),
        // RouterTestingModule,
        HttpClientTestingModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change showTable property on calling onLoadData method', () => {
    expect(component.showTable).toBeFalse();
       component.onLoadData()
       expect(component.showTable).toBeTrue();
  });

});
