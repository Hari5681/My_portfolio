
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/skills', label: 'Skills' },
  { href: '/education', label: 'Education' },
  { 
    href: '/projects',
    label: 'Projects'
  },
  { href: '/experiences', label: 'Experiences' },
  { href: '/learning-roadmaps', label: 'Learning Roadmaps' },
  { 
    label: 'AI Tools',
    href: '/ai-tools',
    subLinks: [
        { href: '/hari_ai', label: 'AI Chat' },
        { href: '/tools/code-generator', label: 'AI Code Generator' },
        { href: '/tools/summarizer', label: 'AI Summarizer' },
    ]
  },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const NavLink = ({ link, pathname, onLinkClick }) => {
  const isActive = link.href === pathname;

  if (link.subLinks) {
    const isSubActive = link.subLinks.some(sub => sub.href === pathname) || isActive;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                 <motion.div whileTap={{ scale: 0.95 }} className="flex items-center">
                    <Link
                        href={link.href!}
                        onClick={(e) => {
                            // Allow direct navigation for the main link
                            // The dropdown will open on hover/click of the trigger button part
                        }}
                        className={cn(
                            'relative px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-l-md',
                             isSubActive ? 'text-accent' : 'text-foreground hover:text-accent/80'
                        )}
                        >
                        {link.label}
                        {isSubActive && (
                            <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                            layoutId="underline"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        )}
                    </Link>
                    <div className={cn('h-full w-[1px] bg-transparent')}></div>
                    <Button variant="ghost" className={cn(
                        'relative px-2 py-2 text-sm font-medium transition-colors duration-300 flex items-center gap-1 data-[state=open]:bg-transparent rounded-r-md',
                         isSubActive ? 'text-accent' : 'text-foreground hover:text-accent/80'
                    )}>
                        <ChevronDown className="w-4 h-4" />
                    </Button>
                </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {link.subLinks.map(subLink => (
                    <DropdownMenuItem key={subLink.href} asChild>
                        <Link href={subLink.href} onClick={onLinkClick}>
                            {subLink.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
  }

  return (
    <Link
      href={link.href}
      onClick={onLinkClick}
      className={cn(
        'relative px-4 py-2 text-sm font-medium transition-colors duration-300',
        isActive ? 'text-accent' : 'text-foreground hover:text-accent/80'
      )}
    >
      {link.label}
       {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
          layoutId="underline"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};

const mobileMenuVariants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    },
  },
};

const mobileNavLinkVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 120,
            damping: 15,
        }
    },
    closed: {
        y: 30,
        opacity: 0
    }
};

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
        window.removeEventListener('scroll', handleScroll);
        document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setOpenSubMenu(null);
  };
  
  const handleSubMenuToggle = (label: string) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  }

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      )}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className='font-bold text-2xl text-accent'>
              HK.
            </Link>
            
            <nav className="hidden md:flex items-center space-x-2">
               {navLinks.map((link) => (
                 <NavLink key={link.href || link.label} link={link} pathname={pathname} onLinkClick={handleLinkClick} />
               ))}
            </nav>

            <div className="md:hidden">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                    className="text-foreground relative rounded-full z-50"
                    aria-label="Toggle menu"
                >
                    <AnimatePresence initial={false} mode="wait">
                        <motion.div
                            key={isMobileMenuOpen ? 'x' : 'menu'}
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="absolute"
                        >
                           {isMobileMenuOpen ? <X /> : <Menu />}
                        </motion.div>
                    </AnimatePresence>
                </Button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
           <motion.div
             className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center bg-grid-pattern-animated"
             variants={mobileMenuVariants}
             initial="closed"
             animate="open"
             exit="closed"
           >
                <motion.nav 
                    className="flex flex-col items-center gap-2"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={mobileMenuVariants}
                >
                     {navLinks.map((link) => (
                        <motion.div key={link.label} variants={mobileNavLinkVariants} className="text-center">
                            {link.subLinks ? (
                                <>
                                    <button
                                        onClick={() => handleSubMenuToggle(link.label)}
                                        className="text-foreground/80 hover:text-accent px-4 py-2 rounded-md font-bold text-3xl transition-colors duration-300 flex items-center gap-2"
                                    >
                                        {link.label}
                                        <ChevronDown className={cn("w-6 h-6 transition-transform", openSubMenu === link.label && "rotate-180")} />
                                    </button>
                                    <AnimatePresence>
                                    {openSubMenu === link.label && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="flex flex-col items-center gap-2 mt-2 overflow-hidden"
                                        >
                                            {link.subLinks.map(subLink => (
                                                <Link key={subLink.href} href={subLink.href} onClick={handleLinkClick} className="text-foreground/60 hover:text-accent px-4 py-1 rounded-md font-medium text-xl transition-colors duration-300">
                                                    {subLink.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                    </AnimatePresence>
                                </>
                            ) : (
                               <Link href={link.href!} onClick={handleLinkClick} className="text-foreground/80 hover:text-accent px-4 py-2 rounded-md font-bold text-3xl transition-colors duration-300">
                                 {link.label}
                               </Link>
                            )}
                        </motion.div>
                       )
                     )}
                </motion.nav>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
