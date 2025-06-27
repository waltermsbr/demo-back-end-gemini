# tecnologia

- Node v.24.1.0

# front-end:

- Instalar:
  - npm install
- Executar:
  - npm run dev
- Arquitetura:
  - Parcel
- URL:
  - http://localhost:8000

# back-end

- Instalar:
  - npm install
- Executar:
  - npm run dev
- Arquitetura:
  - NodeJS
- URL:
  - http://localhost:3000
- Postman:
  - demo-back-end-gemini.postman_collection.json

# database

- MongoDB - https://account.mongodb.com/account/login
  - DATABASE = db_posts
  - COLLECTION = posts

# gemini api_key

- Url:
  - https://aistudio.google.com/app/apikey

# env

- back-end:

  - Conteúdo:
    STRING_CONEXAO = "mongodb+srv://<conta>:<senha_usuario>@cluster0.wnuw8m8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    STRING_DATABASE = "db_posts"
    STRING_COLLECTION = "posts"
    GEMINI_API_KEY = "<api_key>"

- front-end
  - Conteúdo:
    API_URL = "http://localhost:3000/posts"

# docker

- back-end:

  - Executar comando:
    - Google Cloud: docker-compose up --build -d
    - Local: docker-compose -f docker-compose-local.yml up -d

- front-end

  - Executar comando:
    - Google Cloud: docker-compose up --build -d
    - Local: docker-compose -f docker-compose-local.yml up -d

# google cloud

- back-end:

  - https://demo-back-end-gemini-328239708562.europe-west1.run.app

- front-end:

  - https://demo-front-end-gemini-328239708562.europe-west1.run.app
