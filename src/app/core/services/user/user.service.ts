import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/user/user';
import { ApiService } from '../api.service';

/**
 * Service for login, authenticate, disconnect user
 * Service manage token set in Storage
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _apiService: ApiService) {}
  public getUser(): Observable<User> {
    return this._apiService.get<User>('/user');
  }
}
