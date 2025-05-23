import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', {
                email,
                password,
            });
            alert('Account created successfully!');
        } catch (err) {
            console.error(err.response?.data || err.message || err);
            alert('Sign up failed');
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = email && password && confirmPassword && password === confirmPassword;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-gray-600">Join us today and get started</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>
                            <input
                                id="signup-email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="signup-password"
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white ${
                                    confirmPassword && password !== confirmPassword 
                                        ? 'border-red-300 focus:ring-red-500' 
                                        : 'border-gray-300 focus:ring-purple-500'
                                }`}
                                required
                            />
                            {confirmPassword && password !== confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
                            )}
                        </div>

                        {/* Password strength indicator */}
                        {password && (
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Password strength</span>
                                    <span className={`text-xs ${
                                        password.length >= 8 ? 'text-green-600' : 
                                        password.length >= 6 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                        {password.length >= 8 ? 'Strong' : 
                                         password.length >= 6 ? 'Medium' : 'Weak'}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div className={`h-1.5 rounded-full transition-all duration-300 ${
                                        password.length >= 8 ? 'bg-green-500 w-full' : 
                                        password.length >= 6 ? 'bg-yellow-500 w-2/3' : 'bg-red-500 w-1/3'
                                    }`}></div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleSignup}
                            disabled={isLoading || !isFormValid}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating account...
                                </div>
                            ) : (
                                'Create account'
                            )}
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="font-medium text-purple-600 hover:text-purple-500 transition duration-200"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Signup;