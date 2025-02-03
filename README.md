# project-node-jwt-ts

# NODE JS: API REST (CRUD) with PostgreSQL and JWT

## 🚀 Usage

1. Clone the repository:
   ```sh
   git clone https://github.com/sergiecode/proyecto-curso-node-yt
   ```
2. Open the project in your code editor.
3. Install the required packages and modules:
   ```sh
   npm install
   ```
4. Add the environment variables using `.env.template` as a template.
5. Ensure **Docker Desktop** is running and execute:
   ```sh
   docker compose up -d
   ```
6. Start the server:
   ```sh
   npm run dev
   ```

## 📌 Requirements

- **NODE:** Node.js must be installed on the operating system.
- **DOCKER:** Required to run the PostgreSQL image in a container.
- **GIT:** Git must be installed.

## ⚙️ Steps to set up a similar project

```sh
npm init -y
npm install express jsonwebtoken bcrypt @prisma/client dotenv typescript
npm install --save-dev ts-node-dev @types/express @types/jsonwebtoken @types/bcrypt @types/node rimraf prisma
npx tsc --init --outDir dist/ --rootDir src
```

1. Add excluded and included folders in `tsconfig.json`:
   ```json
   "exclude": ["node_modules", "dist"],
   "include": ["src"]
   ```
2. Initialize Prisma:
   ```sh
   npx prisma init
   npx prisma generate
   ```
3. Add models in `schema.prisma`.
4. Run migrations:
   ```sh
   npx prisma migrate dev
   ```
5. Start Docker:
   ```sh
   docker-compose up -d
   ```
6. Add the following scripts to `package.json`:
   ```json
   "scripts": {
     "dev": "tsnd --respawn --clear src/app.ts",
     "build": "rimraf ./dist && tsc",
     "start": "npm run build && node dist/app.js"
   }
   ```

## 🌐 Available Methods (Endpoints)

### 🔹 **POST**
- `http://localhost:3000/auth/register`
- `http://localhost:3000/users`
- `http://localhost:3000/auth/login`

### 🔹 **GET ALL**
- `http://localhost:3000/users`

### 🔹 **GET, PUT, DELETE by ID**
- `http://localhost:3000/users/:id`

