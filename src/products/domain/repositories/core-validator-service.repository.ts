export interface CoreValidatorService {
  validate(data: { name: string; price: number }): Promise<boolean>;
}
