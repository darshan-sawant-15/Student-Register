import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './my-components/add-student/add-student.component';
import { ViewStudentsComponent } from './my-components/view-students/view-students.component';
import { UpdateStudentComponent } from './my-components/update-student/update-student.component';
import { ViewStudentComponent } from './my-components/view-student/view-student.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './my-components/home/home.component';
import { ErrorComponent } from './my-components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    ViewStudentsComponent,
    UpdateStudentComponent,
    ViewStudentComponent,
    HomeComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
