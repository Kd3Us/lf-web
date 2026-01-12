import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="LF Creatif Studio Logo" className="h-8 w-8" />
            <span className="font-bebas text-2xl tracking-wider">
              LF CREATIF STUDIO
            </span>
          </div>
          <p className="font-inter text-sm text-center md:text-left">
            © 2025 lf creatif studio. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
