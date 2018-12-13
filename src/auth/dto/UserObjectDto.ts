import {IsNotEmpty } from 'class-validator';
import {UserDto} from './UserDto';
export class  UserObjectDto {
    @IsNotEmpty()
    Order: UserDto;
}