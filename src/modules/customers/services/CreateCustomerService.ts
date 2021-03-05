import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const foundCustomer = await this.customersRepository.findByEmail(email);

    if (foundCustomer) {
      throw new AppError('This e-mail is already assigned to a customer');
    }

    const constumer = await this.customersRepository.create({ name, email });

    return constumer;
  }
}

export default CreateCustomerService;
