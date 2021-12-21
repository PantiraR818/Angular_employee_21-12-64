import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import { EmployeeModels } from './Employee-dashboard.models';
import {ApiService} from '../shared/api.service'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  // เปรียบเหมือนคลาส
  formEmployee! : FormGroup;
  EmployeeModel = new EmployeeModels();
  EmployeeData: any
  showAdd!: boolean
  showUpdate!: boolean

  constructor(private api :  ApiService) { }

  ngOnInit(): void {
    this.formEmployee = new FormGroup({
      Firstname: new FormControl(),
      Lastname: new FormControl(),
      Email: new FormControl(),
      Phone: new FormControl(),
      Salary: new FormControl(),
    })
    this.getEmployee()
  }
  postEmployee(){
    this.EmployeeModel.Firstname = this.formEmployee.value.Firstname
    this.EmployeeModel.Lastname = this.formEmployee.value.Lastname
    this.EmployeeModel.Email = this.formEmployee.value.Email
    this.EmployeeModel.Phone = this.formEmployee.value.Phone
    this.EmployeeModel.Salary = this.formEmployee.value.Salary
    //console.log(this.EmployeeModel)
    this.api.postEmployee(this.EmployeeModel)
    .subscribe(res=>{
      Swal.fire("Complete","Add Employee Complete","success")
      this.getEmployee()
      let close = document.getElementById("close")
      close!.click()
    },
    error=>{
      Swal.fire("Error","Add Employee Error","error")
    })
  }

  getEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.EmployeeData = res;
    },)
  }

  deleteEmployee(id: number){
    this.api.deleteEmployee(id)
    .subscribe(res=>{
      Swal.fire("Complete","Delete Employee Complete","success")
      this.getEmployee()
    },
    error=>{
      Swal.fire("Error","Delete Employee Error","error")
    })
  }
  clickAdd(){
    this.formEmployee.reset()
    this.showAdd = true
    this.showUpdate = false
    this.EmployeeData.id = 0
  }
  clickEdit(data : any){
    this.showAdd = false
    this.showUpdate = true

    this.EmployeeData.id = data.id
    this.formEmployee.controls['Firstname'].setValue( data.Firstname)
    this.formEmployee.controls['Lastname'].setValue(data.Lastname)
    this.formEmployee.controls['Email'].setValue(data.Email)
    this.formEmployee.controls['Phone'].setValue(data.Phone)
    this.formEmployee.controls['Salary'].setValue(data.Salary)
  }
  updateEmployee(){
    this.EmployeeModel.Firstname = this.formEmployee.value.Firstname
    this.EmployeeModel.Lastname = this.formEmployee.value.Lastname
    this.EmployeeModel.Email = this.formEmployee.value.Email
    this.EmployeeModel.Phone = this.formEmployee.value.Phone
    this.EmployeeModel.Salary = this.formEmployee.value.Salary
    this.api.updateEmployee(this.EmployeeData.id,this.EmployeeModel)
    .subscribe(res=>{
      Swal.fire("Complete","Update Employee Complete","success")
      this.getEmployee()
      let close = document.getElementById("close")
      close!.click()
    },
    error=>{
      Swal.fire("Error","Update Employee Error","error")
    })

  }
}
