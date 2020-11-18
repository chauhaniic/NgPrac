import { RouterModule, Routes } from '@angular/router';
import { ArraytestComponent } from './arraytest/arraytest.component';
import { Cartt6Component } from './cartt6/cartt6.component';
import { ConnectingUserComponent } from './connecting-user/connecting-user.component';
import { DemoappComponent } from './demoapp/demoapp.component';
import { DemonewComponent } from './demonew/demonew.component';
import { EmpFormComponent } from './emp-form/emp-form.component';
import { EmpBasicEditComponent } from './emp-record/emp-basic/emp-basic-edit/emp-basic-edit.component';
import { EmpBasicComponent } from './emp-record/emp-basic/emp-basic.component';
import { EmpExpComponent } from './emp-record/emp-exp/emp-exp.component';
import { EmpAddressComponent } from './emp-record/emp-personal/emp-address/emp-address.component';
import { EmpBankComponent } from './emp-record/emp-personal/emp-bank/emp-bank.component';
import { EmpPersonalComponent } from './emp-record/emp-personal/emp-personal.component';
import { EmpRecordComponent } from './emp-record/emp-record.component';
import { EmpComponent } from './emp/emp.component';
/* import { EmpinfoComponent } from './empinfo/empinfo.component'; */
import { EparentComponent } from './eparent/eparent.component';
/* import { FormissueComponent } from './formissue/formissue.component'; */
import { Logint6Component } from './logint6/logint6.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ParentComponent } from './parent/parent.component';
import { Productt6Component } from './productt6/productt6.component';
import { Registert6Component } from './registert6/registert6.component';
import { SignupComponent } from './signup/signup.component';
import { EmpeditComponent } from './todo/empedit/empedit.component';
import { ProducteditComponent } from './todo/productedit/productedit.component';
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
  { path: 'users', component: UserComponent },
  { path: 'cuser', component: ConnectingUserComponent },
  { path: 'editemp/:id', component:EmpeditComponent  },
  { path: 'editproduct/:id', component:ProducteditComponent },
  { path: 'home',component:EmpRecordComponent},
  { path: 'home/addbasic',component:EmpBasicComponent},
  { path: 'home/editbasic/:id',component:EmpBasicEditComponent},
  { path: 'home/addpersonal/:id',component:EmpPersonalComponent},
  { path: 'home/addpersonal/',redirectTo: 'home/addbasic',pathMatch: 'full'},
  { path: 'home/address/:id',component:EmpAddressComponent},/*
  { path: 'home/address/',redirectTo: 'home/addbasic',pathMatch: 'full'}, */
  { path: 'home/bank/:id',component:EmpBankComponent},
  { path: 'home/exp/:id',component:EmpExpComponent},
  { path: 'atest',component: ArraytestComponent}, /*
  { path: 'fissue', component: FormissueComponent }, */
  /* { path: 'empinfo', component: EmpinfoComponent },
   */ { path: 'error404', component: PagenotfoundComponent },
  { path: '**', redirectTo: 'error404' },
];
export const arrRouting = RouterModule.forRoot(task26);
//export const arrRouting = RouterModule.forRoot(arrR);
