import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../../model/user/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly path: string = 'auth';
  constructor(private _apiService: ApiService) {}

  public authenticateUser(user: User): Observable<User> {
    return this._apiService.post(`${this.path}/signin`, user);
  }

  public registerUser(user: User) {
    return this._apiService.post(`${this.path}/signup`, user);
  }
}
