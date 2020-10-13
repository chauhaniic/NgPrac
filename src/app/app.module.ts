import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoappComponent } from './demoapp/demoapp.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemonewComponent } from './demonew/demonew.component';
import { HighLighterDirective } from './high-lighter.directive';
import { UserComponent } from './user/user.component';
import { CustomDirDirective } from './custom-dir.directive';
import { CreditCardDirective } from './credit-card.directive';
import { HeaderComponent } from './header/header.component';
import { arrRouting } from './app.routing';
import { FooterComponent } from './footer/footer.component';
import { EmpComponent } from './emp/emp.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { Logint6Component } from './logint6/logint6.component';
import { Registert6Component } from './registert6/registert6.component';
import { Productt6Component } from './productt6/productt6.component';
import { Cartt6Component } from './cartt6/cartt6.component';
import { Headert6Component } from './headert6/headert6.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { RegDatat6Directive } from './reg-datat6.directive';
import { EparentComponent } from './eparent/eparent.component';
import { EchildComponent } from './echild/echild.component';
import { SignupComponent } from './signup/signup.component';
import { EmpFormComponent } from './emp-form/emp-form.component';
import { ArraytestComponent } from './arraytest/arraytest.component';
@NgModule({
  declarations: [
    AppComponent,
    DemoappComponent,
    TodoComponent,
    DemonewComponent,
    HighLighterDirective,
    UserComponent,
    CustomDirDirective,
    CreditCardDirective,
    HeaderComponent,
    FooterComponent,
    EmpComponent,
    PagenotfoundComponent,
    Logint6Component,
    Registert6Component,
    Productt6Component,
    Cartt6Component,
    Headert6Component,
    ParentComponent,
    ChildComponent,
    RegDatat6Directive,
    EparentComponent,
    EchildComponent,
    SignupComponent,
    EmpFormComponent,
    ArraytestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    arrRouting,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
