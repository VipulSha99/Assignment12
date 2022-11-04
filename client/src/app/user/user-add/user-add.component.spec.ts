import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieModule } from 'ngx-cookie';

import { UserAddComponent } from './user-add.component';

describe('UserAddComponent', () => {
  let component: UserAddComponent;
  let fixture: ComponentFixture<UserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddComponent ],
      imports: [
        CookieModule.withOptions(),
        // RouterTestingModule,
        HttpClientTestingModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   it('should emit refresh event',()=>{
//     component.updatedData.subscribe((result)=>{

//         expect(result).toBeUndefined();
//     })
//     component.emitRefreshEventtoParent();
// })

});
