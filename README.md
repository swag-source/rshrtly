# Rshrtly - A Fast & Secure URL shortener service  
***
* **Colission Minimization:** SHA-256 + Entropy encoding algorithm based on Crypto libraries ensure hashes have minimized colission.
* **Click Analytics:** Provide real time metrics on link engagement.
* **Input validation:**
* **Security First** - Parameterized queries prevent SQL injection on database requests.
*  

🛠️ Tech Stack
***
**Frontend:** NextJS
**Backend:** Node.js, Express.js, TypeScript.
**Database:** MySQL.
**Architecture:** RESTful.

## 📁 Project Structure
***
rshrtly/
└── Backend
  ├── src/
  │   ├── server.ts              # Main application entry point
  │   ├── controllers/
  │   │   ├── redirectController.ts      # Endpoint URL redirection
  │   │   └── shortenerController.ts     # Endpoint short URL generation
  |   ├── helper/
  │   │   ├── generateHash.ts    # Hash generation algorithm
  │   │   └── validateUrl.ts     # URL validation utilities
  │   ├── types/
  │   │   └── response.ts        # TypeScript interfaces
  │   └── utils/
  │       └── db.ts              # Database connection and queries
  ├── .env                       # Environment variables
  ├── package.json
  ├── tsconfig.json
└── Frontend
└── README.md
