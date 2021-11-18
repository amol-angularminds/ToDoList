import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path:'',redirectTo:"/welcomePage", pathMatch:"full" },
  { path:'edit/:id', component:EditComponent },
  {path:'add', component:AddComponent },
  {path:'welcomePage', component:WelcomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
