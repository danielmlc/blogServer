import {Column} from "typeorm";

export abstract class AuditedColumn {
   @Column({
         // comment: '创建时间',
            type: "datetime",
            nullable: true,
         })
         CreationTime: Date;
   @Column({
      // comment: '添加用户主键',
         type: "varchar",
         length: 50,
         nullable: true,
      })
      CreatorUserId: string;
   @Column({
        // comment: '添加人账号',
         type: "varchar",
         length: 50,
         nullable: true,
      })
   CreatorUserName: string;
      @Column({
         // comment: '上次修改时间',
            type: "datetime",
            nullable: true,
         })
         LastModificationTime: Date;
   @Column({
      // comment: '修改用户主键',
         type: "varchar",
         length: 50,
         nullable: true,
      })
      LastModifierUserId: string;
   @Column({
        // comment: '修改i人账号',
         type: "varchar",
         length: 50,
         nullable: true,
      })
      LastModifierUserName: string;
}