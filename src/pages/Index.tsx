
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
      
      {/* Hero Section - with animations */}
      <section className="bg-gradient-to-b from-white to-ap-red/5 relative py-28 overflow-hidden">
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
        
        {/* Animated educational elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-contain opacity-10" 
             style={{backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"20\" viewBox=\"0 0 100 20\"><path d=\"M21.184 20c.357-.13.72-.264.888-.14 1.255.914 2.78 1.288 4.285 1.954 2.776 1.166 5.48.873 8.24.164 2.76-.71 5.175-1.047 7.943-.68 1.298.347 2.572.764 3.905 1.043 2.037.342 4.04-.032 6.003-.737 2.255-.816 4.425-1.874 6.71-2.648 1.72-.583 3.497-.612 5.248-.082 2.654.804 5.198 1.957 7.915 2.647 1.575.4 3.212.36 4.81-.085 2.044-.544 4.014-1.374 6.087-1.847 2.53-.577 5.046.32 7.5 1.06 3.354 1.007 6.372 2.87 9.734 3.872 1.304.39 2.67.5 4.013.437 1.165-.046 2.297-.397 3.367-.948 3.36-1.577 6.816-2.98 10.366-4.015 1.53-.446 3.09-.815 4.678-.974 1.832-.186 3.61.182 5.337.896 1.323.547 2.678 1.037 4.027 1.536.46.17.94.41 1.354.654.975.574 1.998.964 3.082 1.25 2.53.67 5.008.323 7.508-.2 3.647-.775 7.312-1.464 11.02-1.876 2.9-.323 5.782-.175 8.662.184 1.198.15 2.402.265 3.6.424 1.89.252 3.807.124 5.668-.31 2.53-.586 5.12-.747 7.7-.596 1.462.083 2.932.123 4.39.32 1.892.288 3.812.387 5.736.346 1.76-.037 3.466-.485 5.176-.895 2.223-.53 4.453-1.044 6.636-1.837.727-.246 1.43-.573 2.132-.89 2.285-1.034 4.675-1.67 7.143-1.937 1.38-.138 2.723-.306 4.107-.233 3.932.21 7.864.423 11.797.637 1.99.107 3.975.27 5.963.416 1.78.156 3.535.45 5.162 1.3.907.457 1.873.822 2.83 1.18.56.21 1.17.304 1.76.447 2.303.622 4.603-.84 6.904-.142 1.497.22 2.984.474 4.49.62 2.878.246 5.758.404 8.637.645 1.42.107 2.8.415 4.14.912 2.47.916 4.91 1.738 7.565 1.77 2.254-.002 4.393-.754 6.62-1.116 2.713-.474 5.415-.69 8.142-.625 3.246.174 6.395.927 9.593 1.39 3.09.448 6.15.14 9.063-.941 2.777-1.044 5.355-2.573 8.07-3.773 1.152-.507 2.293-1.06 3.514-1.4 2.643-.713 5.2-.99 7.906-.748 2.06.193 4.093.695 6.142 1.036 1.414.25 2.787.73 4.184 1.076 1.304.33 2.62.605 3.937.866 1.665.303 3.316.694 4.97 1.07 1.77.395 3.548.767 5.348 1.035 2.21.313 4.33.2 6.414-.504 2.77-.94 5.572-1.796 8.36-2.686 2.315-.736 4.635-1.433 6.992-2.037 4.296-1.107 8.698-1.346 13.137-1.256 1.47.033 2.94.114 4.408.2 1.956.122 3.903.317 5.86.396 1.984.083 3.968.137 5.952.135 1.254-.002 2.507-.1 3.76-.15 1.083-.046 2.156-.245 3.216-.498 2.57-.61 5.133-1.246 7.693-1.904 1.366-.35 2.703-.894 4.053-1.34 1.815-.594 3.675-.923 5.574-1.042 1.438-.09 2.853.044 4.25.332 1.99.4 3.903 1.076 5.813 1.753 1.373.487 2.75.972 4.145 1.402 2.97.917 6.014 1.35 9.11 1.073 1.321-.12 2.64-.32 3.964-.36 2.592-.12 5.162.343 7.677 1.015 2.67.746 5.304 1.651 7.97 2.43 2.764.8 5.586 1.063 8.455.892 2.36-.14 4.687-.585 7.03-.893 2.77-.399 5.552-.697 8.326-1.06 1.607-.21 3.208-.464 4.8-.77 1.975-.38 3.944-.81 5.934-1.11 2.07-.31 4.146-.502 6.25-.254 2.256.265 4.362 1.22 6.546 1.83 2.2.61 4.394 1.24 6.604 1.83 2.83.762 5.69 1.09 8.58.463 3.937-.867 7.342-3.135 10.44-5.734 1.287-1.087 2.644-2.07 4.24-2.593 2.828-.93 5.734-.843 8.64-.48 3.785.476 7.512 1.447 11.26 2.21 1.55.323 3.09.73 4.655.987 2.123.345 4.268.505 6.412.697 4.38.393 8.747.418 13.04-.58 2.402-.555 4.678-1.573 6.965-2.513 2.024-.836 4.057-1.668 6.13-2.386 2.663-.923 5.39-1.483 8.205-1.313 1.26.07 2.52.146 3.78.205 1.15.045 2.29-.02 3.395-.33 1.206-.338 2.44-.6 3.614-1.03 1.268-.45 2.55-.877 3.83-1.304.922-.325 1.83-.672 2.697-1.136.95-.464 1.81-1.09 2.59-1.803 1.218-1.11 2.74-1.764 4.39-2.224 1.352-.385 2.7-.778 4.073-1.083 3.43-.725 6.933-.966 10.43-.786 3.184.163 6.362.413 9.55.5 2.78.072 5.568.24 8.33-.052 2.657-.285 5.28-.79 7.918-1.24 2.922-.476 5.846-.923 8.783-1.293 6.035-.762 12.077-1.452 18.13-2.012 3.48-.333 6.96-.386 10.44-.22 3.064.167 6.128.388 9.188.652 5.348.475 10.703.847 16.06 1.168 3.217.183 6.432.46 9.65.602 3.68.157 7.343.073 10.908-.9 2.98-.803 5.973-1.58 8.922-2.492 1.587-.491 3.108-1.158 4.566-1.95 1.735-.922 3.652-1.38 5.646-1.56 2.7-.257 5.374.284 7.994.97.912.244 1.798.6 2.696.9.904.29 1.78.66 2.63 1.072 2.51 1.193 5.096 2.12 7.857 2.3 1.976.116 3.93-.144 5.846-.617 1.895-.464 3.805-.87 5.69-1.37 2.158-.57 4.296-1.218 6.468-1.736 2.09-.5 4.235-.68 6.39-.77 2.516-.075 4.99.526 7.333 1.474 2.38.94 4.645 2.09 6.98 3.11 1.25.548 2.57.93 3.945 1.03 1.954.128 3.82-.343 5.673-.95 2.555-.812 5.08-1.72 7.652-2.493 2.67-.788 5.362-1.408 8.2-1.345 2.217.05 4.33.693 6.353 1.68 1.976.96 3.876 2.092 5.837 3.09 1.347.683 2.87.864 4.39.657 1.83-.247 3.578-.935 5.312-1.607 2.482-.96 4.983-1.894 7.58-2.585 1.26-.338 2.52-.707 3.8-.964 2.127-.43 4.267-.715 6.44-.666 1.267.03 2.535.116 3.803.156 1.273.052 2.55-.022 3.806-.252 2.29-.396 4.58-.793 6.876-1.164 2.95-.462 5.908-.792 8.866-1.166 2.543-.303 5.096-.492 7.653-.57 2.01-.064 4.01.14 5.955.695 2.262.627 4.44 1.524 6.674 2.254 1.372.45 2.79.777 4.24.818 1.937.06 3.837-.42 5.697-1.07 2.69-.927 5.363-1.915 8.088-2.75 2.177-.662 4.415-1.12 6.71-1.148 2.57.02 5.06.61 7.45 1.52 1.83.696 3.643 1.458 5.54 1.98 2.128.595 4.333.862 6.52.618 1.23-.127 2.387-.526 3.524-.993 2.434-1.01 4.81-2.154 7.28-3.08 2.31-.916 4.722-1.427 7.23-1.27 1.318.11 2.605.48 3.856.93 2.293.878 4.49 1.98 6.74 2.972.44.196.86.432 1.273.68 2.56 1.742 5.377 2.97 8.477 3.353 3.04.388 6.013-.284 8.883-1.326 2.207-.745 4.392-1.572 6.602-2.317 2.906-.927 5.845-1.734 8.84-2.32 2.492-.505 5.032-.7 7.58-.784 1.16-.038 2.307-.245 3.465-.366 1.233-.13 2.45-.352 3.645-.67 2.17-.554 4.363-1.063 6.563-1.485 1.71-.346 3.432-.68 5.167-.901 1.066-.153 2.14-.236 3.214-.333.872-.082 1.738-.206 2.613-.264 1.042-.072 2.09-.066 3.135-.102 1.08-.056 2.16-.136 3.243-.14l.5-.002c.267-.007.535-.01.802-.012\"/></svg>')"}}>
        </div>

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
