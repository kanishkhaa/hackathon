import os
import cv2
import pytesseract
import numpy as np
import google.generativeai as genai
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image

# Configure Google Generative AI API
# IMPORTANT: Replace with your actual API key
genai.configure(api_key="AIzaSyBZ0xQPAupZmcN6sH2Nv4pbudpimJMd_n0")  

# Initialize Flask app
app = Flask(__name__)

# Configure CORS to be more permissive
CORS(app, resources={
    r"/*": {
        "origins": "*",  # Allow all origins
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Upload and Temp Directories
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf'}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    """Check if file has an allowed extension"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path):
    """Preprocess the image to improve OCR accuracy"""
    try:
        image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        if image is None:
            raise ValueError(f"Could not read image: {image_path}")
        
        image = cv2.resize(image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

        # Apply adaptive thresholding
        processed = cv2.adaptiveThreshold(image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                          cv2.THRESH_BINARY, 31, 2)
        return processed
    except Exception as e:
        print(f"Image preprocessing error: {e}")
        return None

def extract_text(image_path):
    """Extract text from image using Tesseract OCR"""
    try:
        processed_image = preprocess_image(image_path)
        if processed_image is None:
            return "Could not process image"
        
        custom_config = r'--oem 3 --psm 6'
        extracted_text = pytesseract.image_to_string(processed_image, config=custom_config)
        return extracted_text.strip() or "No text extracted"
    except Exception as e:
        return f"OCR Error: {str(e)}"

def organize_text_with_ai(text):
    """Sends extracted text to Gemini API to structure it"""
    try:
        # Use a mock response if Generative AI is not available
        if not text or text.startswith("OCR Error") or text == "No text extracted":
            return "Unable to process prescription text"

        # Simulate AI processing (replace with actual AI call)
        prompt = f"""
        Organize the following prescription text into a structured format:

        - *Patient Information*
        - *Doctor Information*
        - *Medications*
        - *Special Instructions*

        Prescription Text: {text}
        """

        # Placeholder AI processing
        return f"""
        *Patient Information*:
        - Name: John Doe
        - Age: 45
        - Gender: Male

        *Doctor Information*:
        - Name: Dr. Emily Chen
        - Clinic: City Medical Center

        *Medications*:
        - Amoxicillin 500mg
        - Frequency: 3 times daily
        - Duration: 7 days

        *Special Instructions*:
        - Take with food
        - Avoid alcohol
        """
    except Exception as e:
        return f"AI Processing Error: {str(e)}"

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file upload and processing"""
    # Debug print to check incoming request
    print("Upload request received")
    
    if 'file' not in request.files:
        print("No file part in the request")
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        print("No selected file")
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        try:
            file.save(filepath)
            print(f"File saved: {filepath}")

            # Extract text from prescription
            extracted_text = extract_text(filepath)
            print(f"Extracted Text: {extracted_text}")

            # Organize text using AI
            structured_text = organize_text_with_ai(extracted_text)
            print(f"Structured Text: {structured_text}")

            return jsonify({
                "filename": filename,
                "extracted_text": extracted_text,
                "structured_text": structured_text
            })
        
        except Exception as e:
            print(f"Upload processing error: {e}")
            return jsonify({"error": str(e)}), 500

    print("File type not allowed")
    return jsonify({"error": "File type not allowed"}), 400

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """Serve uploaded files"""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Add a simple health check route
@app.route('/')
def health_check():
    return jsonify({"status": "Backend is running"}), 200

if __name__ == '__main__':
    # Use 0.0.0.0 to make it accessible from other machines
    app.run(host='0.0.0.0', port=5000, debug=True)