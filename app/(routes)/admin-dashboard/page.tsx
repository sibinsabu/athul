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
  read?: boolean;
}

interface AboutText {
  name: string;
  title: string;
  intro: string;
  description: string;
  experience: string;
  specialization: string;
  passion: string;
}

interface GalleryWork {
  id: string;
  file: string; // data URL for image/video
  type: 'image' | 'video';
  title: string;
  description: string;
  uploadedAt: string;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  const [aboutText, setAboutText] = useState<AboutText>({
    name: "Athul Jacob",
    title: "Capturing The Art of Life",
    intro: "Hi, I'm Athul Jacob, a passionate photographer and videographer dedicated to preserving your most precious moments. With a keen eye for detail and an artistic approach, I transform ordinary scenes into extraordinary visual stories.",
    description: "Through years of experience in photography and videography, I've developed a unique style that blends technical excellence with creative storytelling. Every project is approached with passion and precision, ensuring your memories are captured beautifully.",
    experience: "3+ Years in Photography & Videography",
    specialization: "weddings, concept shoots, portrait photography & videography",
    passion: "Preserving Beautiful Moments Forever"
  });
  const [aboutImage, setAboutImage] = useState<string>('/images/profile.jpeg');
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);
  const [aboutImagePreview, setAboutImagePreview] = useState<string | null>(null);
  const [galleryWorks, setGalleryWorks] = useState<GalleryWork[]>([]);
  const [newWorkForm, setNewWorkForm] = useState({
    file: null as File | null,
    title: '',
    description: ''
  });
  const [newWorkPreview, setNewWorkPreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewWork, setPreviewWork] = useState<GalleryWork | null>(null);
  const [showNewWorkPreview, setShowNewWorkPreview] = useState(false);
  const [showWorkDeletePopup, setShowWorkDeletePopup] = useState(false);
  const [workToDelete, setWorkToDelete] = useState<GalleryWork | null>(null);
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

    // Load about data from localStorage
    const storedAboutText = localStorage.getItem('aboutText');
    const storedAboutImage = localStorage.getItem('aboutImage');
    if (storedAboutText) {
      setAboutText(JSON.parse(storedAboutText));
    }
    if (storedAboutImage) {
      setAboutImage(storedAboutImage);
    }

    // Load gallery works from localStorage
    const storedGalleryWorks = localStorage.getItem('galleryWorks');
    if (storedGalleryWorks) {
      setGalleryWorks(JSON.parse(storedGalleryWorks));
    }
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

  const handleMarkAsRead = (msg: Message) => {
    const updatedMessages = messages.map(message =>
      message.id === msg.id ? { ...message, read: !message.read } : message
    );
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    setNotification(`Message marked as ${msg.read ? 'unread' : 'read'}`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleWorkPreview = (work: GalleryWork) => {
    setPreviewWork(work);
    setShowPreview(true);
  };

  const handleWorkDeleteClick = (work: GalleryWork) => {
    setWorkToDelete(work);
    setShowWorkDeletePopup(true);
  };

  const handleWorkDeleteConfirm = () => {
    if (workToDelete) {
      const updatedWorks = galleryWorks.filter(work => work.id !== workToDelete.id);
      setGalleryWorks(updatedWorks);
      localStorage.setItem('galleryWorks', JSON.stringify(updatedWorks));
      setNotification('Work deleted successfully');
      setTimeout(() => setNotification(null), 3000);
      setShowWorkDeletePopup(false);
      setWorkToDelete(null);
    }
  };

  const handleWorkDeleteCancel = () => {
    setShowWorkDeletePopup(false);
    setWorkToDelete(null);
  };

  const handleAddWork = async () => {
    if (!newWorkForm.file || !newWorkForm.title.trim()) {
      setNotification('Please select a file and enter a title');
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const type = newWorkForm.file!.type.startsWith('image/') ? 'image' : 'video';

      const newWork: GalleryWork = {
        id: Date.now().toString(),
        file: dataUrl,
        type,
        title: newWorkForm.title,
        description: newWorkForm.description,
        uploadedAt: new Date().toISOString()
      };

      const updatedWorks = [...galleryWorks, newWork];
      setGalleryWorks(updatedWorks);
      localStorage.setItem('galleryWorks', JSON.stringify(updatedWorks));
      setNewWorkForm({ file: null, title: '', description: '' });
      setNotification('Work added successfully');
      setTimeout(() => setNotification(null), 3000);
    };
    reader.readAsDataURL(newWorkForm.file);
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-100">
          <div className="bg-charcoal border-2 border-gold-accent/50 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-gold-accent/20 animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-gold-accent mb-4">Confirm Delete</h3>
              <p className="text-lg font-body text-gray-300 mb-6">
                Are you sure you want to delete this message? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteCancel}
                className="px-6 py-3 bg-gray-500/20 backdrop-blur-md border border-gray-500/30 text-gray-400 font-body text-sm font-semibold rounded-full hover:bg-gray-500/30 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-6 py-3 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 font-body text-sm font-semibold rounded-full hover:bg-red-500/30 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Work Preview Popup */}
      {showPreview && previewWork && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-100">
          <div className="bg-charcoal border-2 border-gold-accent/50 rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl shadow-gold-accent/20 animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gold-accent/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-gold-accent mb-2">{previewWork.title}</h3>
                  {previewWork.description && (
                    <p className="text-lg font-body text-gray-300">{previewWork.description}</p>
                  )}
                  <p className="text-sm text-gray-400 mt-2">Uploaded: {formatDate(previewWork.uploadedAt)}</p>
                </div>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-2"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="relative h-96 md:h-125 rounded-lg overflow-hidden border border-white/10">
              {previewWork.type === 'video' ? (
                <video
                  src={previewWork.file}
                  controls
                  className="w-full h-full object-cover"
                  autoPlay
                />
              ) : (
                <img
                  src={previewWork.file}
                  alt={previewWork.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Work Delete Confirmation Popup */}
      {showWorkDeletePopup && workToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-100">
          <div className="bg-charcoal border-2 border-gold-accent/50 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-gold-accent/20 animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-gold-accent mb-4">Confirm Delete</h3>
              <p className="text-lg font-body text-gray-300 mb-6">
                Are you sure you want to delete "{workToDelete.title}"? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleWorkDeleteCancel}
                className="px-6 py-3 bg-gray-500/20 backdrop-blur-md border border-gray-500/30 text-gray-400 font-body text-sm font-semibold rounded-full hover:bg-gray-500/30 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleWorkDeleteConfirm}
                className="px-6 py-3 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 font-body text-sm font-semibold rounded-full hover:bg-red-500/30 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Work Preview Popup */}
      {showNewWorkPreview && newWorkPreview && newWorkForm.file && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-100">
          <div className="bg-charcoal border-2 border-gold-accent/50 rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl shadow-gold-accent/20 animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gold-accent/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-gold-accent mb-2">Preview: {newWorkForm.file.name}</h3>
                  <p className="text-lg font-body text-gray-300">New work to be added</p>
                </div>
              </div>
              <button
                onClick={() => setShowNewWorkPreview(false)}
                className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-2"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="relative h-96 md:h-125 rounded-lg overflow-hidden border border-white/10">
              {newWorkForm.file.type.startsWith('video/') ? (
                <video
                  src={newWorkPreview}
                  controls
                  className="w-full h-full object-cover"
                  autoPlay
                />
              ) : (
                <img
                  src={newWorkPreview}
                  alt={newWorkForm.file.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-2xl font-display font-bold tracking-wide">
              <img src="/images/pfp.jpeg" alt="Profile" className="w-10 h-10 rounded-full mr-4" />
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
            <h2 className="text-2xl font-display font-bold text-white mb-4">Hi Athul Jacob, Welcome Back!</h2>
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
                <div key={msg.id} className={`bg-charcoal/50 border rounded-lg p-6 hover:border-gold-accent/30 transition-all duration-300 ${msg.read ? 'border-green-500/30 bg-green-500/5' : 'border-white/5'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${msg.read ? 'bg-green-500' : 'bg-gold-accent'}`}></div>
                      <span className={`text-sm font-body ${msg.read ? 'text-green-400' : 'text-gold-accent'}`}>
                        {msg.read ? 'Read' : 'Unread'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 font-body">
                      {formatDate(msg.timestamp)}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 font-body mb-2">Message</p>
                      <p className={`text-lg font-body leading-relaxed ${msg.read ? 'text-gray-400' : 'text-gray-300'}`}>{msg.message}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleMarkAsRead(msg)}
                        className={`px-4 py-2 backdrop-blur-md border font-body text-sm font-semibold rounded-full transition-all duration-300 ${
                          msg.read
                            ? 'bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30'
                            : 'bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30'
                        }`}
                      >
                        {msg.read ? 'Mark as Unread' : 'Mark as Read'}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(msg)}
                        className="px-4 py-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 font-body text-sm font-semibold rounded-full hover:bg-red-500/30 transition-all duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section Editor */}
      <section className="py-24 bg-slate-dark grain-overlay">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-gold-accent text-sm font-body tracking-widest uppercase mb-4 block">Edit About Section</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gold-accent">Manage About Content</h1>
            <div className="section-divider w-16 mx-auto mb-6"></div>
            <p className="text-lg font-body text-gray-300">
              Edit the text and image content for the about section on your profile page.
            </p>
          </div>

          <div className="bg-charcoal/50 border border-white/5 rounded-lg p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-body text-gray-400 mb-2">Photographer Name</label>
                <input
                  type="text"
                  value={aboutText.name}
                  onChange={(e) => setAboutText(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors"
                  placeholder="Enter photographer name"
                />
              </div>

              <div>
                <label className="block text-sm font-body text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  value={aboutText.title}
                  onChange={(e) => setAboutText(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors"
                  placeholder="Enter title"
                />
              </div>

              <div>
                <label className="block text-sm font-body text-gray-400 mb-2">Intro Text</label>
                <textarea
                  rows={3}
                  value={aboutText.intro}
                  onChange={(e) => setAboutText(prev => ({ ...prev, intro: e.target.value }))}
                  className="w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors resize-none"
                  placeholder="Enter intro text"
                />
              </div>

              <div>
                <label className="block text-sm font-body text-gray-400 mb-2">Description</label>
                <textarea
                  rows={4}
                  value={aboutText.description}
                  onChange={(e) => setAboutText(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors resize-none"
                  placeholder="Enter description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-body text-gray-400 mb-2">Experience</label>
                  <input
                    type="text"
                    value={aboutText.experience}
                    onChange={(e) => setAboutText(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors"
                    placeholder="Enter experience"
                  />
                </div>

                <div>
                  <label className="block text-sm font-body text-gray-400 mb-2">Specialization</label>
                  <input
                    type="text"
                    value={aboutText.specialization}
                    onChange={(e) => setAboutText(prev => ({ ...prev, specialization: e.target.value }))}
                    className="w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors"
                    placeholder="Enter specialization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-body text-gray-400 mb-2">Passion</label>
                  <input
                    type="text"
                    value={aboutText.passion}
                    onChange={(e) => setAboutText(prev => ({ ...prev, passion: e.target.value }))}
                    className="w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors"
                    placeholder="Enter passion"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-body text-gray-400 mb-2">Upload About Image</label>
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setAboutImageFile(file);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="px-6 py-4 bg-charcoal/30 backdrop-blur-sm border-2 border-dashed border-gold-accent/50 rounded-lg text-center text-white font-body hover:border-gold-accent hover:bg-gold-accent/10 transition-all duration-300">
                      <div className="flex items-center justify-center space-x-3">
                        <svg className="w-6 h-6 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-gold-accent">Choose Image File</p>
                          <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setAboutImage('/images/profile.jpeg');
                      setAboutImageFile(null);
                    }}
                    className="px-6 py-4 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 font-body text-sm font-semibold rounded-lg hover:bg-red-500/30 transition-all duration-300"
                  >
                    Delete Image
                  </button>
                </div>
                {aboutImageFile && (
                  <p className="text-sm text-green-400 mt-2 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Selected: {aboutImageFile.name}
                  </p>
                )}
                {!aboutImageFile && (
                  <p className="text-sm text-gray-400 mt-2">Current image: {aboutImage}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    if (aboutImageFile) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const dataUrl = e.target?.result as string;
                        localStorage.setItem('aboutText', JSON.stringify(aboutText));
                        localStorage.setItem('aboutImage', dataUrl);
                        setAboutImage(dataUrl);
                        setAboutImageFile(null);
                        setNotification('About section updated successfully');
                        setTimeout(() => setNotification(null), 3000);
                      };
                      reader.readAsDataURL(aboutImageFile);
                    } else {
                      localStorage.setItem('aboutText', JSON.stringify(aboutText));
                      localStorage.setItem('aboutImage', aboutImage);
                      setNotification('About section updated successfully');
                      setTimeout(() => setNotification(null), 3000);
                    }
                  }}
                  className="px-10 py-4 bg-gold-accent/20 backdrop-blur-md border border-gold-accent/30 text-gold-accent font-body text-lg font-semibold rounded-full hover:bg-gold-accent/30 transition-all duration-300"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Management */}
      <section className="py-24 bg-charcoal grain-overlay">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-gold-accent text-sm font-body tracking-widest uppercase mb-4 block">Manage Gallery</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gold-accent">Latest In House Works</h1>
            <div className="section-divider w-16 mx-auto mb-6"></div>
            <p className="text-lg font-body text-gray-300">
              Add, preview, and manage works that appear in the gallery section on your profile page.
            </p>
          </div>

          {/* Add New Work Form */}
          <div className="bg-charcoal/50 border border-white/5 rounded-lg p-8 mb-12">
            <h3 className="text-xl font-display font-bold text-gold-accent mb-6">Add New Work</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-body text-gray-400 mb-2">Upload Image or Video</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setNewWorkForm(prev => ({ ...prev, file }));
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setNewWorkPreview(event.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="px-6 py-4 bg-charcoal/30 backdrop-blur-sm border-2 border-dashed border-gold-accent/50 rounded-lg text-center text-white font-body hover:border-gold-accent hover:bg-gold-accent/10 transition-all duration-300">
                    <div className="flex items-center justify-center space-x-3">
                      <svg className="w-6 h-6 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-gold-accent">Choose Media File</p>
                        <p className="text-xs text-gray-400">Images or Videos up to 50MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                {newWorkForm.file && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-green-400 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Selected: {newWorkForm.file.name}
                    </p>
                    <button
                      onClick={() => setShowNewWorkPreview(true)}
                      className="px-4 py-2 bg-gold-accent/20 backdrop-blur-md border border-gold-accent/30 text-gold-accent font-body text-sm font-semibold rounded-full hover:bg-gold-accent/30 transition-all duration-300"
                    >
                      Preview
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-body text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  value={newWorkForm.title}
                  onChange={(e) => setNewWorkForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors"
                  placeholder="Enter work title"
                />
              </div>

              <div>
                <label className="block text-sm font-body text-gray-400 mb-2">Description (Optional)</label>
                <textarea
                  rows={3}
                  value={newWorkForm.description}
                  onChange={(e) => setNewWorkForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors resize-none"
                  placeholder="Enter work description"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setNewWorkForm({ file: null, title: '', description: '' });
                    setNewWorkPreview(null);
                    setShowNewWorkPreview(false);
                  }}
                  className="px-10 py-4 bg-gray-500/20 backdrop-blur-md border border-gray-500/30 text-gray-400 font-body text-lg font-semibold rounded-full hover:bg-gray-500/30 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddWork}
                  className="px-10 py-4 bg-gold-accent/20 backdrop-blur-md border border-gold-accent/30 text-gold-accent font-body text-lg font-semibold rounded-full hover:bg-gold-accent/30 transition-all duration-300"
                >
                  Add Work
                </button>
              </div>
            </div>
          </div>

          {/* Existing Works */}
          <div className="bg-charcoal/50 border border-white/5 rounded-lg p-8">
            <h3 className="text-xl font-display font-bold text-gold-accent mb-6">Manage Existing Works</h3>
            {galleryWorks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl font-body text-gray-400">No works added yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryWorks.map((work) => (
                  <div key={work.id} className="bg-charcoal/30 border border-white/10 rounded-lg overflow-hidden hover:border-gold-accent/30 transition-all duration-300">
                    <div className="relative h-48">
                      {work.type === 'video' ? (
                        <video
                          src={work.file}
                          className="w-full h-full object-cover"
                          muted
                        />
                      ) : (
                        <img
                          src={work.file}
                          alt={work.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        <button
                          onClick={() => handleWorkPreview(work)}
                          className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white font-body text-sm font-semibold rounded-full hover:bg-white/30 transition-all duration-300"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => handleWorkDeleteClick(work)}
                          className="px-4 py-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 font-body text-sm font-semibold rounded-full hover:bg-red-500/30 transition-all duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-display font-bold text-white mb-2">{work.title}</h4>
                      {work.description && (
                        <p className="text-sm font-body text-gray-400 line-clamp-2">{work.description}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">Uploaded: {formatDate(work.uploadedAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
