import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ type: [String] })
  contacts: string[];

  @ApiProperty()
  role: string;

  @ApiProperty()
  businessAdmin?: string;

  @ApiProperty()
  businessAdminId?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  isActive: boolean;
}

export class loginResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  user: UserDto
}

export class loginRequestBody {
  @ApiProperty({ example: 'rajiv@123gmail.com' })
  username: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}
