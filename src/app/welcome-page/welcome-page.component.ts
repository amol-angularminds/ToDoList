import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})

export class WelcomePageComponent implements OnInit {
  dataArr: any;
  listBtnShow = false; isCollapsed = true;
  currentIndex: any;
  toDoArr: any = [];
  deletedArr: any = [];
  completedArr: any = [];
  data: any;

  constructor(private router: Router, public localservice: LocalService, private toastr: ToastrService) { }

  deleteBtn(id: any, place: string) {
    this.toastr.warning('Deleted! Note is Deleted');
    this.localservice.servDeleteBtn(id, place);
    this.OrderFunction();
    this.ngOnInit();
  }

  doneBtn(id: any, forid: any) {
    this.toastr.success('Great! Note is move to Completed Sucessfully');
    this.localservice.servDoneBtn(id);
    this.toDoArr.splice(forid, 1);
    this.ngOnInit();
    this.OrderFunction();
  }

  undoneBtn(id: any, forid: any) {
    this.completedArr.splice(forid, 1);
    this.toastr.info('Note is move to TODO List');
    this.localservice.servUndoneBtn(id);
    this.ngOnInit();
    this.OrderFunction();
  }

  mouseOver(id: any) {
    this.listBtnShow = true;
    this.currentIndex = id;
  }

  mouseLeave(id: any) {
    this.listBtnShow = false;
    this.currentIndex = '';
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.toDoArr, event.previousIndex, event.currentIndex);

    for (let i = 0; i < this.toDoArr.length; i++) {
      this.toDoArr[i].order = i;
      var data = this.toDoArr[i];
      this.localservice.serviceUpdateData(data, data.id);
    }
    console.log(this.toDoArr);
    this.localservice.toDoArr = this.toDoArr;
  }

  setData() {
    this.localservice.servGetData().subscribe((data) => {
      this.dataArr = data;
      this.localservice.dataArr = data;

      this.toDoArr = this.dataArr.filter((item: any) => {
        return item.status == "To_Do"
      });
      this.toDoArr.sort((a: any, b: any) => (a.order > b.order) ? 1 : -1)
      this.localservice.toDoArr = this.toDoArr;

      this.completedArr = this.dataArr.filter((item: any) => {
        return item.status == "completed"
      });
      this.localservice.completedArr = this.completedArr;
    });
  }

  OrderFunction() {
    for (let i = 0; i < this.toDoArr.length; i++) {
      this.toDoArr[i].order = i;
      var data = this.toDoArr[i];
      this.localservice.serviceUpdateData(data, data.id)
    }
  }

  ngOnInit() {
    this.setData();
  }
}