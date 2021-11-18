import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common'
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MatSliderModule } from '@angular/material/slider';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    WelcomePageComponent

  ],
  imports: [
    FormsModule, DragDropModule, HttpClientModule,
    MatSliderModule, SortableModule.forRoot(),
    BrowserModule, ReactiveFormsModule, CollapseModule.forRoot(),
    AppRoutingModule, BsDatepickerModule.forRoot(),
    BrowserAnimationsModule, BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
