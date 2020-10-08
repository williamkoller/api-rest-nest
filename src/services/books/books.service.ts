import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common'
import { BookDTO } from 'src/dto/books.dto'
import { Book } from 'src/database/interfaces/book.interface'
import { BookRepository } from 'src/database/repository/book.repository'

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

    async getBookByAuthorName(authorName: string): Promise<Book[]> {
        const splitedAuthorName = authorName.split(' ')

        const foundBooks = await this.bookRepository.getBookByAuthorName(splitedAuthorName)

        if (!foundBooks.length) throw new BadRequestException('No results for this author')

        return foundBooks
    }

    async getBookByName(bookName: string): Promise<Book[]> {

        const foundBooks = await this.bookRepository.getBookByName(bookName)

        if (!foundBooks.length) throw new BadRequestException('No results for this name')

        return foundBooks
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
