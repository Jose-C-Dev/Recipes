const db = require('../../db')

module.exports = {
  // Servico que guarda os dados de um novo user na BD
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