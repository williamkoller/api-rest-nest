import { Test, TestingModule } from '@nestjs/testing'
import { BookRepository } from 'src/database/repository/book.repository'
import { BooksService } from './books.service'

describe('BooksService', () => {
  let service: BooksService
  let repository: BookRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, BookRepository],
    }).compile()

    service = module.get<BooksService>(BooksService)
    repository = module.get<BookRepository>(BookRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(repository).toBeDefined()
  })
})
