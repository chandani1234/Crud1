import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,FormControl}from '@angular/forms'
import { ApiService } from '../Shared/api.service';
import { EmployeeModel } from './employee dashboard model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !:FormGroup;

  employeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData !:any;
  showAdd ! :boolean;
  showUpdate!:boolean;

  constructor( private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      name:[''],
      phone:[''],
      age:[''],
      gender:[''],
      address:['']
})
this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
   }
  postEmpolyeeDetails(){
    this.employeeModelObj.name=this.formValue.value.name;
    this.employeeModelObj.phone=this.formValue.value.phone;
    this.employeeModelObj.age=this.formValue.value.age;
    this.employeeModelObj.gender=this.formValue.value.gender;
    this.employeeModelObj.address=this.formValue.value.address;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref=document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went wrong");
    
    })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
     this.employeeData=res;
    })
  }
  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{  
     alert("Employee Deleted");
      this.getAllEmployee();
    })
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['age'].setValue(row.age);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['address'].setValue(row.address);

  }
  updateEmpolyeeDetails(){
    this.employeeModelObj.name=this.formValue.value.name;
    this.employeeModelObj.phone=this.formValue.value.phone;
    this.employeeModelObj.age=this.formValue.value.age;
    this.employeeModelObj.gender=this.formValue.value.gender;
    this.employeeModelObj.address=this.formValue.value.address;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Employee Updated Successfully");
      let ref=document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
