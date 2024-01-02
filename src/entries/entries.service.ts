// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Prisma } from '@prisma/client';
// import { DatabaseService } from 'src/database/database.service';

// @Injectable()
// export class EntriesService {
//   constructor(private readonly databaseService: DatabaseService) {}

//   async create(userId: number, createEntryDto: Prisma.EntryCreateInput) {
//     // Check if the user exists
//     const user = await this.databaseService.user.findUnique({
//       where: { id: userId },
//     });

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     // Set the authorId to the user's ID
//     createEntryDto.author = { connect: { id: userId } };

//     // Create the entry
//     const createdEntry = await this.databaseService.entry.create({
//       data: createEntryDto,
//     });

//     return createdEntry;
//   }

//   async findAll() {
//     return `This action returns all entries`;
//   }

//   async findOne(id: number) {
//     return `This action returns a #${id} entry`;
//   }

//   async update(id: number, updateEntryDto: Prisma.EntryUpdateInput) {
//     return `This action updates a #${id} entry`;
//   }

//   async remove(id: number) {
//     return `This action removes a #${id} entry`;
//   }
// }
