'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [aboutText, setAboutText] = useState({
    name: "Athul Jacob",
    title: "Capturing The Art of Life",
    intro: "Hi, I'm Athul Jacob, a passionate photographer and videographer dedicated to preserving your most precious moments. With a keen eye for detail and an artistic approach, I transform ordinary scenes into extraordinary visual stories.",
    description: "Through years of experience in photography and videography, I've developed a unique style that blends technical excellence with creative storytelling. Every project is approached with passion and precision, ensuring your memories are captured beautifully.",
    experience: "3+ Years in Photography & Videography",
    specialization: "weddings, concept shoots, portrait photography & videography",
    passion: "Preserving Beautiful Moments Forever"
  });
  const [aboutImage, setAboutImage] = useState('/images/profile.jpeg');
  const [galleryWorks, setGalleryWorks] = useState<any[]>([]);

  useEffect(() => {
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
  }, []);

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

  // Load about data from localStorage
  useEffect(() => {
    const storedAboutText = localStorage.getItem('aboutText');
    const storedAboutImage = localStorage.getItem('aboutImage');
    if (storedAboutText) {
      setAboutText(JSON.parse(storedAboutText));
    }
    if (storedAboutImage) {
      setAboutImage(storedAboutImage);
    }
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
      name: 'Sibin Sabu',
      role: 'Client',
      image: '/images/sibin.jpeg',
      rating: 5,
      text: 'I was blown away by how Athul captured my personality in those portraits. It felt so natural and real, like he really understood me. The photos turned out way better than I expected.'
    },
    {
      name: 'Mebin S',
      role: 'Client',
      image: '/images/mebin.jpeg',
      rating: 4,
      text: 'Really enjoyed working with Athul on our brand photos. He has a great eye for composition and made our team look professional yet approachable. Would definitely recommend for business shoots.'
    },
    {
      name: 'Richa Rose',
      role: 'Client',
      image: '/images/richa.jpeg',
      rating: 5,
      text: 'Athul is incredibly passionate about his work, and it shows in every shot. The concept shoot we did was so much fun, and the results were amazing. Felt like we were creating art together.'
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
            
            <button suppressHydrationWarning={true} className="md:hidden text-white bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-2 hover:bg-black/30 transition-all duration-300">
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
          
          <div id="services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300"></div>
                  <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center text-center">
                    <h3 className="text-2xl font-display font-bold mb-2 text-white">{service.title}</h3>
                    <p className="text-gray-200 font-body text-lg mb-4">{service.description}</p>
                    <button suppressHydrationWarning={true} className="px-6 py-2 bg-white/20 backdrop-blur-md border border-white/20 text-white font-handwriting text-sm font-semibold rounded-full hover:bg-white/30 transition-all duration-300">
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
            <div className="img-overlay rounded-lg overflow-hidden h-96 lg:h-125 hover:scale-105 transition-all duration-300">
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
              
              <button suppressHydrationWarning={true} className="px-10 py-4 bg-black/20 backdrop-blur-md border border-white/10 text-white font-body text-lg font-semibold rounded-full hover:bg-black/30 transition-all duration-300">
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
            <div className="img-overlay rounded-lg overflow-hidden relative h-96 lg:h-125">
              <Image
                src={aboutImage}
                alt="About Me"
                fill
                className="object-cover"
              />
            </div>
            
            <div>
              <span className="text-gold-accent text-sm font-body tracking-widest uppercase mb-4 block">About Me</span>
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gold-accent">
                {aboutText.title.split(' ').slice(0, 2).join(' ')}<br />
                {aboutText.title.split(' ').slice(2).join(' ')}
              </h2>
              <div className="section-divider w-32 mb-8"></div>
              
              <p className="text-xl font-body text-gray-300 mb-6 leading-relaxed">
                {aboutText.intro.replace('Athul Jacob', aboutText.name)}
              </p>

              <p className="text-lg font-body text-gray-400 mb-8 leading-relaxed">
                {aboutText.description}
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center space-x-4">
                  <div className="w-1 h-12 bg-gold-accent"></div>
                  <div>
                    <p className="text-sm text-gray-400 font-body">Experience</p>
                    <p className="text-lg font-body">{aboutText.experience}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-1 h-12 bg-gold-accent"></div>
                  <div>
                    <p className="text-sm text-gray-400 font-body">Specialization</p>
                    <p className="text-lg font-body">{aboutText.specialization}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-1 h-12 bg-gold-accent"></div>
                  <div>
                    <p className="text-sm text-gray-400 font-body">Passion</p>
                    <p className="text-lg font-body">{aboutText.passion}</p>
                  </div>
                </div>
              </div>
              
              <Link href="#contact" className="px-10 py-4 bg-gold-accent/20 backdrop-blur-md border border-gold-accent/30 text-gold-accent font-body text-lg font-semibold rounded-full hover:bg-gold-accent/30 transition-all duration-300 transform hover:scale-105 inline-block text-center">
                Book a Session
              </Link>
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
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, starIndex) => {
                        const starValue = starIndex + 1;
                        const isFull = testimonial.rating >= starValue;
                        const isHalf = testimonial.rating >= starValue - 0.5 && testimonial.rating < starValue;
                        return (
                          <svg
                            key={starIndex}
                            className={`w-5 h-5 ${isFull ? 'text-gold-accent' : isHalf ? 'text-gold-accent' : 'text-gray-600'}`}
                            fill={isFull ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                            {isHalf && (
                              <path
                                fill="currentColor"
                                d="M12 2l1.09 3.26h3.52l-2.85 2.07 1.09 3.26L12 8.52l-2.85 2.07 1.09-3.26-2.85-2.07h3.52L12 2z"
                                clipPath="inset(0 50% 0 0)"
                              />
                            )}
                          </svg>
                        );
                      })}
                      <span className="ml-2 text-sm text-gray-400 font-body">({testimonial.rating})</span>
                    </div>
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
          {galleryWorks.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl font-body text-gray-400">No works available yet.</p>
            </div>
          ) : (
            galleryWorks.map((work, index) => {
              const isLarge = [0, 2, 4].includes(index);
              return (
                <div key={work.id} className={`${isLarge ? 'row-span-2' : ''} img-overlay rounded-lg overflow-hidden cursor-pointer relative h-64 ${isLarge ? 'lg:h-136' : ''} group`}>
                  {work.file ? (
                    work.type === 'video' ? (
                      <video
                        src={work.file}
                        className="w-full h-full object-cover"
                        muted
                      />
                    ) : (
                      <Image
                        src={work.file}
                        alt={work.title}
                        fill
                        className="object-cover"
                      />
                    )
                  ) : null}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-display font-bold text-white mb-2">{work.title}</h3>
                    {work.description && (
                      <p className="text-gray-200 font-body text-sm mb-4 line-clamp-3">{work.description}</p>
                    )}
                    <p className="text-xs text-gray-400 font-body">
                      Uploaded: {new Date(work.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
          
          <div className="text-center mt-12">
            <button suppressHydrationWarning={true} className="px-10 py-4 bg-black/20 backdrop-blur-md border border-white/10 text-white font-body text-lg font-semibold rounded-full hover:bg-black/30 transition-all duration-300">
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
          
          <form onSubmit={handleSubmit} suppressHydrationWarning={true} className="space-y-6">
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
                <a href="https://www.instagram.com/p/DGh4pvQRBFU/?igsh=cmR3OHJhaTJ2Njh3" className="w-12 h-12 bg-white/5 hover:bg-gold-accent rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/athul-jacob-8a4529267" className="w-12 h-12 bg-white/5 hover:bg-gold-accent rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="mailto:athuljacob007@gmail.com" className="w-12 h-12 bg-white/5 hover:bg-gold-accent rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-display font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 font-body text-gray-400">
                <li><Link href="#about" className="hover:text-gold-accent transition-colors">About Us</Link></li>
                <li><Link href="#portfolio" className="hover:text-gold-accent transition-colors">Portfolio</Link></li>
                <li><Link href="#services" className="hover:text-gold-accent transition-colors">Services</Link></li>
                <li><Link href="#contact" className="hover:text-gold-accent transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-display font-bold mb-4">Contact Info</h3>
              <ul className="space-y-2 font-body text-gray-400">
                <li>K. Narayanapura, Kothanur, Bengaluru, Karnataka 560077, India</li>
                <li className="pt-2">
                  <a href="mailto:athuljacob007@gmail.com" className="hover:text-gold-accent transition-colors">
                    athuljacob007@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+916282464045" className="hover:text-gold-accent transition-colors">
                    +91 6282464045
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