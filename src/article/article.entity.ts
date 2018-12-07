import { Column, Entity, PrimaryColumn} from 'typeorm';
import { AllExtensionColumn} from "../common/entity";

@Entity('Article')
export class Article extends AllExtensionColumn{
      @PrimaryColumn({
        //  comment: '主键',
        type: "nvarchar",
        length: 50,
      })
      Id: string;
      @Column({
         // comment: '标题',
         type: "nvarchar",
         length: 200,
      })
      Title: string;
      @Column({
        // comment: '副标题',
        type: "nvarchar",
        length: 500,
        nullable: true,
     })
     Subtitle: string;
     @Column({
        // comment: '内容',
        type: "nvarchar",
        length: 4000,
        nullable: true,
     })
     Content: string;
     @Column({
        // comment: '配图',
        type: "nvarchar",
        length: 200,
        nullable: true,
     })
     Imgurl: string;
     @Column({
            // comment: '标签',
            type: "nvarchar",
            length: 200,
            nullable: true,
        })
     Tags: string;
     @Column({
            // comment: '浏览次数',
            type: "int",
            nullable: true,
    })
    ScanNum: number;
}