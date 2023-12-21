import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  ConflictException,
  UseGuards,
  Req,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dtos/signup.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dtos/signin.dto';
import { localAuthGuard } from 'src/common/guards/local.auth.guard';
import { ForgotPasswordDto } from './dtos/forgot.password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    const { email } = signUpDto;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    return this.userService.createUser(signUpDto);
  }
  @Post('signin')
  @UseGuards(localAuthGuard)
  async signIn(@Body(ValidationPipe) signInDto: SignInDto, @Req() request:any, ) {
    const user = request.user;
    const result = await this.authService.signIn(user);
   return result;
  }
  @Put('forgotPassword')
  async forgotPassword(@Body(ValidationPipe) forgotPasswordDto:ForgotPasswordDto){
    const { email, password } = forgotPasswordDto;
    return  this.userService.updatePassword(email,password);
  }
}
