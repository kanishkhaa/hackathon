import React, { useState, useRef } from 'react';

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

  const fileInputRef = useRef(null);

  const medicalConditions = [
    'Diabetes', 'Hypertension', 'Asthma', 
    'Heart Disease', 'Arthritis'
  ];

  const languages = [
    'English', 'Spanish', 'French', 
    'German', 'Mandarin', 'Arabic'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkboxes and multi-select
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
  };

  const handlePrescriptionImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          prescriptionImage: {
            file: file,
            preview: reader.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Complete Form Data:', formData);
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
    <div className="bg-[#1E2A3A] rounded-xl shadow-lg w-full max-w-4xl p-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        User Registration & Prescription
      </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Details Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-gray-300 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-300 mb-2">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Existing Medical Conditions */}
            <div>
              <label className="block text-gray-300 mb-2">
                Existing Medical Conditions
              </label>
              <div className="bg-gray-800 p-2 rounded-md max-h-28 overflow-y-auto">
                {medicalConditions.map((condition) => (
                  <div key={condition} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      id={condition}
                      name="existingMedicalConditions"
                      value={condition}
                      checked={formData.existingMedicalConditions.includes(condition)}
                      onChange={handleChange}
                      className="mr-2 text-blue-500"
                    />
                    <label htmlFor={condition} className="text-gray-300">
                      {condition}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-gray-300 mb-2">
                Allergies
              </label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="List any allergies"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Notification Preferences */}
            <div>
              <label className="block text-gray-300 mb-2">
                Notification Preferences *
              </label>
              <div className="bg-gray-800 p-2 rounded-md">
                {['SMS', 'Email', 'App'].map((pref) => (
                  <div key={pref} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      id={pref}
                      name="notificationPreferences"
                      value={pref.toLowerCase()}
                      checked={formData.notificationPreferences.includes(pref.toLowerCase())}
                      onChange={handleChange}
                      className="mr-2 text-blue-500"
                      required={formData.notificationPreferences.length === 0}
                    />
                    <label htmlFor={pref} className="text-gray-300">
                      {pref}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Preference */}
            <div>
              <label className="block text-gray-300 mb-2">
                Language Preference *
              </label>
              <select
                name="languagePreference"
                value={formData.languagePreference}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Language</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Prescription Details Section */}
          <div className="mt-6 bg-gray-800 p-4 rounded-md">
            <h3 className="text-lg font-semibold text-white mb-4">
              Prescription Details
            </h3>

            {/* Prescription Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">
                Upload Prescription Image
              </label>
              <div 
                className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition duration-300"
                onClick={() => fileInputRef.current.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handlePrescriptionImageUpload}
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  className="hidden"
                />
                
                {!formData.prescriptionImage ? (
                  <div className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>Drag & Drop or Click to Upload Prescription</p>
                    <p className="text-sm text-gray-500 mt-2">Supported formats: JPEG, PNG, JPG, GIF (Max 5MB)</p>
                  </div>
                ) : (
                  <div className="relative">
                    <img 
                      src={formData.prescriptionImage.preview} 
                      alt="Prescription Preview" 
                      className="max-w-full max-h-64 mx-auto rounded-lg object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-black py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-6"
          >
            Register & Save Prescription
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;