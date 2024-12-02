import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: UserDto) {
    const filePath = 'data/user.json'; // Replace with your desired file path

    try {
      if (existsSync(filePath)) {
        const data = readFileSync(filePath, 'utf8');
        const items = JSON.parse(data);
        items.push({ id: items.length + 1, ...user });

        writeFileSync(filePath, JSON.stringify(items, null, 2));

        return this.userService.create({ id: items.length, ...user });
      } else {
        return { error: 'File not found' };
      }

      // return { message: 'Item added successfully' };
    } catch (error) {
      console.error('Error adding item:', error);
      return { message: 'Error adding item' };
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    const filePath = 'data/user.json'; // Replace with your desired file path

    try {
      if (existsSync(filePath)) {
        const data = readFileSync(filePath, 'utf8');
        const items = JSON.parse(data);
        // items.push(user);

        // writeFileSync(filePath, JSON.stringify(items, null, 2));

        // return this.userService.create(user);
        return this.userService.findAll(items);
      } else {
        return { error: 'File not found' };
      }

      // return { message: 'Item added successfully' };
    } catch (error) {
      console.error('Error adding item:', error);
      return { message: 'Error adding item' };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const filePath = 'data/user.json'; // Replace with your desired file path

    try {
      if (existsSync(filePath)) {
        const data = readFileSync(filePath, 'utf8');
        const items = JSON.parse(data);
        const item = items.find((item: any) => item.id === Number(id));

        if (item) {
          return this.userService.findOne(item);
        } else {
          return { message: 'Item not found' };
        }
      } else {
        return { error: 'File not found' };
      }
    } catch (error) {
      console.error('Error adding item:', error);
      return { message: 'Error adding item' };
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: UserDto) {
    const filePath = 'data/user.json'; // Replace with your desired file path

    try {
      if (existsSync(filePath)) {
        const data = readFileSync(filePath, 'utf8');
        const users = JSON.parse(data);

        const userIndex = users.findIndex(
          (user: any) => user.id === Number(id),
        );

        if (userIndex !== -1) {
          users[userIndex].name = user.name;
          users[userIndex].email = user.email;
          users[userIndex].status = user.status;
          writeFileSync(filePath, JSON.stringify(users, null, 2));
          const item = users.find((item: any) => item.id === Number(id));

          return this.userService.update(+id, item);
        } else {
          return { message: 'User not found' };
        }
      } else {
        return { error: 'File not found' };
      }
    } catch (error) {
      console.error('Error adding item:', error);
      return { message: 'Error adding item' };
    }
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() user: UserDto) {
    const filePath = 'data/user.json'; // Replace with your desired file path

    try {
      if (existsSync(filePath)) {
        const data = readFileSync(filePath, 'utf8');
        const users = JSON.parse(data);

        const userIndex = users.findIndex(
          (user: any) => user.id === Number(id),
        );

        if (userIndex !== -1) {
          users[userIndex].status = user.status;
          writeFileSync(filePath, JSON.stringify(users, null, 2));
          const item = users.find((item: any) => item.id === Number(id));

          return this.userService.updateStatus(+id, item);
        } else {
          return { message: 'User not found' };
        }
      } else {
        return { error: 'File not found' };
      }
    } catch (error) {
      console.error('Error adding item:', error);
      return { message: 'Error adding item' };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
