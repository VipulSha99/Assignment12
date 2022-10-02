import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  @Output () updatedData = new EventEmitter();
  addUserForm: FormGroup;
  addButtonClicked = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {

    this.addUserForm = new FormGroup({
      'name': new FormControl(null,[Validators.required]),
      'website':new FormControl(null,[Validators.required]),
      'address':new FormControl(null,[Validators.required])
    })
  }

  onSubmit(){
    if(this.addUserForm.status === "INVALID"){
      this.addButtonClicked = true;
      return;
    }
    else{
      this.addButtonClicked = false;
      let userFormData = this.addUserForm.value;
      this.customerService.addCustomer(userFormData).subscribe(responseData=>{
        this.addUserForm.reset();
        this.updatedData.emit();
      })
    }
  }
}
