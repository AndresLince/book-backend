searchReadedBook = jest.fn( params => {
    const id_book = params[1]
    if (id_book == '1') {
        return [[]]
    }
    return [[{ id: '1' }]]
})

createReadedBook = jest.fn( params => {

})

const readedBookRepository = {
    searchReadedBook,
    createReadedBook
}

module.exports = {
    readedBookRepository
};
