searchAuthor = jest.fn( params => {
    const author = params[0]
    if (author === 'author1') {
        return [[]]
    }
    return [[{ id_author: '1' }]]
})

createAuthor = jest.fn( params => {
    return [{ insertId: '1' }]
})
const authorRepository = {
    searchAuthor,
    createAuthor
}

module.exports = {
    authorRepository
};
