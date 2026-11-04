const projects = [
  ["Campus Security and Reporting System (CSRS)","A campus safety platform for incident reporting, emergency alerts, lost and found, visitor management, patrols, and security dashboards.","/task-management-dashboard.png",["Node.js","Express","PostgreSQL","JWT","JavaScript"],"https://github.com/21paxon/csrs","Campus safety workflows can become fragmented when incidents, visitor logs, and alerts are handled separately.","Building a centralized system with role-based access, a Node.js/Express API, PostgreSQL, and a web frontend."],
  ["Bus Booking System","A full-stack bus booking project for trip schedules, reservations, user accounts, and administrator management.","/modern-ecommerce-interface.png",["Java","Spring Boot","Angular","TypeScript","PostgreSQL"],"https://github.com/21paxon/busbooking","Booking workflows need reliable trip information and consistent reservation handling.","Developing a Spring Boot REST API with an Angular and TypeScript frontend and PostgreSQL data storage."],
  ["Machine Learning: Exam Score Prediction","A beginner ML project that trains a linear regression model to predict an exam score from study hours using sample data.","/weather-dashboard-with-maps-and-charts.png",["Python","Scikit-learn","Linear Regression"],"https://github.com/21paxon/ML_Project"],
  ["Data Analysis and Regression Practice","R practice covering exploratory data analysis, classical regression, and simple linear regression.","/weather-dashboard-with-maps-and-charts.png",["R","Tidyverse","Exploratory Data Analysis","Regression"],"https://github.com/21paxon/ML_PRACTICE"],
  ["Hostel Management System","An Android application project for managing students, hostel rooms, and room allocations.","/task-management-dashboard.png",["Kotlin","Android","Retrofit","Node.js","PostgreSQL"],"https://github.com/21paxon/hms"],
  ["USSD Food Menu Application","A menu-based USSD application that lets users choose a language and browse food categories and meals in English or Kinyarwanda.","/modern-ecommerce-interface.png",["Node.js","Express","USSD","English","Kinyarwanda"],"https://github.com/21paxon/ussdfoodapp"],
  ["USSD BMI Application","A lightweight USSD-style project for calculating BMI and returning results with English and Kinyarwanda support.","/weather-dashboard-with-maps-and-charts.png",["Node.js","Express","USSD"],"https://github.com/21paxon/ussdbmi-app"],
  ["Employee Management Frontend","An Angular application project for employee information management and frontend development practice.","/task-management-dashboard.png",["Angular","TypeScript","Web Development"],"https://github.com/21paxon/employee-app"],
  ["JavaScript Fundamentals Practice","A collection of small HTML and JavaScript exercises covering functions, string length, loops, and basic programming logic.","/modern-ecommerce-interface.png",["JavaScript","HTML","Programming Fundamentals"],"https://github.com/21paxon/Javascriptcourse"],
  ["Smart Security System Using IoT","An IoT project concept for monitoring restricted spaces and supporting remote security alerts.","/task-management-dashboard.png",["ESP32","IoT","Sensors","Wi-Fi","Dashboard"],"https://github.com/21paxon"]
]
const cvText = `PACIFIQUE NIYOGUSHIMWA
FULL-STACK DEVELOPER | NETWORK ENGINEER | IoT SYSTEMS SPECIALIST

Kigali, Rwanda | +250 787 653 042
niyogushimwapacifique6@gmail.com

PROFESSIONAL PROFILE
Information Technology professional with a background in software development, networking, IT support and ICT instruction. Experienced in Java, Spring Boot, JavaScript, TypeScript, Node.js, Express.js, Angular, REST APIs and relational databases.

TECHNICAL SKILLS
Programming: Python, Java, JavaScript, TypeScript, SQL
Frontend: Angular, HTML5, CSS3
Backend: Node.js, Express.js, Spring Boot, REST APIs, CRUD operations
Databases/Data: PostgreSQL, MySQL, Pandas, Tidyverse, Scikit-learn
Tools: Git, GitHub, Postman, Visual Studio Code
Networking/IT: Cisco networking, Linux, network configuration, troubleshooting and IT support
AI/Data: Machine Learning, data preprocessing, regression and Data Mining
DevOps/Cloud: CI/CD, GitHub Actions, cloud computing and deployment concepts
IoT: ESP32, Arduino, sensors and Wi-Fi connectivity

EXPERIENCE
IT Instructor | Muhanga Technical Center (MTC) | September 2025 – 2026
IT Support Intern | Rwanda Information Society Authority (RISA) | 2025
IT Support Specialist | VTC Ltd | 2024

PROJECTS
Campus Security and Reporting System — Node.js, Express.js, PostgreSQL
Bus Booking System — Java, Spring Boot, Angular, TypeScript, REST APIs
Machine Learning: Exam Score Prediction — Python, Pandas, Scikit-learn
Data Analysis and Regression Practice — R, Tidyverse, Linear Regression
Smart Security System Using IoT — ESP32, Sensors, Embedded Systems, Wi-Fi
USSD BMI Application — Node.js, Express.js

EDUCATION
BTech in Information Technology — Rwanda Polytechnic, Musanze College — September 2026–Present
A1 Qualification in Information Technology — Completed June 2025
Secondary Education – Networking — Completed 2022

CERTIFICATIONS
Software Development – DTP
Cybersecurity – DTP
AI Career Essentials – ALX Africa
EF SET English Certificate – B2

LANGUAGES
Kinyarwanda – Native
English – B2 (Upper Intermediate)`
document.querySelectorAll(".cv-download").forEach((button) => button.addEventListener("click", () => {
  const blob = new Blob([cvText], { type: "text/plain;charset=utf-8" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "Pacifique-Niyogushimwa-CV.txt"
  link.click()
  URL.revokeObjectURL(link.href)
}))
const grid = document.querySelector("#project-grid")
projects.forEach((project, index) => {
  const [title, description, image, tech, github, problem = "", solution = "Built a practical JavaScript application with a Node.js and Express backend."] = project
  const card = document.createElement("article")
  card.className = "card project-card reveal"
  card.innerHTML = `<img src="${image}" alt="${title}" loading="lazy"><h3>${title}</h3><p>${description}</p><div class="tags">${tech.map((item) => `<span>${item}</span>`).join("")}</div><p><a class="button" href="${github}" target="_blank" rel="noopener">Code</a> <button class="button details-button" type="button">Details</button></p>`
  card.querySelector(".details-button").addEventListener("click", () => openProject({ title, description, image, tech, github, problem, solution }))
  grid.appendChild(card)
})
const dialog = document.querySelector("#project-dialog")
function openProject(project) {
  document.querySelector("#dialog-image").src = project.image
  document.querySelector("#dialog-image").alt = project.title
  document.querySelector("#dialog-title").textContent = project.title
  document.querySelector("#dialog-description").textContent = project.description
  document.querySelector("#dialog-tech").innerHTML = project.tech.map((item) => `<span>${item}</span>`).join("")
  document.querySelector("#dialog-problem").textContent = project.problem ? `Problem solved: ${project.problem}` : ""
  document.querySelector("#dialog-solution").textContent = `Solution: ${project.solution}`
  document.querySelector("#dialog-link").href = project.github
  dialog.showModal()
}
document.querySelector("#dialog-close").addEventListener("click", () => dialog.close())
document.querySelector("#menu-button").addEventListener("click", () => document.querySelector("#nav-links").classList.toggle("open"))
document.querySelectorAll(".nav-links a").forEach((link) => link.addEventListener("click", () => document.querySelector("#nav-links").classList.remove("open")))
document.querySelector("#theme-button").addEventListener("click", () => {
  document.body.classList.toggle("dark")
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light")
})
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark")
document.querySelector("#contact-form").addEventListener("submit", async (event) => {
  event.preventDefault()
  const form = event.currentTarget
  const status = document.querySelector("#form-status")
  status.textContent = "Sending..."
  try {
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
    const result = await response.json()
    if (!response.ok || !result.success) throw new Error(result.error || "Failed to send message.")
    status.textContent = "Message sent! I will get back to you soon."
    form.reset()
  } catch (error) {
    status.textContent = error.message
  }
})
