import React, { useState, useRef } from 'react';
import ChapterCard from '@/components/ChapterCard';
import { SubjectButton } from '@/components/ui/subject-button';
import FractionsQuiz from './FractionsQuiz';
import { FileText, PlayCircle, Video, Home, Book, User, HelpCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-ev-green font-bold text-xl">E Vidhya</span>
              <span className="text-ev-purple font-bold text-xl ml-1">Pathshala</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="p-2 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center gap-2">
              <Home size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <Link to="/subjects" className="p-2 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center gap-2">
              <Book size={18} />
              <span className="hidden sm:inline">Subjects</span>
            </Link>
            <Link to="/profile" className="p-2 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center gap-2">
              <User size={18} />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <Link to="/help" className="p-2 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center gap-2">
              <HelpCircle size={18} />
              <span className="hidden sm:inline">Help</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">© 2023 E Vidhya Pathshala. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-ev-green text-sm">Terms</a>
            <a href="#" className="text-gray-600 hover:text-ev-green text-sm">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-ev-green text-sm">Contact</a>
            <a href="#" className="text-gray-600 hover:text-ev-green text-sm">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const chapters = [
  {
    title: 'Fractions',
    description: 'Learn about types of fractions, equivalent fractions, and operations on fractions.',
    status: 'completed',
    duration: '45 mins',
    progress: 100,
    color: 'green',
  },
  {
    title: 'Algebra Equations',
    description: 'Explore algebraic equations and their solutions.',
    status: 'in-progress',
    duration: '60 mins',
    progress: 50,
    color: 'blue',
  },
];

const FractionsLearningPage: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState('chapters');
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    setShowVideo(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
        });
      }
    }, 100);
  };

  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setShowVideo(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8">
          {/* Navigation Tabs */}
          <div className="flex flex-col space-y-4 mb-8">
            <div className="flex justify-center w-full bg-white rounded-lg p-2">
              <button
                className={`w-full py-3 text-center rounded-lg font-medium text-lg transition-all duration-200 ${
                  activeTab === 'chapters' 
                    ? 'bg-rose-100 text-green-600' 
                    : 'hover:bg-gray-50 text-gray-500'
                }`}
                onClick={() => setActiveTab('chapters')}
              >
                Chapters
              </button>
              <button
                className={`w-full py-3 text-center rounded-lg font-medium text-lg transition-all duration-200 ${
                  activeTab === 'resources' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50 text-gray-500'
                }`}
                onClick={() => setActiveTab('resources')}
              >
                Resources
              </button>
              <button
                className={`w-full py-3 text-center rounded-lg font-medium text-lg transition-all duration-200 ${
                  activeTab === 'quizzes' 
                    ? 'bg-purple-50 text-purple-600' 
                    : 'hover:bg-gray-50 text-gray-500'
                }`}
                onClick={() => setActiveTab('quizzes')}
              >
                Tests & Quizzes
              </button>
              <button
                className={`w-full py-3 text-center rounded-lg font-medium text-lg transition-all duration-200 ${
                  activeTab === 'discussions' 
                    ? 'bg-orange-50 text-orange-600' 
                    : 'hover:bg-gray-50 text-gray-500'
                }`}
                onClick={() => setActiveTab('discussions')}
              >
                Discussions
              </button>
            </div>
          </div>

          {showVideo && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
                <button 
                  onClick={handleCloseVideo}
                  className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 z-10"
                >
                  <X className="h-6 w-6" />
                </button>
                <video 
                  ref={videoRef}
                  className="w-full aspect-video"
                  controls
                  src="/videos/fractions.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}

          {activeTab === 'chapters' && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Chapters</h2>
              <div className="space-y-5">
                {/* Fractions Chapter Card (without Review button) */}
                <div className="border-2 border-ev-green/30 bg-white rounded-lg p-4 sm:p-5 card-hover w-full shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-ev-green/15 text-ev-green rounded-full p-2">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                      </span>
                      <div>
                        <div className="font-semibold text-lg text-gray-900">Fractions</div>
                        <div className="text-sm text-gray-700">Learn about types of fractions, equivalent fractions, and operations on fractions.</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-ev-green whitespace-nowrap">45 mins</div>
                  </div>
                  <div className="mb-2">
                    <div className="h-2 bg-ev-green/15 rounded-full">
                      <div className="h-2 bg-ev-green rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <div className="text-ev-green font-medium text-sm mt-1">Completed</div>
                  </div>
                </div>
                {/* Theory Content Section */}
                <div className="bg-white border-2 border-ev-green/20 rounded-lg p-4 sm:p-6 mt-2 w-full shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-ev-green">Fractions: Theory & Examples</h3>
                  <ul className="list-disc pl-6 mb-4 text-gray-800 space-y-2 text-sm">
                    <li><span className="font-semibold">Types of Fractions:</span> Proper (e.g., 3/8), Improper (e.g., 5/4), Mixed (e.g., 1 2/3)</li>
                    <li><span className="font-semibold">Equivalent Fractions:</span> Fractions that represent the same value (e.g., 1/2 = 2/4 = 4/8)</li>
                    <li><span className="font-semibold">Operations:</span> Addition, subtraction, multiplication, and division of fractions</li>
                    <li><span className="font-semibold">Simplifying Fractions:</span> Reducing fractions to their simplest form by dividing both numerator and denominator by their greatest common factor (GCF)</li>
                    <li><span className="font-semibold">Comparing Fractions:</span> Determining which fraction is larger by converting to equivalent fractions with a common denominator</li>
                    <li><span className="font-semibold">Converting Between Forms:</span> Changing between improper fractions and mixed numbers</li>
                  </ul>
                  
                  <div className="mb-4 bg-ev-green/5 p-3 rounded-md text-gray-800 border border-ev-green/20">
                    <p className="font-semibold mb-2 text-ev-green text-sm">Examples:</p>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium">Addition:</p>
                        <p className="mb-1">1/4 + 1/2 = 1/4 + 2/4 = 3/4</p>
                        <p>2/5 + 1/3 = 6/15 + 5/15 = 11/15</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">Subtraction:</p>
                        <p className="mb-1">3/4 − 1/8 = 6/8 − 1/8 = 5/8</p>
                        <p>7/12 − 1/4 = 7/12 − 3/12 = 4/12 = 1/3</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">Multiplication:</p>
                        <p className="mb-1">2/3 × 3/5 = 6/15 = 2/5</p>
                        <p>1 1/2 × 2/3 = 3/2 × 2/3 = 6/6 = 1</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">Division:</p>
                        <p className="mb-1">(5/6) ÷ (2/3) = 5/6 × 3/2 = 15/12 = 1 1/4</p>
                        <p>2 1/4 ÷ 1/2 = 9/4 ÷ 1/2 = 9/4 × 2/1 = 18/4 = 4 1/2</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">Converting Between Forms:</p>
                        <p className="mb-1">Improper to Mixed: 7/3 = 2 1/3 (Divide: 7 ÷ 3 = 2 remainder 1, so it's 2 1/3)</p>
                        <p>Mixed to Improper: 2 3/5 = (2 × 5 + 3)/5 = 13/5</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">Simplifying Fractions:</p>
                        <p className="mb-1">24/36 = 12/18 = 6/9 = 2/3 (Dividing by the GCF at each step)</p>
                        <p>15/25 = 3/5 (Dividing both numbers by 5)</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">Comparing Fractions:</p>
                        <p>2/3 and 3/5: Convert to 10/15 and 9/15 → 2/3 {'>'} 3/5</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                      <h4 className="font-semibold mb-2 text-blue-700">Key Rules to Remember</h4>
                      <ol className="list-decimal pl-4 space-y-1 text-gray-800">
                        <li>When adding or subtracting fractions, you need a common denominator</li>
                        <li>When multiplying fractions, multiply numerators and multiply denominators</li>
                        <li>When dividing fractions, multiply by the reciprocal of the second fraction</li>
                        <li>Always simplify your final answer</li>
                        <li>The LCD (Least Common Denominator) is the LCM (Least Common Multiple) of the denominators</li>
                      </ol>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded-md border border-purple-200">
                      <h4 className="font-semibold mb-2 text-purple-700">Real-World Applications</h4>
                      <ul className="list-disc pl-4 space-y-1 text-gray-800">
                        <li>Recipes: 1/2 cup of sugar, 3/4 teaspoon of salt</li>
                        <li>Measurements: 2/3 of a meter, 1/4 inch</li>
                        <li>Time: 3/4 of an hour = 45 minutes</li>
                        <li>Money: 1/4 of $20 = $5</li>
                        <li>Probability: 3/5 chance of success</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="text-sm bg-yellow-50 p-2 rounded-md border border-yellow-200 text-yellow-800 inline-flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    Tip: Always simplify your answers!
                  </div>
                </div>
                {/* Video Section */}
                <div className="bg-white border-2 border-ev-purple/20 rounded-lg p-4 sm:p-6 mt-2 w-full shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-ev-purple">Video Lesson: Understanding Fractions</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative cursor-pointer group" onClick={handlePlayVideo}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-4 shadow-lg transform transition-transform group-hover:scale-110">
                        <PlayCircle className="h-12 w-12 text-ev-purple" />
                      </div>
                    </div>
                    <div className="w-full h-full bg-gradient-to-r from-ev-purple/20 to-ev-green/20 flex items-center justify-center">
                      <div className="text-center">
                        <h4 className="font-bold text-lg text-gray-800">Fractions Video Lesson</h4>
                        <p className="text-sm text-gray-600">Click to play</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700 text-sm">
                    This comprehensive video explains the concept of fractions, types of fractions, and operations with fractions through visual examples and step-by-step explanations.
                  </p>
                </div>
                {/* Fractions Quiz Card */}
                <div className="border-2 border-ev-purple/30 bg-white rounded-lg p-4 sm:p-5 card-hover flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-ev-purple/15 rounded-lg text-ev-purple">
                      <PlayCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Fractions Quiz</h4>
                      <p className="text-sm text-gray-700 mt-1">Test your understanding of fractions</p>
                    </div>
                  </div>
                  <SubjectButton
                    variant="default"
                    size="sm"
                    isQuizStyle
                    subjectColor="purple"
                    className="bg-ev-purple hover:bg-ev-purple/90 text-white font-medium w-full sm:w-auto"
                    onClick={() => setShowQuiz(true)}
                  >
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Start Quiz
                  </SubjectButton>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Study Materials */}
                <div className="bg-gradient-to-br from-ev-purple/10 to-white rounded-xl p-4 sm:p-5 border-2 border-ev-purple/30 shadow-sm w-full">
                  <div className="flex justify-between items-center">
                    <div className="p-2 bg-white rounded-lg text-ev-purple shadow-sm">
                      <FileText className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium bg-ev-purple/10 text-ev-purple px-2 py-1 rounded">PDF</span>
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900">Study Materials</h3>
                  <p className="text-sm text-gray-700 mt-2">Comprehensive notes and examples for all chapters.</p>
                  <SubjectButton variant="outline" size="sm" subjectColor="purple" className="mt-4 w-full font-medium border-2">Download</SubjectButton>
                </div>
                {/* Video Tutorials */}
                <div className="bg-gradient-to-br from-ev-purple/10 to-white rounded-xl p-4 sm:p-5 border-2 border-ev-purple/30 shadow-sm w-full">
                  <div className="flex justify-between items-center">
                    <div className="p-2 bg-white rounded-lg text-ev-purple shadow-sm">
                      <Video className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium bg-ev-purple/10 text-ev-purple px-2 py-1 rounded">VIDEO</span>
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900">Video Tutorials</h3>
                  <p className="text-sm text-gray-700 mt-2">Watch video explanations of key concepts.</p>
                  <SubjectButton 
                    variant="outline" 
                    size="sm" 
                    subjectColor="purple" 
                    className="mt-4 w-full font-medium border-2"
                    onClick={handlePlayVideo}
                  >
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Watch Video
                  </SubjectButton>
                </div>
                {/* Practice Worksheets */}
                <div className="bg-gradient-to-br from-ev-purple/10 to-white rounded-xl p-4 sm:p-5 border-2 border-ev-purple/30 shadow-sm w-full">
                  <div className="flex justify-between items-center">
                    <div className="p-2 bg-white rounded-lg text-ev-purple shadow-sm">
                      <FileText className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium bg-ev-purple/10 text-ev-purple px-2 py-1 rounded">PDF</span>
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900">Practice Worksheets</h3>
                  <p className="text-sm text-gray-700 mt-2">Printable worksheets with practice problems.</p>
                  <SubjectButton variant="outline" size="sm" subjectColor="purple" className="mt-4 w-full font-medium border-2">Download</SubjectButton>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quizzes' && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tests & Quizzes</h2>
              <div className="space-y-5">
                <div className="border-2 border-ev-purple/30 bg-white rounded-lg p-4 sm:p-5 card-hover flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-ev-purple/15 rounded-lg text-ev-purple">
                      <PlayCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Fractions Quiz</h4>
                      <p className="text-sm text-gray-700 mt-1">Test your understanding of fractions</p>
                    </div>
                  </div>
                  <SubjectButton
                    variant="default"
                    size="sm"
                    isQuizStyle
                    subjectColor="purple"
                    className="bg-ev-purple hover:bg-ev-purple/90 text-white font-medium w-full sm:w-auto"
                    onClick={() => {
                      setShowQuiz(true);
                      setActiveTab('chapters');
                    }}
                  >
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Start Quiz
                  </SubjectButton>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'discussions' && (
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Discussions</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-600">No active discussions for this topic yet.</p>
                <button className="mt-4 bg-ev-orange/90 hover:bg-ev-orange text-white px-4 py-2 rounded-md font-medium">
                  Start a New Discussion
                </button>
              </div>
            </div>
          )}

          {showQuiz && (
            <div className="mt-8">
              <SubjectButton subjectColor="purple" variant="outline" className="mb-4 w-full sm:w-auto font-medium border-2" onClick={() => setShowQuiz(false)}>
                ← Back to Chapters
              </SubjectButton>
              <FractionsQuiz />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FractionsLearningPage; 