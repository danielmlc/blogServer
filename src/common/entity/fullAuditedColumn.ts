import {Column} from "typeorm";
import {AuditedColumn} from './auditedColumn';

export abstract  class FullAuditedColumn extends  AuditedColumn {
   @Column({
        // comment: '删除标识',
           type: "bit",
        })
        IsDeleted: boolean;
   @Column({
         // comment: '删除时间',
            type: "datetime",
            nullable: true,
         })
        DeletionTime: Date;
   @Column({
      // comment: '删除人主键',
         type: "varchar",
         length: 50,
         nullable: true,
      })
      DeleterUserId: string;
   @Column({
        // comment: '删除人账号',
         type: "varchar",
         length: 50,
         nullable: true,
      })
      DeleterUserName: string;
}