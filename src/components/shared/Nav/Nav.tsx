/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import styles from "./Nav.module.css";
import { useEffect, useState, MouseEvent, useMemo } from "react";
import { usePathname } from "next/navigation";
import CompanyLogo from "../icons/CompanyLogo/CompanyLogo";

export default function Nav({}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen((s) => !s);

  const handleHamburgerClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    toggleMenu();
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const items = useMemo(
    () => [
      { text: "About", href: "/about" },
      { text: "Services", href: "/services" },
      { text: "Gallery", href: "/gallery" },
      { text: "Contact", href: "/contact" },
    ],
    []
  );

  return (
    <header className={styles.header}>
      <nav className={styles.navbar} aria-label='Primary'>
        <div className={styles.navLeft}>
          <div className={styles.companyLogoContainer}>
            <CompanyLogo />
          </div>
          <div className={styles.navItems}>
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navItem} ${
                    active ? styles.navItemActive : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.text}
                </Link>
              );
            })}
          </div>
        </div>
        <div className={styles.navRight}>
          <Link href='/' className={styles.navCTA}>
            Get In Touch
          </Link>
        </div>

        <span
          className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
          onClick={handleHamburgerClick}
          aria-expanded={isOpen}
          aria-controls='mobile-menu'
          role='button'
        >
          <span className={styles.whiteBar} />
          <span className={styles.whiteBar} />
          <span className={styles.whiteBar} />
        </span>
      </nav>
    </header>
  );
}
