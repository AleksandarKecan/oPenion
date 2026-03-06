import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";


function Footer() {
    const currentYear = new Date().getFullYear();


    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-links">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <FaFacebook />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaTwitter />
                    </a>
                </div>
            <p className="copyright">© { currentYear } oPenion. All right reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;