"use client"

export function CV() {
  return (
    <>
      <style jsx>{`
        .cv-container {
          display: grid;
          grid-template-columns: 300px 1fr;
          max-width: 1000px;
          margin: 30px auto;
          background: white;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .cv-sidebar {
          background: #0a66c2;
          color: white;
          padding: 25px;
        }

        .cv-main {
          padding: 30px;
        }

        .cv-sidebar h1 {
          margin: 0;
          font-size: 26px;
          font-weight: bold;
        }

        .cv-sidebar h2,
        .cv-main h2 {
          font-size: 16px;
          margin-top: 25px;
          border-bottom: 2px solid #ddd;
          padding-bottom: 5px;
        }

        .cv-sidebar h2 {
          border-bottom-color: rgba(255,255,255,0.3);
          color: white;
        }

        .cv-main h2 {
          color: #333;
        }

        .cv-contact {
          font-size: 13px;
          line-height: 1.8;
        }

        .cv-contact p {
          margin: 5px 0;
        }

        .cv-contact a {
          color: white;
          text-decoration: none;
        }

        .cv-contact a:hover {
          text-decoration: underline;
        }

        .cv-skill {
          background: rgba(255,255,255,0.2);
          padding: 6px 10px;
          border-radius: 6px;
          display: inline-block;
          margin: 4px 2px;
          font-size: 12px;
          color: white;
        }

        .cv-job {
          margin-bottom: 15px;
        }

        .cv-job-title {
          font-weight: bold;
          font-size: 14px;
        }

        .cv-job-date {
          font-size: 12px;
          color: #999;
        }

        .cv-main p, .cv-main li {
          font-size: 14px;
          line-height: 1.6;
          color: #333;
        }

        .cv-main ul {
          padding-left: 18px;
        }

        @media print {
          * { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important;
            color-adjust: exact !important;
            -moz-print-color-adjust: exact !important;
          }
          
          html, body { 
            background: white !important; 
            margin: 0 !important; 
            padding: 0 !important; 
            width: 100% !important;
            height: auto !important;
          }
          
          .cv-container { 
            display: grid !important;
            grid-template-columns: 300px 1fr !important;
            box-shadow: none !important; 
            margin: 0 !important; 
            padding: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            height: auto !important;
            background: white !important;
            page-break-inside: avoid !important;
          }
          
          .cv-sidebar { 
            display: block !important;
            background: #0a66c2 !important; 
            color: white !important;
            padding: 25px !important;
            page-break-inside: avoid !important;
            width: 300px !important;
            height: auto !important;
          }
          
          .cv-main { 
            display: block !important;
            background: white !important;
            color: #333 !important;
            padding: 30px !important;
            width: 1fr !important;
            height: auto !important;
          }
          
          .cv-sidebar h1 { 
            color: white !important; 
            font-size: 26px !important;
          }
          
          .cv-sidebar h2,
          .cv-main h2 { 
            color: #333 !important;
            page-break-after: avoid !important;
          }
          
          .cv-sidebar h2 {
            color: white !important;
            border-bottom-color: rgba(255,255,255,0.3) !important;
          }
          
          .cv-contact { 
            font-size: 13px !important; 
            line-height: 1.8 !important;
            color: white !important;
          }
          
          .cv-contact p { 
            color: white !important;
            margin: 5px 0 !important;
          }
          
          .cv-contact a { 
            color: white !important; 
            text-decoration: none !important;
          }
          
          .cv-skill { 
            background: rgba(255,255,255,0.2) !important;
            color: white !important;
            padding: 6px 10px !important;
            border-radius: 6px !important;
            display: inline-block !important;
            margin: 4px 2px !important;
            font-size: 12px !important;
          }
          
          .cv-job { 
            page-break-inside: avoid !important;
            margin-bottom: 15px !important;
          }
          
          .cv-job-title {
            font-weight: bold !important;
            font-size: 14px !important;
            color: #333 !important;
          }
          
          .cv-job-date {
            font-size: 12px !important;
            color: #0a66c2 !important;
          }
          
          .cv-main p, .cv-main li {
            font-size: 14px !important;
            line-height: 1.6 !important;
            color: #333 !important;
          }
          
          h2, h3 { page-break-after: avoid !important; }
          ul, ol { page-break-inside: avoid !important; }
          
          li { page-break-inside: avoid !important; }
        }

        @media (max-width: 768px) {
          .cv-container {
            grid-template-columns: 1fr;
          }
          .cv-sidebar {
            padding: 20px;
          }
          .cv-main {
            padding: 20px;
          }
        }
      `}</style>
      <div id="cv-root" className="cv-container">
        {/* SIDEBAR */}
        <div className="cv-sidebar">
          <h1>Pacifique Niyogushimwa</h1>
          
          <div className="cv-contact">
            <p>Kigali, Rwanda</p>
            <p>+250 787 653 042</p>
            <p>paxon2121@outlook.com</p>
            <p><a href="https://www.linkedin.com/in/pacifique-niyogushimwa-b689033ab" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
            <p><a href="https://pacifique-21.netlify.app/" target="_blank" rel="noopener noreferrer">Portfolio Website</a></p>
            <p><a href="https://github.com/21paxon" target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>
          </div>

          <h2>Skills</h2>
          <div>
            {["Java", "Spring Boot", "AngularJS", "MySQL", "REST APIs", "IoT", "Cybersecurity", "Networking"].map(skill => (
              <span key={skill} className="cv-skill">{skill}</span>
            ))}
          </div>

          <h2>Certifications</h2>
          <ul style={{color: 'white', fontSize: '13px'}}>
            <li>Software Development – DTP</li>
            <li>Cybersecurity – DTP</li>
            <li>AI Career Essentials – ALX Africa</li>
            <li>EF SET English Certificate (C2)</li>
          </ul>

          <h2>Languages</h2>
          <p style={{margin: '5px 0', fontSize: '13px'}}>English (C2)</p>
          <p style={{margin: '5px 0', fontSize: '13px'}}>Kinyarwanda (Native)</p>
        </div>

        {/* MAIN CONTENT */}
        <div className="cv-main">
          <h2>Professional Summary</h2>
          <p>Results-driven IT professional with strong experience in software development, networking, cybersecurity, and IoT systems. Skilled in Java, Spring Boot, and AngularJS with hands-on experience building scalable applications, secure backend systems, and real-world smart solutions.</p>

          <h2>Professional Experience</h2>
          <div className="cv-job">
            <p className="cv-job-title">IT Instructor - Muhanga Technical Center</p>
            <p className="cv-job-date">2025 – Present</p>
            <ul>
              <li>Train students in software development and networking fundamentals</li>
              <li>Supervise and guide real-world technical projects</li>
            </ul>
          </div>

          <div className="cv-job">
            <p className="cv-job-title">IT Consultant - RISA</p>
            <p className="cv-job-date">2025</p>
            <ul>
              <li>Supported IT infrastructure, system deployment, and troubleshooting</li>
            </ul>
          </div>

          <div className="cv-job">
            <p className="cv-job-title">IT Support Specialist - VTC Ltd</p>
            <p className="cv-job-date">2024</p>
            <ul>
              <li>Provided technical support, system maintenance, and deployment services</li>
            </ul>
          </div>

          <h2>Featured Projects</h2>
          <ul>
            <li>
              <strong>Smart Security System (IoT)</strong><br/>
              - Developed a real-time monitoring and alert system using IoT sensors<br/>
              - Focused on automation and security efficiency
            </li>

            <li>
              <strong>Bus Booking System (Spring Boot)</strong><br/>
              - Built RESTful backend for reservations and scheduling<br/>
              - <a href="https://github.com/21paxon" target="_blank" rel="noopener noreferrer" style={{color: '#0a66c2', textDecoration: 'none'}}>View Projects</a>
            </li>

            <li>
              <strong>Inventory Management System</strong><br/>
              - Designed backend logic and database integration
            </li>

            <li>
              <strong>IoT Patient Monitoring System</strong><br/>
              - Developed system for real-time health monitoring using sensors
            </li>
          </ul>

          <h2>Education</h2>
          <p>Bachelor&apos;s Degree in Information Technology - RP Musanze College (2023–2025)</p>
        </div>
      </div>
    </>
  )
}
