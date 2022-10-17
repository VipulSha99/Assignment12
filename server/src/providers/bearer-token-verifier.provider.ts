import {Provider} from '@loopback/context';
import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId} from '@loopback/security';
import {VerifyFunction} from 'loopback4-authentication';

import {UserRepository} from '../repositories';
import {JwtService} from '../services/jwt.service';

export class BearerTokenVerifyProvider
  implements Provider<VerifyFunction.BearerFn>
{
  constructor(
    @service(JwtService)
    public jwtService: JwtService,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  value(): VerifyFunction.BearerFn {
    return async token => {
      if (!token) {
        throw new HttpErrors.Unauthorized(`Token needed for verification`);
      }
      try {
        const userProfile = await this.jwtService.verifyToken(token);
        const user = await this.userRepository.findOne({
          where: {id: userProfile[securityId]},
        });
        return user;
      } catch {
        throw new HttpErrors.Unauthorized(
          `Error occured while verifying token`,
        );
      }
    };
  }
}
