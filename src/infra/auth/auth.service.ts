import { IAuthService } from '@/services/IAuthService';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private jwtService: JwtService) {}
  //TODO: Adjust return type
  async generateToken(id: string, email: string): Promise<any> {
    return {
      access_token: await this.jwtService.signAsync({ id, email }),
    };
  }
}
