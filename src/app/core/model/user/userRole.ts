export class UserRole {
  public name: string;

  constructor(data: any) {
    this.name = data?.name;
  }
}
