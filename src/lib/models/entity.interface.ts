export type ID = number | string;
export type IDS = ID | ID[];

export interface IEntity {
  id: ID;

  createdAt?: number;
  updatedAt?: number;
}