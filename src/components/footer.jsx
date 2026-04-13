import { FaHandHoldingUsd, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* Brand Section */}
        <div style={styles.section}>
          <div style={styles.brand}>
            <FaHandHoldingUsd size={32} color="#38bdf8" />
            <h3 style={styles.brandName}>Loanify</h3>
          </div>
          <p style={styles.description}>
            Fast, secure, and reliable loan management platform. 
            Get instant financial access when you need it most.
          </p>
          <div style={styles.socialIcons}>
            <a href="#" style={styles.socialLink}><FaFacebook /></a>
            <a href="#" style={styles.socialLink}><FaTwitter /></a>
            <a href="#" style={styles.socialLink}><FaInstagram /></a>
            <a href="#" style={styles.socialLink}><FaLinkedin /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Quick Links</h4>
          <ul style={styles.linkList}>
            <li><Link to="/" style={styles.link}>Home</Link></li>
            <li><Link to="/apply" style={styles.link}>Apply for Loan</Link></li>
            <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
            <li><Link to="/profile" style={styles.link}>My Profile</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Support</h4>
          <ul style={styles.linkList}>
            <li><a href="#" style={styles.link}>FAQ</a></li>
            <li><a href="#" style={styles.link}>Terms & Conditions</a></li>
            <li><a href="#" style={styles.link}>Privacy Policy</a></li>
            <li><a href="#" style={styles.link}>Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Contact Us</h4>
          <ul style={styles.contactList}>
            <li>📍 Nairobi, Kenya</li>
            <li>📞 +254 700 000 000</li>
            <li>✉️ support@loanify.com</li>
            <li>⏰ Mon-Fri: 8am - 6pm</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div style={styles.copyright}>
        <p>&copy; {currentYear} Loanify App | Built with ❤️ by MJ | All Rights Reserved</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "linear-gradient(135deg, #0b1220, #0f172a, #111827)",
    color: "#cbd5e1",
    marginTop: "auto",
    borderTop: "1px solid rgba(56, 189, 248, 0.1)",
  },
  
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
  },
  
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  
  brandName: {
    fontSize: "24px",
    color: "#38bdf8",
    margin: 0,
  },
  
  description: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#94a3b8",
  },
  
  socialIcons: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  
  socialLink: {
    color: "#94a3b8",
    fontSize: "20px",
    transition: "color 0.3s",
    cursor: "pointer",
    textDecoration: "none",
  },
  
  sectionTitle: {
    fontSize: "18px",
    color: "#38bdf8",
    marginBottom: "10px",
    fontWeight: "600",
  },
  
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  
  link: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
    lineHeight: "2",
    transition: "color 0.3s",
    display: "inline-block",
  },
  
  contactList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontSize: "14px",
    lineHeight: "2",
    color: "#94a3b8",
  },
  
  copyright: {
    textAlign: "center",
    padding: "20px",
    borderTop: "1px solid rgba(56, 189, 248, 0.1)",
    fontSize: "13px",
    color: "#64748b",
  },
};

// Add hover effects (optional - add to your global CSS or use styled-components)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  a:hover {
    color: #38bdf8 !important;
    transition: color 0.3s;
  }
`;
document.head.appendChild(styleSheet);