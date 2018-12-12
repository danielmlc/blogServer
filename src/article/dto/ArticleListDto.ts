import {IsNotEmpty } from 'class-validator';
import {ArticleDto} from './ArticleDto';
export class  ArticleListDto {
    @IsNotEmpty()
    Items: Array<ArticleDto>;
}