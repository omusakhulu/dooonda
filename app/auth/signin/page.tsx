
import { SignInForm } from '@/components/auth/signin-form'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FA] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/onboarding"
            className="inline-flex items-center text-[#00796B] hover:text-[#FF6F61] transition-colors duration-300 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to onboarding
          </Link>
          
          <h1 className="text-3xl font-bold text-[#222831] mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your dooonda account
          </p>
        </div>

        {/* Sign In Form */}
        <SignInForm />

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link 
              href="/auth/signup" 
              className="text-[#00796B] font-medium hover:text-[#FF6F61] transition-colors duration-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
