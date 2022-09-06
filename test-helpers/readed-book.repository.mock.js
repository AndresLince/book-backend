searchReadedBook = jest.fn( params => {
    const id_book = params[1]
    if (id_book == '1') {
        return [[]]
    }
    return [[{ id: '1' }]]
})

createReadedBook = jest.fn( params => {

})

searchReadedBooks = jest.fn( params => {
    console.log(params[1])
    if (params[1] == 'error') {
        throw 'error';
    }
    if (params[1] == 'empty') {
        return [[

        ]]
    }
    return [[
        { id_readed_book: 1 }
    ]]
})

countSearchReadedBooks = jest.fn( params => {
    if (params[1] == 'empty') {
        return [[
            {}
        ]]
    }
    return [
        { totalItems: 10 }
    ]
})


const readedBookRepository = {
    searchReadedBook,
    createReadedBook,
    searchReadedBooks,
    countSearchReadedBooks
}

module.exports = {
    readedBookRepository
};
