import { AutoMap } from '@automapper/classes';
import { List } from './List';

export class User {
  @AutoMap()
  public id: string;

  @AutoMap()
  public name: string;

  @AutoMap()
  public email: string;

  @AutoMap()
  public password: string;

  @AutoMap()
  public lists: List[];

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    lists: List[],
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.lists = lists;
  }
}
