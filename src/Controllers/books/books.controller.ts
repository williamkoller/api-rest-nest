import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Book } from 'src/Mongo/Interfaces/book.interface'
import { BooksService } from 'src/Services/books/books.service'
import { BookDTO } from './../../DTO/boos.dto'

@Controller('books')
export class BooksController {

    constructor(
        private readonly bookService: BooksService
    ) { }

    @Get()
    async getAllBooks(): Promise<Book[]> {
        return this.bookService.getAllBooks()
    }

    @Get(':bookId')
    async getBookById(@Param('bookId') bookId: string): Promise<Book> {
        return await this.bookService.getBookById(bookId)
    }

    @Post()
    async saveBook(@Body() newBook: BookDTO): Promise<Book> {
        return await this.bookService.saveBook(newBook)
    }

    @Patch(':bookId')
    updateBook(@Param('bookId') bookId: string, @Body() newBook: BookDTO): Promise<Book> {
        return this.bookService.updateBookById(bookId, newBook)
    }

    @Delete(':bookId')
    async deleteBookById(@Param('bookId') bookId: string): Promise<Book> {
        return await this.bookService.deleteBookById(bookId)
    }
}
