import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/schema/user.schema';
import { UserService } from 'src/modules/user/user.service';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: "digictSecret",
      signOptions: {
        expiresIn: 3600,
      }
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [AuthService,UserRepository,UserService,JwtStrategy],
  exports: [AuthService,JwtStrategy,PassportModule],
  controllers:[AuthController]
})
export class AuthModule {}



// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { UserModule } from '../user/user.module';
// import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './strategy/local.strategy';
// import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
// import { JwtStrategy } from './strategy/jwt.strategy';
// import { ConfigModule, ConfigType } from '@nestjs/config';
// import jwtConfig from '../config/jwt.config';
// import { AuthController } from './auth.controller';

// @Module({
//   imports: [
//     ConfigModule.forFeature(jwtConfig),
//     UserModule,
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.registerAsync({
//       imports: [ConfigModule.forFeature(jwtConfig)],
//       useFactory: (config: ConfigType<typeof jwtConfig>) => {
//         return {
//           secret: config.secretKey,
//           signOptions: { expiresIn: config.expiresIn },
//         } as JwtModuleOptions;
//       },
//       inject: [jwtConfig.KEY],
//     }),
//   ],
//   providers: [AuthService, LocalStrategy, JwtStrategy],
//   exports: [AuthService],
//   controllers: [AuthController],
// })
// export class AuthModule {}