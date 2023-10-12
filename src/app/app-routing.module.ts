import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './my-components/add-student/add-student.component';
import { ViewStudentsComponent } from './my-components/view-students/view-students.component';
import { ViewStudentComponent } from './my-components/view-student/view-student.component';
import { UpdateStudentComponent } from './my-components/update-student/update-student.component';
import { HomeComponent } from './my-components/home/home.component';
import { ErrorComponent } from './my-components/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'view-students', component: ViewStudentsComponent },
  { path: 'view-student/:id', component: ViewStudentComponent },
  { path: 'update-student/:id', component: UpdateStudentComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
