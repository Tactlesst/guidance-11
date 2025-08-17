import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {Menu,Search,MapPin,Phone,Facebook,Youtube,MessageCircle,ChevronDown,X} from 'lucide-react';

export default function Homepage() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 1,
      title: "Counselling",
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      description: "Professional guidance and support for personal growth and academic success."
    },
    {
      id: 2,
      title: "Student Profiling",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      description: "Comprehensive assessment to understand each student's unique needs and potential."
    },
    {
      id: 3,
      title: "Mental Health Awareness",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      description: "Promoting mental wellness and providing resources for emotional well-being."
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className={`bg-white shadow-sm transition-all duration-300 ${isScrolled ? 'fixed w-full top-0 z-50 shadow-lg' : ''}`}>
        {/* Top bar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-2 sm:py-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-500/90"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            {/* Mobile top bar */}
            <div className="flex md:hidden justify-between items-center text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-2 h-2 text-white" />
                </div>
                <span className="text-white font-medium">Balingasag, Misamis Oriental</span>
              </div>
<button
  onClick={() => router.push('/loginpage')}
  className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-50 transition-all duration-200"
>
  Login
</button>
            </div>
            
            {/* Desktop top bar */}
            <div className="hidden md:flex justify-between items-center text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 transform hover:scale-105 transition-transform duration-200">
                  <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white font-medium">Balingasag Misamis Oriental</span>
                </div>
                <div className="flex items-center space-x-1 transform hover:scale-105 transition-transform duration-200">
                  <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white font-medium">0963-123-4567</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-white/90">Follow us on:</span>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200 hover:scale-110">
                    <img src="/images/facebook.png" alt="Facebook" className="w-3 h-3" />
                  </div>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200 hover:scale-110">
                    <img src="/images/youtube1.png" alt="YouTube" className="w-3 h-3" />
                  </div>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200 hover:scale-110">
                    <img src="/images/chat.png" alt="Messenger" className="w-3 h-3" />
                  </div>
                </div>
<button
  onClick={() => router.push('/loginpage')}
  className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-50 transition-all duration-200"
>
  Login
</button>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
              <img 
                src="/images/guidancelogo.png" 
                alt="SRCB Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-all duration-300"
              />
              <div className="group-hover:translate-x-1 transition-transform duration-300">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">SRCB</h1>
                <p className="text-xs sm:text-sm text-gray-600 group-hover:text-blue-500 transition-colors duration-300">GUIDANCE SYSTEM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="hidden sm:block relative">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-all duration-200 hover:scale-110" />
                <div className="absolute -inset-2 bg-blue-100 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200 -z-10"></div>
              </div>
              <div className="relative">
                <Menu 
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-all duration-200 hover:scale-110" 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
                <div className="absolute -inset-2 bg-blue-100 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200 -z-10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-all duration-200" />
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="space-y-2">
                <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">Home</a>
                <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">Services</a>
                <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">About</a>
                <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">Contact</a>
              </div>
              <div className="flex space-x-3 pt-3 border-t">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <img src="/images/facebook.png" alt="Facebook" className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <img src="/images/youtube1.png" alt="YouTube" className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <img src="/images/chat.png" alt="Messenger" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-white/5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 sm:bottom-20 left-1/4 w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </div>
        
        {/* Background building image */}
        <div className="absolute inset-0">
          <img 
            src="/images/bghero.png" 
            alt="SRCB Building" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/60"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="text-white max-w-full sm:max-w-md md:max-w-lg animate-fade-in text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
              Welcome to the SRCB Guidance System
            </h2>
            <p className="text-sm sm:text-base mb-4 sm:mb-6 text-blue-100">
              Guiding You to a Brighter Future
            </p>
            <button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 bg-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{
          backgroundImage: "url('/images/gradient_2.jpg')"
        }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="flex justify-center order-2 md:order-1">
              <div className="relative group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-white/10 rounded-full absolute inset-0 group-hover:scale-110 transition-transform duration-500"></div>
                <img 
                  src="/images/guidancelogo.png" 
                  alt="SRCB Logo" 
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain relative z-10 group-hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
            <div className="text-white space-y-4 sm:space-y-6 order-1 md:order-2">
              <div className="group hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-300">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-blue-100">Vision:</h3>
                <p className="text-sm sm:text-base text-blue-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                  To be a leading guidance center that empowers students to achieve their full potential through comprehensive support and innovative programs.
                </p>
              </div>
              <div className="group hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-300 delay-100">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-blue-100">Mission:</h3>
                <p className="text-sm sm:text-base text-blue-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                  To provide quality guidance services that promote personal growth, academic excellence, and mental wellness for all students.
                </p>
              </div>
              <div className="group hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-300 delay-200">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-blue-100">Objectives:</h3>
                <p className="text-sm sm:text-base text-blue-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                  To foster holistic development, provide academic support, and create a supportive environment for student success and well-being.
                </p>
              </div>
            </div>
          </div>
        </div> 
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-3 sm:mb-4">Our Services</h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-8 sm:mb-12 rounded-full"></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300 p-4 sm:p-6 rounded-lg hover:bg-gray-50"
                style={{animationDelay: `${index * 200}ms`}}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="relative">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${activeService === service.id ? 'scale-110 bg-gradient-to-br from-blue-600 to-blue-500' : ''}`}>
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                    </svg>
                  </div>
                  <div className="absolute -inset-2 bg-blue-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className={`text-xs sm:text-sm text-gray-600 transition-all duration-300 px-2 ${activeService === service.id ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-1'}`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent)] opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Logo and Description */}
            <div className="sm:col-span-2 lg:col-span-1 group text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-3 mb-4">
                <img 
                  src="/images/guidancelogo.png" 
                  alt="guidance Logo" 
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain group-hover:scale-110 transition-all duration-300"
                />
                <div className="group-hover:translate-x-1 transition-transform duration-300">
                  <h3 className="font-bold text-base sm:text-lg">SRCB</h3>
                  <p className="text-xs sm:text-sm text-blue-200">GUIDANCE SYSTEM</p>
                </div>
              </div>
              <p className="text-blue-200 text-xs sm:text-sm mb-4 group-hover:text-blue-100 transition-colors duration-300">
                Nurturing Faith, Passion for Excellence & Commitment for Humble Service.
              </p>
              <div className="flex justify-center sm:justify-start space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
                  <img src="/images/facebook.png" alt="Facebook" className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
                  <img src="/images/chat.png" alt="Instagram" className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
                  <img src="/images/youtube1.png" alt="YouTube" className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="group text-center sm:text-left">
              <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3 text-blue-200">
                <li><a href="#" className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block text-xs sm:text-sm">Home</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block text-xs sm:text-sm">Vision & Mission</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block text-xs sm:text-sm">Services</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200 hover:translate-x-1 inline-block text-xs sm:text-sm">Contact us</a></li>
              </ul>
            </div>

            {/* Contacts */}
            <div className="group text-center sm:text-left">
              <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Contacts</h4>
              <div className="space-y-2 sm:space-y-3 text-blue-200">
                <div className="hover:text-blue-100 transition-colors duration-200">
                  <p className="text-xs sm:text-sm"><strong>Mobile Phone:</strong><br />0961-123-4567</p>
                </div>
                <div className="hover:text-blue-100 transition-colors duration-200">
                  <p className="text-xs sm:text-sm"><strong>Email Address:</strong><br />guidance@srcb.com</p>
                </div>
                <div className="hover:text-blue-100 transition-colors duration-200">
                  <p className="text-xs sm:text-sm"><strong>Address:</strong><br />
                  St. Rita's College of Balingasag<br />
                  Balingasag, Misamis Oriental<br />
                  9005 Philippines</p>
                </div>
              </div>
            </div>

             {/* Our Location */}
            <div className="group sm:col-span-2 lg:col-span-1">
              <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg text-center sm:text-left">Our Location</h4>
              <div className="w-full h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.459694169281!2d124.77186077478632!3d8.7427439934046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ffe1f6278f7e77%3A0x6048de1929e6e531!2sSt.%20Rita&#39;s%20College%20of%20Balingasag!5e0!3m2!1sen!2sph!4v1751966089241!5m2!1sen!2sph"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="mt-2 text-center sm:text-left">
                <a 
                  href="https://www.google.com/maps/search/St.+Rita's+College+of+Balingasag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-blue-100 text-xs sm:text-sm transition-colors duration-200 hover:underline"
                >
                  View larger map →
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
            <p className="text-blue-200 text-xs sm:text-sm hover:text-blue-100 transition-colors duration-300">© 2025 SRCB Guidance Center. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}