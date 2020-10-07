import { Module } from '@nestjs/common'
import { BooksController } from './Controllers/books/books.controller'
import { MongooseModule } from '@nestjs/mongoose'
import Configuration from './Config/Configuration'
import { BooksService } from './Services/books/books.service'
import { BookRepository } from './Mongo/Repository/book.repository'
import { BookSchema } from './Mongo/Schemas/book.schema'

@Module({
  imports: [
    MongooseModule.forRoot(`${Configuration.mongoUri}`),
    MongooseModule.forFeature([
      { name: 'books', schema: BookSchema }
    ])
  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class AppModule { }
