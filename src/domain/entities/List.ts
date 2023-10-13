import { AutoMap } from '@automapper/classes';
import { Item } from './Item';

export class List {
  @AutoMap()
  public id: string;

  @AutoMap()
  public title: string;

  @AutoMap()
  public items: Item[];

  @AutoMap()
  public userId: string;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt?: Date;

  @AutoMap()
  public deletedAt?: Date;

  constructor(
    id: string,
    title: string,
    items: Item[],
    userId: string,
    createdAt: Date,
    updateAt?: Date,
    deletedAt?: Date,
  ) {
    this.id = id;
    this.title = title;
    this.items = items;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updateAt;
    this.deletedAt = deletedAt;
  }
}
