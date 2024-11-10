# Compass Car API

A RESTful API projetada para o gerenciamento da locação de carros. Permite o gerenciamento de usuários, o cadastro de clientes, o controle de carros disponíveis para locação e a criação e acompanhamento de pedidos de locação.

## Começando

### Pré-requisitos

- Node.js e npm instalados.
- MySQL instalado.
- Express instalado.
- Um banco de dados MySQL configurado.

### Passos de Instalação

**Instale as Dependências** 

```bash
npm install
```

## Criação do Banco de Dados com Migrations

Este projeto utiliza o TypeORM para gerenciar o banco de dados, e as migrations são usadas para aplicar alterações na estrutura do banco. Siga os passos abaixo para criar e atualizar o banco de dados utilizando migratios.

### Pré-requisitos

- Certifique-se de que você tem o [Node.js](https://nodejs.org/) instalado.
- O [MySQL](https://www.mysql.com/) ou outro banco de dados compatível com o TypeORM deve estar instalado e em execução.
- As dependências do projeto devem estar instaladas.

### Configuração do banco de dados
Crie um arquivo `.env` na raíz do projeto e adicione as configurações do banco do seu banco de dados.
um exemplo de configuração é: 

```bash
DB_HOST=localhost
DB_PORT=3333
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
```

### Utilizando as migrations
Primeiro gere a migration utilizando o comando:
```bash
npm run migration:generate
```
Após ser gerado o arquivo de migrations, execute ele utilizando o comando:
```
npm run migration:run
```

## Executando a aplicação
Após ter clonado o repositório, instalado as dependencias, configurado o banco de dados e executado as migraitons. Inicie a API utilizando o comando:
```
npm start
```

## Estrutura da Documentação para cada Endpoint

## Endpoint de Users
### POST users
**Descrição**: Criação de um novo usuário.

**Corpo da Requisição** (Campos obrigatórios):
```json
{
  "id": "string (UUID)",
  "name": "string",
  "email": "string (email)",
  "password": "string (senha criptografada)"
}
```

### GET users
**Descrição**: Listagem de usuários com filtros e paginação.

**Parâmetros de Consulta**:

`name` (string, opcional): Filtrar por parte do nome do usuário.
`email` (string, opcional): Filtrar por parte do e-mail.
`excluded` (boolean, opcional): Filtrar por status de exclusão (sim/não).
`sort` (string, opcional): Campo de ordenação (nome, data de cadastro, data de exclusão).
`page` (integer, opcional): Página atual da lista.
`pageSize` (integer, opcional): Tamanho da pági

**Exemplo de requisição**: <br>
GET users?name=John&email=john.doe@example.com&excluded=false&sort=name&page=1&pageSize=10

**200:** Lista de usuários retornada com sucesso: 
```json
{
  "total": "integer",
  "totalPages": "integer",
  "currentPage": "integer",
  "users": [ "/lista de usuários/" ]
}
```
### GET users/:{id}
**Descrição**: Busca um usuário por ID.

**Parâmetro de Caminho**:

`id` (string, obrigatório): ID do usuário.

### PATCH users/:{id}
**Descrição**: Atualizar informações de um usuário.

**Parâmetro de Caminho**:

`id` (string, obrigatório): ID do usuário.
**Corpo da Requisição** (Campos opcionais):

```json
{
  "name": "string",
  "email": "string (email)",
  "password": "string (senha criptografada)"
}
```
### DELETE users/:{id}
**Descrição**: Soft delete de um usuário (marcar como excluído).

**Parâmetro de Caminho**:

`id` (string, obrigatório): ID do usuário.

### POST login
**Descrição**: Autenticação de usuário (login).

**Corpo da Requisição** (Campos obrigatórios):

```json
{
  "email": "string (email)",
  "password": "string (senha)"
}
```
## Endpoint de Carros

### POST /cars/create
**Descrição**: Cria um novo carro.

**Corpo da requisição** (Campos obrigatórios):
```json
{
  "plate": "string",
  "brand": "string",
  "model": "string",
  "mileage": "integer",
  "year": "integer",
  "items": ["string"],
  "daily_price": "number (float)",
  "status": "string (active ou inactive)"
}
```
### GET cars/
**Descrição**: Lista todos os carros com opções de filtragem.

**Parâmetros de Consulta** (opcionais):
`status` (string): Filtra pelo status do carro. Valores possíveis: `active`, `inactive`, `deleted`.
`plateEnd` (string): Filtra pelos últimos caracteres da placa.
`brand` (string): Filtra pela marca do carro.
`model` (string): Filtra pelo modelo do carro.
`mileage` (integer): Filtra pela quilometragem do carro.
`yearFrom` (integer): Filtra pelo ano mínimo.
`yearTo` (integer): Filtra pelo ano máximo.
`dailyPriceMin` (number): Filtra pelo preço diário mínimo.
`dailyPriceMax` (number): Filtra pelo preço diário máximo.
`items` (string): Filtra por itens (valores separados por vírgula).

**Resposta**:
```json
{
  "totalCount": "integer",
  "totalPages": "integer",
  "currentPage": "integer",
  "cars": [
    {
      "id": "string",
      "plate": "string",
      "brand": "string",
      "model": "string",
      "mileage": "integer",
      "year": "integer",
      "items": ["string"],
      "daily_price": "number (float)",
      "status": "string",
      "registration_date": "string (date-time)",
      "updated_time": "string (date-time)"
    }
  ]
}


### GET cars/:{id}
**Descrição**: Busca um carro por ID.

**Parâmetro de Caminho**:
`id` (string, obrigatório): ID do carro.
  
### PATCH cars/update/:{id}
**Descrição**: Atualiza informações de um carro.

**Parâmetro de Caminho**:
- `id` (string, obrigatório): ID do carro.

**Corpo da Requisição** (Campos opcionais):

```json
{
  "plate": "string",
  "brand": "string",
  "model": "string",
  "mileage": "integer",
  "year": "integer",
  "items": ["string"],
  "daily_price": "number (float)"
}
```

### DELETE cars/delete/:{id}
**Descrição**: Soft delete de um carro (marcar como excluído).

Parâmetro de Caminho:

`id` (string, obrigatório): ID do carro.

## Endpoint de Clientes

### POST /customers/create

**Descrição**: Cria um novo cliente.

**Corpo da Requisição** (Campos obrigatórios):

```json
{
  "fullName": "string",
  "email": "string (email)",
  "birthDate": "string (date)",
  "cpf": "string",
  "phone": "string"
}
```

### GET /customers/
**Descrição**: Listagem de clientes com filtros e paginação.

**Parâmetros de Consulta** (opcionais):

`fullName` (string): Filtrar por parte do nome do cliente.
`email` (string): Filtrar por parte do e-mail.
`cpf` (string): Filtrar por parte do CPF do cliente.
`exclude` (boolean): Filtrar por status de exclusão (sim/não).
`order` (string): Campo de ordenação (nome, data de cadastro, data de exclusão).
`page` (integer): Página atual da lista.
`pageSize` (integer): Tamanho da página.

**Resposta**:
```json
{
  "totalCount": "integer",
  "totalPages": "integer",
  "currentPage": "integer",
  "customers": [
    {
      "id": "string",
      "fullName": "string",
      "email": "string",
      "birthDate": "string",
      "cpf": "string",
      "phone": "string",
      "registrationDate": "string (date-time)",
      "status": "string"
    }
  ]
}
```

### GET customers/:{id}

**Descrição**: Busca um cliente por ID.

**Parâmetro de Caminho**:

`id` (string, obrigatório): ID do cliente.

**Resposta**:
```json
{
  "id": "string",
  "fullName": "string",
  "email": "string",
  "birthDate": "string",
  "cpf": "string",
  "phone": "string",
  "registrationDate": "string (date-time)",
  "status": "string"
}
```

### PATCH customers/{id}

**Descrição**: Atualizar informações de um cliente.

**Parâmetro de Caminho**:

`id` (string, obrigatório): ID do cliente.
**Corpo da Requisição** (Campos opcionais):
```json
{
  "fullName": "string",
  "email": "string (email)",
  "birthDate": "string",
  "cpf": "string",
  "phone": "string"
}
```
### DELETE customers/{id}
**Descrição**: Soft delete de um cliente (marcar como excluído).

**Parâmetro de Caminho**:

`id` (string, obrigatório): ID do cliente.

## Endpoint de Pedidos
### POST /orders/create
 
**Descrição**: Criação de um novo pedido de locação.
 
**Corpo da Requisição** (Campos obrigatórios):

```json
{
  "cpf_cliente": "string (CPF do cliente)",
  "plate": "string (Placa do carro)"
} 
```
 
### GET /orders
**Descrição**: Lista todos os pedidos de locação.
 
Resposta:
 
```json
[
  {
    "id": "string (UUID)",
    "cpf_cliente": "string (CPF do cliente)",
    "plate": "string (Placa do carro)",
    "statusRequest": "string (Status do pedido)",
    "dateRequest": "string (data-hora da solicitação)",
    "startDate": "string (data de início do aluguel)",
    "endDate": "string (data de término do aluguel)"
  }
]
```
### GET /orders/{id}
**Descrição**: Busca um pedido de locação por ID.
 
**Parâmetro de Caminho**:
 
 `id` (string, obrigatório): ID do pedido de locação.
 
Resposta:
 
```json
{
  "id": "string (UUID)",
  "cpf_cliente": "string (CPF do cliente)",
  "plate": "string (Placa do carro)",
  "statusRequest": "string (Status do pedido)",
  "dateRequest": "string (data-hora da solicitação)",
  "startDate": "string (data de início do aluguel)",
  "endDate": "string (data de término do aluguel)"
}
```
 
### PATCH /orders/update/{id}
**Descrição**: Atualização de um pedido de locação.
 
**Parâmetro de Caminho**:
 
´id´ (string, obrigatório): ID do pedido de locação.
 
**Corpo da Requisição** (Campos obrigatórios):
 
```json
{
  "statusRequest": "string (Novo status do pedido)"
}
```
 
### DELETE /orders/delete/{id}
**Descrição**: Cancela um pedido de locação.
 
**Parâmetro de Caminho**:
`id` (string, obrigatório): ID do pedido de locação.


## Autenticação
 
A API usa autenticação JWT (JSON Web Token). Para acessar endpoints protegidos, é necessário incluir o token no cabeçalho `Authorization` como `Bearer <token>`.
 
### Exemplo de Requisição Autenticada
 
```http

GET /users

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

```
**Middleware de Autenticação**:
Um middleware valida o token e adiciona o usuário à request (req.user), contendo o e-mail do usuário autenticado.


# SCRUM
**Documentação das Dailies**: <br>

**Notion**: https://fluttering-starflower-2cd.notion.site/AWS_NODE_AGO24_DESAFIO_02_CORINGA-1189cc978ad280b58f9ec2763907bf52

**Organização de tasks**: Para vizualizar os dados do Trello, solicite acesso através do link:<br>

**Trello**: https://trello.com/b/09SpYG44/squad-coringa

# Migração com a AWS

## Começando

### Pré-requisitos

- GitHub Actions
- MYSQL.
- PM2 
- NGINX
- AWS EC2
- AWS VPC

### Passos de Instalação

**Configuração de VPC**

- Crie uma VPC
- Configure 2 Subredes
  - 1 Subnet para o range de ips publico
  - 1 Subnet para o range de ips privado
- Configure 2 Rotas
  - 1 Rota para a rede publica
  - 1 Rota para a rede Privada
- Configure Gateway para Internet
  - O gateway para internet estará associado com a rota publica, pois assim a maquina terá acesso a internet
- Configure NAT Gateway(Tradutor de IP Privado para seu IP Publico)
  - Aqui que entraremos no quesito chave da situação ja como temos 2 redes 1 delas sendo privada, e outra publica, vamos necessitar do NAT para que a as maquinas na subnet privada tenham acesso a rede.


**Crie a instancia da EC2**
  
  - Crie 2 EC2 Instance
  - Uma das EC2 instance tera o ip elastico publico, ela que será a maquina que vai prover o serviço da API estara associada a subnet publica.
  - A outra instanca tera o ip privado, essa maquina sera responsavel pelo BD "banco de dados", associe ela a subnet privada
  - No par de chaves, crie seu novo par de chaves de preferencia crie uma pem key, a chave ppk é usada para acesso via PuTTy, mas utilizaremos o acesso remoto ssh,
  - Na configuração de rede click em editar e nos selecionaremos nossa VPC e a subrede alinhada a cada EC2, la selecionaremos a vpc que nos criamos e tambem iremos determina quais  maquinas irão receber ip publico ou não,
  - Como determinado na nossa estrutura de rede, a primeira EC2 Recebera ip publico, a segunda não
  - Por questão de segurança na regras de grupo para o ssh coloque a origem para somente o ip publico da sua maquina, assim
  somente quem estiver na sua maquina conseguira acessar.
  - Tambem adicione uma regra para TIPO HTTP, com origem para QUALQUER LUGAR, na porta 80, essa regra que permitira o acesso de outras pessoas a nossa API
  - Apos essas configurações 
  - Voce ja pode executar as instancias
  - Apos o termino da criação da instancia entre na EC2 publica via ssh, para facilitar o acesso, esteja no mesmo diretorio da sua pemkey que voce instalou, ;
  - Acesse algum terminal de controle pode ser via vscode ou o proprio cmd, voce ira precisar da chave que voce criou na aws para seguir os proximos passos lembre de deixar ela no direito em que esta dando o ssh

  ```bash
    ssh -i "{oseuarquivodechaveprivada.pem}" {usuario}@{seuippublco}"
  ```

  - EC2 Privada
  - Aqui faremos quase os mesmo passo a passo da Instancia publica, na parte de configuração de rede iremos escolher a mesma vpc
  - Mas na sub-rede sera definida a privada
  - Na politica de grupo, voce abilitara o ssh com tipo personalizado e colocaram a o endereço da sua rede global, o que foi definido na sua VPC
  - e tambem habilitaremos a porta 3306{MySQL} para a nossa rede principal
  - Voce pode criar outra chave ou usar a mesma mas aqui sera diferente para acessar a rede privada teremos que pegar o conteudo que esta dentro da nossa chave de acesso, e copiar dentro de um arquivo da nossa Instancia Publica, voce pode colocar qualquer nome a esse arquivo faremos isso com o seguinte comando
  ```bash
    touch {nomedoarquivo}
  ```
  - Utilize o comando nano para acessar o arquivo:
  ```bash
    sudo nano {nomedoarquivo}
  ```
  - Apos isso copie o conteudo da chave
  - Finalizado esse processo utilizaremos o mesmo comando anteriormente mas agora com o ip privado da instancia que esta na subrede privada
  ```bash
    ssh -i "{oseuarquivodechaveprivada.pem}" {usuario}@{seuipprivado}"
  ```
### Downloads na EC2 Publica ###
  - Instalaremos o node.js
  - E o MySQL

### Node JS ###
  - Para instalar o nodejs usaremos o seguinte comando
  ```bash
    apt install nodejs
  ```
## MySQL
  - Para instalar o MySQL siga o passo passo
  ```bash
    apt install MySQL
  ```
  - Depois precisaremos baixar o apt-config do mysql
  ```bash
     wget https://dev.mysql.com/get/mysql-apt-config_0.8.22-1_all.deb
  ```
  - Apos isso usaremos o dpkg para desempacotar o arquivo
  ```bash
    sudo dpkg -i mysql-apt-config*
  ```
  - Apos a instalação do Mysql server precisamos acessar o banco para criar nosso banco de dados
    
  ```bash
    mysql -u root -p
  ```
  - Na EC2 Privada instalaremos o MYSQL Server

    ```bash
      CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
    ```
    ```bash
      GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';
    ```
    ```bash
      FLUSH PRIVILEGES;
    ```
    ```bash
      CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
    ```
    ```bash
      GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';
    ```
    ```bash
      FLUSH PRIVILEGES;
    ```
     - Lembre-se esses dados que forem colocados aqui devem se de acordo com os valores da variaveis da sua infraestrutura se estiver usando o banco na mesma maquina do que a api voce pode deixar localhost se não tem que ser mudado para o ip da maquina da EC2 publica, no caso aonde esta hospedado sua api
## GitHub Actions

  - Essa ferramenta será muito importante para que possamos dar o deploy automatico

  - Primeiramente configuraremos a Actions Runner
    - Abra seu repositorio da sua API
      - Em settings
        - Actions
          - Runners
            - Click em New self-hosted runner
    - Ele informara um passo a passo a ser seguido, nos usaremos o linux, siga  o passo a passo na sua instancia do EC2 publica
  
  - Depois precisaremos configurar o arquivo do node.js.yml
  ```bash
    name: Node.js CI/CD

    on:
      push:
        branches: [ "main" ]


    jobs:
      build:

        runs-on: self-hosted

        strategy:
          matrix:
            node-version: [22.x]
            # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

        steps:
        - uses: actions/checkout@v4
        - name: Use Node.js ${{ matrix.node-version }}
          uses: actions/setup-node@v4
          with:
            node-version: ${{ matrix.node-version }}
            cache: 'npm'
      - run: npm ci
      - run: npm install
      - run: npm install -g typescript
    
      - run: |
            echo "DB_PORT=${{ secrets.DB_PORT }}" >> .env
            echo "DB_HOST=${{ secrets.DB_HOST }}" >> .env
            echo "DB_USER=${{ secrets.DB_USERNAME }}" >> .env
            echo "DB_PASSWORD=${{ secrets.DB_PASSWORD }}" >> .env
            echo "DB_NAME=${{ secrets.DB_NAME }}" >> .env
            echo "PORT=${{ secrets.PORT}}" >> .env
      - run: npm run migration:run
      - run: tsc
      - run: pm2 restart my-api
  ```
  -- Esses echo são para o nosso arquivo .env que sra criado automaticamente
  -- Para ele funcionar precisamos criar nossas variaveis de sistemas
  -- Podemos acessa-las em
    - Settings
      - Secrets and Variables
        - Actions
          - New repository secrets
            - Name: "Aqui sera passado o nome da secrets"
            - secret: "Aqui sera o resultado da variavel, exemplo: {A porta da sua API}"
  -- Feita a configuração podemos fechar essa etapa do action. cada mudança no seu repositorio ou commit passado para ele,
  ele executará uma nova action que irá ser redirecionada para sua EC2 publica

  
  
  
  #### Extra ####
   Para não ter que usar a porta da nossa api na url de acesso criaremos uma proxy que ao passar pelo {ip}/{rota} ele retornara o caminho da  prota que esta definada na nossa api 
    - Para isso instalaremos o nginx na nossa Instancia Publica
    - Instale o nginx
    ```bash
      sudo apt install nginx
    ```
    - Navegue ate o direito do nginx e acesse o arquivo default
    ```bash
      cd /etc/nginx/sites-available && sudo nano default
    ```
    - Apos isso voce pode pagar as configurações dentro do arquivo e copiar a seguinte configuração
    ```bash
    # Root directory for your website files
    root /var/www/html;

   
    index index.html index.htm index.nginx-debian.html;
    server {
    # Default server name (you can add a specific domain here if needed)
    server_name _;

    # Main location block for serving files


    # API proxy block
    location / {
        # Rewrite requests starting with /api/... to /api/
        rewrite ^/api/(.*)$ /api/$1 break;


        proxy_pass http://localhost:{portadasuaapi};

        # Pass necessary headers to the backend server
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
      }
    } 
    ```
  -- Não esqueça de mudar para sua porta da api

  ## Links

  - Segue link para o site do swagger:
  **Site Swagger**: https://uolbucketprojectaws.s3.us-east-2.amazonaws.com/index1.html
  - Link para o ReadME
  **Site ReadME**: https://uolbucketprojectaws.s3.us-east-2.amazonaws.com/index.html
  - Acesso a API Publica criada
  **Site API Publica**: http://3.22.77.30/




   



