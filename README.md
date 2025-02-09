StemConnect – Connecting Stem Cell Donors with Patients
📌 Overview
StemConnect is a web-based platform designed to bridge the gap between stem cell donors and patients in need. It simplifies donor registration, patient search, matching, and donation tracking while ensuring secure file uploads and automated notifications.

🚀 Key Features
✅ Donor Registration
Secure donor registration with Name, Contact, Medical History, HLA Type
Upload Swab Test Reports (PDF only)
Data securely stored in MySQL Database
🔍 Patient Donor Search & Matching
Search for HLA-matched donors using MySQL queries
Display available donor profiles dynamically
🛠 Admin Dashboard
Manage Donor & Patient records (Approve, Reject, Delete)
Generate Matching Reports
Monitor Swab Test File Uploads
📂 Secure File Management
Upload Swab Test Reports
Store files in a secure server directory
📲 Email & SMS Notifications (Twilio/SendGrid)
Donors receive registration confirmation
Patients get notified when a matching donor is found
Admin gets alerts for new registrations
📚 Educational Resources
Articles, FAQs, and videos on stem cell donation
🛠️ Technology Stack
Component	Technology
Frontend	HTML, CSS, JavaScript
Backend	PHP (for handling MySQL database)
Database	MySQL
Notifications	Twilio (SMS) / SendGrid (Email)
File Storage	Secure folder with PHP handling
📂 Project Structure

/client
│── index.html  # Homepage
│── donor.html  # Donor Registration
│── search.html  # Search for Donors
│── admin_login.html  # Admin Login Page
│── admin.html  # Admin Dashboard
│── resources.html  # Educational Resources
│── styles/
│   ├── style.css  # Main CSS file
│── js/
│   ├── script.js  # JavaScript logic

/server
│── config.php  # Database connection
│── register.php  # Handles donor registration
│── search.php  # Search logic
│── admin.php  # Admin dashboard backend
│── upload.php  # File upload handling
│── send_email.php  # SendGrid email integration
│── send_sms.php  # Twilio SMS integration
│── db/
│   ├── donors.sql  # MySQL database schema
📌 Installation & Setup
1️⃣ Clone the Repository

git clone https://github.com/yourusername/stemconnect.git
cd stemconnect

2️⃣ Set Up MySQL Database
Import donors.sql into MySQL
Update config.php with your MySQL credentials
3️⃣ Configure Twilio & SendGrid
Add your Twilio API keys in send_sms.php
Add your SendGrid API keys in send_email.php
4️⃣ Start the Server
Run PHP server locally

php -S localhost:8000
Open http://localhost:8000/index.html in your browser

🔑 Default Admin Credentials
Username: admin
Password: password

After logging in, the admin is redirected to admin.html, where they can approve/reject donors, view reports, and manage records.

🔮 Future Enhancements
Google OAuth Login for donors
AI-powered donor-patient matching
Blockchain-based donor record verification

📩 Contact & Support
For any issues or suggestions, feel free to open an issue or contact us at:
📧 Email: tejaskarekar17@gmail.com

🚀 Let's save lives together with StemConnect!
