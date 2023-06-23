import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';

// controller дотор end_point-ууд бичигдэнэ
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LoginDto дотор typescript-ийн төрлүүдээ зааж өгсөн userName: string Г.М
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  // үүссэн moken-ийг шалгаж хэрэглэгч рүү мэдээлэл явуулж байгаа нь
  // Guards нь токен шалгах функц хэрэв req явуулах үед guards нь дундаас нь токэн шалгана таарч байвал мэдээлэл илгээнэ
  @UseGuards(JwtGuard)
  @Get('info')
  getInfo(@Req() req: any) {
    const { username, name } = this.authService.findUser(req.user.sub);
    // хэрэглэгч рүү илгээх хэсэг
    return 'username: ' + username + ', name: ' + name + ' таны мэдээлэл';
  }
}
