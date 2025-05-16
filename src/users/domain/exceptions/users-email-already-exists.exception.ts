import { Exceptions } from 'src/shared/domain/exceptions';

export class UsersEmailAlreadyExistsException extends Exceptions {
  constructor(message: string) {
    super(message);
    this.name = 'UsersEmailAlreadyExistsException';
  }
}
