import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: 'What is GetListed?',
      answer: 'To empower African startups by providing them with the visibility, connections, and resources they need to build world-changing companies.',
      isOpen: false
    },
    {
      question: 'How do I create an account?',
      answer: 'Creating an account is easy! Just click on the "Sign Up" button on the top right corner of the page, choose your account type and fill in your details. You will receive a confirmation email to verify your account.',
      isOpen: true
    },
    {
      question: 'How do you connect with Investors?',
      answer: 'We connect startups with investors through our platform by providing a curated list of investment opportunities, networking events, and personalized introductions based on your startup’s needs and goals.',
      isOpen: false
    },
    {
      question: 'What offer do you have for startups?',
      answer: 'We offer a range of services including access to a network of investors, mentorship programs, resources for business development, pitch deck building, startup valuation and opportunities to showcase your startup at events.',
      isOpen: false
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use industry-standard encryption and security protocols to ensure your data is always protected. We never share your information with third parties without your explicit consent.',
      isOpen: false
    }
  ]);

  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => {
      if (i === index) {
        return { ...faq, isOpen: !faq.isOpen };
      }
      return faq;
    }));
  };

  return (
    <>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-blue-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-white text-lg">
           We have gathered some well curated answers to your budding questions to help you get started.
          </p>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="flex-grow py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 bg-gray-50 rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {faq.isOpen ? (
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </span>
              </button>
              {faq.isOpen && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
    </>
  );
};

export default FAQPage;