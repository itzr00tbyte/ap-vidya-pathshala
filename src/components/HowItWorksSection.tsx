import { Target, BookMarked, Sparkles, Medal } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Choose Your Grade",
    description: "Select your grade to access curriculum-aligned learning materials specifically designed for AP State Board students.",
    color: "bg-ap-blue/10 text-ap-blue"
  },
  {
    icon: <BookMarked className="h-6 w-6" />,
    title: "Learn at Your Pace",
    description: "Access interactive lessons, videos, and practice materials at your own pace and convenience.",
    color: "bg-ap-green/10 text-ap-green"
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Practice & Review",
    description: "Strengthen your understanding through quizzes, tests and revision materials with instant feedback.",
    color: "bg-ap-yellow/10 text-ap-yellow"
  },
  {
    icon: <Medal className="h-6 w-6" />,
    title: "Track Your Progress",
    description: "Monitor your performance with detailed analytics and celebrate your learning achievements.",
    color: "bg-ap-orange/10 text-ap-orange"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -45 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.2
    }
  }
};

// Connector animation that draws the line
const connectorVariants = {
  hidden: { height: 0 },
  visible: { 
    height: "100%",
    transition: { 
      duration: 1.5,
      ease: "easeInOut" 
    }
  }
};

// Educational pattern elements for the background
const educationalElements = [
  { shape: "circle", size: "w-20 h-20", position: "top-10 left-10", opacity: "opacity-5", delay: 0.5 },
  { shape: "triangle", size: "w-24 h-24", position: "bottom-10 right-10", opacity: "opacity-5", delay: 0.7 },
  { shape: "square", size: "w-16 h-16", position: "top-1/4 right-1/3", opacity: "opacity-5", delay: 0.9 },
  { shape: "pi", size: "text-6xl", position: "bottom-1/4 left-1/3", opacity: "opacity-5", delay: 1.1 },
  { shape: "sigma", size: "text-7xl", position: "top-1/2 right-1/4", opacity: "opacity-5", delay: 1.3 },
  { shape: "division", size: "text-5xl", position: "bottom-20 left-20", opacity: "opacity-5", delay: 1.5 },
];

// Function to render shape based on type
const renderShape = (shape: string) => {
  switch (shape) {
    case 'circle':
      return <div className="rounded-full bg-ap-yellow"></div>;
    case 'triangle':
      return <div className="triangle border-b-[40px] border-l-[20px] border-r-[20px] border-b-ap-red border-l-transparent border-r-transparent h-0 w-0"></div>;
    case 'square':
      return <div className="bg-ap-green"></div>;
    case 'pi':
      return <span className="text-ap-blue font-serif">π</span>;
    case 'sigma':
      return <span className="text-ap-orange font-serif">∑</span>;
    case 'division':
      return <span className="text-ap-red font-serif">÷</span>;
    default:
      return null;
  }
};

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-white overflow-hidden relative">
      {/* Educational pattern background */}
      <div className="absolute inset-0 w-full h-full pattern-grid opacity-10"></div>
      
      {/* Animated educational elements */}
      {educationalElements.map((elem, index) => (
        <motion.div
          key={index}
          className={`absolute ${elem.position} ${elem.size} ${elem.opacity} flex items-center justify-center z-0`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.1, 
            scale: 1,
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: elem.delay,
            ease: "easeInOut"
          }}
        >
          {renderShape(elem.shape)}
        </motion.div>
      ))}
      
      {/* Mathematical formulas pattern */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full z-0 opacity-[0.03]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1.5 }}
      >
        <div className="pattern-dots text-ap-blue"></div>
      </motion.div>
      
      {/* Wave pattern */}
      <svg className="absolute bottom-0 left-0 w-full opacity-10" 
        viewBox="0 0 1440 320" 
        preserveAspectRatio="none">
        <motion.path 
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.2, pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,208C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="#FFD700"
          fillOpacity="0.2"
          stroke="#E53935"
          strokeWidth="1"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 relative">
            <span className="relative inline-block">
              How AP Vidya Pathshala Works
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-ap-yellow to-ap-red"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <motion.p 
            className="mt-4 text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Simple steps to improve your academic performance
          </motion.p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline connector - animated */}
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ap-yellow via-ap-orange to-ap-red transform -translate-x-1/2"
            variants={connectorVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
          
          {/* Steps */}
          <motion.div 
            className="space-y-12 md:space-y-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center md:mb-16`}
                variants={itemVariants}
              >
                <motion.div 
                  className="w-full md:w-1/2 mb-6 md:mb-0"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div 
                    className={`mx-auto md:mx-0 ${index % 2 === 0 ? 'md:ml-auto md:mr-10' : 'md:mr-auto md:ml-10'} max-w-md p-6 bg-white rounded-xl shadow-sm border border-gray-100`}
                    whileHover={{ 
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                      background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,250,240,0.8))"
                    }}
                  >
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-white mb-4 md:mb-0"
                  variants={iconVariants}
                  whileHover={{ 
                    scale: 1.2,
                    boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)"
                  }}
                >
                  <div className={`p-2 rounded-full ${step.color}`}>
                    {step.icon}
                  </div>
                </motion.div>
                
                <div className="w-full md:w-1/2"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Floating educational elements */}
        <div className="relative h-20 mt-8">
          <motion.div 
            className="absolute left-[10%] top-0 w-12 h-12 text-ap-yellow/20 text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            animate={{ y: [0, -10, 0] }}
            viewport={{ once: true }}
          >
            +
          </motion.div>
          
          <motion.div 
            className="absolute left-[25%] bottom-0 w-8 h-8 rounded-md border-2 border-ap-red/20 rotate-12"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            animate={{ rotate: [12, 0, 12] }}
            viewport={{ once: true }}
          />
          
          <motion.div 
            className="absolute right-[30%] top-1/2 w-12 h-12 text-ap-green/20 text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            animate={{ y: [0, -10, 0] }}
            viewport={{ once: true }}
          >
            ÷
          </motion.div>
          
          <motion.div 
            className="absolute right-[15%] top-0 w-10 h-10 rounded-full border-2 border-ap-yellow/20"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            animate={{ x: [0, 10, 0] }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </section>
  );
}
