import {IsNotEmpty } from 'class-validator';
import {ExtensionDto } from '../../common/dto';
export class  ArticleDto extends ExtensionDto{
        Id: string;
        @IsNotEmpty()
        Title?: string;
        Subtitle?: string;
        Content?: string;
        Imgurl?: string;
        Tags?: string;
        ScanNum?: number;
}