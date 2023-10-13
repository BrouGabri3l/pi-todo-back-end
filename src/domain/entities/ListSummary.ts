import { AutoMap } from '@automapper/classes';
import { User } from './User';

export class ListSummary {
  @AutoMap()
  id: string;

  @AutoMap()
  title: string;

  @AutoMap()
  createdBy: User;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt?: Date;

  @AutoMap()
  deletedAt?: Date;

  constructor(
    id: string,
    title: string,
    createdBy: User,
    createdAt: Date,
    updatedAt?: Date,
    deletedAt?: Date,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.title = title;
    this.deletedAt = deletedAt;
    this.updatedAt = updatedAt;
  }
}
