import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class CatService {
    constructor(
        @InjectRepository(Article) private readonly catRepo: Repository<Article>,
        // 使用泛型注入对应类型的存储库实例
    ) { }

    /**
     * 创建
     *
     * @param cat Cat 实体对象
     */
    async createArticle(cat: Article): Promise<Article> {
        /**
         * 创建新的实体实例，并将此对象的所有实体属性复制到新实体中。 请注意，它仅复制实体模型中存在的属性。
         */
        // this.catRepo.create(cat);

        // 插入数据时，删除 id，以避免请求体内传入 id
        delete cat.id;
        return this.catRepo.save(cat);

        /**
         * 将给定实体插入数据库。与save方法不同，执行原始操作时不包括级联，关系和其他操作。
         * 执行快速有效的INSERT操作。不检查数据库中是否存在实体，因此如果插入重复实体，本次操作将失败。
         */
        // await this.catRepo.insert(cat);
    }

    /**
     * 删除
     *
     * @param id ID
     */
    async deleteCat(id: number): Promise<void> {
        await this.findOneById(id);
        this.catRepo.deleteById(id);
    }

    /**
     * 更新
     *
     * @param id ID
     * @param cat Cat 实体对象
     */
    async updateCat(id: number, cat: Cat): Promise<void> {
        await this.findOneById(id);
        // 更新数据时，删除 id，以避免请求体内传入 id
        delete cat.id;
        this.catRepo.updateById(id, cat);
    }

    /**
     * 根据ID查询
     *
     * @param id ID
     */
    async findOneCat(id: number): Promise<Cat> {
        return this.findOneById(id);
    }

    /**
     * 根据ID查询单个信息，如果不存在则抛出404异常
     * @param id ID
     */
    private async findOneById(id: number): Promise<Cat> {
        const catInfo = await this.catRepo.findOneById(id);
        if (!catInfo) {
            throw new HttpException(`指定 id=${id} 的猫猫不存在`, 404);
        }
        return catInfo;
    }
}