import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/my-models/student.model';
import { StudentService } from 'src/app/my-services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
})
export class UpdateStudentComponent {
  student: Student = {
    _id: '',
    fname: '',
    lname: '',
    dob: new Date(),
    course: '',
    email: '',
  };
  studentId: String = '';
  formGroup!: FormGroup;
  showSuccessAlert: boolean = false;
  maxDate!: Date;

  ngOnInit() {
    this.getStudent();
  }

  constructor(
    private route: ActivatedRoute,
    private service: StudentService,
    private builder: FormBuilder,
    private router: Router
  ) {
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

  getStudent() {
    this.studentId = String(this.route.snapshot.paramMap.get('id'));

    this.service.getStudent(this.studentId).subscribe(
      (data: any) => {
        this.formGroup.get('fname')?.setValue(data.fname);
        this.formGroup.get('lname')?.setValue(data.lname);
        this.formGroup.get('course')?.setValue(data.course);
        this.formGroup.get('email')?.setValue(data.email);
        this.formGroup.get('dob')?.setValue(data.dob);

        console.log('Form: ' + JSON.stringify(this.formGroup.value));
        if (this.formGroup.get('name')?.value === '') {
          this.router.navigate(['/view-students']);
        }
      },
      (error) => {
        
        Swal.fire('Error', error.error, 'warning').then(() => {
          this.router.navigate(['/view-students/']);
        });
        console.log(error);
      }
    );
  }

  formSubmit() {
    this.student.fname = this.formGroup.get('fname')?.value;
    this.student.lname = this.formGroup.get('lname')?.value;
    this.student.dob = this.formGroup.get('dob')?.value;
    this.student.course = this.formGroup.get('course')?.value;
    this.student.email = this.formGroup.get('email')?.value;
    console.log(JSON.stringify(this.student));
    this.updateStudent();
  }

  updateStudent() {
    this.service.updateStudent(this.student, this.studentId).subscribe(
      (data) => {
        console.log(JSON.stringify(data));
        Swal.fire(
          'Updated',
          'Student details have been updated',
          'success'
        ).then(() => {
          this.router.navigate(['/view-student', this.studentId]);
        });
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', error.error, 'warning').then(() => {});
      }
    );
  }

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
