import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorator';
import { ArticleService } from './article.service';
import { ArticleDto, ArticleObjectDto, ArticleListDto } from './dto';
import { QueryConditionInput } from '../common/dto';
import { Result } from '../common/dto/resultDto';

@ApiBearerAuth()
@ApiUseTags('article')
@Controller('article')
export class ArticleController {
    constructor(
        @Inject(ArticleService) private readonly articleService: ArticleService,
    ) { }

    @Post('/queryDataList')
    @ApiOperation({title: '根据条件查询数据（可分页）|返回数据集' })
    @ApiResponse({ status: 401, description: 'Forbidden.' })
    async queryDataList(@Body() queryConditionInput: QueryConditionInput): Promise<Result<ArticleListDto>> {
        const _result = await this.articleService.queryDataList(queryConditionInput);
        return { code: 200, success: true, message: '成功！', result: _result };
    }
    @Post('/queryObject')
    @ApiOperation({ title: '根据条件查询数据符合条件的对象' })
    async queryObject(@Body() queryConditionInput: QueryConditionInput): Promise<Result<ArticleObjectDto>> {
        const _result =  await this.articleService.queryObject(queryConditionInput);
        return { code: 200, success: true, message: '成功！', result: _result };
    }
    @Post('/createOrUpdateObject')
    @ApiOperation({ title: '添加或更新单个对象' })
    @ApiResponse({ status: 401, description: 'Forbidden.' })
    @Roles('admin')
    @UseGuards(AuthGuard(), RolesGuard)
    async createOrUpdateObject(@Body() articleObjectDto: ArticleObjectDto): Promise<Result<any>> {
        const _result =  await this.articleService.createOrUpdateObject(articleObjectDto);
        return { code: 200, success: true, message: '成功！', result: null };
    }

    @Post('/createOrUpdateList')
    @ApiOperation({ title: '添加或更新多个对象' })
    @ApiResponse({ status: 401, description: 'Forbidden.' })
    async createOrUpdateList(@Body() articleListDto: ArticleListDto): Promise<Result<any>> {
        const _result =  await this.articleService.createOrUpdateList(articleListDto);
        return { code: 200, success: true, message: '成功！', result: null };
    }

    @Delete('/deleteObject')
    @ApiOperation({ title: '删除指定对象' })
    @ApiResponse({ status: 401, description: 'Forbidden.' })
    async deleteObject(@Body() articleDto: ArticleDto): Promise<Result<any>> {
        const _result =  await this.articleService.deleteObject(articleDto);
        return { code: 200, success: true, message: '成功！', result: null };
    }
}