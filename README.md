# GoBarber

# O que é?

GoBarber é uma API que permite realizar a manutenção de:

- [x]  Usuários
- [x]  Prestadores de serviço
- [x]  Clientes
- [x]  Sessão de usuário
- [x]  Gerenciamento de serviços

*(O cheque informa se a funcionalidade foi ou não implementada).*

# Funcionalidades

Cadastrar profissionais, clientes e agendamentos no Postgres. Para todos esses cadastros, foram implementadas funcionalidades de validação de dados, validações de horários, validações de datas, sendo todos esses, somente permitidos se o usuário logado possui autorização para isso através de um bearer token.

# Funcionalidades Extras

Para cada cancelamento de serviço agendado, o sistema envia um e-mail no formato HTML para informar o cancelamento do serviço. Este envio de email, é processado e enviado através de uma fila cadastrada no Redis na qual é executada em segundo plano. Foi também implementado uma funcionalidade na qual permite a coleta de erros na aplicação através do Sentry. Outras duas funcionalidades que merecem serem mencionadas  :) são o upload de imagens e o envio de notificações utilizando o MongoDB.

# Tecnologias/Libs

- Express
- BcriptyJS
- Sentry
- Bee-Queue
- Date-FNS
- DotEnv
- JsonWebToken
- Mongoose
- Multer
- NodeMailer
- Sequelize
- Youch
- Yup

### Obs:

A aplicação está sendo desenvolvida com base nas aulas do BootCamp GoStack da RocketSeat, logo a mesma ainda será muito melhorada.
