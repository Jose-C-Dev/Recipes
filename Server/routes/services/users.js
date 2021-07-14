const db = require('../../db')

module.exports = {
  
  async createUser(value){
    const userCreated = await db().promise().query('INSERT INTO users SET ?', [value], (error, results, _) => {
      if (error) {
        throw error
      }
    })
    console.log(userCreated)
    return userCreated[0]
  }
}