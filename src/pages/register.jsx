import React, { useState, useRef } from 'react';
import { Info, Upload, CheckCircle, AlertCircle } from 'lucide-react';

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    existingMedicalConditions: [],
    allergies: '',
    notificationPreferences: [],
    languagePreference: '',
    prescriptionImage: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const medicalConditions = [
    'Diabetes', 'Hypertension', 'Asthma', 
    'Heart Disease', 'Arthritis', 'Cancer',
    'Epilepsy', 'Kidney Disease', 'Liver Disease'
  ];

  const languages = [
    'English', 'Spanish', 'French', 
    'German', 'Mandarin', 'Arabic',
    'Portuguese', 'Russian', 'Hindi'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prevState => {
        if (name === 'notificationPreferences' || name === 'existingMedicalConditions') {
          const updatedArray = checked 
            ? [...prevState[name], value]
            : prevState[name].filter(item => item !== value);
          return { ...prevState, [name]: updatedArray };
        }
        return prevState;
      });
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    // Clear specific field error when user starts typing/selecting
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };


  const validateForm = () => {
    const errors = {};

    // Validation rules
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required';
    }

    if (!formData.gender) {
      errors.gender = 'Gender is required';
    }

    if (!formData.languagePreference) {
      errors.languagePreference = 'Language Preference is required';
    }

    if (formData.notificationPreferences.length === 0) {
      errors.notificationPreferences = 'Select at least one notification preference';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    console.log('Complete Form Data:', formData);
    setFormSubmitted(true);
    
    setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            formData: formData,
            registrationSuccessful: true 
          } 
        });
      }, 1000);
    };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1A2B3C] to-[#2C3E50] flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl w-full max-w-5xl p-8">
        {formSubmitted ? (
          <div className="text-center text-white space-y-4">
            <CheckCircle className="mx-auto text-green-400" size={64} />
            <h2 className="text-3xl font-bold">Registration Successful!</h2>
            <p className="text-gray-300">Your information has been securely submitted.</p>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
              <Info className="text-blue-400" size={36} />
              Patient Registration Form
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-gray-200 mb-2 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/10 text-white border rounded-xl focus:outline-none focus:ring-2 transition duration-300 ${
                        formErrors.fullName 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-white/20 focus:ring-blue-500'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.fullName && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-2" /> {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-200 mb-2 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/10 text-white border rounded-xl focus:outline-none focus:ring-2 transition duration-300 ${
                        formErrors.email 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-white/20 focus:ring-blue-500'
                      }`}
                      placeholder="you@example.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-2" /> {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-gray-200 mb-2 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/10 text-white border rounded-xl focus:outline-none focus:ring-2 transition duration-300 ${
                        formErrors.phoneNumber 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-white/20 focus:ring-blue-500'
                      }`}
                      placeholder="+1 (123) 456-7890"
                    />
                    {formErrors.phoneNumber && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-2" /> {formErrors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-gray-200 mb-2 font-medium">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/10 text-white border rounded-xl focus:outline-none focus:ring-2 transition duration-300 ${
                        formErrors.dateOfBirth 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-white/20 focus:ring-blue-500'
                      }`}
                    />
                    {formErrors.dateOfBirth && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-2" /> {formErrors.dateOfBirth}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Medical and Preference Details */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Gender */}
                <div>
                  <label className="block text-gray-200 mb-2 font-medium">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 text-white border rounded-xl focus:outline-none focus:ring-2 transition duration-300 ${
                      formErrors.gender 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/20 focus:ring-blue-500'
                    }`}
                  >
                    <option value="" className="bg-[#2C3E50]">Select Gender</option>
                    <option value="male" className="bg-[#2C3E50]">Male</option>
                    <option value="female" className="bg-[#2C3E50]">Female</option>
                    <option value="other" className="bg-[#2C3E50]">Other</option>
                  </select>
                  {formErrors.gender && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle size={16} className="mr-2" /> {formErrors.gender}
                    </p>
                  )}
                </div>

                {/* Allergies */}
                <div>
                  <label className="block text-gray-200 mb-2 font-medium">
                    Allergies
                  </label>
                  <input
                    type="text"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="List any known allergies"
                    className="w-full px-4 py-3 bg-white/10 text-white border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  />
                </div>

                {/* Existing Medical Conditions */}
                <div>
                  <label className="block text-gray-200 mb-2 font-medium">
                    Existing Medical Conditions
                  </label>
                  <div className="bg-white/10 p-4 rounded-xl max-h-48 overflow-y-auto border border-white/20">
                    {medicalConditions.map((condition) => (
                      <div key={condition} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={condition}
                          name="existingMedicalConditions"
                          value={condition}
                          checked={formData.existingMedicalConditions.includes(condition)}
                          onChange={handleChange}
                          className="mr-3 text-blue-500 bg-white/20 border-white/30 rounded"
                        />
                        <label htmlFor={condition} className="text-gray-300">
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Language Preference */}
                <div>
                  <label className="block text-gray-200 mb-2 font-medium">
                    Language Preference
                  </label>
                  <select
                    name="languagePreference"
                    value={formData.languagePreference}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 text-white border rounded-xl focus:outline-none focus:ring-2 transition duration-300 ${
                      formErrors.languagePreference 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/20 focus:ring-blue-500'
                    }`}
                  >
                    <option value="" className="bg-[#2C3E50]">Select Language</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang.toLowerCase()} className="bg-[#2C3E50]">
                        {lang}
                      </option>
                    ))}
                  </select>
                  {formErrors.languagePreference && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle size={16} className="mr-2" /> {formErrors.languagePreference}
                    </p>
                  )}
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="mt-6">
                <label className="block text-gray-200 mb-2 font-medium">
                  Notification Preferences
                </label>
                <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex space-x-4">
                  {['SMS', 'Email', 'App'].map((pref) => (
                    <div key={pref} className="flex items-center">
                      <input
                        type="checkbox"
                        id={pref}
                        name="notificationPreferences"
                        value={pref.toLowerCase()}
                        checked={formData.notificationPreferences.includes(pref.toLowerCase())}
                        onChange={handleChange}
                        className="mr-2 text-blue-500 bg-white/20 border-white/30 rounded"
                      />
                      <label htmlFor={pref} className="text-gray-300">
                        {pref}
                      </label>
                    </div>
                  ))}
                </div>
                {formErrors.notificationPreferences && (
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <AlertCircle size={16} className="mr-2" /> {formErrors.notificationPreferences}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-black py-3 rounded-xl hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-6 font-semibold text-lg"
              >
                Submit Registration
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Form;