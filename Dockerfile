# Используем базовый образ с Node.js
FROM node:20.12.0

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем все зависимости, включая devDependencies
RUN npm install

# Копируем исходный код в контейнер
COPY . .

# Выполняем сборку TypeScript
RUN npm run build

# Указываем порт, на котором будет работать приложение
EXPOSE 4000

# Команда для запуска приложения
CMD ["node", "dist/server.js"]