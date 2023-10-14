import { AutoMap } from '@automapper/classes';

export class ListSummary {
  @AutoMap()
  id: string;

  @AutoMap()
  title: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt?: Date;

  @AutoMap()
  deletedAt?: Date;

  constructor(
    id: string,
    title: string,
    createdAt: Date,
    updatedAt?: Date,
    deletedAt?: Date,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.title = title;
    this.deletedAt = deletedAt;
    this.updatedAt = updatedAt;
  }
}
