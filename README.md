# Digital Chaos Index API
[![CI](https://github.com/Aliromia21/digital-chaos-index/actions/workflows/ci.yml/badge.svg)](https://github.com/Aliromia21/digital-chaos-index/actions/workflows/ci.yml)
![Coverage](https://img.shields.io/badge/coverage-83%25-green)


A clean and extensible SaaS-style API that measures and tracks your digital chaos level (browser tabs, unused bookmarks, files, emails, etc.) to help users stay digitally organized.

Built with a production-grade **Node.js stack**, tested end-to-end, and documented using **Swagger**.

---

##  Tech Stack

### Layer Technologies
- **Backend**: Node.js, Express  
- **Database**: MongoDB + Mongoose  
- **Authentication**: JWT (JSON Web Tokens)  
- **Validation**: Joi  
- **Testing**: Jest + Supertest + MongoMemoryServer  
- **Documentation**: Swagger (OpenAPI 3.0)  
- **Security**: Helmet, Rate Limit, CORS  
- **CI/CD**: GitHub Actions  
- **Planned SaaS Features**: Stripe, Cloudinary, Docker  

---

##  Features
- Secure user authentication (register/login)  
- Snapshot creation per day with chaos score calculation  
- CRUD operations for daily snapshots  
- Dashboard endpoints for daily, weekly, and global stats  
- Full OpenAPI documentation (`/api/docs`)  
- 100% automated tests through CI  
- Modular and maintainable architecture  

---

##  Project Structure

src/
├── app.js # Express app setup

├── server.js # Entry point

├── config/ # MongoDB & JWT configuration

├── controllers/ # Route handlers

├── services/ # Business logic

├── middleware/ # Auth, error, validation

├── models/ # Mongoose models

├── routes/ # Express routers

├── utils/ # Helpers (chaosCalculator, schemas)

├── docs/ # Swagger setup

└── tests/ # Jest + Supertest test suites

---


## ⚙️ Setup & Run

```bash
# Clone the repository
git clone https://github.com//digital-chaos-index.git
cd digital-chaos-index

# Install dependencies
npm install

# Create a .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/dci
JWT_SECRET=JustForSomeFun

# Run locally
npm run dev

Open API Docs: http://localhost:5000/api/docs

```

## Testing

Run all test suites:

```bash

npm test

```
Run tests with coverage:

```bash

npm run test:cov

```

Coverage report is generated in /coverage.

## Continuous Integration
All pushes and pull requests to main automatically trigger:

Dependency installation

Full test suite execution

Coverage reporting

## Example Endpoints
Method	Endpoint	Description

POST	/api/auth/register	Register new user

POST	/api/auth/login	Authenticate user

POST	/api/snapshots	Create daily snapshot

GET	/api/snapshots	List all snapshots

PATCH	/api/snapshots/:id	Update snapshot

DELETE	/api/snapshots/:id	Delete snapshot

GET	/api/dashboard/today	Get today’s chaos summary

GET	/api/dashboard/week	Get weekly stats

## Future Enhancements
Adding Stripe for subscriptions

Adding Cloudinary for snapshot screenshots

Adding Docker support for deployment

Building full React dashboard frontend

Deploying API to Render / Railway / AW

## 🔗 Related Repository
- **Frontend Dashboard:** https://github.com/Aliromia21/digital-chaos-dashboard

## 🧩 Architecture
This project is split into two repositories:
- Backend: Node.js/Express API (JWT, MongoDB, Swagger, Tests, CI)
- Frontend: React dashboard (Tailwind, Charts, Protected Routes)

## License
MIT © [Ali Romia]

## Live Demo
Coming Soon — Link will be added after deployment.




