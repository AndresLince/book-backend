getUserByEmail = jest.fn( email => {
    if (email[0] === 'wrong_email@hotmail.com') {
        return [[]]
    }
    return [[{name: 'username', password: '$2a$10$cY3QThX9jhUO4kFbvSfnWuWLHnWRkD8uzORVhkQjB7FbKtQujnac2'}]]
})
createUser = jest.fn( params => {
    return [
        { insertId: 1 }
    ]
})
const userRepositoryMysql = {
    getUserByEmail,
    createUser
}

module.exports = {
    userRepositoryMysql
};
