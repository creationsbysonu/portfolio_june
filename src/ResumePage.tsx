import { useEffect } from 'react';
import './ResumePage.css';

export default function ResumePage() {
  useEffect(() => {
    document.title = "Resume | Sonu Gupta";
  }, []);

  return (
    <div className="resume-page-wrapper">
      <div className="resume-container">
        <header className="resume-header">
          <div className="resume-header-content">
            <h1>Sonu Gupta</h1>
            <h2>AI/ML Engineer and Tech Lead</h2>
            <p>Computer Engineering Graduate</p>
            <p>Institute of Engineering, Purwanchal Campus</p>
            <p>Dharan, Nepal</p>
          </div>
          <div className="resume-contact">
            <p><strong>Email:</strong> <a href="mailto:sonugupta.ioepc.edu.np@gmail.com">sonugupta.ioepc.edu.np@gmail.com</a></p>
            <p><strong>Portfolio:</strong> <a href="https://guptasonu.com.np" target="_blank" rel="noreferrer">guptasonu.com.np</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/sonu-gupta" target="_blank" rel="noreferrer">sonu-gupta</a></p>
            <p><strong>GitHub:</strong> <a href="https://github.com/creationsbysonu" target="_blank" rel="noreferrer">creationsbysonu</a></p>
          </div>
        </header>

        <section className="resume-section">
          <h3 className="section-title">Professional Summary</h3>
          <p>
            A highly analytical and forward-thinking Computer Engineering graduate specializing in backend development, AI integrations, and full-stack system architectures. Demonstrates a strong technical track record in configuring robust relational data configurations, machine learning inference flows, and optimized pipeline automation. Experienced in cross-functional leadership, design-to-code conversions, and deploying user-centric digital applications. Passionate about resolving algorithmic infrastructure bottlenecks and writing clean, scalable codebase ecosystems.
          </p>
        </section>

        <section className="resume-section">
          <h3 className="section-title">Education</h3>
          
          <div className="resume-item">
            <div className="resume-item-header">
              <h4>TRIBHUVAN UNIVERSITY</h4>
              <span className="resume-date">IOE, Purwanchal Campus, Dharan, Nepal</span>
            </div>
            <div className="resume-item-subheader">
              <span className="resume-degree">Bachelor in Computer Engineering</span>
              <span className="resume-date">Result Awaiting (Exams Completed, 2026)</span>
            </div>
            <p className="resume-details"><strong>Seventh Semester Score:</strong> 73.58% | <strong>Coursework:</strong> Database Management Systems, Software Engineering, Computer Networks, Data Analysis.</p>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>LORD BUDDHA HIGHER SECONDARY SCHOOL</h4>
              <span className="resume-date">Biratnagar, Nepal</span>
            </div>
            <div className="resume-item-subheader">
              <span className="resume-degree">National Examination Board +2, Science, 2021</span>
              <span className="resume-date">Class 12 Score: 3.19 GPA</span>
            </div>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>CORBAN ENGLISH SCHOOL</h4>
              <span className="resume-date">Biratnagar, Nepal</span>
            </div>
            <div className="resume-item-subheader">
              <span className="resume-degree">Secondary Education Exam (SEE / SLC), 2019</span>
              <span className="resume-date">Aggregate Score: 3.30 GPA</span>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="section-title">Technical Skills & Core Competencies</h3>
          <ul className="skills-list">
            <li><strong>Languages & Frameworks:</strong> Python, JavaScript (ES6+), React.js, Node.js, Express.js, FastAPI, SQL, Tailwind CSS.</li>
            <li><strong>Data & Cloud Infrastructure:</strong> Relational Databases (SQL, MongoDB), Vector DBs, System Automation, CMS (WordPress).</li>
            <li><strong>Specialized Domains:</strong> Advanced Data Pipelines, Speech Processing, Machine Learning, Information Retrieval (RAG).</li>
            <li><strong>Core Methodologies:</strong> Full-stack platform mapping, cross-functional leadership, structured technical documentation.</li>
          </ul>
        </section>

        <section className="resume-section">
          <h3 className="section-title">Professional Experience & Leadership</h3>
          
          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Google Gemini Student Ambassador</h4>
              <span className="resume-date">2025–2026 | IOE Purwanchal Campus</span>
            </div>
            <p className="resume-details">
              Acted as the primary community touchpoint bridging complex digital technologies with the campus student base. Spearheaded large-scale technical bootcamps, mentored junior development cohorts, and delivered presentations on artificial intelligence frameworks, cloud configurations, and technical solution building.
            </p>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Frontend Developer & Technical Consultant</h4>
              <span className="resume-date">2022–Present | Remote / Freelance</span>
            </div>
            <p className="resume-details">
              Engineered and deployed over 10 fully responsive, production-ready web platforms using modern React.js architectures and content engines. Transformed complex UI/UX drafts into modular, high-speed frontend blocks, maintaining full back-end API integration and absolute code stability.
            </p>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="section-title">Research & Publications Tracking</h3>
          
          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Data Pipeline Architecture for Machine Learning Systems</h4>
              <span className="resume-date">Ongoing</span>
            </div>
            <p className="resume-details">
              Conducting engineering research targeting the design of modular pipeline architectures optimized for heavy machine learning model training flows. Investigating methodologies for automated file ETL execution, data structural compression, and removing pipeline processing bottlenecks.
            </p>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="section-title">Technical Engineering AI Systems Portfolio</h3>
          
          <div className="resume-item">
            <div className="resume-item-header">
              <h4>AI-Powered Visual Search Platform (e-Pasal)</h4>
              <span className="resume-date">2025–2026</span>
            </div>
            <p className="resume-details">
              Processed and indexed an exhaustive big-data cluster exceeding 100,000 images, fine-tuning deep feature embeddings utilizing Vision Transformer (ViT) designs. Built out high-performance FastAPI server lines for real-time visual product lookup and cross-platform stock SKU matching.
            </p>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Multilingual RAG Question Answering System</h4>
              <span className="resume-date">2025</span>
            </div>
            <p className="resume-details">
              Constructed a Retrieval-Augmented Generation (RAG) informational layout engineered for regional document querying supporting localized Nepali and Hindi languages. Integrated vectorized embedding lookups alongside neural transformers to secure real-time contextual question resolutions.
            </p>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Stutter Detection System for Regional Languages</h4>
              <span className="resume-date">2024</span>
            </div>
            <p className="resume-details">
              Designed complex speech preprocessing matrices and architectural feature selection modules to evaluate and dissect unique phonetic patterns in South Asian speech. Configured neural classification parameters to dynamically audit audio signal integrity.
            </p>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Scalable E-Commerce & Admin Dashboard Engine</h4>
              <span className="resume-date">2023</span>
            </div>
            <p className="resume-details">
              Designed a fully comprehensive software commerce framework utilizing full-stack JS logic, complete with protected user authentication, product logs, cart calculations, and a complete administrative command dashboard. Optimized schema indexes to secure sub-second response limits.
            </p>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="section-title">Academic Conferences & Professional Attributes</h3>
          <ul className="skills-list">
            <li><strong>Conferences & Exposure:</strong> Attended the <em>International Conference on Recent Trends in Artificial Intelligence (ICRTAI)</em>, Birtamode, 2025, tracking developments in scalable cloud infrastructure and localized transformer networks.</li>
            <li><strong>System Optimization Focus:</strong> Exceptionally precise troubleshooting approach natively suited for code refactoring, database load distribution, system testing, and logic debugging.</li>
            <li><strong>Cross-Functional Communication:</strong> Proven interpersonal, collaboration, and translation abilities honed through technical freelance consulting and elite global student leadership positions.</li>
          </ul>
        </section>
        
        <div className="resume-footer">
          <a href="#/" className="back-btn">← Back to Portfolio</a>
          <div className="resume-actions">
            <button onClick={() => window.print()} className="print-btn">Print</button>
            <a href="/professional_resume_sonu.pdf" download className="download-btn">Download PDF</a>
          </div>
        </div>
      </div>
    </div>
  );
}
