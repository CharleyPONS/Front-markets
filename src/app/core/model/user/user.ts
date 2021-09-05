import { UserRole } from './userRole';

export class User {
  public mail: string;
  public userName: string;
  public lastname?: string;
  public firstname?: string;
  public favoriteMarket?: string;
  public password?: string;
  public userRole?: Array<UserRole>;

  constructor(data: User) {
    this.mail = data?.mail;
    this.userName = data?.userName;
    this.lastname = data?.lastname;
    this.firstname = data?.firstname;
    this.favoriteMarket = data?.favoriteMarket;
    this.password = data?.password;
    this.userRole = data?.userRole;
  }
}
