import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    // generate password hash
    const hash = await argon.hash(registerDto.password);

    // save the new user in the db
    try {
      const newUser = await this.databaseService.user.create({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          role: registerDto.role,
          hash,
        },
      });

      return this.signToken(newUser.id, newUser.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User with this email already exists');
        }
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    // find the user by email
    const user = await this.databaseService.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Incorrect login credentials');

    // compare passwords
    const hash = user.hash;
    const pwd = loginDto.password;
    const pwdMatches = await argon.verify(hash, pwd);
    //if incorrect password, throw exception
    if (!pwdMatches)
      throw new ForbiddenException('Incorrect login credentials');

    // return user
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
