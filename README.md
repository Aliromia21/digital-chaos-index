Digital Chaos Index API

A clean and extensible SaaS-style API that measures and tracks your digital chaos level (browser tabs, unused bookmarks, files, emails, etc.) to help users stay digitally organized.

Built with a production-grade Node.js stack, tested end-to-end, and documented using Swagger.

Tech Stack : 
- Layer	Technologies
- Backend	Node.js, Express
- Database	MongoDB + Mongoose
- Authentication	JWT (JSON Web Tokens)
- Validation	Joi
- Testing	Jest + Supertest + MongoMemoryServer
- Documentation	Swagger (OpenAPI 3.0)
- Security	Helmet, Rate Limit, CORS
- CI/CD	GitHub Actions
- Planned SaaS Features	Stripe, Cloudinary, Docker

Features :

 Secure user authentication (register/login)
 Snapshot creation per day with chaos score calculation
 CRUD operations for daily snapshots
 Dashboard endpoints for daily, weekly, and global stats
 Full OpenAPI documentation (/api/docs)
 100% automated tests through CI
 Modular and maintainable architecture

Project Structure :
 src/
├── app.js                # Express app setup
├── server.js             # Entry point
├── config/               # MongoDB & JWT configuration
├── controllers/          # Route handlers
├── services/             # Business logic
├── middleware/           # Auth, error, validation
├── models/               # Mongoose models
├── routes/               # Express routers
├── utils/                # Helpers (chaosCalculator, schemas)
├── docs/                 # Swagger setup
└── tests/                # Jest + Supertest test suites


⚙️ Setup & Run
1. Clone the repository
git clone https://github.com/<your-username>/digital-chaos-index.git
cd digital-chaos-index

2. Install dependencies
npm install

3. Create a .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/dci
JWT_SECRET=JustForSomeFun

4. Run locally
npm run dev

5. Open API Docs
http://localhost:5000/api/docs

🧪 Testing

Run all test suites:

npm test


Run tests with coverage:

npm run test:cov


Coverage report is generated in /coverage.

🔁 Continuous Integration

All pushes and pull requests to main automatically trigger:

Dependency installation

Full test suite execution

Coverage reporting

Example Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Authenticate user
POST	/api/snapshots	Create daily snapshot
GET	/api/snapshots	List all snapshots
PATCH	/api/snapshots/:id	Update snapshot
DELETE	/api/snapshots/:id	Delete snapshot
GET	/api/dashboard/today	Get today’s chaos summary
GET	/api/dashboard/week	Get weekly stats


Example Endpoints : 

Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Authenticate user
POST	/api/snapshots	Create daily snapshot
GET	/api/snapshots	List all snapshots
PATCH	/api/snapshots/:id	Update snapshot
DELETE	/api/snapshots/:id	Delete snapshot
GET	/api/dashboard/today	Get today’s chaos summary
GET	/api/dashboard/week	Get weekly stats

Future Enhancements :

 Add Stripe for subscriptions

 Add Cloudinary for snapshot screenshots

 Add Docker support for deployment

 Build full React dashboard frontend

 Deploy API to Render / Railway / AWS


 License

MIT © [Ali Romia]

Live Demo is Coming Soon

Link wil be added after deployment
