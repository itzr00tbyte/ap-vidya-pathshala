import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

type TestimonialProps = {
  content: string;
  name: string;
  role: string;
  color?: string;
}

const Testimonial = ({ content, name, role, color = "blue" }: TestimonialProps) => {
  return (
    <div className={cn(
      "p-6 rounded-xl h-full flex flex-col",
      color === "blue" && "bg-ev-blue/5 border-l-4 border-ev-blue",
      color === "green" && "bg-ev-green/5 border-l-4 border-ev-green",
      color === "yellow" && "bg-ev-yellow/5 border-l-4 border-ev-yellow",
    )}>
      <blockquote className="flex-1 text-gray-600 italic text-sm md:text-base">
        "{content}"
      </blockquote>
      <div className="mt-4 flex items-center space-x-3">
        <div className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center",
          color === "blue" && "bg-ev-blue/10 text-ev-blue",
          color === "green" && "bg-ev-green/10 text-ev-green",
          color === "yellow" && "bg-ev-yellow/10 text-ev-yellow",
        )}>
          <User className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

const testimonialData = [
  {
    content: "E Vidhya Pathshala helped my daughter improve her science scores tremendously. The interactive lessons and practice quizzes made learning enjoyable for her.",
    name: "Priya Reddy",
    role: "Parent of 8th Grade Student",
    color: "blue"
  },
  {
    content: "As a teacher, I recommend this platform to all my students. The curriculum alignment with AP State Board is perfect, and the content is presented in a very engaging way.",
    name: "Rajesh Kumar",
    role: "Mathematics Teacher",
    color: "green"
  },
  {
    content: "I used to struggle with mathematics, but the step-by-step explanations on E Vidhya Pathshala made complex concepts so much easier to understand.",
    name: "Kavitha Singh",
    role: "9th Grade Student",
    color: "yellow"
  },
  {
    content: "The progress tracking feature helps me monitor my son's learning journey. It's great to see his improvement over time and identify areas where he needs help.",
    name: "Venkat Rao",
    role: "Parent of 7th Grade Student",
    color: "blue"
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="mt-4 text-gray-600">Hear from students, parents, and teachers using E Vidhya Pathshala</p>
        </div>
        
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonialData.slice(0, 3).map((testimonial, index) => (
            <Testimonial
              key={index}
              content={testimonial.content}
              name={testimonial.name}
              role={testimonial.role}
              color={testimonial.color}
            />
          ))}
        </div>
        
        {/* Mobile carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonialData.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Testimonial
                      content={testimonial.content}
                      name={testimonial.name}
                      role={testimonial.role}
                      color={testimonial.color}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
