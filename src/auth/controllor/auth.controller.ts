import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guards';
import { Roles } from '../decorators/roles.decorator';
import { UserService } from '../services/user.service';
import { LoginForm, UserDto, UserObjectDto, UserListDto } from '../dto';
import { QueryConditionInput } from '../../common/dto';
import { Result } from '../../common/dto/resultDto';
import { AuthService } from '../authorities/auth.service';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        @Inject(AuthService) private readonly authService: AuthService,
    ) { }
    @Post('/login')
    @ApiOperation({title: '用户登录' })
    async login(@Body() loginForm: LoginForm): Promise<Result<string>> {
        await this.userService.login(loginForm);
        const AccessToken = await this.authService.CreateToken({Account: loginForm.Account});
        return { code: 200, success: true, message: '登录成功', result: AccessToken };
    }
    @Post('/queryDataList')
    @ApiOperation({title: '根据条件查询数据（可分页）|返回数据集' })
    @ApiResponse({ status: 401, description: 'Forbidden.' })
    async queryDataList(@Body() queryConditionInput: QueryConditionInput): Promise<Result<UserListDto>> {
        const _result = await this.userService.queryDataList(queryConditionInput);
        return { code: 200, success: true, message: '成功！', result: _result };
    }
    @Post('/queryObject')
    @ApiOperation({ title: '根据条件查询数据符合条件的对象' })
    async queryObject(@Body() queryConditionInput: QueryConditionInput): Promise<Result<UserObjectDto>> {
        const _result =  await this.userService.queryObject(queryConditionInput);
        return { code: 200, success: true, message: '成功！', result: _result };
    }
    /**
     *
     *
     * @param {UserObjectDto} userObjectDto
     * @returns {Promise<Result<any>>}
     * @memberof UserController 授权时注意@Roles('admin')中可为角色数组，用户拥有改角色即可， 如果不需要角色区分的授权，去掉改标记。
     */
    @Post('/createOrUpdateObject')
    @Roles('admin')
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiOperation({ title: '添加或更新单个对象' })
    async createOrUpdateObject(@Body() userObjectDto: UserObjectDto): Promise<Result<any>> {
        const _result =  await this.userService.createOrUpdateObject(userObjectDto);
        return { code: 200, success: true, message: '成功！', result: null };
    }

    @Delete('/deleteObject')
    @Roles('admin')
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiOperation({ title: '删除指定对象' })
    async deleteObject(@Body() userDto: UserDto): Promise<Result<any>> {
        const _result =  await this.userService.deleteObject(userDto);
        return { code: 200, success: true, message: '成功！', result: null };
    }
}