import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ErrorsInterceptor } from './common/errors.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
    AppService,
  ],
})

export class AppModule {}
