import {  IsNotEmpty } from 'class-validator';
export abstract class AuditedDto {
      CreationTime: Date;
      CreatorUserId: string;
      CreatorUserName: string;
      LastModificationTime: Date;
      LastModifierUserId: string;
      LastModifierUserName: string;
}