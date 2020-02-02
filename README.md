O GoBarber é uma aplicação que será desenvolvido utilizando a Stack do javaScript. Sendo, back-end em nodeJS, web em React e o mobile em React Native.

Esta aplicação está sendo desenvolvida no Bootcamp GoStack da RocketSeat.

Até o momento foi desenvolvida a inclusão e atualização de usuários juntamente com gerenciamento de logins utilizando middleware com Bearer token.

Techs e libs envolvidas: NodeJS, Sequelize, PostgreSQL, Docker, ORM, Json Web Token dentre outras.</br></br>
<strong>Rotas</strong>

Post => base_url/users
    * Inclusão de usuários:
    {
      "name": "maria",
      "email": "maria@gmail.com.br",
      "password": "<senha>",
      "provider": true
    }
    
Post => base_url/sessions
    * Abrir sessão e criar token para usuário 
    {
      "email": "zidy.elfir@gmail.com.br",
      "password": "<senha>"
    }
  
Put => base_url/users
    * Edição de usuário.
    {
      "name": "Epifanio",
      "email": "epifanio@email.com",
      "oldPassword": "<senha>",
      "password": "<senha>",
      "confirmPassword":"<senha>"
    }
