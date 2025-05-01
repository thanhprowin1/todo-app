import { IsNotEmpty, IsString, MinLength, minLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ description: 'Tiêu đề của công việc cần làm' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  title: string;
}
