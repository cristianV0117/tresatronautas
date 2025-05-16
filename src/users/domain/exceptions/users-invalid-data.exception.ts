import { Exceptions } from 'src/shared/domain/exceptions';

export class UserInvalidDataException extends Exceptions {
  constructor(message: string) {
    super(message);
    this.name = 'UserInvalidDataException';
  }
}
