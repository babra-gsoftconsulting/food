import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './common/configs/database.module.config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { APP_FILTER } from '@nestjs/core';
import { AuthExceptionFilter } from './common/exceptions/auth.exception.filter';
import { ResturantModule } from './resturant/resturant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    DatabaseModule,
    MongooseModule.forFeature([]),
    AuthModule,
    UserModule,
    ResturantModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AuthExceptionFilter,
    },
  ],
})
export class AppModule {
}
