import { Column, Entity, PrimaryColumn} from 'typeorm';
import { FullAuditedColumn} from "../../common/entity";

@Entity('User')
export class User extends FullAuditedColumn{
      @PrimaryColumn({
        type: "nvarchar",
        length: 50,
      })
      Id: string;
      @Column({
         type: "nvarchar",
         length: 200,
      })
      Account: string;
      @Column({
        type: "nvarchar",
        length: 200,
        nullable: true,
     })
     Password: string;
     @Column({
        type: "nvarchar",
        length: 100,
        nullable: true,
     })
     UserName: string;
     @Column({
        type: "nvarchar",
        length: 200,
        nullable: true,
     })
     Role: string;
     @Column({
        type: "nvarchar",
        length: 200,
        nullable: true,
     })
     Email: string;
     @Column({
        type: "nvarchar",
        length: 10,
        nullable: true,
     })
     Sex: string;
     @Column({
        type: "bit",
        nullable: true,
        default: true,
     })
     IsActive: boolean;
}