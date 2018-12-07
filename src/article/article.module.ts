import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    controllers: [],
    providers: [],
})
export class ArticleModule {}