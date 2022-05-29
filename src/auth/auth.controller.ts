import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { loginBodyJoi, registerBodyJoi } from './auth.joi';
import { LoginDto, LoginResponseDto, RegisterDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UsePipes(registerBodyJoi)
  @ApiResponse({ status: 201 })
  async register(@Body() registerDto: RegisterDto) {
    try {
      await this.authService.registerUser(
        registerDto.email,
        registerDto.password,
      );
    } catch (e) {
      if (e.code === 11000)
        throw new BadRequestException('duplicate email address');
      throw e;
    }
  }

  @Post('/login')
  @UsePipes(loginBodyJoi)
  @ApiResponse({ status: 401, description: 'Invalid username or password' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return this.authService.login(user);
  }
}
