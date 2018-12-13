import {IsNotEmpty } from 'class-validator';
import { UserDto } from './UserDto';
export class  UserListDto {
    @IsNotEmpty()
    Items: Array<UserDto>;
}