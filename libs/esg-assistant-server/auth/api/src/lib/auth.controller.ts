import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '@esg-assistant-server/auth/domain';
import { RegisterRequest } from '@esg-assistant/authentication';
import { AuthService } from '@esg-assistant-server/auth/application';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: RegisterRequest) {
    return this.authService.register(body);
  }
}
