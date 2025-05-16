import * as bcrypt from 'bcrypt';
import { UserInvalidDataException } from '../exceptions/users-invalid-data.exception';

export class UsersStoreValueObject {
  constructor(
    private name: string,
    private email: string,
    private password: string,
  ) {
    this.validate();
    this.encriptPassword();
  }

  private validate() {
    if (!this.name || this.name.length < 3) {
      throw new UserInvalidDataException('Name is too short');
    }

    if (!this.email || !this.email.includes('@')) {
      throw new UserInvalidDataException('Invalid email');
    }

    if (!this.password || this.password.length < 6) {
      throw new UserInvalidDataException(
        'Password must be at least 6 characters',
      );
    }
  }

  private encriptPassword() {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  public value() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}
