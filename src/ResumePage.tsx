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
            <h2>Computer Engineer · IT Analyst</h2>
            <p>Implementation &amp; Support</p>
            <p>Nepal Engineering Council Reg. No. 102745</p>
            <p>Kathmandu, Nepal</p>
          </div>
          <div className="resume-contact">
            <p><strong>Email:</strong> <a href="mailto:studybysonugupta@gmail.com">studybysonugupta@gmail.com</a></p>
            <p><strong>Portfolio:</strong> <a href="https://guptasonu.com.np" target="_blank" rel="noreferrer">guptasonu.com.np</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/sonu-gupta" target="_blank" rel="noreferrer">sonu-gupta</a></p>
            <p><strong>GitHub:</strong> <a href="https://github.com/creationsbysonu" target="_blank" rel="noreferrer">creationsbysonu</a></p>
          </div>
        </header>

        <section className="resume-section">
          <h3 className="section-title">Profile</h3>
          <p>
            A detail-oriented and motivated Computer Engineer with over a year of hands-on experience in IT
            operations, system implementation, and technical support. Proven ability to troubleshoot operational
            issues, train end-users on web and mobile applications, and coordinate seamlessly across
            cross-functional teams. Strong communicator and problem-solver, adept at using MS Office, digital
            tools, and analytical dashboards to maintain accurate records, improve process efficiency, and deliver
            exceptional client support.
          </p>
        </section>

        <section className="resume-section">
          <h3 className="section-title">Work Experience</h3>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>ST. JOSEPH SCHOOL</h4>
              <span className="resume-date">Mar 2025 – Mar 2026</span>
            </div>
            <div className="resume-item-subheader">
              <span className="resume-degree">IT Lead &amp; Computer Science Instructor</span>
              <span className="resume-date">Biratnagar, Nepal</span>
            </div>
            <ul className="skills-list">
              <li>Directed IT infrastructure and supported digital platform operations, providing hands-on training and troubleshooting for 70–75 staff members to ensure smooth adoption of new web-based technologies.</li>
              <li>Responded to internal queries promptly and professionally, resolving operational and technical issues on a daily basis.</li>
              <li>Maintained accurate digital asset trackers and databases for an institution of 1,500+ students, using MS Excel, Word, and Google Slides to prepare summary reports and track process improvements.</li>
              <li>Implemented automated reporting workflows, saving over 10 hours of manual operational work per week.</li>
            </ul>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>FREELANCE</h4>
              <span className="resume-date">2022 – 2024</span>
            </div>
            <div className="resume-item-subheader">
              <span className="resume-degree">Full Stack Engineer (Web Applications)</span>
              <span className="resume-date">Remote</span>
            </div>
            <ul className="skills-list">
              <li>Delivered end-to-end implementation for 10+ web-based client applications, coordinating closely with clients to understand requirements and ensure smooth, uninterrupted workflows.</li>
              <li>Provided post-launch technical support and client training, enabling users to independently manage digital dashboards and extract business intelligence.</li>
              <li>Upheld high professional standards in documentation and communication throughout the project lifecycles.</li>
            </ul>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>DIGITAL PATHSHALA</h4>
              <span className="resume-date">Jun 2025 – Aug 2025</span>
            </div>
            <div className="resume-item-subheader">
              <span className="resume-degree">MERN Stack Developer Intern</span>
              <span className="resume-date">Remote, Nepal</span>
            </div>
            <ul className="skills-list">
              <li>Supported the implementation, testing, and troubleshooting of scalable web applications for a major educational platform.</li>
              <li>Coordinated with different teams to fix technical bugs and optimize knowledge management workflows.</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="section-title">Projects</h3>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Pharmacy DBMS Analytics (Ausadhi Kinmel)</h4>
              <span className="resume-date">Implementation</span>
            </div>
            <p className="resume-details">
              Implemented and maintained a web-based relational database to track inventory, suppliers, and
              billing. Provided hands-on training to end-users and offered continuous support to troubleshoot
              reporting issues. <strong>Tech:</strong> MySQL, PHP.
            </p>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Multilingual RAG Question Answering System</h4>
              <span className="resume-date">2026</span>
            </div>
            <p className="resume-details">
              Built and shipped a Retrieval Augmented Generation pipeline for Hindi and Nepali: documents are
              embedded into a vector index, relevant passages retrieved, and grounded answers generated.{' '}
              <strong>Tech:</strong> Python, Transformers, Vector DB.
            </p>
            <div className="resume-doc-links">
              <a href="https://rag-expansion.vercel.app/" target="_blank" rel="noreferrer">Live demo ↗</a>
              <a href="https://github.com/creationsbysonu/rag_expan" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>AI-Powered Visual Search Platform (e-Pasal)</h4>
              <span className="resume-date">2025 – 2026</span>
            </div>
            <p className="resume-details">
              Supported the deployment of a digital asset system handling 100,000+ images. Used emerging
              technologies to optimize search processes and ensure smooth internal workflows.{' '}
              <strong>Tech:</strong> Python, Vector Search.
            </p>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="section-title">Fellowships &amp; Leadership</h3>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>EXCESS DATA FELLOWSHIP (COHORT 3)</h4>
              <span className="resume-date">Data Fellow</span>
            </div>
            <p className="resume-details">
              Trained in scalable analytics practices, problem-solving, and efficient data architecture.
            </p>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>FUSE AI NEPAL</h4>
              <span className="resume-date">AI Fellow</span>
            </div>
            <p className="resume-details">
              Collaborated with teams on testing applied machine learning tools and technical integrations.
            </p>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>GOOGLE GEMINI STUDENT AMBASSADOR</h4>
              <span className="resume-date">2026 Cohort</span>
            </div>
            <p className="resume-details">
              Selected as a campus ambassador, running technical sessions on AI frameworks and mentoring student
              developers.
            </p>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="section-title">Education &amp; Qualifications</h3>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>TRIBHUVAN UNIVERSITY</h4>
              <span className="resume-date">2022 – 2026</span>
            </div>
            <div className="resume-item-subheader">
              <span className="resume-degree">B.E. in Computer Engineering</span>
              <span className="resume-date">First Division (69.74%)</span>
            </div>
            <p className="resume-details">IOE Purwanchal Campus, Dharan, Nepal.</p>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>NEPAL ENGINEERING COUNCIL</h4>
              <span className="resume-date">Licensure</span>
            </div>
            <p className="resume-details">
              Registered Computer Engineer, Reg. No. 102745.
            </p>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>DATACAMP</h4>
              <span className="resume-date">Certification</span>
            </div>
            <p className="resume-details">Data Engineer Certification.</p>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>LORD BUDDHA HIGHER SECONDARY SCHOOL</h4>
              <span className="resume-date">2019 – 2021</span>
            </div>
            <div className="resume-item-subheader">
              <span className="resume-degree">Higher Secondary Education, Science</span>
              <span className="resume-date">Biratnagar, Nepal</span>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="section-title">Skills &amp; Competencies</h3>
          <ul className="skills-list">
            <li><strong>Support &amp; Implementation:</strong> Client onboarding &amp; training, technical troubleshooting, incident management, workflow automation.</li>
            <li><strong>Tools &amp; Platforms:</strong> MS Office (Word, Excel, PowerPoint), Google Workspace, web &amp; mobile app deployment.</li>
            <li><strong>Core Competencies:</strong> Problem-solving, cross-team coordination, professional communication, presentation skills.</li>
            <li><strong>Software Engineering:</strong> Python, SQL, JavaScript/TypeScript, React.js, Node.js, databases.</li>
          </ul>
        </section>

        <section className="resume-section">
          <h3 className="section-title">Documents &amp; Research</h3>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>PATCHLAKE — PATCH-COLUMNAR LAKEHOUSE FORMAT</h4>
              <span className="resume-date">Research paper</span>
            </div>
            <div className="resume-item-subheader">
              <span className="resume-degree">Single author · Apache Arrow IPC, DuckDB pushdown</span>
            </div>
            <p className="resume-details">
              Native columnar format and zero-copy pushdown engine for low-latency Vision Transformer
              ingestion — 4.45× throughput and 75.6% smaller tensor storage on COCO 2017, as reported.
            </p>
            <div className="resume-doc-links">
              <a href="/pdf_files/patchlake-paper.pdf" target="_blank" rel="noreferrer">Read PDF ↗</a>
              <a href="/pdf_files/patchlake-paper.pdf" download>Download</a>
            </div>
          </div>

          <div className="resume-item">
            <div className="resume-item-header">
              <h4>IMAGE-BASED PRODUCT RETRIEVAL USING ViT</h4>
              <span className="resume-date">Major project report</span>
            </div>
            <div className="resume-item-subheader">
              <span className="resume-degree">Team of four · IOE Purwanchal Campus</span>
            </div>
            <p className="resume-details">
              Final-year engineering project: a Vision Transformer fine-tuned on 100,000+ product images for
              content-based image retrieval in e-commerce. Full report, March 2026.
            </p>
            <div className="resume-doc-links">
              <a href="/pdf_files/major-project-report-vit-product-retrieval.pdf" target="_blank" rel="noreferrer">Read PDF ↗</a>
              <a href="/pdf_files/major-project-report-vit-product-retrieval.pdf" download>Download</a>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h3 className="section-title">Languages</h3>
          <ul className="skills-list">
            <li><strong>English:</strong> Fluent (professional communication).</li>
            <li><strong>Nepali:</strong> Native.</li>
            <li><strong>Hindi:</strong> Fluent.</li>
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
