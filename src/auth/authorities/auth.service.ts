import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services/user.service';
import { QueryConditionInput } from '../../common/dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        @Inject(JwtService) private readonly jwtService: JwtService,
    ) { }

    async CreateToken(payload: { Account: string }): Promise<string> {
        return this.jwtService.sign(payload);
    }

    async ValidateUser(payload: { Account: string }): Promise<any> {
        const queryConditionInput: QueryConditionInput = {
            ConditionLambda: "User.Account=:Account and User.IsActive=:IsActive",
            ConditionValue: { Account: payload.Account, IsActive: true },
            TableName: "User",
        };
        return await this.userService.queryObject(queryConditionInput);
    }
}