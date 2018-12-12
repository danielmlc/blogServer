import {IsNotEmpty } from 'class-validator';
import {ExtensionColumn } from 'common/dto';
export class  ArticleDto extends ExtensionColumn{
        Id: string;
        @IsNotEmpty()
        Title?: string;
        Subtitle?: string;
        Content?: string;
        Imgurl?: string;
        Tags?: string;
        ScanNum?: number;
}