const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password :'Navgurukul@123',
      database :'e_commerce'
    }
  });

module.exports=knex