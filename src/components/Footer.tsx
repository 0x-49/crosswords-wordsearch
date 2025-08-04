import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  BookOpen,
  Puzzle,
  Users,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { name: 'Word Search Generator', href: '/dashboard' },
    { name: 'Crossword Creator', href: '/dashboard' },
    { name: 'Puzzle Templates', href: '/templates' },
    { name: 'Book Library', href: '/book-library' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/about#story' },
    { name: 'Team', href: '/about#team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press Kit', href: '/press' },
    { name: 'Blog', href: '/blog' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Getting Started', href: '/help/getting-started' },
    { name: 'Tutorials', href: '/help/tutorials' },
    { name: 'FAQ', href: '/help/faq' },
    { name: 'Contact Support', href: '/contact' },
    { name: 'Community', href: '/community' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Sitemap', href: '/sitemap.xml' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/wordcraft', icon: Facebook },
    { name: 'Twitter', href: 'https://twitter.com/wordcraft', icon: Twitter },
    { name: 'Instagram', href: 'https://instagram.com/wordcraft', icon: Instagram },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/wordcraft', icon: Linkedin },
    { name: 'YouTube', href: 'https://youtube.com/wordcraft', icon: Youtube }
  ];

  return (
    <footer className="bg-gradient-to-t from-secondary/30 to-background border-t">
      {/* Newsletter Section */}
      <div className="border-b border-border/50">
        <div className="container-fluid py-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="heading-md mb-4">Stay Updated with WordCraft</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get the latest puzzle creation tips, new features, and exclusive templates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1"
                />
                <Button className="group">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                No spam, unsubscribe at any time. Read our{' '}
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-fluid py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Logo />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empowering publishers worldwide with professional puzzle book creation tools. 
              Built with ❤️ for the publishing community.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@wordcraft.com" className="hover:text-primary transition-colors">
                  hello@wordcraft.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+1-555-0123" className="hover:text-primary transition-colors">
                  +1 (555) 012-3456
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Puzzle className="h-4 w-4" />
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container-fluid py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} WordCraft. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>Made with ❤️ for publishers</span>
              <Separator orientation="vertical" className="h-4" />
              <Link href="/status" className="hover:text-primary transition-colors">
                System Status
              </Link>
              <Separator orientation="vertical" className="h-4" />
              <Link href="/api-docs" className="hover:text-primary transition-colors">
                API Docs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;