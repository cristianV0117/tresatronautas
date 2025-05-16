import { Exceptions } from 'src/shared/domain/exceptions';

export class ProductNotFoundException extends Exceptions {
  constructor(id: string) {
    super(`Product with id ${id} not found`);
    this.name = 'ProductNotFoundException';
  }
}
