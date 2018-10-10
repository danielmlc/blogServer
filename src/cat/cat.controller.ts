import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { Result } from '../common/result.interface';

import { Cat } from './cat.entity';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
    constructor(
        @Inject(CatService) private readonly CatService: CatService,
    ) { }

    @Post()
    async createCat(@Body() Cat: Cat): Promise<Result> {
        await this.CatService.createCat(Cat);
        return { code: 200, message: '创建成功' };
    }

    @Delete(':id')
    async deleteCat(@Param('id') id: number): Promise<Result> {
        await this.CatService.deleteCat(id);
        return { code: 200, message: '删除成功' };
    }

    @Put(':id')
    async updateCat(@Param('id') id: number, @Body() Cat: Cat): Promise<Result> {
        await this.CatService.updateCat(id, Cat);
        return { code: 200, message: '更新成功' };
    }

    @Get(':id')
    async findOneCat(@Param('id') id: number): Promise<Result> {
        const data = await this.CatService.findOneCat(id);
        return { code: 200, message: '查询成功', data };
    }
}