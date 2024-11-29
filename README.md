# Burger Restaurant Application API
### About the Project

This project is an API for a [restaurant application](https://github.com/anka-ka/Burger-application) that allows customers to browse the menu in multiple languages, place orders, and view their notifications and account points (loyalty program)

---

### Features
- User Account: Users can view their profile information, including points
- Multi-language Menu: Menus are available in multiple languages, allowing customers to view items in their preferred language
- Order Management: Customers can place orders
- Notifications: Special Program Notifications

---

### Tech Stack
- Backend: Node.js, Express.js, Prisma
- Database: PostgreSQL
- Docs: Swagger
- Authentication: JWT (JSON Web Token)

---
## Installation
### Prerequisites
- Node.js
- PostgreSQL

## Steps
Clone the repository:
```bash
git clone https://github.com/z1kman/burgerRestaurantBackend.git
cd burgerRestaurantBackend
```
Install dependencies:

```
npm install
```

Set up environment variables:

Create a .env file in the root directory and configure the following:

```
SECRET_AUTH_TOKEN=random_secret_token_for_jwt
DATABASE_URL="postgresql://db_user:db_password@db_url:db_port/db_name?schema=db_schema"
```

Run the application:
```
npm start
```

Open the link: http://localhost:4000/api/docs/
