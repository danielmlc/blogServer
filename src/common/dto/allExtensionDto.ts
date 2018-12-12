import {  IsNotEmpty } from 'class-validator';
import {AuditedDto} from './auditedDto';
export abstract  class AllExtensionColumn extends  AuditedDto {
   SortCode: number;
   IsActive: boolean;
}