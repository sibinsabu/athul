'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Carousel auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Hero images random cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 4);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + 4) % 4);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const sessionType = formData.get('sessionType') as string;
    const message = formData.get('message') as string;

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !sessionType || !message.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    // Store message in localStorage
    const messageData = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      sessionType,
      message,
      timestamp: new Date().toISOString()
    };

    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    existingMessages.push(messageData);
    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));

    alert('Message sent successfully!');
  };

  const services = [
    {
      image: '/images/portrait.jpeg',
      title: 'Portrait Photography',
      description: 'Capturing the essence of personality'
    },
    {
      image: '/images/shoot.jpeg',
      title: 'Concept Shoots',
      description: 'Creative storytelling through unique concepts'
    },
    {
      image: '/images/wedding.jpeg',
      title: 'Weddings',
      description: 'Your special day, preserved forever'
    },
    {
      image: '/images/fashion.jpeg',
      title: 'Fashion Editorial',
      description: 'Bold statements through imagery'
    },
    {
      image: '/images/nature.jpeg',
      title: 'Nature & Landscape',
      description: 'The beauty of our world'
    },
    {
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=387&auto=format&fit=crop',
      title: 'Videography',
      description: 'Cinematic storytelling in motion',
      isVideo: true
    }
  ];

  const carouselImages = [
    '/images/manjima1.jpeg',
    '/images/manjima2.jpeg',
    '/images/manjima3.jpeg',
    '/images/manjima4.jpeg'
  ];

  const heroImages = [
    '/images/hero.jpeg',
    '/images/hero2.jpeg',
    '/images/hero3.jpeg'
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Bride',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=387&auto=format&fit=crop',
      text: 'The attention to detail and artistic vision transformed our wedding photos into timeless treasures. Absolutely stunning work.'
    },
    {
      name: 'James Chen',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=387&auto=format&fit=crop',
      text: 'Professional, creative, and incredibly talented. The portfolio shots elevated our brand to a whole new level.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Fashion Model',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=387&auto=format&fit=crop',
      text: 'Working with such a passionate photographer made every session feel like art in motion. Truly exceptional.'
    }
  ];

  const gallery = [
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 600 800%22%3E%3Crect width=%22600%22 height=%22800%22 fill=%22%235d7b8c%22/%3E%3Crect x=%2230%22 y=%2230%22 width=%22540%22 height=%22740%22 fill=%22%23a0a0a0%22/%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 600 400%22%3E%3Crect width=%22600%22 height=%22400%22 fill=%22%236b8e7f%22/%3E%3Crect x=%2230%22 y=%2230%22 width=%22540%22 height=%22340%22 fill=%22%2390c890%22/%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 600 800%22%3E%3Crect width=%22600%22 height=%22800%22 fill=%22%238b7355%22/%3E%3Crect x=%2230%22 y=%2230%22 width=%22540%22 height=%22740%22 fill=%22%23d4a574%22/%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 600 400%22%3E%3Crect width=%22600%22 height=%22400%22 fill=%22%234a4a4a%22/%3E%3Crect x=%2230%22 y=%2230%22 width=%22540%22 height=%22340%22 fill=%22%23808080%22/%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 600 800%22%3E%3Crect width=%22600%22 height=%22800%22 fill=%22%232c3e50%22/%3E%3Crect x=%2230%22 y=%2230%22 width=%22540%22 height=%22740%22 fill=%22%2334495e%22/%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 600 400%22%3E%3Crect width=%22600%22 height=%22400%22 fill=%22%237f8c8d%22/%3E%3Crect x=%2230%22 y=%2230%22 width=%22540%22 height=%22340%22 fill=%22%23bdc3c7%22/%3E%3C/svg%3E'
  ];

  return (
    <div className="bg-charcoal text-white antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/pfp.jpeg"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-2xl font-display font-bold tracking-wide">
                <span className="text-gold-accent">LENS</span>
                <span className="text-white"> OF AJ</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-12">
              <Link href="#home" className="text-lg font-body hover:text-gold-accent transition-colors">
                Home
              </Link>
              <Link href="#portfolio" className="text-lg font-body hover:text-gold-accent transition-colors">
                Portfolio
              </Link>
              <Link href="#about" className="text-lg font-body hover:text-gold-accent transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-lg font-body hover:text-gold-accent transition-colors">
                Contact
              </Link>
              <Link href="/admin" className="text-lg font-body hover:text-gold-accent transition-colors">
                Admin
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

      {/* Hero Section */}
      <section id="home" className="relative min-h-[140vh] flex items-center justify-center overflow-hidden grain-overlay">
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="Professional camera setup"
              fill
              className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
                index === currentHeroIndex ? 'opacity-60' : 'opacity-0'
              }`}
              priority={index === 0}
            />
          ))}
          <div className="absolute inset-0 hero-gradient"></div>
        </div>




        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-32 md:mt-40">
          <div className="inline-block mb-6 px-6 py-2 border border-gold-accent/30 rounded-full backdrop-blur-sm animate-fade-in-up">
            <span className="text-gold-accent text-sm font-body tracking-widest uppercase">Premium Photography</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 leading-tight animate-fade-in-up stagger-1">
            Capture Your <span className="text-gradient">Life Moments</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-body text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in-up stagger-2">
            Transforming fleeting moments into timeless art through the lens of passion and expertise
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up stagger-3">
            <Link href="#portfolio" className="px-10 py-4 bg-black/20 backdrop-blur-md border border-white/10 text-white font-body text-lg font-semibold rounded-full text-center hover:bg-black/30 transition-all duration-300">
              View Portfolio
            </Link>
            <Link href="#contact" className="px-10 py-4 bg-black/20 backdrop-blur-md border border-white/10 text-white font-body text-lg font-semibold rounded-full text-center hover:bg-black/30 transition-all duration-300">
              Book Session
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="portfolio" className="py-24 bg-slate-dark grain-overlay">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <span className="text-gold-accent text-sm font-body tracking-widest uppercase mb-4 block">Our Expertise</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gold-accent">What We Do</h2>
            <div className="section-divider w-32"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="card-hover img-overlay group cursor-pointer hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  {service.isVideo ? (
                    <video 
                      className="w-full h-full object-cover" 
                      poster="/images/concept.jpeg"
                      muted
                      onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                      onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                    >
                      <source src="/videos/concept.mp4" type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-display font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-300 font-body text-lg mb-4">{service.description}</p>
                    <button className="px-6 py-2 bg-black/20 backdrop-blur-md border border-white/10 text-white font-handwriting text-sm font-semibold rounded-full hover:bg-black/30 transition-all duration-300">
                      View Works →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="py-24 bg-charcoal grain-overlay">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="img-overlay rounded-lg overflow-hidden h-96 lg:h-[500px] hover:scale-105 transition-all duration-300">
              <div className="carousel-container relative w-full h-full">
                {carouselImages.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`Featured Project ${index + 1}`}
                    fill
                    className={`object-cover absolute inset-0 transition-opacity duration-500 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={prevImage}
                className="carousel-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-4 text-black border-2 border-white/50 shadow-lg hover:scale-110 transition-all duration-300 z-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="carousel-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-4 text-black border-2 border-white/50 shadow-lg hover:scale-110 transition-all duration-300 z-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            <div>
              <span className="text-gold-accent text-sm font-body tracking-widest uppercase mb-4 block">Featured Work</span>
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gold-accent">
                Echoes of<br />
                Tradition
              </h2>
              <div className="section-divider w-32 mb-8"></div>
              
              <p className="text-xl font-body text-gray-300 mb-8 leading-relaxed">
                An intimate portrait series that explores cultural depth and refined tradition through subtle expressions and composed elegance.
                Set against a heritage backdrop, the photographs highlight the enduring beauty of classic Indian aesthetics.
                The series captures timeless grace, blending authenticity with a contemporary photographic perspective.
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center space-x-4">
                  <div className="w-1 h-12 bg-gold-accent"></div>
                  <svg className="w-6 h-6 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400 font-body">Client</p>
                    <p className="text-lg font-body">Manjima Jayakrishnan</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-1 h-12 bg-gold-accent"></div>
                  <svg className="w-6 h-6 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400 font-body">Location</p>
                    <p className="text-lg font-body">Bangalore, India</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-1 h-12 bg-gold-accent"></div>
                  <svg className="w-6 h-6 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-400 font-body">Category</p>
                    <p className="text-lg font-body">Traditional Photoshoot</p>
                  </div>
                </div>
              </div>
              
              <button className="px-10 py-4 bg-black/20 backdrop-blur-md border border-white/10 text-white font-body text-lg font-semibold rounded-full hover:bg-black/30 transition-all duration-300">
                View Full Project
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 bg-charcoal grain-overlay">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="img-overlay rounded-lg overflow-hidden relative h-96 lg:h-[500px]">
              <Image
                src="/images/profile.jpeg"
                alt="About Me"
                fill
                className="object-cover"
              />
            </div>
            
            <div>
              <span className="text-gold-accent text-sm font-body tracking-widest uppercase mb-4 block">About Me</span>
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gold-accent">
                Capturing The<br />
                Art of Life
              </h2>
              <div className="section-divider w-32 mb-8"></div>
              
              <p className="text-xl font-body text-gray-300 mb-6 leading-relaxed">
                Hi, I&apos;m Athul Jacob, a passionate photographer and videographer dedicated to preserving your most precious moments.
                With a keen eye for detail and an artistic approach, I transform ordinary scenes into extraordinary visual stories.
              </p>
              
              <p className="text-lg font-body text-gray-400 mb-8 leading-relaxed">
                Through years of experience in photography and videography, I&apos;ve developed a unique style that blends 
                technical excellence with creative storytelling. Every project is approached with passion and precision, 
                ensuring your memories are captured beautifully.
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center space-x-4">
                  <div className="w-1 h-12 bg-gold-accent"></div>
                  <div>
                    <p className="text-sm text-gray-400 font-body">Experience</p>
                    <p className="text-lg font-body">3+ Years in Photography & Videography</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-1 h-12 bg-gold-accent"></div>
                  <div>
                    <p className="text-sm text-gray-400 font-body">Specialization</p>
                    <p className="text-lg font-body">weddings, concept shoots, portrait photography & videography</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-1 h-12 bg-gold-accent"></div>
                  <div>
                    <p className="text-sm text-gray-400 font-body">Passion</p>
                    <p className="text-lg font-body">Preserving Beautiful Moments Forever</p>
                  </div>
                </div>
              </div>
              
              <button className="px-10 py-4 bg-gold-accent/20 backdrop-blur-md border border-gold-accent/30 text-gold-accent font-body text-lg font-semibold rounded-full hover:bg-gold-accent/30 transition-all duration-300 transform hover:scale-105">
                Book a Session
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-slate-dark grain-overlay">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-gold-accent text-sm font-body tracking-widest uppercase mb-4 block">Testimonials</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gold-accent">What People Say About Us</h2>
            <div className="section-divider w-32 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-charcoal/50 border border-white/5 rounded-lg p-8 hover:border-gold-accent/30 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold">{testimonial.name}</p>
                    <p className="text-gray-400 font-body">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-lg font-body text-gray-300 leading-relaxed italic">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-charcoal grain-overlay">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-gold-accent text-sm font-body tracking-widest uppercase mb-4 block">Gallery</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gold-accent">Latest In House</h2>
            <div className="section-divider w-32 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((image, index) => {
              const isLarge = [0, 2, 4].includes(index);
              return (
                <div key={index} className={`${isLarge ? 'row-span-2' : ''} img-overlay rounded-lg overflow-hidden cursor-pointer relative h-64 ${isLarge ? 'lg:h-[544px]' : ''}`}>
                  <Image
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <button className="px-10 py-4 bg-black/20 backdrop-blur-md border border-white/10 text-white font-body text-lg font-semibold rounded-full hover:bg-black/30 transition-all duration-300">
              View Full Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-dark grain-overlay">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-gold-accent text-sm font-body tracking-widest uppercase mb-4 block">Get In Touch</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">Let&apos;s Create Together</h2>
            <div className="section-divider w-32 mx-auto mb-6"></div>
            <p className="text-xl font-body text-gray-300">
              Ready to capture your special moments? Reach out and let&apos;s discuss your vision.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-body text-gray-400 mb-2">First Name</label>
                <input name="firstName" type="text" className="w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors autofill:bg-charcoal/30" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-body text-gray-400 mb-2">Last Name</label>
                <input name="lastName" type="text" className="w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors autofill:bg-charcoal/30" placeholder="Doe" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-body text-gray-400 mb-2">Email Address</label>
              <input name="email" type="email" className="w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors autofill:bg-charcoal/30" placeholder="john@example.com" />
            </div>

            <div>
              <label className="block text-sm font-body text-gray-400 mb-2">Session Type</label>
              <select name="sessionType" className="custom-select w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors">
                <option>Wedding Photography</option>
                <option>Portrait Session</option>
                <option>Fashion Editorial</option>
                <option>Event Coverage</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-body text-gray-400 mb-2">Message</label>
              <textarea name="message" rows={5} className="w-full px-6 py-4 bg-charcoal/30 backdrop-blur-sm border border-white/20 rounded-lg text-white font-body focus:border-gold-accent focus:outline-none transition-colors resize-none autofill:bg-charcoal/30" placeholder="Tell us about your vision..."></textarea>
            </div>

            <button type="submit" className="w-full px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-body text-lg font-semibold rounded-full hover:bg-white/20 transition-all duration-300">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="text-3xl font-display font-bold mb-4">
                <span className="text-gold-accent">LENS</span>
                <span className="text-white"> OF AJ</span>
              </div>
              <p className="text-gray-400 font-body text-lg mb-6">
                Capturing life&apos;s precious moments with artistic vision and professional excellence.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-white/5 hover:bg-gold-accent rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 hover:bg-gold-accent rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 hover:bg-gold-accent rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-display font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 font-body text-gray-400">
                <li><Link href="#" className="hover:text-gold-accent transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-gold-accent transition-colors">Portfolio</Link></li>
                <li><Link href="#" className="hover:text-gold-accent transition-colors">Services</Link></li>
                <li><Link href="#" className="hover:text-gold-accent transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-display font-bold mb-4">Contact Info</h3>
              <ul className="space-y-2 font-body text-gray-400">
                <li>123 Photography Lane</li>
                <li>New York, NY 10001</li>
                <li className="pt-2">
                  <a href="mailto:hello@lensofaj.com" className="hover:text-gold-accent transition-colors">
                    hello@lensofaj.com
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="hover:text-gold-accent transition-colors">
                    +1 (234) 567-890
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="section-divider mb-8"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 font-body">
            <p>&copy; 2025 Lens of AJ Photography. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-gold-accent transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-gold-accent transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}