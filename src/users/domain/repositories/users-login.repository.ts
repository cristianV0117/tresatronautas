import { User } from '../User';
import { UsersLoginValueObject } from '../valueObjects/users-login.valueObject';

export interface UsersLoginRepository {
  login(userLogin: UsersLoginValueObject): Promise<User>;
}
