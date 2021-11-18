import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  toDoArr: any = [];
  deletedArr: any = [];
  completedArr: any = [];
  dataArr: any;
  dataUrl = "http://localhost:3000/tasks"


  constructor(private httpClient: HttpClient) { }

  servGetData() {
    return this.httpClient.get(this.dataUrl);
  }

  servPostData(data: any) {
    const headers = { 'content-type': 'application/json' };
    let body = data;
    return this.httpClient.post('http://localhost:3000/tasks', body, { 'headers': headers }).subscribe(
      data => {
        console.log('POST Request is successful ');
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  serviceUpdateData(data: any, id: any) {
    const headers = { 'content-type': 'application/json' };
    let body = data;
    return this.httpClient.put(`http://localhost:3000/tasks/${id}`, body, { 'headers': headers }).subscribe(
      data => {
        console.log('Service is Update Successful');
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  servUndoneBtn(id: any) {
    for (var i = 0, len = this.dataArr.length; i < len; i++) {
      if (this.dataArr[i].id == id) {
        this.dataArr[i].status = "To_Do";
        this.dataArr[i].order = this.toDoArr.length + 1;
        var data = this.dataArr[i];
      }
    }
    this.serviceUpdateData(data, data.id);
  }

  servDoneBtn(id: any) {
    for (var i = 0, len = this.dataArr.length; i < len; i++) {
      if (this.dataArr[i].id == id) {
        this.dataArr[i].status = "completed";
        this.dataArr[i].order = "";
        var data = this.dataArr[i];
      }
    }
    this.serviceUpdateData(data, data.id);
  }

  servDeleteBtn(id: any, place: string) {
    for (var i = 0, len = this.dataArr.length; i < len; i++) {
      if (this.dataArr[i].id == id) {
        this.dataArr[i].status = "Deleted";
        var data = this.dataArr[i];
        this.serviceUpdateData(data, data.id)

        if (place == 'todoArr') {
          this.toDoArr.splice(i, 1);
        }
        else {
          this.completedArr.splice(i, 1);
        }
      }
    }
  }

  ngOnInit() { }

}





