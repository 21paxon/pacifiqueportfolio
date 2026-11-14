INSERT INTO profiles (full_name, headline, introduction, about, photo_url, email, phone, location, github_url, linkedin_url, available)
VALUES (
  'Pacifique NIYOGUSHIMWA', 'Full-Stack Developer | Network Engineer | IoT Systems Specialist',
  'Information Technology professional with a background in software development, networking, IT support and ICT instruction. I build practical software solutions while exploring Artificial Intelligence, Machine Learning, data analysis and IoT systems.',
  'Information Technology professional with a background in software development, networking, IT support and ICT instruction. Interested in software engineering, networking, IoT systems, Artificial Intelligence and Machine Learning.',
  '/pssportphot.jpeg', 'niyogushimwapacifique6@gmail.com', '+250 787 653 042', 'Kigali, Rwanda',
  'https://github.com/21paxon', 'https://linkedin.com/in/pacifique-niyogushimwa-b689033ab', true
) ON CONFLICT (singleton) DO NOTHING;

INSERT INTO projects (slug,title,description,problem,solution,technologies,category,status,cover_image,github_url,featured,published,sort_order) VALUES
('campus-security-reporting-system','Campus Security and Reporting System (CSRS)','A campus safety platform for incident reporting, emergency alerts, lost and found, visitor management, patrols, and security dashboards.','Campus safety workflows can become fragmented when incidents, visitor logs, and alerts are handled separately.','Building a centralized system with role-based access, a Node.js/Express API, PostgreSQL, and a web frontend.','["Node.js","Express","PostgreSQL","JWT","JavaScript"]','Web application','in-progress','/task-management-dashboard.png','https://github.com/21paxon/csrs',true,true,1),
('bus-booking-system','Bus Booking System','A full-stack bus booking project for trip schedules, reservations, user accounts, and administrator management.','Booking workflows need reliable trip information and consistent reservation handling.','Developing a Spring Boot REST API with an Angular and TypeScript frontend and PostgreSQL data storage.','["Java","Spring Boot","Angular","TypeScript","PostgreSQL"]','Web application','in-progress','/modern-ecommerce-interface.png','https://github.com/21paxon/busbooking',true,true,2),
('machine-learning-exam-score-prediction','Machine Learning: Exam Score Prediction','A beginner ML project that trains a linear regression model to predict an exam score from study hours using sample data.','','','["Python","Scikit-learn","Linear Regression"]','Machine learning','practice','/weather-dashboard-with-maps-and-charts.png','https://github.com/21paxon/ML_Project',false,true,3),
('data-analysis-regression-practice','Data Analysis and Regression Practice','R practice covering exploratory data analysis, classical regression, and simple linear regression.','','','["R","Tidyverse","Exploratory Data Analysis","Regression"]','Data analysis','practice','/weather-dashboard-with-maps-and-charts.png','https://github.com/21paxon/ML_PRACTICE',false,true,4),
('hostel-management-system','Hostel Management System','An Android application project for managing students, hostel rooms, and room allocations.','','','["Kotlin","Android","Retrofit","Node.js","PostgreSQL"]','Mobile application','in-progress','/task-management-dashboard.png','https://github.com/21paxon/hms',false,true,5),
('ussd-food-menu-application','USSD Food Menu Application','A menu-based USSD application that lets users choose a language and browse food categories and meals in English or Kinyarwanda.','','','["Node.js","Express","USSD","English","Kinyarwanda"]','USSD','complete','/modern-ecommerce-interface.png','https://github.com/21paxon/ussdfoodapp',false,true,6),
('ussd-bmi-application','USSD BMI Application','A lightweight USSD-style project for calculating BMI and returning results with English and Kinyarwanda support.','','','["Node.js","Express","USSD"]','USSD','complete','/weather-dashboard-with-maps-and-charts.png','https://github.com/21paxon/ussdbmi-app',false,true,7),
('employee-management-frontend','Employee Management Frontend','An Angular application project for employee information management and frontend development practice.','','','["Angular","TypeScript","Web Development"]','Web application','practice','/task-management-dashboard.png','https://github.com/21paxon/employee-app',false,true,8),
('javascript-fundamentals-practice','JavaScript Fundamentals Practice','A collection of small HTML and JavaScript exercises covering functions, string length, loops, and basic programming logic.','','','["JavaScript","HTML","Programming Fundamentals"]','Practice','practice','/modern-ecommerce-interface.png','https://github.com/21paxon/Javascriptcourse',false,true,9),
('smart-security-system-using-iot','Smart Security System Using IoT','An IoT project concept for monitoring restricted spaces and supporting remote security alerts.','','','["ESP32","IoT","Sensors","Wi-Fi","Dashboard"]','IoT','concept','/task-management-dashboard.png','https://github.com/21paxon',false,true,10)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO experiences (organization,position,employment_type,start_date,end_date,current,responsibilities,achievements,sort_order) VALUES
('Muhanga Technical Center (MTC)','IT Instructor','',NULL,NULL,false,'["Delivered theoretical and practical lessons in Networking and Internet Technology.","Guided learners through networking concepts, internet technologies and practical ICT exercises.","Supported learners in diagnosing networking and computer-related problems."]','[]',1),
('Rwanda Information Society Authority (RISA)','IT Support Intern','',NULL,NULL,false,'["Participated in learning about IT support workflows and technical service delivery.","Developed an understanding of IT operations and user support practices."]','[]',2),
('VTC Ltd','IT Support Specialist','',NULL,NULL,false,'["Supported basic system maintenance and resolution of common IT issues.","Helped maintain the functionality of computer systems and related equipment."]','[]',3)
ON CONFLICT DO NOTHING;

