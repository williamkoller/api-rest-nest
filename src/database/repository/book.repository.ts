import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BookDTO } from 'src/dto/books.dto'
import { Book } from '../interfaces/book.interface'

@Injectable()
export class BookRepository {
    constructor(
        @InjectModel('books') private readonly bookModel: Model<Book>
    ) { }

    async getAllBooks(): Promise<Book[]> {
        return await this.bookModel.find({}, { __v: false }).sort({ name: +1 }).exec()
    }

    async getBookById(bookId: string): Promise<Book> {
        return await this.bookModel.findById(bookId, { __v: false })
    }

    async getBookByAuthorName(authorName: string[]): Promise<Book[]> {
        return await this.bookModel.find({
            $or: [
                { 'author.name': { $in: authorName } },
                {
                    'author.surname': { $in: authorName }
                }

            ]
        })
    }

    async getBookByName(bookName: string): Promise<Book[]> {
        return await this.bookModel.find({
            name: { '$regex': bookName, '$options': 'i' }
        },
            {
                __v: false
            })
    }

    async updateBookById(bookId: string, newBook: BookDTO): Promise<Book> {
        return await this.bookModel.replaceOne({ __id: bookId }, newBook)
    }

    async saveBook(newBook: BookDTO): Promise<Book> {
        const createdBook = new this.bookModel(newBook)
        return createdBook.save()
    }

    async deleteBookById(bookId: string): Promise<Book> {
        return await this.bookModel.findByIdAndDelete({ _id: bookId })
    }
}