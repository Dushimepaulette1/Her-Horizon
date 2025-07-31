
---

# HerHorizon 🌸

**HerHorizon** is a full-stack web platform designed to empower young women by sharing curated opportunities in education, skills development, mentorship, and career growth. It features a clean user interface and an admin dashboard for content management.

---

## 🔗 Deployed Links

* **Frontend:** [https://her-horizon-full.netlify.app/](https://her-horizon-full.netlify.app/)
* **Backend (Swagger Docs):** [https://her-horizon.onrender.com/api-docs/](https://her-horizon.onrender.com/api-docs/)

---

## 📁 Project Structure

```
herhorizon/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── app.js
│   ├── server.js
│   ├── swagger.js
│   └── ...
├── frontend/
│   ├── index.html
│   ├── admin-login.html
│   ├── admin-dashboard.html
│   ├── styles.css
│   ├── script.js
│   └── ...
```

---

## 🛠️ Technologies Used

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Backend:** Node.js, Express.js, MongoDB, Swagger
* **Deployment:** Netlify (Frontend), Render (Backend)

---

## 🚀 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Dushimepaulette1/herhorizon.git
cd herhorizon
```

---

### 2. Set Up the Backend

```bash
cd backend
```

#### a. Install dependencies

```bash
npm install
```

#### b. Create a `.env` file

Create a `.env` file in the `backend` directory and add:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

> If using MongoDB locally:
> `MONGODB_URI=mongodb://localhost:27017/herhorizon`

#### c. Run the server

```bash
node server.js
```

Backend should run on [http://localhost:5000](http://localhost:5000)

Swagger Docs available at [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

### 3. Set Up the Frontend

#### Option 1: Open locally

Simply open `frontend/index.html` in a browser.

#### Option 2: Use Live Server

Use VS Code’s Live Server Extension to serve the project and enable smoother routing.

> Ensure all `fetch()` API calls point to your backend URL:
> `http://localhost:5000` for local
> or
> `https://her-horizon.onrender.com` for production

---

## 🧪 Admin Test Credentials (for Demo Purposes)

> *(Replace with actual if available or keep empty if not needed)*
> Username: `admin@example.com`
> Password: `admin123`
---
## ✨ Features

* 📂 View opportunities by category: Education, Skills, Mentorship, and Career
* 🔐 Admin login for content management (CRUD)
* 📱 Responsive and clean design
* 📊 Organized codebase for easy maintenance
* 🧭 Swagger API documentation

---

## 🧰 How to Contribute

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your work: `git commit -m "Add feature"`
5. Push the branch: `git push origin feature-name`
6. Open a Pull Request

---

## 🧩 Future Improvements

* User authentication (Sign Up / Login)
* Bookmark & Save opportunities
* Email alerts for new opportunities
* Admin analytics dashboard

---

## 📬 Contact

* **GitHub:** [@Dushimepaulette1](https://github.com/Dushimepaulette1)
* **Email:** [p.dushime12@gmail.com](mailto:p.dushime12@gmail.com)

---

### 💖 Made with love by Paulette Dushime

---


