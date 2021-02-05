import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

import { container } from 'tsyringe';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, name } = request.body;

    const createConstumer = container.resolve(CreateCustomerService);

    const customer = await createConstumer.execute({ email, name });

    return response.json(customer);
  }
}
