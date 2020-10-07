import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common'
import { BookDTO } from 'src/DTO/boos.dto'
import { Book } from 'src/Mongo/Interfaces/book.interface'
import { BookRepository } from 'src/Mongo/Repository/book.repository'

@Injectable()
export class BooksService {

    constructor(
        private readonly bookRepository: BookRepository
    ) { }

    async getAllBooks(): Promise<Book[]> {
        const allBooks = await this.bookRepository.getAllBooks()
        if (!allBooks.length) throw new BadRequestException('There are no books registered yat.')
        return allBooks
    }

    async getBookById(bookId: string): Promise<Book> {
        try {
            const existBook = await this.bookRepository.getBookById(bookId)
            if (!existBook) throw new BadRequestException('There are no results with this id')
            return existBook
        } catch (e) {
            throw new BadRequestException('There are no results')
        }
    }

    async updateBookById(bookId: string, newBook: BookDTO): Promise<Book> {
        const existBook = await this.bookRepository.getBookById(bookId)
        if (!existBook) throw new BadRequestException('There are no results with this id')

        const updatedBook = await this.bookRepository.updateBookById(bookId, newBook)
        if (updatedBook) 
            return this.bookRepository.getBookById(bookId)
        else 
            throw new BadRequestException('Error in updated book')    
    }

    async saveBook(newBook: BookDTO): Promise<Book> {
        return await this.bookRepository.saveBook(newBook)
    }

    async deleteBookById(bookId: string): Promise<Book> {
        try {
            return await this.bookRepository.deleteBookById(bookId)
        } catch (e) {
            throw new BadRequestException('There book does not exists')
        }
    }
}
