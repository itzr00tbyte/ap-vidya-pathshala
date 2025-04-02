
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

type SlideshowCanvasProps = {
  subjectId?: string;
  chapterId?: string;
};

const SlideshowCanvas = ({ subjectId, chapterId }: SlideshowCanvasProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Use params if props are not provided
  const actualSubjectId = subjectId || params.subjectId;
  const actualChapterId = chapterId || params.chapterId;
  
  // Mock slides data - in a real app, this would be fetched from an API
  const slides = [
    {
      id: 1,
      title: "Introduction",
      content: "Welcome to the chapter review for " + actualChapterId,
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Key Concepts",
      content: "Review of the main concepts covered in this chapter.",
      imageUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Practice Problems",
      content: "Solve these problems to test your understanding.",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1422&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Summary",
      content: "In conclusion, you've learned the fundamental concepts of this chapter.",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleClose = () => {
    navigate(`/subject/${actualSubjectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Chapter Review: {actualChapterId}</h1>
          <Button variant="outline" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative h-96">
            {slides[currentSlide].imageUrl && (
              <div className="absolute inset-0">
                <img 
                  src={slides[currentSlide].imageUrl} 
                  alt={slides[currentSlide].title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
            )}
            
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {slides[currentSlide].title}
              </h2>
              <p className="text-xl text-white/90">
                {slides[currentSlide].content}
              </p>
            </div>
          </div>
          
          <div className="p-4 flex items-center justify-between border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Slide {currentSlide + 1} of {slides.length}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePrevious}
                disabled={currentSlide === 0}
              >
                <ArrowLeft className="mr-1 h-4 w-4" /> Previous
              </Button>
              
              <Button 
                size="sm"
                onClick={handleNext}
                disabled={currentSlide === slides.length - 1}
              >
                Next <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideshowCanvas;
