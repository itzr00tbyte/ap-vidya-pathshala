
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

type SlideshowCanvasProps = {
  subjectId?: string;
  chapterId?: string;
};

// Define subject-specific information for slides
const subjectSlidesData: Record<string, any> = {
  mathematics: {
    "Introduction to Algebra": [
      {
        id: 1,
        title: "Introduction to Algebra",
        content: "Algebra is a branch of mathematics dealing with symbols and the rules for manipulating these symbols. It forms the foundation for advanced mathematics.",
        imageUrl: "https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Variables and Constants",
        content: "Variables are symbols (like x, y) that represent unknown values. Constants are fixed values like 5 or 10.",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Algebraic Expressions",
        content: "Expressions like 3x + 5 combine variables, constants and operations. They're the building blocks of algebra.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 4,
        title: "Key Concepts Summary",
        content: "Remember that algebra helps us solve unknown values and express mathematical relationships symbolically.",
        imageUrl: "https://images.unsplash.com/photo-1613044433923-9e606cf8e0fa?q=80&w=1470&auto=format&fit=crop"
      }
    ],
    "Linear Equations": [
      {
        id: 1,
        title: "Linear Equations",
        content: "Linear equations are equations with variables of degree 1. They can be represented in the form ax + b = c.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Solving Linear Equations",
        content: "To solve a linear equation, isolate the variable on one side by performing the same operations on both sides.",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Graphing Linear Equations",
        content: "Linear equations can be graphed as straight lines on a coordinate plane. The slope represents the rate of change.",
        imageUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 4,
        title: "Real-World Applications",
        content: "Linear equations are used in many real-world scenarios like calculating costs, predicting trends, and analyzing data.",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1422&auto=format&fit=crop"
      }
    ],
  },
  science: {
    "Matter and Its Properties": [
      {
        id: 1,
        title: "Matter and Its Properties",
        content: "Matter is anything that has mass and takes up space. It exists in various forms around us.",
        imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "States of Matter",
        content: "Matter exists in three primary states: solid, liquid, and gas. Each state has distinctive properties.",
        imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Physical Properties",
        content: "Physical properties like mass, color, and density can be observed without changing the substance's composition.",
        imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 4,
        title: "Chemical Properties",
        content: "Chemical properties describe how a substance interacts with other substances through chemical reactions.",
        imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1470&auto=format&fit=crop"
      }
    ],
    "Force and Motion": [
      {
        id: 1,
        title: "Forces and Motion",
        content: "Forces cause objects to move, stop, or change direction. Newton's laws explain the relationship between force and motion.",
        imageUrl: "https://images.unsplash.com/photo-1520787497953-1985ca467702?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Newton's First Law",
        content: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.",
        imageUrl: "https://images.unsplash.com/photo-1547640084-2cbf7c53e14c?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Newton's Second Law",
        content: "Force equals mass times acceleration (F=ma). The greater the force, the greater the acceleration.",
        imageUrl: "https://images.unsplash.com/photo-1527066236128-2ff79f7b9705?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 4,
        title: "Newton's Third Law",
        content: "For every action, there is an equal and opposite reaction. Forces always come in pairs.",
        imageUrl: "https://images.unsplash.com/photo-1521495037281-9487483e8209?q=80&w=1470&auto=format&fit=crop"
      }
    ],
  },
  social: {
    "Ancient Indian History": [
      {
        id: 1,
        title: "Ancient Indian History",
        content: "Ancient India was home to one of the world's oldest and most advanced civilizations, dating back over 5,000 years.",
        imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1471&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Indus Valley Civilization",
        content: "The Indus Valley Civilization (3300-1300 BCE) featured advanced urban planning, sophisticated drainage systems, and standardized weights and measures.",
        imageUrl: "https://images.unsplash.com/photo-1600094329993-03fd73ef44b0?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Vedic Period",
        content: "The Vedic Period (1500-500 BCE) saw the composition of sacred texts like the Vedas, development of social structures, and foundation of Hindu philosophy.",
        imageUrl: "https://images.unsplash.com/photo-1565354177201-3ac182cb7d69?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 4,
        title: "Maurya and Gupta Empires",
        content: "The Maurya (322-185 BCE) and Gupta (320-550 CE) empires represent golden ages of Indian civilization, with advancements in art, science, and governance.",
        imageUrl: "https://images.unsplash.com/photo-1608143362029-a8c1bbf40436?q=80&w=1470&auto=format&fit=crop"
      },
    ],
    "Indian Geography": [
      {
        id: 1,
        title: "Indian Geography Overview",
        content: "India is the seventh-largest country by area, featuring diverse geographical features from the Himalayas to coastal plains.",
        imageUrl: "https://images.unsplash.com/photo-1486591978090-58e619d37fe7?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Physical Features",
        content: "Major physical features include the Himalayan mountains, Indo-Gangetic plains, desert regions, and coastal areas.",
        imageUrl: "https://images.unsplash.com/photo-1590136590531-61017c38caef?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Climate and Rivers",
        content: "India has diverse climate zones from tropical to alpine. Major rivers like the Ganges, Brahmaputra, and Indus support agriculture and settlements.",
        imageUrl: "https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=1473&auto=format&fit=crop"
      },
      {
        id: 4,
        title: "Natural Resources",
        content: "India possesses abundant natural resources including fertile soil, minerals, forests, and waterways that have shaped its development.",
        imageUrl: "https://images.unsplash.com/photo-1443890923422-7819ed4101c0?q=80&w=1470&auto=format&fit=crop"
      }
    ]
  }
};

// Default slides if specific content isn't available
const defaultSlides = [
  {
    id: 1,
    title: "Introduction",
    content: "Welcome to the chapter review. This section covers key concepts from the chapter.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Key Concepts",
    content: "Review of the main ideas and principles covered in this chapter.",
    imageUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Practice and Application",
    content: "Apply what you've learned to solve problems and understand real-world applications.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1422&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Summary",
    content: "You've reviewed the key concepts from this chapter. Remember to practice regularly.",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop"
  }
];

const SlideshowCanvas = ({ subjectId, chapterId }: SlideshowCanvasProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Use params if props are not provided
  const actualSubjectId = subjectId || params.subjectId;
  const actualChapterId = chapterId || params.chapterId;
  
  // Get subject-specific slides if available, otherwise use default slides
  const getSlides = () => {
    if (
      actualSubjectId && 
      actualChapterId && 
      subjectSlidesData[actualSubjectId] && 
      subjectSlidesData[actualSubjectId][decodeURIComponent(actualChapterId)]
    ) {
      return subjectSlidesData[actualSubjectId][decodeURIComponent(actualChapterId)];
    }
    return defaultSlides;
  };
  
  const slides = getSlides();

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

  useEffect(() => {
    // Add a class to the body to help with full height styling
    document.body.classList.add('slideshow-mode');
    return () => {
      document.body.classList.remove('slideshow-mode');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow flex flex-col">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chapter Review: {decodeURIComponent(actualChapterId || '')}</h1>
          <Button variant="outline" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-grow flex flex-col mx-4 sm:mx-6 lg:mx-8 mb-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col flex-grow">
            <div className="relative flex-grow">
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
    </div>
  );
};

export default SlideshowCanvas;
