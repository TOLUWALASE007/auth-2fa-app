import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Auth 2FA App</h1>
        <p className="text-gray-600 mb-8">Secure authentication with Two-Factor Authentication</p>
        
        <div className="space-x-4">
          <Link
            href="/login"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
