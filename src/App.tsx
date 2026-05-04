import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Phone, ChevronRight, ChevronLeft, Star, CheckCircle2, Menu, X, Car, SprayCan, ShieldCheck, Sparkles, MapPin, Clock, Plus, Minus } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: React.ReactNode;
  image: string;
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Quality', href: '#quality' },
    { name: 'Booking', href: '#booking' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-[#0f52ba] to-[#bfe9ff] rounded-full flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter">DEE<span className="text-[#1e90ff]">WAVE</span></span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-white/70 hover:text-white transition-colors">{link.name}</a>
          ))}
          <div className="text-lg font-bold text-[#bfe9ff]">727-788-1178</div>
          <motion.button 
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 py-3 rounded-full glow-pink"
          >
            Book Now
          </motion.button>
        </div>

        <button className="md:hidden text-white p-2 glass rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="absolute top-full left-0 right-0 glass border-t border-white/10 p-8 flex flex-col gap-8 md:hidden overflow-hidden"
        >
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-xl font-display font-bold uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>{link.name}</a>
          ))}
          <div className="pt-4 border-t border-white/5 flex flex-col gap-6">
            <a href="tel:7277881178" className="flex items-center gap-3 text-[#ff7aa2] font-bold text-xl">
              <Phone size={24} /> 727-788-1178
            </a>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-5 bg-white text-black font-bold rounded-2xl text-xs uppercase tracking-[0.2em]"
            >
              Request Detailer
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center justify-center pt-24 overflow-hidden bg-black">
      <div className="wave-accent absolute bottom-0 left-0 w-full h-[300px] z-10 opacity-30 pointer-events-none" />
      
      {/* Background Video */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-105 opacity-70"
          poster="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
        >
          <source src="/deewav.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-[clamp(4rem,8vw,10rem)] font-display font-black leading-[1] mb-6 tracking-tight uppercase">
            Premium Mobile <br />
            <span className="text-gradient-blue text-white italic">Detailing</span> <br />
            At Your Doorstep
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Showroom-quality results delivered directly to your doorstep in <span className="text-[#bfe9ff] font-bold">Tampa Bay & Bradenton Area</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
            <motion.button 
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary w-full sm:w-auto px-16 py-6 rounded-full glow-pink text-sm uppercase tracking-[0.2em] font-black"
            >
              Get My Quote
            </motion.button>
            <motion.a 
              href="tel:7277881178"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary w-full sm:w-auto px-16 py-6 rounded-full flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em]"
            >
              Call Now
            </motion.a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-8 border-t border-white/5">
             <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-[0.3em]">5.0 Google Rating</span>
             </div>
             <div className="w-px h-10 bg-white/10 hidden md:block" />
             <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-[#1e90ff]">
                    <MapPin size={18} />
                    <span className="text-sm font-bold text-white">Full Bay Area Coverage</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-[0.3em]">Tampa • Bradenton • St Pete</span>
             </div>
             <div className="w-px h-10 bg-white/10 hidden md:block" />
             <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-[#ff7aa2]">
                    <ShieldCheck size={18} />
                    <span className="text-sm font-bold text-white">Licensed & Insured</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-[0.3em]">Professional Standard</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services: Service[] = [
    {
      id: '1',
      title: 'The Full Reset',
      description: 'The ultimate mobile spa. Combines deep interior rejuvenation with multi-stage exterior restoration, including premium waxes and protective dressings.',
      price: '$199',
      icon: <Sparkles size={24} />,
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2031&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Interior Detail',
      description: 'Deep air-purge & vacuum of every crevice. We clean and condition all leather, vinyl, and plastic surfaces + polish interior glass for a factory-fresh cabin.',
      price: '$120',
      icon: <Car size={24} />,
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Exterior Detail',
      description: 'Multi-stage hand wash, industrial-grade wheel & tire restoration, bug/tar removal, and premium paint sealant for maximum gloss and protection.',
      price: '$100',
      icon: <SprayCan size={24} />,
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop'
    },
    {
      id: '4',
      title: 'Ceramic Coating',
      description: '9H professional-grade protection for lasting showroom shine and hydrophobic qualities.',
      price: 'Inquire',
      icon: <ShieldCheck size={24} />,
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop'
    }
  ];

  const addons = [
    { name: "Pet Hair Removal", price: "+$50" },
    { name: "Engine Bay Detail", price: "+$50" },
    { name: "Headlight Restoration", price: "+$75" },
    { name: "Ozone Odor Removal", price: "+$50" },
    { name: "Carpet Shampooing", price: "Starts at $125" },
    { name: "Paint Correction", price: "Contact Desmond" },
    { name: "Waxing Service", price: "Contact Desmond" }
  ];

  return (
    <section id="services" className="py-32 bg-black overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#1e90ff] blur-[150px] opacity-10" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <h2 className="text-5xl font-black tracking-tighter text-gradient-blue text-center md:text-left uppercase">Select Your Tier</h2>
          <p className="text-white/40 text-center md:text-right max-w-md">Precision mobile care for the most discerning vehicle owners in the Tampa Bay area.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`glass p-8 rounded-3xl group hover:border-[#1e90ff]/50 transition-all ${idx === 0 ? 'border-l-2 border-l-[#1e90ff]' : ''}`}
            >
              <div className={`mb-6 p-4 rounded-2xl inline-block ${idx === 0 ? 'text-[#1e90ff]' : 'text-[#bfe9ff]'}`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase">{service.title}</h3>
              <p className="text-white/50 text-sm mb-8 leading-relaxed font-light">
                {service.description}
              </p>
              <div className="text-[#bfe9ff] font-bold text-lg">{service.price === 'Inquire' ? 'Inquire with DeeWave' : `From ${service.price}`}</div>
            </motion.div>
          ))}
        </div>

        {/* Add-ons Grid */}
        <div className="glass p-10 rounded-[40px] border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-white/5 opacity-5 pointer-events-none">
                <Sparkles size={120} />
            </div>
            <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest text-[#bfe9ff]">Premium Add-Ons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {addons.map((addon) => (
                    <div key={addon.name} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#1e90ff]/30 transition-all group">
                        <span className="text-white/80 font-medium group-hover:text-white">{addon.name}</span>
                        <span className="text-[#1e90ff] font-bold text-sm tracking-widest uppercase">{addon.price}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

const QualitySection = () => {
  const reviews = [
    { 
      name: "Dylan Young", 
      role: "Toyota Camry Owner", 
      quote: "Desmond came to my home in Seminole Heights and transformed my car, which had been in need of a deep clean. Absolutely delighted.",
      verified: true
    },
    { 
      name: "Patricia Cook", 
      role: "Verified Client", 
      quote: "Desmond is punctual, professional and his rates are reasonable. He more than satisfied me with the deep cleaning of my vehicle.",
      verified: true
    },
    { 
      name: "MaryAnn Schaediger", 
      role: "Multi-Vehicle Client", 
      quote: "Exceptional service! He took the necessary time to take care of my two vehicles. I highly recommend him!",
      verified: true
    },
    { 
      name: "nancy porter", 
      role: "Verified Client", 
      quote: "My car is 8 years old. After the treatment, it was like new. No more scratches. I will definitely call Desmond again.",
      verified: true
    },
    { 
      name: "Jordan Sibley", 
      role: "Verified Client", 
      quote: "I want to thank Deewave Mobile Detailing for their excellent work cleaning my two vehicles! They have regained their former shine!",
      verified: true
    },
    { 
      name: "deanna marks", 
      role: "Verified Client", 
      quote: "Excellent work! I am really delighted with his attention to detail. He is exceptional! Thank you!",
      verified: true
    },
    { 
      name: "Erin Morris", 
      role: "Verified Client", 
      quote: "My car has never looked so good! Impeccable and very convenient service: I didn't even have to leave my house.",
      verified: true
    },
    { 
      name: "Michael Copponex", 
      role: "Cherokee Owner", 
      quote: "Desmond put our old Cherokee back in condition for sale and it is impeccable. He even made my son's electric Bronco shine!",
      verified: true
    },
    { 
      name: "Lance MONTGOMERY", 
      role: "SUV & Pickup Owner", 
      quote: "What can I say? Absolutely FANTASTIC! Desmond and Deshaun from Deewave are exceptional. My vehicles are like new.",
      verified: true
    },
    { 
      name: "joell yonker", 
      role: "Verified Client", 
      quote: "He did a great job on my cars. He took his time, without rushing! Very polite and punctual.",
      verified: true
    },
    { 
      name: "Harold Ridge", 
      role: "Verified Client", 
      quote: "I love this Mobile garage. They have never let me down and my car always stays clean. Thanks Dez!",
      verified: true
    },
    { 
      name: "Angela Gibson", 
      role: "Verified Client", 
      quote: "Desmond did a fantastic job on three of our vehicles. One of them hadn't been cleaned in about ten years. It was like new.",
      verified: true
    },
    { 
      name: "James.3rd", 
      role: "Verified Client", 
      quote: "I recently had my car deep cleaned and I am absolutely delighted. The technician showed great professionalism.",
      verified: true
    },
    { 
      name: "Corey Carter", 
      role: "Verified Client", 
      quote: "Professional and punctual, Deewave brings a touch of shine. Highly recommend their mobile service.",
      verified: true
    },
    { 
      name: "karen ward", 
      role: "2001 Camry Owner", 
      quote: "Desmond was great. I was able to get an appointment easily. He was professional and efficient with my 2001 Camry.",
      verified: true
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section id="quality" className="py-32 relative bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 ocean-bg opacity-30" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-[#bfe9ff] font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
                >
                  The Quality Standard
                </motion.span>
                <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight uppercase">Quality Without Compromise</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                {[
                    { title: "Mobile Service", desc: "We come to your home or office in Pinellas, Hillsborough, Pasco, & Bradenton Area." },
                    { title: "Expert Polishing", desc: "Professional paint correction and polishing for a mirror-like finish." },
                    { title: "Ceramic Coating", desc: "Long-term protection with the industry's best 9H ceramic coatings." }
                ].map((item, i) => (
                    <motion.div 
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 glass rounded-[40px] border-white/5 relative group hover:border-[#1e90ff]/30 transition-all overflow-hidden"
                    >
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#1e90ff]/10 blur-2xl group-hover:bg-[#1e90ff]/30 transition-all rounded-full" />
                        <h4 className="text-xl font-bold mb-4 uppercase tracking-wider text-[#bfe9ff] relative z-10">{item.title}</h4>
                        <p className="text-white/50 font-light leading-relaxed relative z-10">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div className="flex flex-col items-center md:items-start">
                         <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-2">Google Reviews</h3>
                         <div className="flex items-center gap-2">
                             <div className="flex text-yellow-400">
                                 {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                             </div>
                             <span className="text-white/60 font-bold uppercase tracking-widest text-[10px]">5.0 Rating</span>
                         </div>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/5 hover:text-white transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button 
                            onClick={() => setActiveIndex((prev) => (prev + 1) % reviews.length)}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/5 hover:text-white transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="relative h-[400px] md:h-[300px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 p-12 glass rounded-[48px] border-white/10 glow-blue flex flex-col justify-center items-center text-center"
                        >
                            <div className="flex justify-center gap-1 text-[#ff7aa2] mb-8">
                                {[...Array(5)].map((_, j) => <Star key={j} size={24} fill="currentColor" />)}
                            </div>
                            <p className="text-xl md:text-2xl font-light leading-relaxed italic mb-8 max-w-2xl">"{reviews[activeIndex].quote}"</p>
                            <div className="flex flex-col items-center gap-2">
                                <span className="font-black uppercase tracking-[0.2em] text-[#bfe9ff] text-base">{reviews[activeIndex].name}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                    <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{reviews[activeIndex].role} • Verified Experience</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                
                <div className="flex justify-center gap-3 mt-12">
                    {reviews.map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => setActiveIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 bg-[#1e90ff]' : 'bg-white/10'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        vehicle: '',
        service: ''
    });
    
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    const addonsList = [
        { id: "pet", name: "Pet Hair Removal", price: "+$50" },
        { id: "engine", name: "Engine Bay Detail", price: "+$50" },
        { id: "headlight", name: "Headlight Restoration", price: "+$75" },
        { id: "carpet", name: "Carpet Shampooing", price: "Starts at $125" },
        { id: "odor", name: "Ozone Odor Removal", price: "+$50" },
        { id: "paint", name: "Paint Correction", price: "Contact Desmond" },
        { id: "wax", name: "Waxing Service", price: "Contact Desmond" }
    ];

    const handleAddonToggle = (addonName: string) => {
        setSelectedAddons(prev => 
            prev.includes(addonName) 
                ? prev.filter(a => a !== addonName) 
                : [...prev, addonName]
        );
    };

    const sendSMS = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, address, phone: phoneInput, vehicle, service } = formData;

        if (!name || !address || !phoneInput || !vehicle || !service) {
            alert("Please fill out all required fields");
            return;
        }

        const message = `New Booking - DeeWave 🚗

Name: ${name}
Phone: ${phoneInput}
Address: ${address}

Vehicle: ${vehicle}
Service: ${service}

Add-ons: ${selectedAddons.length ? selectedAddons.join(", ") : "None"}
`;

        const ownerPhone = "+17277881178";
        const url = `sms:${ownerPhone}?body=${encodeURIComponent(message)}`;
        window.location.href = url;
    };

    return (
        <section id="booking" className="py-40 relative overflow-hidden bg-black flex items-center justify-center">
            <div className="absolute inset-0 ocean-bg z-0" />
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 w-full items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1]">EXPERIENCE THE <br/><span className="text-gradient-blue text-white uppercase italic">DEEWAVE CALIBER.</span></h2>
                    <p className="text-xl text-white/50 font-light mb-12 max-w-lg leading-relaxed">
                      Transform your vehicle today. Our professional mobile detailing specialists cover all of <span className="text-white font-medium">Tampa Bay & Bradenton Area</span>.
                    </p>
                    
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4 group">
                            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-[#ff7aa2] group-hover:bg-[#ff7aa2] group-hover:text-white transition-all shadow-xl">
                                <Phone size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1 font-bold">Call Anytime</div>
                                <div className="text-2xl font-bold tracking-tight">727-788-1178</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-[#1e90ff] group-hover:bg-[#1e90ff] group-hover:text-white transition-all shadow-xl">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1 font-bold">Service Area</div>
                                <div className="text-2xl font-bold tracking-tight">Tampa Bay & Bradenton Area</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass p-8 md:p-12 rounded-[48px] glow-blue border-white/10 backdrop-blur-2xl relative"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#1e90ff] blur-[100px] opacity-20"></div>
                    <form className="space-y-6" onSubmit={sendSMS}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold ml-1">Full Name</label>
                                <input 
                                    required 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="John Doe" 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#1e90ff] transition-all text-white placeholder-white/10" 
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold ml-1">Address</label>
                                <input 
                                    required 
                                    type="text" 
                                    value={formData.address}
                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                    placeholder="123 Street, City" 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#1e90ff] transition-all text-white placeholder-white/10" 
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold ml-1">Phone Number</label>
                                <input 
                                    required 
                                    type="tel" 
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    placeholder="727-555-0123" 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#1e90ff] transition-all text-white placeholder-white/10" 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold ml-1">Vehicle</label>
                                <select 
                                    required 
                                    value={formData.vehicle}
                                    onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                                    className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#1e90ff] transition-all appearance-none cursor-pointer text-white"
                                >
                                    <option value="">Select Type</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Truck/Van">Truck / Van</option>
                                    <option value="Motorcycle">Motorcycle</option>
                                    <option value="RV/Camper">RV / Camper</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold ml-1">Service</label>
                                <select 
                                    required 
                                    value={formData.service}
                                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                                    className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#1e90ff] transition-all appearance-none cursor-pointer text-white"
                                >
                                    <option value="">Select Service</option>
                                    <option value="Interior Detail Only">Interior Detail Only</option>
                                    <option value="Exterior Detail Only">Exterior Detail Only</option>
                                    <option value="Full Detail">The Full Reset</option>
                                    <option value="Ceramic Coating">Ceramic Coating</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-4 font-bold ml-1">Custom Add-Ons</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {addonsList.map((addon) => (
                                    <label key={addon.id} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-all select-none">
                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedAddons.includes(`${addon.name} (${addon.price})`) ? 'bg-[#1e90ff] border-[#1e90ff]' : 'border-white/20'}`}>
                                            {selectedAddons.includes(`${addon.name} (${addon.price})`) && <CheckCircle2 size={14} className="text-white" />}
                                        </div>
                                        <input 
                                            type="checkbox" 
                                            className="hidden"
                                            checked={selectedAddons.includes(`${addon.name} (${addon.price})`)}
                                            onChange={() => handleAddonToggle(`${addon.name} (${addon.price})`)}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-white/80">{addon.name}</span>
                                            <span className="text-[9px] text-[#1e90ff] font-bold tracking-widest">{addon.price}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full py-6 btn-primary rounded-2xl glow-pink uppercase tracking-[0.3em] font-black text-sm shadow-2xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all">
                          Book Now via SMS
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

const ProcessSection = () => {
    const steps = [
        {
            num: "01",
            title: "Quick Booking",
            desc: "Select your service and add-ons. Tap 'Book via SMS' to send your details in seconds."
        },
        {
            num: "02",
            title: "We Come To You",
            desc: "Our self-contained unit arrives at your home or office. No water or power hookups needed."
        },
        {
            num: "03",
            title: "Showroom Result",
            desc: "Step out to a vehicle that looks brand new. Quality guaranteed before we pack up."
        }
    ];

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#bfe9ff] font-bold text-xs uppercase tracking-[0.4em] mb-4 block"
                    >
                        THE DEEWAVE WAY
                    </motion.span>
                    <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-6 uppercase">How it works</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group"
                        >
                            <div className="text-[120px] font-black text-white/5 absolute -top-20 -left-4 leading-none group-hover:text-[#1e90ff]/10 transition-colors select-none">
                                {step.num}
                            </div>
                            <div className="relative z-10 pt-10">
                                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight text-white group-hover:text-[#1e90ff] transition-colors">{step.title}</h3>
                                <p className="text-white/40 leading-relaxed font-light">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const VideoGallery = () => {
  const videos = [
    { src: "/result1.mp4", title: "Showroom Transformation" },
    { src: "/result2.mp4", title: "Meticulous Interior Detail" },
    { src: "/result3.mp4", title: "Ceramic Protection Process" }
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#1e90ff]/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#bfe9ff] font-bold text-xs uppercase tracking-[0.4em] mb-4 block"
          >
            Experience in Motion
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-6 uppercase">Results Speak For Themselves</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass aspect-[9/16] md:aspect-video rounded-[32px] overflow-hidden group border-white/5 glow-blue relative shadow-2xl"
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover transition-all duration-700"
              >
                <source src={video.src} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-px bg-[#1e90ff]" />
                  <span className="text-[10px] text-[#bfe9ff] font-bold uppercase tracking-[0.2em]">Live Result</span>
                </div>
                <p className="text-white font-bold uppercase tracking-widest text-sm">{video.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do you need access to my water or power?",
      answer: "No. Experience DeeWave is fully self-contained. Our specialized mobile units carry professional-grade water reservoirs with reverse osmosis filtration and quiet power generators. We can transform your vehicle anywhere from a high-rise parking garage to your office parking lot."
    },
    {
      question: "Is your ceramic coating service mobile?",
      answer: "Yes, we offer mobile ceramic coating. However, for high-level coatings, we recommend a covered area (like a garage or carport) to ensure the coating cures properly away from direct sunlight and environmental debris."
    },
    {
      question: "What happens if it rains on my appointment day?",
      answer: "We monitor the Tampa Bay forecast closely. If rain is imminent, we will contact you 24 hours in advance to reschedule. Your priority placement remains valid for the new date."
    },
    {
      question: "Are the chemicals you use safe for my interior?",
      answer: "Absolutely. We use professional, pH-balanced, and biodegradable cleaners designed specifically for high-end automotive materials. Our steam cleaning process sanitizes without the need for harsh solvents."
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0f52ba]/10 blur-[150px] rounded-full" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#bfe9ff] font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block"
          >
            Zero Hassle Detail
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6">LOGISTICS & FAQS</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass rounded-3xl border-white/5 overflow-hidden transition-all duration-500 ${openIndex === index ? 'border-l-4 border-l-[#1e90ff] glow-blue' : ''}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 flex items-center justify-between text-left group"
              >
                <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${openIndex === index ? 'text-[#bfe9ff]' : 'text-white/80 group-hover:text-white'}`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-all duration-300 ${openIndex === index ? 'bg-[#1e90ff] text-white rotate-180' : 'bg-white/5 text-white/30'}`}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <motion.div 
                initial={false}
                animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8 text-white/50 font-light leading-relaxed text-base md:text-lg border-t border-white/5 pt-6">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <p className="text-white/30 italic text-sm mb-8">Don't see your question? Our team is ready to assist.</p>
            <a href="tel:7277881178" className="btn-secondary px-10 py-4 rounded-full text-xs uppercase tracking-widest inline-flex items-center gap-3">
               <Phone size={14} /> Message Detailer
            </a>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="selection:bg-[#1e90ff] selection:text-white">
      <Navbar />
      <Hero />
      
      {/* Social Proof & Trust First */}
      <QualitySection />

      {/* Services Menu */}
      <Services />
      
      {/* Result Proof */}
      <VideoGallery />

      {/* Ease of service */}
      <ProcessSection />

      {/* Brand Statement Banner */}
      <section className="py-24 bg-gradient-to-r from-[#000000] via-[#050505] to-[#000000] border-y border-white/5 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between gap-12 font-display italic font-bold text-2xl md:text-4xl text-white/30 overflow-hidden whitespace-nowrap">
              <motion.div 
                 animate={{ x: [0, -1000] }}
                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                 className="flex gap-24 shrink-0"
              >
                  <span>CERAMIC COATING EXPERTS</span>
                  <span>MOBILE CONVENIENCE</span>
                  <span>MUSEUM QUALITY SHINE</span>
                  <span>TAMPA BAY DETAILING</span>
                  <span>CERAMIC COATING EXPERTS</span>
                  <span>MOBILE CONVENIENCE</span>
                  <span>MUSEUM QUALITY SHINE</span>
              </motion.div>
          </div>
      </section>

      {/* FAQ handles objections right before booking */}
      <FAQSection />

      {/* Main Conversion Point */}
      <BookingForm />
      
      <section className="py-48 bg-gradient-to-b from-black to-[#0f1e80] text-center px-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,144,255,0.2),transparent)]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-5xl mx-auto relative z-10"
          >
              <h2 className="text-5xl md:text-[clamp(4rem,7vw,9rem)] font-display font-black mb-16 tracking-tighter leading-[1] italic uppercase">
                Experience the Ultimate <span className="text-[#1e90ff]">Shine.</span> <br /> 
                <span className="text-white/40 not-italic">Book Your DeeWave Detail Today.</span>
              </h2>
              
              <motion.button 
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 80px rgba(30,144,255,0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-24 py-10 btn-primary glow-pink rounded-3xl text-xl font-black uppercase tracking-[0.4em] shadow-[0_0_60px_rgba(255,122,162,0.4)] transition-all relative group overflow-hidden"
              >
                <span className="relative z-10">Get My Quote</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>
          </motion.div>
      </section>
      
      <footer className="py-12 border-t border-white/5 bg-black pb-32 md:pb-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/30 tracking-[0.2em] font-bold uppercase gap-6">
              <p>© {new Date().getFullYear()} EXPERIENCE DEEWAVE MOBILE DETAILING</p>
              <div className="flex flex-wrap justify-center gap-8">
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span> AVAILABLE IN TAMPA BAY</span>
              </div>
          </div>
      </footer>

      {/* Floating CTA for Mobile */}
      <AnimatePresence>
        {showFloatingButton && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-6 right-6 z-[100] md:hidden"
          >
            <button 
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-5 bg-[#1e90ff] text-white font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_20px_50px_rgba(30,144,255,0.4)] flex items-center justify-center gap-3 active:scale-95 transition-all text-xs"
            >
              <Sparkles size={16} />
              Book My Detail
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
