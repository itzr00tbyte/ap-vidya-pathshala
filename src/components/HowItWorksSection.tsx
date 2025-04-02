
import { Target, BookMarked, Sparkles, Medal } from "lucide-react";

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

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How AP Vidya Pathshala Works</h2>
          <p className="mt-4 text-gray-600">Simple steps to improve your academic performance</p>
        </div>
        
        <div className="relative">
          {/* Timeline connector */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
          
          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center md:mb-16`}>
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <div className={`mx-auto md:mx-0 ${index % 2 === 0 ? 'md:ml-auto md:mr-10' : 'md:mr-auto md:ml-10'} max-w-md p-6 bg-white rounded-xl shadow-sm border border-gray-100`}>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                <div className="z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-white mb-4 md:mb-0">
                  <div className={`p-2 rounded-full ${step.color}`}>
                    {step.icon}
                  </div>
                </div>
                
                <div className="w-full md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
