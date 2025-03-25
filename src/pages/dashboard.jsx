import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { 
  Upload, 
  BookOpen, 
  Bell, 
  Search, 
  FileText, 
  AlertTriangle, 
  Mic, 
  CheckCircle, 
  XCircle,
  Filter,
  Calendar,
  PlusCircle
} from 'lucide-react';

const Dashboard = () => {
  // State Management
  const [activeSection, setActiveSection] = useState('quickActions');
  const [prescriptions, setPrescriptions] = useState([]);

  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Amoxicillin',
      time: '08:00 AM',
      taken: false,
      dosage: '500mg',
      startDate: '2024-03-20',
      endDate: '2024-03-30'
    },
    {
      id: 2,
      name: 'Lisinopril',
      time: '07:00 PM',
      taken: true,
      dosage: '10mg',
      startDate: '2024-02-15',
      endDate: '2024-04-15'
    }
  ]);

  // File Upload Handling
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processedPrescription, setProcessedPrescription] = useState(null);

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setUploadedFiles(prevFiles => [...prevFiles, ...files]);
      setProcessedPrescription(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setUploadedFiles(prevFiles => [...prevFiles, ...files]);
      setProcessedPrescription(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Voice Input Simulation
  const [voiceInput, setVoiceInput] = useState('');
  const handleVoiceInput = () => {
    // Placeholder for speech-to-text functionality
    const mockTranscription = 'Prescription for Amoxicillin 500mg';
    setVoiceInput(mockTranscription);
  };

  // Medication Reminder Handling
  const toggleMedicationStatus = (id) => {
    setMedications(prev => 
      prev.map(med => 
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };

  // Prescription Filtering
  const [searchTerm, setSearchTerm] = useState('');
  const filteredPrescriptions = prescriptions.filter(rx => 
    rx.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex">
      {/* Sidebar Navigation */}
      <div className="w-20 bg-gray-800 flex flex-col items-center py-6 space-y-4">
        {[
          { key: 'quickActions', label: 'Quick Actions', icon: <Upload /> },
          { key: 'prescriptions', label: 'Prescriptions', icon: <BookOpen /> },
          { key: 'reminders', label: 'Medication Reminders', icon: <Bell /> }
        ].map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`p-3 rounded-lg hover:bg-gray-700 transition-colors 
              ${activeSection === section.key ? 'bg-blue-600 text-black' : 'text-gray-800'}`}
            title={section.label}
          >
            {section.icon}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-grow bg-gray-900 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Quick Actions Section */}
          {activeSection === 'quickActions' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              
              {/* File Upload */}
              <div 
                className="bg-gray-800 p-6 rounded-lg border-2 border-dashed border-gray-700 text-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  className="hidden"
                />
                <Upload className="mx-auto mb-4 text-blue-400" size={48} />
                <p className="text-gray-400">
                  Drag & Drop or Click to Upload Prescription
                </p>
              </div>

              {/* Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Uploaded Files</h3>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-700 p-3 rounded-lg flex justify-between items-center"
                      >
                        <span>{file.name}</span>
                        <button className="text-red-400 hover:text-red-500">
                          <XCircle />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Processed Prescription Result */}
              {processedPrescription && (
                <div className="mt-4 bg-gray-800 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Prescription Analysis</h3>
                  <div className="space-y-2 text-gray-300">
                    <p><strong>Extracted Text:</strong> {processedPrescription.extracted_text}</p>
                    <p><strong>Structured Information:</strong></p>
                    <pre className="bg-gray-700 p-3 rounded-lg overflow-x-auto">
                      {processedPrescription.structured_text}
                    </pre>
                  </div>
                </div>
              )}

              {/* Voice Input */}
              <div className="bg-gray-800 p-6 rounded-lg mt-4">
                <div className="flex items-center space-x-4">
                  <Mic className="text-green-400" size={36} />
                  <div className="flex-grow">
                    <button 
                      onClick={handleVoiceInput}
                      className="bg-green-800 hover:bg-green-700 text-black px-4 py-2 rounded-lg"
                    >
                      Start Voice Input
                    </button>
                    {voiceInput && (
                      <p className="mt-2 text-gray-400">
                        Transcribed: {voiceInput}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Prescriptions Section */}
          {activeSection === 'prescriptions' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Prescriptions</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-lg flex items-center space-x-2">
                  <PlusCircle size={20} />
                  <span>Add Prescription</span>
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex space-x-4 mb-4">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    placeholder="Search prescriptions..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 bg-gray-800 rounded-lg text-gray-100"
                  />
                  <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                </div>
                <button className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700">
                  <Filter className="text-gray-400" />
                </button>
              </div>

              {/* Prescription List */}
              <div className="space-y-4">
                {filteredPrescriptions.map((rx) => (
                  <div 
                    key={rx.id} 
                    className="bg-gray-800 p-5 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-lg">{rx.medicine}</p>
                        {rx.interactions.length > 0 && (
                          <AlertTriangle className="text-yellow-400" size={20} />
                        )}
                      </div>
                      <div className="text-gray-400 mt-1">
                        <p>{rx.doctor} | {rx.date}</p>
                        <p>{rx.dosage} - {rx.frequency}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-500">
                        <FileText />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medication Reminders Section */}
          {activeSection === 'reminders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Medication Reminders</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-lg flex items-center space-x-2">
                  <PlusCircle size={20} />
                  <span>Add Reminder</span>
                </button>
              </div>

              <div className="space-y-4">
                {medications.map((med) => (
                  <div 
                    key={med.id} 
                    className="bg-gray-800 p-5 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-lg">{med.name}</p>
                      <div className="text-gray-400 mt-1">
                        <p>{med.dosage} | {med.time}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar size={16} />
                          <span>{med.startDate} to {med.endDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => toggleMedicationStatus(med.id)}
                        className={`p-2 rounded-full ${
                          med.taken 
                            ? 'bg-green-600 text-black' 
                            : 'bg-gray-700 text-gray-800'
                        }`}
                      >
                        {med.taken ? 'Taken' : 'Mark as Taken'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;