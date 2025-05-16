import { Exceptions } from 'src/shared/domain/exceptions';

export class ProductNotValidForPurchaseException extends Exceptions {
  constructor() {
    super('Product is not valid for purchase');
    this.name = 'ProductNotValidForPurchaseException';
  }
}
