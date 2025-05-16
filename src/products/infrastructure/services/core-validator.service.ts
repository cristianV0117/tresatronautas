import { Injectable } from '@nestjs/common';
import { CoreValidatorService } from 'src/products/domain/repositories/core-validator-service.repository';

@Injectable()
export class CoreValidatorFakeService implements CoreValidatorService {
  async validate(data: { name: string; price: number }): Promise<boolean> {
    /*
    En este punto hariamos la llamada a http://mock-core.com/validate
    y que nos pasara las validaciones necesarias que necesitamos
    */
    const isValid = data.price >= 10;
    return isValid;
  }
}
