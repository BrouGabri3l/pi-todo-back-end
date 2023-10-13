import { AutoMap } from '@automapper/classes';

export class User {
  @AutoMap()
  public id: string;

  @AutoMap()
  public name: string;

  @AutoMap()
  public email: string;

  @AutoMap()
  public password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
