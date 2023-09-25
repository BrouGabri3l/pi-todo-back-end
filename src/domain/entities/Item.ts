import { AutoMap } from '@automapper/classes';

export class Item {
  @AutoMap()
  public id: string;

  @AutoMap()
  public description: string;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt?: Date;

  @AutoMap()
  public deletedAt?: Date;

  constructor(
    id: string,
    description: string,
    createdAt: Date,
    updatedAt?: Date,
    deletedAt?: Date,
  ) {
    this.id = id;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
