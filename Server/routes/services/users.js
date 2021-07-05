const db = require('../../db')

module.exports = {

  

  /* createUser(name, email, password){
    db.query('INSERT INTO users SET ?', [value], (error, results, _) => {
      if (error) {
        throw error
      }
    })
  }, */

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