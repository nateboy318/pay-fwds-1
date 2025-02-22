'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  firstName: string;
  email: string;
  position: string;
  company: string;
  service: string;
  feedback: string;

}

export default function Home() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    email: '',
    position: '',
    company: '',
    service: '',
    feedback: '',

  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Analyze sentiment
      const sentimentResponse = await fetch('/api/analyze-sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: formData.feedback }),
      });
  
      const sentimentData = await sentimentResponse.json();
  
      // Save feedback to the database regardless of sentiment
      await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Redirect to the sorry page if feedback is negative
      if (!sentimentData.isPositive) {
        router.push('/sorry');
        return;
      }
  
      router.push(`/success?service=${formData.service}&feedback=${encodeURIComponent(formData.feedback)}&position=${encodeURIComponent(formData.position)}&company=${encodeURIComponent(formData.company)}`);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 pt-20 sm:pt-36">
      <main className="max-w-lg mx-auto bg-white shadow-xl text-black rounded-none outline-none p-4 sm:p-6">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-6 sm:mb-8 text-left text-gray-800">Help The Next You!</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="space-y-1">
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 text-black rounded-none outline-none transition-all text-base"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 text-black rounded-none outline-none transition-all text-base"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="position" className="block text-sm font-semibold text-gray-700">Position</label>
              <input
                type="text"
                id="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 text-black rounded-none outline-none transition-all text-base"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700">Company Name</label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 text-black rounded-none outline-none transition-all text-base"
                required
              />
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <label htmlFor="service" className="block text-sm font-semibold text-gray-700">Service you are providing feedback on</label>
            <select
              id="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 text-black rounded-none outline-none transition-all appearance-none bg-white text-base"
              required
            >
              <option value="">Select a service</option>
              <option value="irs-reporting">IRS Reporting</option>
              <option value="automated-tax-withholding">Automated Tax Withholding</option>
              <option value="ach">ACH</option>
              <option value="pay-cards">Pay Cards</option>
              <option value="onboarding">Onboarding</option>
              <option value="schoox">Schoox</option>
              <option value="certification-tracking">Certification Tracking</option>
              <option value="w2-generation">W2 Generation</option>
              <option value="dedicated-rep">Dedicated Rep</option>
              <option value="job-costing">Job Costing</option>
              <option value="reporting">Reporting</option>
              <option value="performance-reviews">Performance Reviews</option>
              <option value="tax-audit">Tax Audit</option>
              <option value="asset-management">Asset Management</option>
              <option value="benefit-management">Benefit Management</option>
              <option value="workforce-ready">Workforce Ready</option>
              <option value="time-tracking">Time Tracking</option>
              <option value="pto">PTO</option>
              <option value="aso">ASO</option>
              <option value="aca">ACA</option>
              <option value="payentry">PayEntry</option>
              <option value="pay-as-you-go">Pay As You Go</option>
              <option value="poster-elite">Poster Elite</option>
              <option value="mineral">Mineral</option>
              <option value="implementation-system-building">Implementation/System Building</option>
              <option value="applicant-tracking">Applicant Tracking</option>
            </select>
          </div>

          <div className="space-y-1 mb-6">
            <label htmlFor="feedback" className="block text-sm font-semibold text-gray-700">Why do you like/dislike this service?</label>
            <textarea
              id="feedback"
              rows={3}
              value={formData.feedback}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 text-black rounded-none outline-none transition-all text-base"
              required
            ></textarea>
          </div>

          

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand1 text-white py-4 sm:py-3 px-6 rounded-none outline-none font-semibold hover:bg-blue-400 transition-colors text-base disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </main>
    </div>
  );
}
