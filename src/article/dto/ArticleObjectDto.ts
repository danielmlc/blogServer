import {IsNotEmpty } from 'class-validator';
import {ArticleDto} from './ArticleDto';
export class  ArticleObjectDto {
    @IsNotEmpty()
    Order: ArticleDto;
}