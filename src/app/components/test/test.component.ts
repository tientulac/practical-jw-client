import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormControl, FormGroup, FormBuilder, Validators, MaxLengthValidator, AbstractControl, } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends BaseComponent implements OnInit{

  dataLoan: any;

  AddForm = new FormGroup({
    full_name: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    birth: new FormControl(null, [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    department_id: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.TestService.getList().subscribe(res => {
      this.dataTable = res;
      console.log(res);
      this.TestService.getList().subscribe(res =>{
        this.dataLoan = res;
      })
      this.spinner.hide();
      this.totalItem = res ? res : 0
      this.totalItemFilter = res ? res.length : 0
    })
  }

   
  pageChange(event) {
    this.page = event
  }

  open(content, sizm, type, Data) {
    this.selected_ID = Data.id;
    this.submitted = false;
    this.AddForm.reset();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: sizm })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );

      if(type=="Add"){
        this.AddForm.reset();
        this.checkInsert = true;
        this.titleModal = "Add new";
        this.AddForm.patchValue({
          gender: '',
          department_id: '',
        });
      }
      if(type=="Update") {
        this.titleModal = "Edit";
        this.checkInsert =false;
        this.AddForm.patchValue({
          full_name: Data.full_name,
          age: Data.age,
          birth: Data.birth,
          gender: Data.gender,
          department_id: Data.department_id,
        });
      }
      if (type == "Delete") {
        this.selected_ID = Data.id;
      }
  }

  get checkvalue() {
    return this.AddForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.AddForm.invalid) {
      return false;
    }
    let req = {
      id: this.selected_ID,
			full_name: this.AddForm.value.full_name,
			age: this.AddForm.value.age,
			birth: this.AddForm.value.birth,
			gender: this.AddForm.value.gender,
			department_id: this.AddForm.value.department_id,
    }
    if (this.checkInsert) {
      this.TestService.insert(req).subscribe(
        (res) => {
          if (res) {
            this.toastr.success("Insert successfully !");
            this.modalService.dismissAll('');
            this.getData();
          }
          else {
            this.toastr.warning("Insert failed !");
            this.modalService.dismissAll('');
          }
        }
      )
    }
    else {
      this.TestService.update(req).subscribe(
        (res) => {
          if (res) {
            this.toastr.success("Update successfully !");
            this.modalService.dismissAll('');
            this.getData();
          }
          else {
            this.toastr.warning("Update failed !");
            this.modalService.dismissAll('');
          }
        }
      )
    }
  }

  confirmDelete() {
    this.TestService.delete(this.selected_ID).subscribe(
      (res) => {
        if (res) {
          this.toastr.success("Delete successfully !");
          this.modalService.dismissAll('');
          this.getData();
        }
        else {
          this.toastr.warning("Delete failed !");
          this.modalService.dismissAll('');
        }
      }
    );
  }
}
