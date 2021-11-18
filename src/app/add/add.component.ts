import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { DatePipe } from '@angular/common'
import { LocalService } from '../services/local.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AddComponent implements OnInit {
  dataArr: any;
  submitted: any = false;
  _dbURL ="/assets/data/todoData.json";

  formData = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    dateShortcut: new FormControl('')
  })

  constructor(private router: Router, public datepipe: DatePipe, private http:HttpClient,
    public localservice :LocalService,private toastr: ToastrService) {
    this.dataArr = localservice.dataArr;

  }

  changeDate() {
    let temp = this.formData.value.dateShortcut;
    let todayDate =new Date(new Date().getTime());
    if (temp == "Today") {
      this.formData.patchValue({
        dueDate:this.datepipe.transform(todayDate, 'MM/dd/yyyy')
      });
    }
    else if (temp == "Tomorrow") {
      let tomorrowDate =new Date(new Date().getTime()+ (24 * 60 * 60 * 1000) * 1);
      this.formData.patchValue({dueDate:this.datepipe.transform(tomorrowDate, 'MM/dd/yyyy')});
    }
    else if (temp == "next-week") {
      let next_weekDate =new Date(new Date().getTime()+ (24 * 60 * 60 * 1000) * 7);
      this.formData.patchValue({dueDate:this.datepipe.transform(next_weekDate, 'MM/dd/yyyy')});
    }
    else {
      let next_monthDate =new Date(new Date().getTime()+ (24 * 60 * 60 * 1000) * 30);
      this.formData.patchValue({dueDate:this.datepipe.transform(next_monthDate, 'MM/dd/yyyy')});
    }
  }
  
  get f(){
    return this.formData.controls;
  }

  saveData() {
    this.submitted = true;

    if(this.formData.invalid){
      return;
    }

    let tempData = this.formData.value;
    tempData.order= this.localservice.toDoArr.length;
    tempData.id = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    tempData.status = "To_Do";
    tempData.createdAt = this.datepipe.transform((new Date(new Date().getTime())), 'MM/dd/yyyy');
    tempData.dueDate = this.datepipe.transform(this.formData.value.dueDate, 'MM/dd/yyyy');
    tempData.modifiedAt = "";
    this.router.navigate(['welcomePage']);
    this.toastr.success('Great! Note is added Sucessfully');
    this.localservice.servPostData(tempData);
  }

  ngOnInit(): void {
    this.dataArr = this.localservice.dataArr;
  }

}
