import {IsNotEmpty } from 'class-validator';
import {FullAuditedDto } from '../../common/dto';
export class  UserDto extends FullAuditedDto{
        Id: string;
        @IsNotEmpty()
        Account?: string;
        Password?: string;
        UserName?: string;
        Email?: string;
        Role?: string;
        Sex?: string;
        IsActive?: boolean;
}

export class  LoginForm {
        @IsNotEmpty()
        Account: string;
        @IsNotEmpty()
        Password: string;
}