INSERT INTO education (institution,qualification,expected_completion,details,sort_order) VALUES
('Rwanda Polytechnic (RP), Musanze College','Bachelor of Technology in Information Technology','Currently pursuing a one-year programme.','',1),
('Rwanda Polytechnic (RP), Musanze College','A1 Qualification in Information Technology','','Completed June 2025',2),
('Lycee Saint Alexandre Sauli de Muhura','Secondary Education – Networking','','Completed 2022',3)
ON CONFLICT DO NOTHING;

INSERT INTO certifications (name,issuer,sort_order) VALUES
('Software Development','DTP',1),('Cybersecurity','DTP',2),('AI Career Essentials','ALX Africa',3),('EF SET English Certificate – B2','EF SET',4)
ON CONFLICT DO NOTHING;

INSERT INTO skill_categories (name,sort_order) VALUES
('Programming Languages',1),('Frontend Development',2),('Backend Development',3),('Databases & Data Analysis',4),('Development Tools',5),('Networking & IT Infrastructure',6),('AI & Data',7),('DevOps & Cloud',8),('IoT & Embedded Systems',9)
ON CONFLICT (name) DO NOTHING;
INSERT INTO skills (name,category_id,proficiency_type,sort_order)
SELECT seed.name, category.id, 'practical', seed.sort_order FROM (VALUES
('Python','Programming Languages',1),('Java','Programming Languages',2),('JavaScript','Programming Languages',3),('TypeScript','Programming Languages',4),('SQL','Programming Languages',5),
('Angular','Frontend Development',1),('HTML5','Frontend Development',2),('CSS3','Frontend Development',3),
('Node.js','Backend Development',1),('Express.js','Backend Development',2),('Spring Boot','Backend Development',3),('REST APIs','Backend Development',4),
('PostgreSQL','Databases & Data Analysis',1),('MySQL','Databases & Data Analysis',2),('Pandas','Databases & Data Analysis',3),('Tidyverse','Databases & Data Analysis',4),('Scikit-learn','Databases & Data Analysis',5),
('Git','Development Tools',1),('GitHub','Development Tools',2),('Postman','Development Tools',3),('Visual Studio Code','Development Tools',4),
('Cisco Networking','Networking & IT Infrastructure',1),('Linux','Networking & IT Infrastructure',2),('Network Troubleshooting','Networking & IT Infrastructure',3),('IT Support','Networking & IT Infrastructure',4),
('Machine Learning','AI & Data',1),('Regression','AI & Data',2),('Data Mining','AI & Data',3),
('CI/CD','DevOps & Cloud',1),('GitHub Actions','DevOps & Cloud',2),('Cloud Computing','DevOps & Cloud',3),
('ESP32','IoT & Embedded Systems',1),('Arduino','IoT & Embedded Systems',2),('Sensors','IoT & Embedded Systems',3)
) AS seed(name,category_name,sort_order) JOIN skill_categories category ON category.name = seed.category_name
ON CONFLICT (name, category_id) DO NOTHING;
