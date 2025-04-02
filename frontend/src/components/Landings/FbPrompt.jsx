import React, { useState } from 'react';

function FbPrompt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="bg-emerald-50 min-h-screen py-8 md:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Text */}
        <div className="text-emerald-800 mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            We welcome your questions and feedback.
          </h2>
          <p className="text-emerald-700">
            Reach out to us to learn more about our services or share your thoughts.
          </p>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white rounded-lg px-4 py-3 text-emerald-900 placeholder-emerald-400 border-2 border-emerald-100"
              placeholder="Name"
            />
            <span className="absolute top-3 right-4 text-emerald-600">*</span>
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white rounded-lg px-4 py-3 text-emerald-900 placeholder-emerald-400 border-2 border-emerald-100"
              placeholder="Email"
            />
            <span className="absolute top-3 right-4 text-emerald-600">*</span>
          </div>

          {/* Message Input */}
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full bg-white rounded-lg px-4 py-3 text-emerald-900 placeholder-emerald-400 border-2 border-emerald-100"
              placeholder="Your message"
            />
            <span className="absolute top-3 right-4 text-emerald-600">*</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default FbPrompt;
