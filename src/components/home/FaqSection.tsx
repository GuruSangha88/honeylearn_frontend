
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const faqs = [
    {
      question: "What age is HoneyLearn best for?",
      answer: "HoneyLearn is designed for kids ages 5 to 12, with age-appropriate lessons that grow with your child."
    },
    {
      question: "What subjects does HoneyLearn cover?",
      answer: "We focus on real-world life skills — including money, entrepreneurship, leadership, communication, mindset, goal-setting, and critical thinking."
    },
    {
      question: "Is this a replacement for school?",
      answer: "No. HoneyLearn is a powerful supplement to traditional education. We teach the essential skills that schools often skip — in a fun, kid-friendly format."
    },
    {
      question: "How are the lessons taught?",
      answer: "Through interactive videos, games, and quizzes. Each lesson is short, engaging, and easy for kids to follow independently or with a parent."
    },
    {
      question: "How much time does it take each week?",
      answer: "Just 15–30 minutes a few times per week is all it takes to start building life-long skills and confidence."
    },
    {
      question: "Is it safe and ad-free?",
      answer: "Absolutely. HoneyLearn is 100% kid-safe, ad-free, and designed with child development experts to support healthy screen time."
    },
    {
      question: "Do parents get to track progress?",
      answer: "Yes! You'll get access to a parent dashboard to track learning progress, see completed lessons, and celebrate your child's wins."
    },
    {
      question: "What if my child doesn't like it?",
      answer: "We offer a free trial and a satisfaction guarantee — so you can try it risk-free. Most kids love the mix of fun challenges and real-world learning."
    },
    {
      question: "Can I use it for homeschooling?",
      answer: "Definitely. Many homeschool families use HoneyLearn as a core life skills curriculum to complement academic subjects."
    },
    {
      question: "How much does it cost?",
      answer: "We offer both monthly and annual plans, with affordable pricing to fit your family. Plus, your first lessons are free to explore."
    }
  ];

  return (
    <section className="bg-tutor-dark-gray py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="glass-card">
              <AccordionTrigger className="text-lg font-semibold text-white px-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white px-6 pb-4">
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

