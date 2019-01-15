export interface IUser {
  id: number;
  fName: string;
  lName: string;
  email: string;
  password: string;
  bicycleModel?: string;
  bicycleId?: string;
  token?: string;
}
