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
    return userCreated[0]
  },

  getUser(id){
    db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id], (error, results, _) => {
      if (error) {
        throw error
      }
      const gettedUser = results[0]
    })
    return gettedUser
  }
}