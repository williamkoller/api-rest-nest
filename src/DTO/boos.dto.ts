import { Type } from 'class-transformer'
import { ArrayMinSize, IsNotEmpty, IsNotEmptyObject, IsNumber, IsPositive, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator'
import { AuthorDTO } from './author.dto'

export class BookDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly name: string

    @IsNotEmpty()
    @Type(() => AuthorDTO)
    @ArrayMinSize(1)
    @IsNotEmptyObject({ each: true })
    @ValidateNested({ each: true })
    readonly author: AuthorDTO[]

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly language: string

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly releaseYear: number

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly publisher: string

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly pages: number
}