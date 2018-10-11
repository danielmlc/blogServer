import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
  } from '@nestjs/swagger';
import { Result } from '../common/result.interface';
import { Cat } from './cat.entity';
import { CatService } from './cat.service';

@ApiBearerAuth()
@ApiUseTags('cat')
@Controller('cat')
export class CatController {
    constructor(
        @Inject(CatService) private readonly catService: CatService,
    ) { }

    @Post()
    @ApiOperation({ title: '添加' })
    @ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createCat(@Body() cat: Cat): Promise<Result> {
        await this.catService.createCat(cat);
        return { code: 200, message: '创建成功' };
    }

    @Delete(':id')
    @ApiOperation({ title: 'Create cat' })
    @ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async deleteCat(@Param('id') id: number): Promise<Result> {
        await this.catService.deleteCat(id);
        return { code: 200, message: '删除成功' };
    }

    @Put(':id')
    @ApiOperation({ title: 'Create cat' })
    @ApiResponse({
      status: 201,
      description: 'The record has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async updateCat(@Param('id') id: number, @Body() cat: Cat): Promise<Result> {
        await this.catService.updateCat(id, cat);
        return { code: 200, message: '更新成功' };
    }

    @Get(':id')
    async findOneCat(@Param('id') id: number): Promise<Result> {
        const data = await this.catService.findOneCat(id);
        return { code: 200, message: '查询成功', data };
    }
}