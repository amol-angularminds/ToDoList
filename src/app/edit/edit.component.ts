import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router ,ActivatedRoute } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { DatePipe } from '@angular/common'
import { LocalService } from '../services/local.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})


export class EditComponent implements OnInit {
  passingId :number ;
  dataArr: any;
  data:any;
  submitted:any = false;

  constructor(private router :Router ,private activatRoute:ActivatedRoute,
    public datepipe: DatePipe ,public localservice :LocalService ,private toastr: ToastrService) { 
    this.passingId =this.activatRoute.snapshot.params.id;
    
    this.dataArr = localservice.dataArr;
    for(let i=0;i<this.dataArr.length;i++){
      if(this.dataArr[i].id == this.passingId){
        this.data = this.dataArr[i];
      }
    }
  }

  formData = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    dateShortcut: new FormControl('')
  })

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

  updateData() {
    this.submitted = true;

    if(this.formData.invalid){
      return;
    }
    let tempData = this.formData.value;
    this.data.title = tempData.title;
    this.data.description = tempData.description;
    this.data.dueDate = this.datepipe.transform(tempData.dueDate, 'MM/dd/yyyy');
    this.data.modifiedAt = this.datepipe.transform((new Date(new Date().getTime())), 'MM/dd/yyyy');

    for(let i=0;i<this.dataArr.length;i++){
      if(this.dataArr[i].id == this.passingId){
        this.dataArr[i] =this.data;
      }
    }
    this.toastr.success('Great! Note is Updated Sucessfully');
    this.router.navigate(['welcomePage']);

    //json server
    this.localservice.serviceUpdateData(this.data,this.passingId);
  } 

  ngOnInit(): void {
    this.passingId =this.activatRoute.snapshot.params.id;
    this.formData.patchValue({
      title: this.data.title,
    description: this.data.description,
    dueDate:this.data.dueDate,
    dateShortcut: ''
    })
  }

}
