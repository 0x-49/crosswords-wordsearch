import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const { user, initializing, signOut } = useContext(AuthContext);
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleButtonClick = () => {
    if (user && router.pathname === '/dashboard') {
      signOut();
      router.push('/');
    } else {
      router.push(user ? "/dashboard" : "/login");
    }
  };

  const buttonText = () => {
    if (user && router.pathname === '/dashboard') {
      return "Log out";
    }
    return user ? "Dashboard" : "Login";
  };

  const navigationItems = [
    {
      title: "Features",
      href: "/features",
      description: "Discover our powerful puzzle generation tools"
    },
    {
      title: "Puzzle Library",
      href: "/puzzle-library",
      description: "Explore 77,555+ crossword and word search puzzles"
    },
    {
      title: "Book Library",
      href: "/book-library",
      description: "Browse our collection of puzzle books"
    },
    {
      title: "Templates",
      href: "/templates",
      description: "Browse our collection of puzzle templates"
    }
  ];

  const companyItems = [
    {
      title: "About Us",
      href: "/about",
      description: "Learn about our mission and team"
    },
    {
      title: "Blog",
      href: "/blog",
      description: "Industry insights, trends, and puzzle creation tips"
    },
    {
      title: "Glossary",
      href: "/glossary",
      description: "Comprehensive puzzle industry terminology guide"
    },
    {
      title: "Help Center",
      href: "/help",
      description: "Get support and find answers"
    },
    {
      title: "Contact",
      href: "/contact",
      description: "Get in touch with our team"
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="banner">
      <div className="container-fluid">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/dashboard"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            WordCraft Studio
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Professional puzzle book generator with AI-powered creation tools.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {navigationItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {companyItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!initializing && (
              <>
                {!user && (
                  <Link href="/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                )}
                <Button onClick={handleButtonClick} variant={user ? "outline" : "default"}>
                  {buttonText()}
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Link
                  href="/features"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/templates"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Templates
                </Link>
                <Link
                  href="/book-library"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Examples
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/blog"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/glossary"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Glossary
                </Link>
                <Link
                  href="/help"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Help Center
                </Link>
                <Link
                  href="/contact"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                
                <div className="pt-4 border-t">
                  {!initializing && (
                    <div className="space-y-2">
                      {!user && (
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start">
                            Sign In
                          </Button>
                        </Link>
                      )}
                      <Button 
                        onClick={() => {
                          handleButtonClick();
                          setMobileMenuOpen(false);
                        }} 
                        variant={user ? "outline" : "default"}
                        className="w-full"
                      >
                        {buttonText()}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

const ListItem = ({ className, title, children, href, ...props }: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export default Header;