import { Exceptions } from 'src/shared/domain/exceptions';

export class UsersEmailAlreadyExistsException extends Exceptions {
  constructor(message: string) {
    super(`User already exists with email: ${message}`);
    this.name = 'UsersEmailAlreadyExistsException';
  }
}
