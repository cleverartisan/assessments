import { IsString } from 'class-validator';

export class ParseDataPostDto {
  @IsString()
  public data?: string;

  constructor() {
    this.data = undefined;
  }
}

export default ParseDataPostDto