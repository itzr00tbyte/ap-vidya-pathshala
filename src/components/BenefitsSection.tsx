
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  "Comprehensive coverage of AP State Board curriculum",
  "Interactive lessons with animated explanations",
  "Self-paced learning with personalized feedback",
  "Regular practice tests and mock exams",
  "Detailed performance analytics and progress tracking",
  "Easy access on all devices, anywhere, anytime",
  "Expert teachers with years of experience",
  "Engaging content that makes learning enjoyable",
];

export default function BenefitsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-ap-green/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900">Benefits of Learning with AP Vidya Pathshala</h2>
            <p className="mt-4 text-gray-600">
              Our platform offers numerous advantages to help students excel in their academic journey.
            </p>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-ap-green flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative h-80 md:h-96">
              <div className="absolute w-full h-full bg-ap-blue rounded-lg transform rotate-3 opacity-10"></div>
              <div className="absolute w-full h-full bg-ap-green rounded-lg transform -rotate-3 opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="Students learning" 
                  className="max-w-full max-h-full rounded-lg shadow-lg"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
