
import { GraduationCap, BookOpen, Users, BarChart } from "lucide-react";
import Navbar from "@/components/Navbar";
import GradeCard from "@/components/GradeCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const gradeData = [
  {
    grade: 6,
    title: "6th Standard",
    description: "Begin your middle school journey with essential foundations.",
    color: "blue",
  },
  {
    grade: 7,
    title: "7th Standard",
    description: "Build on your knowledge with more advanced concepts.",
    color: "green",
  },
  {
    grade: 8,
    title: "8th Standard",
    description: "Deepen your understanding with complex topics.",
    color: "yellow",
  },
  {
    grade: 9,
    title: "9th Standard",
    description: "Prepare for high school with critical thinking skills.",
    color: "orange",
  },
  {
    grade: 10,
    title: "10th Standard",
    description: "Get ready for board exams with comprehensive study materials.",
    color: "red",
  },
];

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

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-ap-light-blue/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              <span className="gradient-text">AP Vidya Pathshala</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Digital learning platform for students following the AP State Government curriculum from 6th to 10th standard.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="rounded-full bg-ap-blue hover:bg-ap-blue/90">
                <Link to="/dashboard">
                  Start Learning
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="ml-4 rounded-full">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Grade Selection */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Choose Your Grade</h2>
            <p className="mt-4 text-gray-600">Select your grade to access curriculum-aligned learning materials</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gradeData.map((grade) => (
              <GradeCard
                key={grade.grade}
                grade={grade.grade}
                title={grade.title}
                description={grade.description}
                color={grade.color}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Why AP Vidya Pathshala?</h2>
            <p className="mt-4 text-gray-600">Designed specifically for AP state curriculum students</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-all">
                <div className="inline-flex items-center justify-center p-3 bg-ap-blue/10 text-ap-blue rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-ap-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Start Learning?</h2>
          <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto">
            Join thousands of students across Andhra Pradesh who are improving their academic performance with AP Vidya Pathshala.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full bg-white text-ap-blue hover:bg-gray-100">
            <Link to="/dashboard">
              Get Started Now
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-ap-blue" />
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
