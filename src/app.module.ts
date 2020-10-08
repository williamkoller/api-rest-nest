import { Module } from '@nestjs/common'
import { BooksController } from './controllers/books/books.controller'
import { MongooseModule } from '@nestjs/mongoose'
import env from './config/env'
import { BooksService } from './services/books/books.service'
import { BookRepository } from './database/repository/book.repository'
import { BookSchema } from './database/schemas/book.schema'

@Module({
  imports: [
    MongooseModule.forRoot(`${env.mongoUri}`),
    MongooseModule.forFeature([
      { name: 'books', schema: BookSchema }
    ])
  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class AppModule { }
