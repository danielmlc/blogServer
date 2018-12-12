import {IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class  QueryConditionInput {
    @ApiModelProperty()
    selectRow: Array<string>;
    @ApiModelProperty()
    ConditionLambda: string;
    @ApiModelProperty()
    ConditionValue: object;
    @ApiModelProperty()
    OrderBy: string;
    @ApiModelProperty()
    TableName: string;
    @ApiModelProperty()
    Skip: number;
    @ApiModelProperty()
    Take: number;
}