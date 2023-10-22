import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/my-models/student.model';
import { StudentService } from 'src/app/my-services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css'],
})
export class ViewStudentsComponent {
  studentList: Student[] = [];
  page: number = 1;
  totalPages!: number;
  searchTerm!: string;
  searchedStudents: Student[] = [];

  constructor(private service: StudentService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getStudents();
    this.getTotalStudentsCount();
  }

  numberRange(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  getTotalStudentsCount() {
    this.service.getTotalPagesCount().subscribe((data: any) => {
      console.log(data.pages);
      this.totalPages = data.pages;
    });
  }

  goToPage(pageNumber: number) {
    this.page = pageNumber;
    console.log(this.page);
    this.getStudents();
    this.getTotalStudentsCount();
  }

  getStudents() {
    this.studentList = [];
    this.service.getStudents(this.page).subscribe(
      (data) => {
        if (Array.isArray(data)) {
          for (const studentData of data) {
            const student = new Student();
            student._id = studentData._id;
            student.fname = studentData.fname;
            student.lname = studentData.lname;
            student.course = studentData.course;
            student.email = studentData.email;
            student.dob = studentData.dob;

            this.studentList.push(student);
          }
        }

        console.log(this.studentList.length);
      },
      (error) => {
        console.log(error);
        if (this.studentList.length == 0 && this.page > 1) {
          this.page = this.page - 1;
          this.getStudents();
        }
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
        this.service.deleteStudent(_id).subscribe(
          (data) => {
            console.log(data);
            this.getStudents();
            this.getTotalStudentsCount();
            Swal.fire(
              'Deleted!',
              'Student details have been deleted.',
              'success'
            );
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', error.error, 'warning').then(() => {});
          }
        );
      }
    });
  }

  searchStudents() {
    this.searchedStudents = [];
    this.service.getSearchedStudent(this.searchTerm).subscribe(
      (data) => {
        if (Array.isArray(data)) {
          for (const studentData of data) {
            const student = new Student();
            student._id = studentData._id;
            student.fname = studentData.fname;
            student.lname = studentData.lname;
            student.course = studentData.course;
            student.email = studentData.email;
            student.dob = studentData.dob;
            this.searchedStudents.push(student);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
