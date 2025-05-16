import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginResponseDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;
}
