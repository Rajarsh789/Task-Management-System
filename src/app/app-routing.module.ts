import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasklistComponent } from './tasklist/tasklist.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '',   redirectTo: '/tasklist', pathMatch: 'full' }, // redirect to `first-component`
  {
    path:'tasklist',
    component: TasklistComponent
  },
  {
    path:'userlist',
    component: UserListComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
