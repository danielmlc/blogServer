import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from './entity/user.entity';
import { AuthService } from './authorities/auth.service';
import { AuthStrategy } from './authorities/auth.strategy';
import { UserService } from './services/user.service';
import { UserController } from './controllor/auth.controller';
import { CryptoUtil } from '../common/utils/crypto.util';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
        secretOrPrivateKey: 'secretKey',
        signOptions: {
            expiresIn: 3600
        }
    })
    ],
    controllers: [UserController],
    providers: [
        CryptoUtil,
        AuthService,
        AuthStrategy,
        UserService
    ],
})
export class AuthModule {}
