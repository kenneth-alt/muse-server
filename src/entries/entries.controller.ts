// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { EntriesService } from './entries.service';
// import { Prisma } from '@prisma/client';

// @Controller('entries')
// export class EntriesController {
//   constructor(private readonly entriesService: EntriesService) {}

//   @Post()
//   create(@Body() createEntryDto: Prisma.EntryCreateInput) {
//     return this.entriesService.create(createEntryDto);
//   }

//   @Get()
//   findAll() {
//     return this.entriesService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.entriesService.findOne(+id);
//   }

//   @Patch(':id')
//   update(
//     @Param('id') id: string,
//     @Body() updateEntryDto: Prisma.EntryUpdateInput,
//   ) {
//     return this.entriesService.update(+id, updateEntryDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.entriesService.remove(+id);
//   }
// }
