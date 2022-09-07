searchBook = jest.fn( params => {
    const id = params[0]
    if (id == '1') {
        return [[]]
    }
    return [[{ id_book: '2' }]]
})

createBook = jest.fn( params => {
    return [{ insertId: '1' }]
})

const bookRepository = {
    searchBook,
    createBook
}

module.exports = {
    bookRepository
};
