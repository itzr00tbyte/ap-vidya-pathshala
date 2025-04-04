
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Maximize2, Minimize2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type SlideshowTopicType = {
  name: string;
  presentation_link: string;
};

type SlideshowViewProps = {
  chapterTitle: string;
  topics: SlideshowTopicType[];
  initialTopicIndex?: number;
  completedTopics: string[];
  onTopicComplete: (topicName: string) => void;
  onExit: () => void;
};

const SlideshowView = ({
  chapterTitle,
  topics,
  initialTopicIndex = 0,
  completedTopics,
  onTopicComplete,
  onExit
}: SlideshowViewProps) => {
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(initialTopicIndex);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  const currentTopic = topics[currentTopicIndex];

  // Toggle fullscreen functionality
  const toggleFullscreen = useCallback(() => {
    const presentationContainer = document.getElementById('presentation-container');
    
    if (!document.fullscreenElement) {
      if (presentationContainer?.requestFullscreen) {
        presentationContainer.requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch(err => console.error(`Error attempting to enable fullscreen: ${err.message}`));
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => setIsFullscreen(false))
          .catch(err => console.error(`Error attempting to exit fullscreen: ${err.message}`));
      }
    }
  }, []);

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // This would typically be connected to the Canva embed API
  // For now, this is a placeholder for demonstration
  useEffect(() => {
    const canvaEmbedElement = document.getElementById('canva-embed');
    if (canvaEmbedElement) {
      // Listen for messages from the embedded iframe
      window.addEventListener('message', (event) => {
        // In real implementation, validate the event origin
        if (event.data && event.data.type === 'slideTransition') {
          // Check if on last slide
          if (event.data.isLastSlide) {
            setIsLastSlide(true);
          } else {
            setIsLastSlide(false);
          }
        }
      });
    }
    
    // For demonstration purposes only, we'll simulate being on the last slide after 5 seconds
    const timer = setTimeout(() => {
      setIsLastSlide(true);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      // Clean up event listener in real implementation
    };
  }, [currentTopic]);

  const handleNext = () => {
    if (isLastSlide) {
      // Mark current topic as completed
      onTopicComplete(currentTopic.name);
      
      // Move to next topic if available
      if (currentTopicIndex < topics.length - 1) {
        setCurrentTopicIndex(prev => prev + 1);
        setIsLastSlide(false);
      } else {
        // All topics completed
        onExit();
      }
    } else {
      // Control the Canva presentation to move to next slide
      const canvaEmbedElement = document.getElementById('canva-embed') as HTMLIFrameElement;
      if (canvaEmbedElement && canvaEmbedElement.contentWindow) {
        // Send a message to the iframe to move to the next slide
        canvaEmbedElement.contentWindow.postMessage({ action: 'nextSlide' }, '*');
        console.log('Moving to next slide in presentation');
      }
      
      // Simulate detecting last slide for demo
      setIsLastSlide(true);
    }
  };

  const handlePrevious = () => {
    if (currentTopicIndex > 0 && isLastSlide) {
      setCurrentTopicIndex(prev => prev - 1);
      setIsLastSlide(false);
    } else {
      // Control the Canva presentation to move to previous slide
      const canvaEmbedElement = document.getElementById('canva-embed') as HTMLIFrameElement;
      if (canvaEmbedElement && canvaEmbedElement.contentWindow) {
        // Send a message to the iframe to move to the previous slide
        canvaEmbedElement.contentWindow.postMessage({ action: 'previousSlide' }, '*');
        console.log('Moving to previous slide in presentation');
      }
      setIsLastSlide(false);
    }
  };

  // Function to handle direct navigation to a specific topic
  const handleTopicClick = (index: number) => {
    if (index !== currentTopicIndex) {
      setCurrentTopicIndex(index);
      setIsLastSlide(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{chapterTitle}</h1>
          <p className="text-gray-600 mt-1">
            {currentTopic?.name}
          </p>
        </div>
        <Button variant="outline" onClick={onExit}>
          Exit Slideshow
        </Button>
      </div>
      
      <div className="flex">
        {/* Sidebar with topics - collapsible on mobile */}
        <Sheet>
          <div className="hidden md:block w-64 shrink-0 border-r pr-4">
            <h3 className="font-medium mb-4">Topics</h3>
            <div className="space-y-3">
              {topics.map((topic, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                    index === currentTopicIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleTopicClick(index)}
                >
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                    completedTopics.includes(topic.name) 
                      ? 'bg-green-100 text-green-600' 
                      : index === currentTopicIndex 
                        ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-200' 
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {completedTopics.includes(topic.name) && (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </div>
                  <span className={`text-sm ${
                    index === currentTopicIndex ? 'font-medium' : ''
                  }`}>
                    {topic.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile sidebar trigger */}
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="sm" className="mb-4">
              View Topics
            </Button>
          </SheetTrigger>
          
          {/* Mobile sidebar content */}
          <SheetContent side="left" className="md:hidden">
            <h3 className="font-medium mb-4 mt-8">Topics</h3>
            <div className="space-y-3">
              {topics.map((topic, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                    index === currentTopicIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    handleTopicClick(index);
                    // Close sheet automatically on mobile when selecting a topic
                    document.querySelector('[data-radix-collection-item]')?.click();
                  }}
                >
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                    completedTopics.includes(topic.name) 
                      ? 'bg-green-100 text-green-600' 
                      : index === currentTopicIndex 
                        ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-200' 
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {completedTopics.includes(topic.name) && (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </div>
                  <span className={`text-sm ${
                    index === currentTopicIndex ? 'font-medium' : ''
                  }`}>
                    {topic.name}
                  </span>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Main content with Canva embed */}
        <div className="flex-1 ml-0 md:ml-6">
          <div 
            id="presentation-container" 
            className="relative bg-gray-100 rounded-lg aspect-video mb-6"
          >
            <iframe 
              id="canva-embed"
              src={`${currentTopic?.presentation_link}?embed=true&hideControls=true`}
              className="w-full h-full rounded-lg"
              allow="fullscreen"
              title={currentTopic?.name}
            />
            
            {/* Fullscreen toggle button */}
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentTopicIndex === 0 && !isLastSlide}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              variant={isLastSlide ? "default" : "default"}
              className={isLastSlide ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {isLastSlide 
                ? currentTopicIndex < topics.length - 1
                  ? 'Mark Complete & Next Topic'
                  : 'Complete Chapter'
                : 'Next Slide'
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideshowView;
