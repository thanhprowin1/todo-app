import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './create-todo.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Todos') // 👈 nhóm API theo tag
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo công việc mới' })
  @ApiResponse({ status: 201, description: 'Thêm công việc thành công.' })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto.title);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách công việc' })
  findAll() {
    return this.todosService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Đổi trạng thái hoàn thành' })
  toggleCompleted(@Param('id') id: string) {
    return this.todosService.toggleCompleted(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa công việc' })
  delete(@Param('id') id: string) {
    return this.todosService.delete(+id);
  }
}
