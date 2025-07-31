# HerHorizon

**HerHorizon** is a web platform designed to empower young women by sharing curated opportunities in education, skills development, mentorship, and career growth. Built with a clean and responsive design, it allows users to explore available opportunities and provides an easy-to-use admin dashboard for managing content.

## Features

- View Opportunities categorized by Education, Skills, Career, and Mentorship.
- Admin Dashboard to Add, Edit, and Delete opportunities.
- Display dates in a clear, user-friendly format.
- Responsive Design for mobile and desktop users.
- Organized and professional codebase for easy collaboration and customization.
## Project Structure

```

herhorizon/
├── backend/
│   ├── models/
│   │   └── Opportunity.js
│   ├── routes/
│   │   └── admin-auth.js
│   ├── server.js
│   └── ...
├── frontend/
│   ├── index.html
│   ├── style.css
│   │
│   ├── js/
│   │   ├── admin-dashboard.js
│   │   └── opportunity.js
│   └── ...
├── README.md
└── package.json

```

---

## Getting Started

Follow the steps below to run HerHorizon on your local machine.

### Prerequisites

- Node.js installed (v14 or later)
- MongoDB installed and running locally (or MongoDB Atlas account)

---

## Backend Setup (Node.js + Express)

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add your MongoDB URI:

```env
MONGODB_URI=mongodb://localhost:27017/herhorizon
PORT=5000
```

4. Start the server:

```bash
node server.js
```

Your backend will run on [http://localhost:5000](http://localhost:5000)

---

## Frontend Setup (HTML/CSS/JS)

1. Open `frontend/index.html` directly in a browser OR serve it using a live server extension.

2. Make sure the frontend uses the correct backend URL (e.g., `http://localhost:5000`) in your JavaScript fetch calls.

---

## Test Data

To quickly test the platform:

- Use the admin dashboard to add opportunities.
- Try editing and deleting opportunities.
- Watch how they display in the main user view.

---

## How to Contribute

We welcome contributions! Here’s how you can help:

1. Fork this repo
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit (`git commit -m 'Add new feature'`)
5. Push to your branch (`git push origin feature-name`)
6. Open a Pull Request

Please make sure your code follows our structure and is well-commented.

---

## Screenshots

> You can add screenshots here to show off your UI. Use markdown like below:

```
![HerHorizon Home](./frontend/images/screenshot-home.png)
![Admin Dashboard](./frontend/images/screenshot-dashboard.png)
```

---

## License

## This project is open-source and free to use

## Future Plans

- Add user authentication (sign up, login)
- Implement "Save Opportunity" feature
- Enable email notifications for new opportunities
- Enhance admin dashboard with analytics

---

## Contact

If you'd like to collaborate or have any questions:

- GitHub: [@Dushimepaulette1](https://github.com/Dushimepaulette1)
- Email: [p.dushime12@gmail.com](p.dushime12@email.com)

---

Made by with Love By Paulette Dushime

```

```
