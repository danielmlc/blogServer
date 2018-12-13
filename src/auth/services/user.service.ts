import { HttpException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { User } from '../entity/user.entity';
import { LoginForm, UserDto, UserObjectDto, UserListDto } from '../dto';
import { QueryConditionInput } from '../../common/dto';
import { CryptoUtil } from '../../common/utils/crypto.util';

@Injectable()
export class UserService implements OnModuleInit {
    async onModuleInit() {
        // 初始化系统管理员
        this.initUser();
    }
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
    ) { }
    /**
     * 用户登录
     *
     * @param account 登录账号
     * @param password 登录密码
     */
    async login(loginForm: LoginForm): Promise<any> {
        const queryConditionInput: QueryConditionInput =
        {
          ConditionLambda: "User.Account=:Account",
          ConditionValue: { Account: loginForm.Account },
          TableName: "User",
        };
        const user = await this.queryObject(queryConditionInput);
        if (!user){
            throw new HttpException('登录账号有误', 406);
        }
        if (!this.cryptoUtil.checkPassword(loginForm.Password, user.Order.Password)){
            throw new HttpException('登录密码有误', 406);
        }
    }
    async initUser(): Promise<void> {
        const admin = this.userRepo.create({
            Account: 'admin',
            Password: this.cryptoUtil.encryptPassword('qwe123456789.'),
            UserName: '超级管理员',
            Role: 'admin',
        });
        const queryConditionInput: QueryConditionInput = {
            ConditionLambda: "User.Account=:Account",
            ConditionValue: { Account: admin.Account },
            TableName: "User",
        };
        const user = await this.queryObject(queryConditionInput);
        if (!user.Order){
            const uuidv4 = require('uuid/v4');
            admin.Id = uuidv4();
            await this.userRepo.save(admin);
        }
    }
    /**
     *
     *
     * @param {QueryConditionInput} queryConditionInput
     * @returns {Promise<UserListDto>}
     * @memberof UserService
     */
    async queryDataList(queryConditionInput: QueryConditionInput): Promise<UserListDto> {
        const List = await getRepository<User>(User)
            .createQueryBuilder(queryConditionInput.TableName)
            .where(queryConditionInput.ConditionLambda, queryConditionInput.ConditionValue)
            .orderBy(queryConditionInput.OrderBy)
            .skip(queryConditionInput.Skip)
            .take(queryConditionInput.Take)
            .getMany();
        const result: UserListDto = { Items: List };
        return result;
    }
    /**
     *
     *
     * @param {QueryConditionInput} queryConditionInput
     * @returns {Promise<ArticleObjectDto>}
     * @memberof UserService
     */
    async queryObject(queryConditionInput: QueryConditionInput): Promise<UserObjectDto> {
        const Object = await getRepository<User>(User)
            .createQueryBuilder(queryConditionInput.TableName)
            .where(queryConditionInput.ConditionLambda, queryConditionInput.ConditionValue)
            .orderBy(queryConditionInput.OrderBy)
            .getOne();
        const result: UserObjectDto = { Order: Object };
        return result;
    }
    /**
     *
     *
     * @param {UserDto} userDto
     * @returns {Promise<void>}
     * @memberof UserService
     */
    async createObject(userDto: UserDto): Promise<void> {
        const uuidv4 = require('uuid/v4');
        userDto.Id = uuidv4();
        return await this.userRepo.insert(userDto);
    }
    /**
     *
     *
     * @param {UserDto} userDto
     * @returns {Promise<void>}
     * @memberof UserService
     */
    async updateById(userDto: UserDto): Promise<void> {
        delete userDto.Password;
        return await this.userRepo.update({ Id: userDto.Id }, userDto);
    }
    /**
     *
     *
     * @param {UserObjectDto} userObjectDto
     * @returns {Promise<void>}
     * @memberof UserService
     */
    async createOrUpdateObject(userObjectDto: UserObjectDto): Promise<void> {
        if (userObjectDto.Order.Id) {
            return await this.updateById(userObjectDto.Order);
        } else {
            return await this.createObject(userObjectDto.Order);
        }
    }
    /**
     *
     *
     * @param {UserDto} userDto
     * @returns {Promise<void>}
     * @memberof UserService
     */
    async deleteObject(userDto: UserDto): Promise<void> {
        return await this.userRepo.delete(userDto);
    }
}