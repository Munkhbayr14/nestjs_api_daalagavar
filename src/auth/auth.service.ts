import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface User {
  username: string;
  password: string;
  name: string;
}

@Injectable()
export class AuthService {
  //Defualt-аас username pass хоёр үүсгэсэн
  private users: User[] = [
    { username: 'mb123', password: 'psw123', name: 'munkhbayar' },
  ];

  constructor(private readonly jwtService: JwtService) {}

  findUser(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }
  // энэ хэсэн token үүсгэж байгаа
  createAccessToken(username: string): { accessToken: string } {
    return { accessToken: this.jwtService.sign({ sub: username }) };
  }

  async login(user: LoginDto): Promise<{ accessToken: string }> {
    try {
      //defualt-аар үүсэн username pass аа хэрэглэгчээс орж ирсэн утгар шалгаж байгаа
      //Postman ашиглан шалгах боломжтой
      const existingUser = this.findUser(user.username);
      if (!user) {
        throw new Error();
      }

      const passwordMatch = existingUser.password === user.password;

      if (!passwordMatch) {
        throw new Error();
      }
      //үүссэн токеноо буцааж байна
      return this.createAccessToken(user.username);
    } catch (e) {
      throw new UnauthorizedException('Username эсвэд password буруу байна!!!');
    }
  }
}
