import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/my-models/student.model';
import { StudentService } from 'src/app/my-services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent {
  student: Student = {
    _id: '',
    fname: '',
    lname: '',
    dob: new Date(),
    course: '',
    email: '',
  };
  studentId!: String;

  ngOnInit() {
    this.getStudent();
  }

  constructor(
    private route: ActivatedRoute,
    private service: StudentService,
    private builder: FormBuilder,
    private router: Router
  ) {}

  getStudent() {
    this.studentId = String(this.route.snapshot.paramMap.get('id'));
    this.service.getStudent(this.studentId).subscribe(
      (data: any) => {
        this.student._id = data._id;
        this.student.fname = data.fname;
        this.student.lname = data.lname;
        this.student.course = data.course;
        this.student.email = data.email;
        this.student.dob = data.dob;
        console.log('Student ' + JSON.stringify(this.student));
        if (this.student.fname == '') {
          this.router.navigate(['/view-students']);
        }
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', error.error, 'warning').then(() => {
          this.router.navigate(['/view-students/']);
        });
      }
    );
  }

  deleteStudent(_id: String) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Student details have been deleted.', 'success');
        this.service.deleteStudent(_id).subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(['/view-students']);
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', error.error, 'warning').then(() => {
              
            });
          }
        );
      }
    });
  }
}
