import {AuditedDto} from './auditedDto';
export abstract  class FullAuditedDto extends  AuditedDto {
      IsDeleted: boolean;
      DeletionTime: Date;
      DeleterUserId: string;
      DeleterUserName: string;
}