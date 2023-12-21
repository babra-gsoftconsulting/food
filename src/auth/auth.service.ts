import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare } from 'bcryptjs';
import { UserInterface } from '../user/interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserInterface | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async signIn(user: any): Promise<UserInterface> {
    const payload = { email: user.email, role: user.role, id: user._id };
    const result = {
      token: this.jwtService.sign(payload),
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
    return result
  }
}
