class ReadedBooksHandler {
    constructor({ httpUtilsHandler, securityHandler, bookRepository, readedBookRepository, authorRepository }) {
        this.httpUtilsHandler = httpUtilsHandler
        this.securityHandler  = securityHandler
        this.bookRepository   = bookRepository
        this.readedBookRepository = readedBookRepository
        this.authorRepository = authorRepository
        this.create = this.create.bind(this)
    }
    async create(request, response) {
        const uid = request.uid
        const { title, id, pageCount, author } = request.body
        // TODO sanitize inputs
        try {
            const authorResponse =  await this.authorRepository.searchAuthor([author])
            let authorId = authorResponse[0][0] ? authorResponse[0][0].id_author: ''
            if (authorResponse[0].length === 0) {
                const createdModel = await this.authorRepository.createAuthor([author])
                authorId = createdModel[0].insertId
            }

            const bookResponse = await this.bookRepository.searchBook([id])
            let bookId = bookResponse[0][0] ? bookResponse[0][0].id_book: ''
            if (bookResponse[0].length === 0) {
                const createdModel = await this.bookRepository.createBook([title, pageCount, id, authorId])
                bookId = createdModel[0].insertId
            }

            const readedBookResponse = await this.readedBookRepository.searchReadedBook([uid, bookId])
            if (readedBookResponse[0].length !== 0) {
                return this.httpUtilsHandler.sendBasicJsonResponse(response, 409, 'Ya tienes registrado ese libro como leido')
            }

            const createdModel = await this.readedBookRepository.createReadedBook([uid, bookId])

            response.status(200).send({
                model: bookId
            })
        } catch (error) {
            console.log(error)
            return this.httpUtilsHandler.sendBasicJsonResponse(response, 400, 'Error en el sistema por favor vuelve a intentar mas tarde')
        }
    }
}

module.exports = ReadedBooksHandler
