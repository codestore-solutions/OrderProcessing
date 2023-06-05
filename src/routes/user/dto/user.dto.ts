import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  contacts: string[];

  @ApiProperty()
  role: string;

  @ApiProperty({ required: false })
  stores?: string[];
}