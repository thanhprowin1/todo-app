import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto.title);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Patch(':id')
  toggleCompleted(@Param('id') id: string) {
    return this.todosService.toggleCompleted(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todosService.delete(+id);
  }
}
