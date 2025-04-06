
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who can use EVidya Pathshala?",
    answer: "EVidya Pathshala is designed specifically for students from 6th to 10th standard following the State Board curriculum. Teachers and parents can also use the platform to support their students' learning journey."
  },
  {
    question: "Is EVidya Pathshala aligned with the latest State Board syllabus?",
    answer: "Yes, all our content is carefully aligned with the latest State Board curriculum guidelines. We regularly update our materials to ensure they match any syllabus changes or updates."
  },
  {
    question: "How can I track my progress on the platform?",
    answer: "EVidya Pathshala provides detailed progress tracking features. You can monitor your learning journey through your personal dashboard, which shows your progress in each subject, completed chapters, quiz scores, and areas for improvement."
  },
  {
    question: "Can I access EVidya Pathshala on mobile devices?",
    answer: "Yes, EVidya Pathshala is fully responsive and accessible on smartphones, tablets, laptops, and desktop computers. You can learn anytime, anywhere using your preferred device."
  },
  {
    question: "Are there practice tests and quizzes available?",
    answer: "Absolutely! We provide a variety of practice quizzes, chapter tests, and mock exams to help you assess your understanding and prepare for your board examinations effectively."
  },
  {
    question: "How do I get started with EVidya Pathshala?",
    answer: "Simply create an account, select your grade level, and start exploring the subjects and chapters. Our intuitive interface makes navigation easy, allowing you to begin your learning journey immediately."
  }
];

export default function FAQsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-gray-600">Find answers to common questions about EVidya Pathshala</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-10 text-center">
          <p className="text-gray-600">Still have questions?</p>
          <a href="/contact" className="mt-2 inline-block font-medium text-ap-blue hover:underline">
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
}
