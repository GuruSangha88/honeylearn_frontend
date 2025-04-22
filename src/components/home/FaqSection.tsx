
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const faqs = [
    {
      question: "Is this safe for my child?",
      answer: "Absolutely! We prioritize your child's safety with strict content moderation, secure infrastructure, and COPPA-compliant practices. All activities are designed with child safety in mind."
    },
    {
      question: "What's included in each course?",
      answer: "Each course includes interactive video lessons, hands-on activities, games, quizzes, and real-world challenges. Courses are designed to be engaging while teaching practical skills."
    },
    {
      question: "Can multiple kids use one account?",
      answer: "Yes! You can create separate profiles for each child under one family account, allowing each child to track their own progress and achievements."
    },
    {
      question: "Do I need to supervise every activity?",
      answer: "While we encourage parent involvement, our platform is designed to be independently navigable by children. We'll notify you of key achievements and when support might be helpful."
    }
  ];

  return (
    <section className="bg-tutor-dark-gray py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="glass-card">
              <AccordionTrigger className="text-lg font-semibold text-tutor-purple px-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-6 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
