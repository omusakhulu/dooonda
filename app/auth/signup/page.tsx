
import { SignUpForm } from '@/components/auth/signup-form'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SignUpPage() {
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
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Join dooonda and start building your business today
          </p>
        </div>

        {/* Sign Up Form */}
        <SignUpForm />

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link 
              href="/auth/signin" 
              className="text-[#00796B] font-medium hover:text-[#FF6F61] transition-colors duration-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
