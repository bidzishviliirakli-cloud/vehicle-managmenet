import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TagService } from 'src/car/services/tag.service';
import { CreateTagDto } from '../dto/createTag.dto';
import { UpdateTagDto } from '../dto/updateTag.dto';

@ApiTags('Admin - Car tag CMS')
@Controller('admin/car/tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  async findAll() {
    return this.tagService.findAll();
  }

  @Post()
  @ApiBody({ type: CreateTagDto })
  async create(@Body() tag: CreateTagDto) {
    return this.tagService.create(tag);
  }

  @Put(':id')
  @ApiBody({ type: UpdateTagDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() tag: UpdateTagDto,
  ) {
    return this.tagService.update(id, tag);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.tagService.delete(id);
  }
}
