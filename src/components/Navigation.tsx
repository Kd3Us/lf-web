import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="LF Creatif Studio Logo" className="h-10 w-10 md:h-12 md:w-12" />
            <span className="font-bebas text-2xl md:text-3xl tracking-wider text-foreground">
              LF CREATIF STUDIO
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="font-inter text-sm uppercase tracking-wider text-foreground hover:text-accent transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="font-inter text-sm uppercase tracking-wider text-foreground hover:text-accent transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="font-inter text-sm uppercase tracking-wider text-foreground hover:text-accent transition-colors"
            >
              À propos
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="default"
              className="font-inter text-sm uppercase tracking-wider"
            >
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-in">
            <button
              onClick={() => scrollToSection("services")}
              className="font-inter text-sm uppercase tracking-wider text-foreground hover:text-accent transition-colors text-left"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="font-inter text-sm uppercase tracking-wider text-foreground hover:text-accent transition-colors text-left"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="font-inter text-sm uppercase tracking-wider text-foreground hover:text-accent transition-colors text-left"
            >
              À propos
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="default"
              className="font-inter text-sm uppercase tracking-wider w-full"
            >
              Contact
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
