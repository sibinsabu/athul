'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Message {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  sessionType: string;
  message: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in (simple check)
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin');
      return;
    }

    // Load messages from localStorage
    const storedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    setMessages(storedMessages);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin');
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleDeleteClick = (msg: Message) => {
    setMessageToDelete(msg);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = () => {
    if (messageToDelete) {
      const updatedMessages = messages.filter(msg => msg.id !== messageToDelete.id);
      setMessages(updatedMessages);
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      setNotification('Message deleted successfully');
      setTimeout(() => setNotification(null), 3000);
      setShowDeletePopup(false);
      setMessageToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
    setMessageToDelete(null);
  };

  return (
    <div className="bg-charcoal text-white antialiased min-h-screen">
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full font-body text-sm shadow-lg">
          {notification}
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-charcoal border border-white/5 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-display font-bold text-gold-accent mb-4">Confirm Delete</h3>
            <p className="text-lg font-body text-gray-300 mb-6">
              Are you sure you want to delete this message?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 bg-gray-500/20 backdrop-blur-md border border-gray-500/30 text-gray-400 font-body text-sm font-semibold rounded-full hover:bg-gray-500/30 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 font-body text-sm font-semibold rounded-full hover:bg-red-500/30 transition-all duration-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-display font-bold tracking-wide">
              <span className="text-gold-accent">LENS</span>
              <span className="text-white"> OF AJ</span>
            </div>

            <div className="flex items-center space-x-8">
              <Link href="/" className="text-lg font-body hover:text-gold-accent transition-colors">
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 font-body text-sm font-semibold rounded-full hover:bg-red-500/30 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <section className="pt-32 pb-24 bg-charcoal grain-overlay min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-gold-accent text-sm font-body tracking-widest uppercase mb-4 block">Admin Dashboard</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gold-accent">User Messages</h1>
            <div className="section-divider w-16 mx-auto mb-6"></div>
            <p className="text-lg font-body text-gray-300">
              View and manage messages sent by users through the contact form.
            </p>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-body text-gray-400">No messages received yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-charcoal/50 border border-white/5 rounded-lg p-6 hover:border-gold-accent/30 transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400 font-body">Name</p>
                      <p className="text-lg font-body">{msg.firstName} {msg.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-body">Email</p>
                      <p className="text-lg font-body">{msg.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-body">Session Type</p>
                      <p className="text-lg font-body">{msg.sessionType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-body">Date</p>
                      <p className="text-lg font-body">{formatDate(msg.timestamp)}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 font-body mb-2">Message</p>
                      <p className="text-lg font-body text-gray-300 leading-relaxed">{msg.message}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteClick(msg)}
                      className="ml-4 px-4 py-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 font-body text-sm font-semibold rounded-full hover:bg-red-500/30 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
