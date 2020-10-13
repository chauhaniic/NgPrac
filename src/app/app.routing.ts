import { RouterModule, Routes } from '@angular/router';
import { ArraytestComponent } from './arraytest/arraytest.component';
import { Cartt6Component } from './cartt6/cartt6.component';
import { DemoappComponent } from './demoapp/demoapp.component';
import { DemonewComponent } from './demonew/demonew.component';
import { EmpFormComponent } from './emp-form/emp-form.component';
import { EmpComponent } from './emp/emp.component';
import { EparentComponent } from './eparent/eparent.component';
import { Logint6Component } from './logint6/logint6.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ParentComponent } from './parent/parent.component';
import { Productt6Component } from './productt6/productt6.component';
import { Registert6Component } from './registert6/registert6.component';
import { SignupComponent } from './signup/signup.component';
import { TodoComponent } from './todo/todo.component';
import { UserComponent } from './user/user.component';

const arrR: Routes = [
  { path: '', component: UserComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'demon', component: DemonewComponent },
  { path: 'demoa', component: DemoappComponent },
  { path: 'employee', component: EmpComponent },
  { path: 'error404', component: PagenotfoundComponent },
  { path: '**', redirectTo: 'error404' },
];

const task26: Routes = [
  { path: '', component: Logint6Component },
  { path: 'register', component: Registert6Component },
  { path: 'cart', component: Cartt6Component },
  { path: 'employee', component: EmpComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'demon', component: DemonewComponent },
  { path: 'demoa', component: DemoappComponent },
  { path: 'employee', component: EmpComponent },
  { path: 'eparent', component: EparentComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'empform', component: EmpFormComponent },
  { path: 'atest', component: ArraytestComponent },
  { path: 'error404', component: PagenotfoundComponent },
  { path: '**', redirectTo: 'error404' },
];
export const arrRouting = RouterModule.forRoot(task26);
//export const arrRouting = RouterModule.forRoot(arrR);
