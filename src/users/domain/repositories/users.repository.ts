import { User } from '../User';
import { UsersStoreValueObject } from '../valueObjects/users-store.valueObject';

export interface UsersRepository {
  store(userStore: UsersStoreValueObject): Promise<User>;
}
