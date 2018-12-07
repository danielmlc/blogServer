import {Column} from "typeorm";

export abstract  class ExtensionColumn {
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