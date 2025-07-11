# Rshrtly - A Fast & Secure URL shortener service  
* **Colission Minimization:** SHA-256 + Entropy encoding algorithm based on Crypto libraries ensure hashes have minimized colission.
* **Click Analytics:** Provide real time metrics on link engagement.
* **Input validation:**
* **Security First** - Parameterized queries prevent SQL injection on database requests.
*  
## 🛠️ Implementation Stack
* **Frontend:** NextJS
* **Backend:** Node.js, Express.js, TypeScript.
* **Database:** MySQL.
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
