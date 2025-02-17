import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  private readonly USERS_URL = 'https://679b8dc433d31684632448c9.mockapi.io/users';

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.USERS_URL);
  }

}
