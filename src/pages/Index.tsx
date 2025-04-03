import { GraduationCap, BookOpen, Users, BarChart } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TestimonialsSection from "@/components/TestimonialsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import NewsletterSection from "@/components/NewsletterSection";
import FAQsSection from "@/components/FAQsSection";
import BenefitsSection from "@/components/BenefitsSection";
import GradeSelectorSection from "@/components/GradeSelectorSection";
import { motion } from "framer-motion";

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "AP State Curriculum",
    description: "Aligned with the latest AP State Board syllabus.",
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Interactive Learning",
    description: "Engage with interactive lessons and quizzes.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert Teachers",
    description: "Learn from experienced AP state board teachers.",
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics.",
  },
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Navbar />
      
      {/* Animated floating shapes background */}
      <div className="absolute inset-0 overflow-hidden -z-10 opacity-25">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-ap-yellow/30 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-60 right-20 w-80 h-80 rounded-full bg-ap-red/20 animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 rounded-full bg-ap-green/20 animate-pulse" style={{ animationDuration: '12s' }}></div>
        
        {/* Educational patterns */}
        <div className="absolute top-1/4 right-1/3 w-24 h-24 border-4 border-ap-yellow/30 rounded-lg rotate-12"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border-4 border-ap-red/30 rotate-45"></div>
        
        {/* Math symbols */}
        <div className="absolute top-1/3 left-20 text-6xl text-ap-yellow/20 font-bold">+</div>
        <div className="absolute top-2/3 right-32 text-7xl text-ap-red/20 font-bold">÷</div>
        <div className="absolute bottom-1/4 left-1/2 text-8xl text-ap-green/20 font-bold">×</div>
        <div className="absolute top-1/2 right-1/4 text-5xl text-ap-yellow/20 font-bold">−</div>
      </div>
      
      {/* Hero Section - with enhanced animations and patterns */}
      <section className="bg-gradient-to-br from-ap-blue/5 via-white to-ap-red/10 relative py-28 overflow-hidden">
        {/* Educational Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 pattern-grid z-0"></div>
        
        {/* Animated Educational Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Animated Formulas */}
          <motion.div 
            className="absolute top-10 left-[10%] text-4xl font-mono opacity-10 text-ap-blue"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          >
            E=mc²
          </motion.div>
          
          <motion.div 
            className="absolute bottom-20 right-[15%] text-3xl font-mono opacity-10 text-ap-red"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            a²+b²=c²
          </motion.div>
          
          {/* Animated Geometric Shapes */}
          <motion.div 
            className="absolute top-1/4 right-[20%] w-32 h-32 border-2 border-ap-yellow/20 rounded-lg"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 45, opacity: 0.2 }}
            transition={{ duration: 2, delay: 0.3 }}
          ></motion.div>
          
          <motion.div 
            className="absolute bottom-1/3 left-[25%] w-24 h-24 border-2 border-ap-green/20"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 15, opacity: 0.2 }}
            transition={{ duration: 2, delay: 0.5 }}
          ></motion.div>
          
          {/* Scientific Icons */}
          <div className="absolute top-1/2 left-[10%] opacity-10 text-4xl">🧪</div>
          <div className="absolute top-1/3 right-[10%] opacity-10 text-4xl">📊</div>
          <div className="absolute bottom-1/4 left-[40%] opacity-10 text-4xl">🔍</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              <span className="gradient-text">AP Vidya Pathshala</span>
            </h1>
            <motion.p 
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Digital learning platform for students following the AP State Government curriculum from 6th to 10th standard.
            </motion.p>
            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button asChild size="lg" className="rounded-full bg-ap-red hover:bg-ap-red/90">
                <Link to="/dashboard">
                  Start Learning
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="ml-4 rounded-full">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Enhanced Animated Wave Patterns */}
        {/* First wave - bottom layer */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z' fill='%239b87f5' opacity='0.25'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundSize: '100% 100%'
          }}
        />
        
        {/* Second wave - middle layer */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-32"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 1.8, delay: 0.3 }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%23F97316' opacity='0.20'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundSize: '100% 100%'
          }}
        />
        
        {/* Third wave - top layer */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-24"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 2.2, delay: 0.6 }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%230EA5E9' opacity='0.15'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundSize: '100% 100%'
          }}
        />
      </section>
      
      {/* Grade Selection with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <GradeSelectorSection />
      </motion.div>
      
      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <HowItWorksSection />
      </motion.div>
      
      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <BenefitsSection />
      </motion.div>
      
      {/* Features with staggered animation */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Why AP Vidya Pathshala?</h2>
            <p className="mt-4 text-gray-600">Designed specifically for AP state curriculum students</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-all"
                variants={fadeIn}
              >
                <div className="inline-flex items-center justify-center p-3 bg-ap-red/10 text-ap-red rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* FAQs */}
      <FAQsSection />
      
      {/* Newsletter */}
      <NewsletterSection />
      
      {/* Call to Action */}
      <section className="py-16 bg-ap-red relative overflow-hidden">
        {/* Educational background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl font-bold">+</div>
          <div className="absolute bottom-10 right-10 text-9xl font-bold">÷</div>
          <div className="absolute top-1/3 right-1/3 text-9xl font-bold">×</div>
          <div className="absolute bottom-1/3 left-1/3 text-9xl font-bold">−</div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-lg border-8 border-white/10 rotate-12"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full border-8 border-white/10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Start Learning?
          </motion.h2>
          <motion.p 
            className="mt-4 text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of students across Andhra Pradesh who are improving their academic performance with AP Vidya Pathshala.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="mt-8 rounded-full bg-white text-ap-red hover:bg-gray-100">
              <Link to="/dashboard">
                Get Started Now
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-ap-red" />
                <span className="text-xl font-bold text-white">AP Vidya Pathshala</span>
              </div>
              <p className="mt-4 text-gray-400 max-w-xs">
                A digital learning platform for AP State curriculum students.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Study Materials</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Past Papers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Video Lessons</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2023 AP Vidya Pathshala. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
