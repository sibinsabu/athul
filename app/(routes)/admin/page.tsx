 'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    // Here you can add actual authentication logic
    // For now, using simple check
    if (formData.email === 'admin@lensofaj.com' && formData.password === 'admin123') {
      // Simulate successful login
      localStorage.setItem('adminLoggedIn', 'true');
      alert('Login successful!');
      router.push('/admin-dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="bg-charcoal text-white antialiased min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-display font-bold tracking-wide">
              <span className="text-gold-accent">LENS</span>
              <span className="text-white"> OF AJ</span>
            </div>

            <div className="hidden md:flex items-center space-x-12">
              <Link href="/" className="text-lg font-body hover:text-gold-accent transition-colors">
                Home
              </Link>
              <Link href="/#portfolio" className="text-lg font-body hover:text-gold-accent transition-colors">
                Portfolio
              </Link>
              <Link href="/#about" className="text-lg font-body hover:text-gold-accent transition-colors">
                About
              </Link>
              <Link href="/#contact" className="text-lg font-body hover:text-gold-accent transition-colors">
                Contact
              </Link>
            </div>

            <button className="md:hidden text-white bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-2 hover:bg-black/30 transition-all duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Login Section */}
      <section className="pt-32 pb-24 bg-charcoal grain-overlay min-h-screen flex items-center justify-center three-d-background">
        <div className="max-w-md mx-auto px-6 lg:px-12 w-full animate-fade-in">
          <div className="text-center mb-8">
            <Image
              src="/images/pfp.jpeg"
              alt="Logo"
              width={80}
              height={80}
              className="rounded-full mx-auto mb-4"
            />
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gold-accent">Login</h1>
            <div className="section-divider w-16 mx-auto mb-6"></div>
            <p className="text-lg font-body text-gray-300 mb-4">
              Enter your credentials to access the admin dashboard.
            </p>
          </div>

          <div className="glassmorphism-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400 font-body text-sm">{error}</p>
                </div>
              )}

              <div className="relative">
                <label className="block text-sm font-body text-gray-400 mb-2">Email Address</label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors autofill:bg-charcoal/30"
                    placeholder="admin@lensofaj.com"
                  />
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-body text-gray-400 mb-2">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors autofill:bg-charcoal/30"
                    placeholder="Enter your password"
                  />
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-body text-lg font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
              >
                Login
              </button>
            </form>

            <div className="text-center mt-8">
              <Link href="/" className="text-gray-400 hover:text-gold-accent transition-colors font-body">
                ← Back to Home
              </Link>
            </div>
          </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center text-gray-400 font-body">
            <p>&copy; 2025 Lens of AJ Photography. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
