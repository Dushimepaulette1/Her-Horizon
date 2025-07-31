```md
# HerHorizon Backend

The **HerHorizon Backend** is a RESTful API built with **Node.js**, **Express**, and **MongoDB**. It powers the admin features of the HerHorizon platform, enabling secure login, opportunity management (create, edit, delete), and data retrieval for the frontend interface.

> ✅ Deployed on Render: [API Docs](https://her-horizon.onrender.com/api-docs/)

---

## 📁 Project Structure
```

backend/
├── controllers/ # Business logic for admin and opportunity actions
├── middleware/ # Authentication middleware
├── models/ # Mongoose schemas
├── routes/ # API endpoints
├── uploads/ # Directory for storing uploaded images
├── app.js # Express app setup
├── server.js # Entry point of the server
├── swagger.js # Swagger documentation setup
├── .gitignore
├── package.json
├── README.md

````

---

## ⚙️ Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Token) for authentication
- Swagger for API Documentation

---

## 🔐 API Features

- **Admin Authentication**
  - Admin login using JWT
- **Opportunity Management**
  - Create new opportunities (with image upload)
  - Edit existing opportunities
  - Delete opportunities
  - Retrieve all opportunities

---

## 🚀 Getting Started (Local Setup)

Follow these steps to get the backend running on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Dushimepaulette1/herhorizon.git
cd herhorizon/backend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file inside the `backend/` directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/herhorizon
PORT=5000
JWT_SECRET=your_jwt_secret
```

If you’re using **MongoDB Atlas**, replace `MONGODB_URI` with your cluster URL.

---

### 4. Run the Server

```bash
npm start
```

The server will start at [http://localhost:5000](http://localhost:5000)

---

### 5. API Documentation (Swagger)

After starting the server, access the full documentation at:

📄 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**
or the deployed version:
📄 **[https://her-horizon.onrender.com/api-docs](https://her-horizon.onrender.com/api-docs)**

---

## 🔒 Admin Login Credentials (for testing)

> These credentials are already seeded or can be added manually in the database.

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

---

## 📦 Deployment (Render)

To deploy on Render:

1. Push this backend to a public GitHub repository.
2. Log into [https://render.com](https://render.com)
3. Create a new Web Service.
4. Connect your GitHub repo and point to the `server.js` file.
5. Set the environment variables in the **Render Dashboard**:

   - `MONGODB_URI`
   - `PORT`
   - `JWT_SECRET`

6. Deploy and test using the `/api-docs` URL.

---

## 🔧 API Routes Overview

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| POST   | /admin/login        | Admin login           |
| POST   | /opportunities      | Create opportunity    |
| GET    | /opportunities      | Get all opportunities |
| PUT    | /opportunities/\:id | Update opportunity    |
| DELETE | /opportunities/\:id | Delete opportunity    |

> All POST/PUT/DELETE requests require **Bearer Token Authentication**

---

## ✅ Testing the API

You can test the endpoints using tools like:

- [Postman](https://www.postman.com/)
- [Thunder Client (VS Code)](https://www.thunderclient.com/)
- Swagger UI (`/api-docs`)

---

## 🤝 Contributing

Have an idea or want to help improve the backend?

1. Fork this repo
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📧 Contact

- GitHub: [@Dushimepaulette1](https://github.com/Dushimepaulette1)
- Email: [p.dushime12@gmail.com](mailto:p.dushime12@gmail.com)

---

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ by Paulette Dushime

```

```
