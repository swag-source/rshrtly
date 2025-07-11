# ⚡ Rshrtly - A Fast & Secure URL shortener service (In-Dev)
* **User Interactivity:** Provide the user an interactive interface to generate, access and short URLs information.
* **Colission Minimization:** SHA-256 + Entropy encoding algorithm based on NodeJS Crypto library ensure URLs colission minimization.
* **Click Analytics:** Real time metrics on link engagement and expiration.
* **Input validation:** Automatic URL correctness verification.
* **Security First** - Parameterized queries prevent SQL injection on database requests.
  
## 🛠️ Implementation Stack
* **Frontend:** [![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
* **Backend:** [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](https://nodejs.org/en) - [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](https://expressjs.com/) - [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/) - [![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff)](https://www.mysql.com/)

* **Architecture:** RESTful.

## ⚙️ Installation
### **For beginners**
Never installed a project from a GitHub repository before, but don't want to miss out on the latest tech trends? Fear no more.

### **For Developers**
**1. Clone repository to your prefered destination**
``` bash
  # Change directory to prefered destination.
  git clone https://github.com/your-username/rshrtly.git
  cd rshrtly
```
**2. Install project dependencies**
``` bash
  npm install  
```
**3.Set up environment variables. Create a .env file in the root directory:**
``` bash
  PORT=3030
  WEBDOMAIN=http://localhost:3030

  # Database Credentials
  DB_HOST=localhost
  DB_USER=your_username
  DB_PASSWORD=your_password
  DB_NAME=your_db_name
```
**4. Set up database to access & store URLs**
``` MySQL
CREATE DATABASE your_db_name;
USE your_db_name;

CREATE TABLE urls (
    id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    long_url VARCHAR(2048) NOT NULL,
    url_hash VARCHAR(8) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    times_clicked INTEGER DEFAULT 0,
);
```
**5. Start the development server**
``` bash
  npm run dev
```
The console will output where the development server is running.
By default, it is set to `http://localhost:3030`.

## 📁 Project Structure
```
rshrtly/
└── Backend
|  ├── src/
|  │   ├── server.ts              # Main application entry point
|  │   ├── controllers/
|  │   │   ├── redirectController.ts      # Endpoint short URL redirection
|  │   │   └── shortenerController.ts     # Endpoint short URL generation
|  |   ├── helper/
|  │   │   ├── generateHash.ts    # Hash generation algorithm
|  │   │   └── validateUrl.ts     # URL validation
|  │   ├── types/
|  │   │   └── response.ts        # TypeScript interfaces
|  │   └── utils/
|  │       └── db.ts              # Database connection and queries
|  ├── .env                       # Environment variables
|  ├── package.json
|  ├── tsconfig.json
└── Frontend
└── README.md
```
## Base URL
`http://localhost:3030`

## 🎯 API endpoints (V1)
### POST `/api/v1/short`
Returns the user the shortened URL based on long URL provided by input.

### Example request:
``` JSON
{
    "longUrl" : "http://www.long-link-example.com/*"
}
```

### Example response (200): Correctly created
``` JSON
{
    "longUrl": "https://www.example.com/very/long/url",
    "shortUrl": "https://www.rshrtly.io/8-character-hash",
    "creationTime": "2025-07-10T12:00:00Z",
    "timesClicked": 0
}
```
### Example response (400): Error encoding
``` JSON
{
    "error" : "❌ Error encoding your url."
}
```

### GET `/api/v1/long/:hash`
### **Example request:**
``` JSON
{
    "shortUrl" : "rshrtly.io/*" 
}
```

### **Example response (200):** Correctly redirected
