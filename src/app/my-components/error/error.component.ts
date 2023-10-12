import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  ngOnInit(){
    Swal.fire(
      'Error',
      "No such page",
      'warning'
    ).then(() => {
      this.router.navigate(['/home']);
    });
  }

  constructor(private router:Router){}
}
