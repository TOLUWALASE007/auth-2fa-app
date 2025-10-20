# 🔐 Auth 2FA App

A secure 2FA authentication app built with Next.js, TypeScript, Tailwind CSS, and MongoDB. Features user registration, login, two-factor authentication with verification codes, JWT token management, and protected dashboard access. Complete full-stack solution with modern UI. 🚀

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

## ✨ Features

- 🔐 **User Registration & Login** - Secure user authentication with bcrypt password hashing
- 🛡️ **Two-Factor Authentication (2FA)** - Custom code-based 2FA system with expiration
- 🎫 **JWT Token Management** - Secure session management with JSON Web Tokens
- 🔒 **Protected Routes** - Route protection with authentication middleware
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Friendly** - Responsive design that works on all devices
- 🗄️ **MongoDB Integration** - Persistent data storage with Mongoose ODM
- ⚡ **Fast Development** - Built with Next.js 15 and Turbopack

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **Git** - [Download from git-scm.com](https://git-scm.com/)
- **MongoDB** - Either MongoDB Atlas (cloud) or local MongoDB instance
- **Code Editor** - VS Code recommended

### Local Setup Instructions

#### Option 1: MongoDB Atlas (Recommended - Free Cloud Database)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (free tier available)
   - Get your connection string

2. **Clone and Setup Project**
   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/auth-2fa-app.git
   cd auth-2fa-app
   
   # Install dependencies
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   # Create .env.local file in the root directory
   touch .env.local
   
   # Edit .env.local with your values
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/auth-2fa
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_secure
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

5. **Open Your Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

#### Option 2: Local MongoDB Installation

1. **Install MongoDB Locally**
   
   **Windows:**
   - Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Install and start MongoDB service
   - MongoDB will run on `mongodb://localhost:27017`

   **macOS (with Homebrew):**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb/brew/mongodb-community
   ```

   **Linux (Ubuntu/Debian):**
   ```bash
   sudo apt-get update
   sudo apt-get install -y mongodb
   sudo systemctl start mongodb
   ```

2. **Setup Project (Same as Option 1)**
   ```bash
   git clone https://github.com/yourusername/auth-2fa-app.git
   cd auth-2fa-app
   npm install
   ```

3. **Configure Environment Variables for Local MongoDB**
   ```bash
   # Create .env.local file
   touch .env.local
   
   # Edit .env.local with local MongoDB connection
   MONGODB_URI=mongodb://localhost:27017/auth-2fa
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_secure
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

### Verification Steps

After setup, verify everything is working:

1. **Check Server Status**
   - Visit [http://localhost:3000]

2. **Test Registration**
   - Go to `/register`
   - Create a new account
   - Should see success message

3. **Test Login**
   - Go to `/login`
   - Use your registered credentials
   - Should redirect to dashboard

4. **Test 2FA (Optional)**
   - Enable 2FA from dashboard
   - Login again to test 2FA flow

### Troubleshooting

**Common Issues:**

- **Port 3000 already in use**: Change port with `npm run dev -- -p 3001`
- **MongoDB connection failed**: Check your connection string in `.env.local`
- **Module not found errors**: Run `npm install` again
- **Permission errors**: Make sure you have write permissions in the project directory

**Need Help?**
- Check the [Issues](https://github.com/yourusername/auth-2fa-app/issues) page
- Create a new issue with your error details

## 🏗️ Project Structure

```
auth-2fa-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── register/route.ts      # User registration
│   │   │   │   ├── login/route.ts         # User login
│   │   │   │   ├── verify-2fa/route.ts    # 2FA verification
│   │   │   │   └── toggle-2fa/route.ts    # Enable/disable 2FA
│   │   │   └── users/
│   │   │       └── me/route.ts            # Get user profile
│   │   ├── login/page.tsx                 # Login page
│   │   ├── register/page.tsx              # Registration page
│   │   ├── dashboard/page.tsx             # Protected dashboard
│   │   └── twofactor/page.tsx             # 2FA verification page
│   ├── components/
│   │   ├── forms/
│   │   │   ├── LoginForm.tsx              # Login form component
│   │   │   ├── RegisterForm.tsx           # Registration form component
│   │   │   └── TwoFactorForm.tsx          # 2FA form component
│   │   ├── ui/
│   │   │   ├── Button.tsx                 # Reusable button component
│   │   │   └── Input.tsx                  # Reusable input component
│   │   └── ProtectedRoute.tsx             # Route protection component
│   ├── lib/
│   │   ├── auth.ts                        # Authentication utilities
│   │   ├── db.ts                          # Database connection
│   │   └── 2fa.ts                         # 2FA utilities
│   └── models/
│       └── User.ts                        # User model schema
├── .env.local                             # Environment variables
├── package.json                           # Dependencies
└── README.md                              # This file
```

## 🔧 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/verify-2fa` | Verify 2FA code |
| `POST` | `/api/auth/toggle-2fa` | Enable/disable 2FA |

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users/me` | Get current user profile |

## 🔐 Authentication Flow

1. **Registration**
   - User provides email and password
   - Password is hashed with bcrypt
   - User account is created in MongoDB

2. **Login**
   - User provides credentials
   - Password is verified against stored hash
   - If 2FA is enabled, user receives verification code
   - JWT token is generated upon successful authentication

3. **2FA Verification**
   - User enters 6-digit verification code
   - Code is validated and expires after 5 minutes
   - Upon success, user receives JWT token for dashboard access

4. **Protected Routes**
   - Dashboard and other protected pages require valid JWT token
   - Token is verified on each request
   - Invalid or expired tokens redirect to login

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4.0
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Development**: Turbopack, ESLint

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/auth-2fa

# JWT secret key (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Next.js public URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on every push

### Deploy to Other Platforms

- **Netlify**: Similar to Vercel, supports Next.js
- **Railway**: Full-stack deployment with MongoDB
- **Render**: Alternative to Vercel with database support

## 🧪 Testing

Test the complete authentication flow:

1. **Register** a new user at `/register`
2. **Login** with your credentials at `/login`
3. **Verify 2FA** if enabled at `/twofactor`
4. **Access Dashboard** at `/dashboard`
5. **Toggle 2FA** from the dashboard settings

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) for the database solution
- [Mongoose](https://mongoosejs.com/) for the MongoDB object modeling

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/yourusername/auth-2fa-app/issues) page
2. Create a new issue if your problem isn't already addressed
3. Contact the maintainers

---

⭐ **Star this repository if you found it helpful!**