import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../my-models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  // readonly url = 'https://famous-gold-houndstooth.cyclic.app/';
  readonly url = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  public addStudent(student: Student) {
    return this.httpClient.post(this.url, student);
  }

  public getStudents(page: Number) {
    return this.httpClient.get(this.url + page);
  }

  public getStudent(_id: String) {
    return this.httpClient.get(this.url + 'single/' + _id);
  }

  public updateStudent(student: Student, _id: String) {
    return this.httpClient.put(this.url + _id, student);
  }

  public deleteStudent(_id: String) {
    return this.httpClient.delete(this.url + _id);
  }

  public getTotalPagesCount() {
    return this.httpClient.get(this.url + 'countPages');
  }

  public getSearchedStudent(name: String) {
    return this.httpClient.get(this.url + 'search/' + name);
  }
}
