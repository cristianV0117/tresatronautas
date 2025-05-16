import { Exceptions } from './exceptions';

export class UserNotAuthorizedException extends Exceptions {
  constructor() {
    super('User not authorized');
    this.name = 'UserNotAuthorizedException';
  }
}
