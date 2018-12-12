import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Article } from './article.entity';
import { ArticleDto, ArticleObjectDto, ArticleListDto } from './dto';
import { QueryConditionInput } from '../common/dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private readonly articleRepo: Repository<Article>,
    ) { }
    /**
     *
     *
     * @param {QueryConditionInput} queryConditionInput
     * @returns {Promise<Article[]>}
     * @memberof ArticleService
     */
    async queryDataList(queryConditionInput: QueryConditionInput): Promise<ArticleListDto> {
        const List = await getRepository<Article>(Article)
            .createQueryBuilder(queryConditionInput.TableName)
            .where(queryConditionInput.ConditionLambda, queryConditionInput.ConditionValue)
            .orderBy(queryConditionInput.OrderBy)
            .skip(queryConditionInput.Skip)
            .take(queryConditionInput.Take)
            .getMany();
        const result: ArticleListDto = { Items: List };
        return result;
    }
    async queryObject(queryConditionInput: QueryConditionInput): Promise<ArticleObjectDto> {
        const Object = await getRepository<Article>(Article)
            .createQueryBuilder(queryConditionInput.TableName)
            .where(queryConditionInput.ConditionLambda, queryConditionInput.ConditionValue)
            .orderBy(queryConditionInput.OrderBy)
            .getOne();
        const result: ArticleObjectDto = { Order: Object };
        return result;
    }
    /**
     *
     *
     * @param {ArticleDto} articleDto
     * @returns {Promise<void>}
     * @memberof ArticleService
     */
    async createObject(articleDto: ArticleDto): Promise<void> {
        const uuidv4 = require('uuid/v4');
        articleDto.Id = uuidv4();
        return await this.articleRepo.insert(articleDto);
    }
    /**
     *
     *
     * @param {ArticleDto} articleDto
     * @returns {Promise<void>}
     * @memberof ArticleService
     */
    async updateById(articleDto: ArticleDto): Promise<void> {
        return await this.articleRepo.update({ Id: articleDto.Id }, articleDto);
    }
    /**
     *
     *
     * @param {ArticleObjectDto} articleObjectDto
     * @returns {Promise<void>}
     * @memberof ArticleService
     */
    async createOrUpdateObject(articleObjectDto: ArticleObjectDto): Promise<void> {
        if (articleObjectDto.Order.Id) {
            return await this.updateById(articleObjectDto.Order);
        } else {
            return await this.createObject(articleObjectDto.Order);
        }
    }
    /**
     *
     *
     * @param {ArticleListDto} articleListDto
     * @returns {Promise<void>}
     * @memberof ArticleService
     */
    async createOrUpdateList(articleListDto: ArticleListDto): Promise<void> {
        articleListDto.Items.forEach( async (i) => {
            if (i.Id) {
                return await this.updateById(i);
            } else {
                return await this.createObject(i);
            }
        });
    }
    /**
     *
     *
     * @param {ArticleDto} articleDto
     * @returns {Promise<void>}
     * @memberof ArticleService
     */
    async deleteObject(articleDto: ArticleDto): Promise<void> {
        return await this.articleRepo.delete(articleDto);
    }

}