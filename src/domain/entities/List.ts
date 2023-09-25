import { AutoMap } from '@automapper/classes';
import { Item } from './Item';

export class List {
  @AutoMap()
  public id: string;

  @AutoMap()
  public title: string;

  @AutoMap()
  items: Item[];

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt?: Date;

  @AutoMap()
  deletedAt?: Date;

  constructor(
    id: string,
    title: string,
    items: Item[],
    createdAt: Date,
    updateAt?: Date,
    deletedAt?: Date,
  ) {
    this.id = id;
    this.title = title;
    this.items = items;
    this.createdAt = createdAt;
    this.updatedAt = updateAt;
    this.deletedAt = deletedAt;
  }
}
