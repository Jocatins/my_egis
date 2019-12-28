import { IUser } from 'app/core/user/user.model';

export interface IUserExt {
  id?: number;
  payerId?: string;
  phoneNumber?: string;
  user?: IUser;
}

export class UserExt implements IUserExt {
  constructor(public id?: number, public payerId?: string, public phoneNumber?: string, public user?: IUser) {}
}
