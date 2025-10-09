export const GovtFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      {/* Government Logos */}
      <div className="border-t-2 border-saffron bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
            <div className="flex flex-col items-center gap-1">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" className="h-12" />
              <span className="text-xs text-muted-foreground">Govt. of India</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <img src="https://www.india.gov.in/sites/upload_files/npi/files/images/digital_india.png" alt="Digital India" className="h-12" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <img src="https://www.mygov.in/sites/all/themes/mygov/images/mygov-logo-2.png" alt="MyGov" className="h-12" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Aadhaar_Logo.svg" alt="Aadhaar" className="h-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-3 text-lg">About NIRNAY</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              National Intelligent Research & Development Network for Analytical Year-round Yield
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-secondary transition">Guidelines</a></li>
              <li><a href="#" className="hover:text-secondary transition">FAQs</a></li>
              <li><a href="#" className="hover:text-secondary transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-secondary transition">Feedback</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Important Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://coal.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">Ministry of Coal</a></li>
              <li><a href="https://www.coalindia.in" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">Coal India Limited</a></li>
              <li><a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">India.gov.in</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Contact</h3>
            <p className="text-sm text-primary-foreground/80">
              Ministry of Coal<br />
              Shastri Bhawan<br />
              New Delhi - 110001<br />
              <a href="mailto:nirnay@coal.gov.in" className="hover:text-secondary transition">nirnay@coal.gov.in</a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-glow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-primary-foreground/80">
            <p>© 2025 Ministry of Coal, Government of India. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-secondary transition">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition">Terms of Use</a>
              <a href="#" className="hover:text-secondary transition">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
