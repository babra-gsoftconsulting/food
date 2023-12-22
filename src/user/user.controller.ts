import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('getByEmail')
  async findByEmail(@Query('email') email: string): Promise<User> {
    return await this.userService.findByEmail(email);
  }
}
