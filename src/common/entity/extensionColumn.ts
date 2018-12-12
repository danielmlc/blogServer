import {Column} from "typeorm";

export abstract  class ExtensionColumn {
    @Column({
         // comment: '状态',
            type: "int",
            nullable: true,
         })
    SortCode: number;
    @Column({
        // comment: '状态',
           type: "bit",
           nullable: true,
        })
   IsActive: boolean;
}