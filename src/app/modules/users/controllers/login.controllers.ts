import { Inject, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import * as hash from 'password-hash';

import { FindUserByNameQuery } from '../queries';

import { generateAuthToken } from '../../../shared/helpers';

interface LoginData {
  name: string;
  password: string;
}

export namespace LoginController {
  export type Data = LoginData;
  export type Output = { authToken: string };
}

@Injectable()
export class LoginController {
  @Inject()
  private readonly queryBus: QueryBus;

  public async execute(data: LoginController.Data): Promise<LoginController.Output> {
    const { name, password } = data;

    const user = await this.queryBus.execute(new FindUserByNameQuery(name)) as FindUserByNameQuery.Output;

    if (!user && !hash.verify(password, user.password)) {
      throw new Error('User with this password does not exist');
    }

    const authToken = generateAuthToken(user.id, name);

    return { authToken };
  }
}