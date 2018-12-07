import {Column} from "typeorm";
import {AuditedColumn} from './auditedColumn';

export abstract  class AllExtensionColumn extends  AuditedColumn {
   @Column({
      // comment: '状态',
         type: "int",
         nullable: true,
      })
   sortCode: number;
   @Column({
     // comment: '状态',
        type: "bit",
        nullable: true,
     })
   isActive: boolean;
}