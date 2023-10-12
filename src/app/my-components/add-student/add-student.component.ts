import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { max } from 'rxjs';
import { Student } from 'src/app/my-models/student.model';
import { StudentService } from 'src/app/my-services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent {
  formGroup!: FormGroup;
  showSuccessAlert: boolean = false;
  maxDate!: Date;

  constructor(private builder: FormBuilder, private service: StudentService) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 16);
    console.log(this.maxDate);

    this.formGroup = this.builder.group({
      fname: ['', [Validators.required, Validators.maxLength(30)]],
      lname: ['', [Validators.required, Validators.maxLength(30)]],
      dob: ['', [Validators.required, this.maxDateValidator(this.maxDate)]],
      course: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  formSubmit() {
    const student = new Student();
    student.fname = this.formGroup.get('fname')?.value;
    student.lname = this.formGroup.get('lname')?.value;
    student.dob = this.formGroup.get('dob')?.value;
    student.course = this.formGroup.get('course')?.value;
    student.email = this.formGroup.get('email')?.value;
    this.addStudent(student);
  }

  addStudent(student: Student) {
    this.service.addStudent(student).subscribe(
      (data) => {
        console.log(JSON.stringify(data));
        Swal.fire(
          'Student Added',
          'Student details have been added',
          'success'
        ).then(() => {
          this.formGroup.reset();
        });
      },
      (error) => {
        console.log(error);
        Swal.fire(
          'Error',
          error.error,
          'warning'
        ).then(() => {
        });
      }
    );
  }

  //custom validator
  maxDateValidator(maxDate: Date): ValidatorFn {
    return (control) => {
      if (!control.value || !maxDate) {
        return null;
      }
      const selectedDate = new Date(control.value);
      return selectedDate <= maxDate ? null : { maxDate: true };
    };
  }
}
