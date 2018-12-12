import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';

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
        const list = await this.articleService.queryDataList(queryConditionInput);
        const result: Result<ArticleListDto> = { code: 200, success: true, message: '成功！', result: list };
        return result;
    }
    @Post('/queryObject')
    @ApiOperation({ title: '根据条件查询数据符合条件的对象' })
    async queryObject(@Body() queryConditionInput: QueryConditionInput): Promise<ArticleObjectDto> {
        return await this.articleService.queryObject(queryConditionInput);
    }
    @Post('/createOrUpdateObject')
    @ApiOperation({ title: '添加或更新单个对象' })
    @ApiResponse({ status: 401, description: 'Forbidden.' })
    async createOrUpdateObject(@Body() articleObjectDto: ArticleObjectDto): Promise<void> {
        return await this.articleService.createOrUpdateObject(articleObjectDto);
    }

    @Post('/createOrUpdateList')
    @ApiOperation({ title: '添加或更新多个对象' })
    @ApiResponse({ status: 401, description: 'Forbidden.' })
    @UseGuards(AuthGuard())
    async createOrUpdateList(@Body() articleListDto: ArticleListDto): Promise<void> {
        return await this.articleService.createOrUpdateList(articleListDto);
    }

    @Delete('/deleteObject')
    @ApiOperation({ title: '删除指定对象' })
    @ApiResponse({ status: 401, description: 'Forbidden.' })
    @UseGuards(AuthGuard())
    async deleteObject(@Body() articleDto: ArticleDto): Promise<void> {
        return await this.articleService.deleteObject(articleDto);
    }
}