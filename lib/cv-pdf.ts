const lines = [
  "PACIFIQUE NIYOGUSHIMWA",
  "Full-Stack Developer | Network Engineer | IoT Systems Specialist",
  "Kigali, Rwanda | +250 787 653 042 | niyogushimwapacifique6@gmail.com",
  "Portfolio: pacifiqueniyogushimwa.netlify.app",
  "",
  "PROFESSIONAL PROFILE",
  "Information Technology professional with experience in ICT instruction and a technical",
  "background spanning software development, networking, IT support, and Internet technologies.",
  "Builds application projects using Java, Spring Boot, JavaScript/TypeScript, Node.js, REST APIs,",
  "and relational databases. Familiar with network configuration, Linux, troubleshooting, and",
  "cybersecurity fundamentals. Developing skills in data analysis and machine learning with Python,",
  "Scikit-learn, and R.",
  "",
  "TECHNICAL SKILLS",
  "Software/Web: Java, Spring Boot, JavaScript, TypeScript, Angular, Python, Node.js, Express.js",
  "Data/Databases: SQL, PostgreSQL, MySQL, Pandas, Tidyverse, Scikit-learn (learning)",
  "Networking/IT: Cisco networking, Linux, network configuration, IT support, troubleshooting",
  "IoT/Embedded: ESP32, Arduino, sensors, Wi-Fi connectivity, IoT monitoring concepts",
  "",
  "PROFESSIONAL EXPERIENCE",
  "IT Instructor | Muhanga Technical Center (MTC) | Sep 2025 - 2026",
  "- Delivered practical lessons in Networking and Internet Technology and related ICT topics.",
  "- Guided hands-on exercises and helped learners diagnose networking and computer problems.",
  "IT Support / Internship Experience | Rwanda Information Society Authority (RISA) | 2025",
  "- Gained exposure to IT support activities, troubleshooting, and technical workflows.",
  "IT Support Specialist | VTC Ltd | 2024",
  "- Assisted with technical support, computer troubleshooting, and basic system maintenance.",
  "",
  "SELECTED PROJECTS",
  "Campus Security and Reporting System (CSRS) - Node.js/Express, PostgreSQL; incident reporting",
  "and security management. github.com/21paxon/csrs",
  "Bus Booking System - Java, Spring Boot, REST APIs, Angular/TypeScript.",
  "github.com/21paxon/busbooking",
  "Machine Learning - Exam score prediction using Python and Scikit-learn.",
  "github.com/21paxon/ML_Project",
  "Data Analysis and Regression Practice - R, linear regression, data exploration.",
  "github.com/21paxon/ML_PRACTICE",
  "Smart Security System Using IoT - ESP32 monitoring concept with motion detection and alerts.",
  "USSD BMI Application - Node.js/Express BMI calculation with English and Kinyarwanda prompts.",
  "github.com/21paxon/ussdbmi-app",
  "",
  "EDUCATION",
  "Bachelor of Technology in Information Technology (BTech IT) - Currently pursuing",
  "Rwanda Polytechnic (RP), Musanze College | One-year programme",
  "A1 Qualification in Information Technology - Completed",
  "Secondary Education - Networking, Lycee Saint Alexandre Sauli de Muhura | Completed 2022",
  "",
  "CERTIFICATIONS & LANGUAGES",
  "Software Development (DTP) | Cybersecurity (DTP) | AI Career Essentials (ALX Africa)",
  "EF SET English Certificate (B2) | Kinyarwanda (Native) | English (B2)",
  "",
  "CORE COMPETENCIES",
  "Application/API development, SQL databases, network troubleshooting, end-user IT support,",
  "ICT instruction, technical documentation, IoT concepts, data analysis, and regression practice.",
  "",
  "Links: github.com/21paxon | linkedin.com/in/pacifique-niyogushimwa-b689033ab",
];

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/[^\x20-\x7E]/g, "-");
}

export function downloadCVPdf() {
  const pageLines: string[][] = [];
  for (let i = 0; i < lines.length; i += 47) pageLines.push(lines.slice(i, i + 47));

  const objects: string[] = [];
  const pageIds: number[] = [];
  const fontId = 3;
  const pagesId = 2;
  objects[0] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[pagesId - 1] = "";
  objects[fontId - 1] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";

  pageLines.forEach((page, index) => {
    const pageId = 4 + index * 2;
    const contentId = pageId + 1;
    pageIds.push(pageId);
    const commands = page.map((line, lineIndex) => {
      const y = 790 - lineIndex * 16;
      const size = lineIndex === 0 ? 16 : (line && !line.startsWith("-") && line === line.toUpperCase() && line.length < 35 ? 11 : 9);
      const safe = escapePdfText(line);
      return `BT /F1 ${size} Tf 48 ${y} Td (${safe}) Tj ET`;
    }).join("\n");
    objects[pageId - 1] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId - 1] = `<< /Length ${commands.length} >>\nstream\n${commands}\nendstream`;
  });
  objects[1] = `<< /Type /Pages /Kids [${pageIds.map(id => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;
  const header = "%PDF-1.4\n";
  let body = header;
  const offsets = [0];
  objects.forEach((obj, i) => {
    if (obj === undefined) return;
    offsets[i + 1] = body.length;
    body += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xrefOffset = body.length;
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) body += `${String(offsets[i] || 0).padStart(10, "0")} 00000 n \n`;
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  const blob = new Blob([body], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Pacifique-Niyogushimwa-CV.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
