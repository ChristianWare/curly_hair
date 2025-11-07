/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import styles from "./Nav.module.css";
import { useEffect, useMemo, useState, MouseEvent, useCallback } from "react";
import { usePathname } from "next/navigation";
import CompanyLogo from "../icons/CompanyLogo/CompanyLogo";
import React from "react";
import {
  useAnimate,
  AnimationOptions,
  ValueAnimationTransition,
} from "motion/react";

const splitIntoCharacters = (text: string): string[] => {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
};

const extractTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === "string") return children;
  if (React.isValidElement(children)) {
    const props = (children as React.ReactElement).props as any;
    const childText = props.children as React.ReactNode;
    if (typeof childText === "string") return childText;
    if (React.isValidElement(childText))
      return extractTextFromChildren(childText);
  }
  return "";
};

const staggerDuration = 0.015;
const staggerFrom: "first" | "last" | "center" | number | "random" = "first";
const transition: ValueAnimationTransition | AnimationOptions = {
  type: "tween",
  duration: 0.18,
  ease: "easeOut",
};

const baseZ = "translateZ(-0.5lh)";
const rotationTransform = `${baseZ} rotateX(90deg)`;
const resetTransform = `${baseZ} rotateX(0deg)`;

function CharBox({ char }: { char: string }) {
  return (
    <span
      className={`letter-3d-swap-char-box-item ${styles.charBox}`}
      style={{ transform: resetTransform }}
    >
      <span
        className={styles.frontFace}
        style={{ transform: "translateZ(0.5lh)" }}
      >
        {char}
      </span>
      <span
        className={styles.secondFace}
        style={{ transform: "rotateX(-90deg) translateZ(0.5lh)" }}
      >
        {char}
      </span>
    </span>
  );
}

function Text3D({
  content,
  className,
}: {
  content: React.ReactNode;
  className?: string;
}) {
  const text = React.useMemo(() => extractTextFromChildren(content), [content]);
  const characters = React.useMemo(() => {
    const parts = text.split(" ");
    return parts.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== parts.length - 1,
    }));
  }, [text]);

  return (
    <span
      className={`${styles.text3dContainer}${className ? ` ${className}` : ""}`}
    >
      <span className={styles.srOnly}>{text}</span>
      {characters.map((wordObj, wordIndex, array) => {
        const previousCharsCount = array
          .slice(0, wordIndex)
          .reduce((sum, w) => sum + w.characters.length, 0);
        return (
          <span key={wordIndex} className={styles.wordBox}>
            {wordObj.characters.map((char, charIndex) => {
              const totalIndex = previousCharsCount + charIndex;
              return <CharBox key={totalIndex} char={char} />;
            })}
            {wordObj.needsSpace && <span className={styles.space}> </span>}
          </span>
        );
      })}
    </span>
  );
}

function useStaggerDelays() {
  return useCallback((index: number, totalChars: number) => {
    const total = totalChars;
    if (staggerFrom === "first") return index * staggerDuration;
    if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
    if (staggerFrom === "center") {
      const center = Math.floor(total / 2);
      return Math.abs(center - index) * staggerDuration;
    }
    if (staggerFrom === "random") {
      const randomIndex = Math.floor(Math.random() * total);
      return Math.abs(randomIndex - index) * staggerDuration;
    }
    return Math.abs((staggerFrom as number) - index) * staggerDuration;
  }, []);
}

function NavLink3D({
  href,
  className,
  children,
  ariaCurrent,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  ariaCurrent?: "page";
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scope, animate] = useAnimate();
  const getStaggerDelay = useStaggerDelays();

  const handleHoverStart = useCallback(async () => {
    if (isAnimating || isHovering) return;
    setIsHovering(true);
    setIsAnimating(true);
    const root = (scope as any).current as HTMLElement | null;
    const nodes = root
      ? root.querySelectorAll(".letter-3d-swap-char-box-item")
      : null;
    const totalChars = nodes ? nodes.length : 0;
    const delays = Array.from({ length: totalChars }, (_, i) =>
      getStaggerDelay(i, totalChars)
    );
    await animate(
      ".letter-3d-swap-char-box-item",
      { transform: rotationTransform },
      { ...transition, delay: (i: number) => delays[i] }
    );
    await animate(
      ".letter-3d-swap-char-box-item",
      { transform: resetTransform },
      { duration: 0.001 }
    );
    setIsAnimating(false);
  }, [animate, getStaggerDelay, isAnimating, isHovering, scope]);

  const handleHoverEnd = useCallback(() => setIsHovering(false), []);

  return (
    <Link
      ref={scope as any}
      href={href}
      className={className}
      aria-current={ariaCurrent}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <Text3D content={children} />
    </Link>
  );
}

export default function Nav() {
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
      { text: "Services", href: "/" },
      { text: "Gallery", href: "/" },
      { text: "Contact", href: "/" },
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
                <NavLink3D
                  key={item.href}
                  href={item.href}
                  className={`${styles.navItem} ${
                    active ? styles.navItemActive : ""
                  }`}
                  ariaCurrent={active ? "page" : undefined}
                >
                  {item.text}
                </NavLink3D>
              );
            })}
          </div>
        </div>
        <div className={styles.navRight}>
          <NavLink3D href='/' className={styles.navCTA}>
            Get In Touch
          </NavLink3D>
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
