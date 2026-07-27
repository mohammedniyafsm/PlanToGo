import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  
  // Animation switches & configurations
  enableBlur?: boolean;
  blurStrength?: number;
  
  enableColorReveal?: boolean;
  startColor?: string;
  endColor?: string;
  
  enableClipReveal?: boolean;
  
  enableTranslateY?: boolean;
  translateYDistance?: string | number;
  
  enableRotation?: boolean;
  rotationAngle?: number;
  
  enableScale?: boolean;
  scaleFrom?: number;
  
  baseOpacity?: number;
  
  // ScrollTrigger configurations
  scrollStart?: string;
  scrollEnd?: string;
  scrub?: boolean | number;
  stagger?: number;
  ease?: string;
  markers?: boolean;
  once?: boolean;
  invalidateOnRefresh?: boolean;
  refreshPriority?: number;
  
  // Layout/Typography parameters
  containerClassName?: string;
  textClassName?: string;
  lineClassName?: string;
  wordClassName?: string;
  letterSpacing?: string;
  lineHeight?: string;
  wordGap?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = false,
  blurStrength = 4,
  enableColorReveal = true,
  startColor = '#0524B3',
  endColor = '#ffffff',
  enableClipReveal = false,
  enableTranslateY = true,
  translateYDistance = '10px',
  enableRotation = false,
  rotationAngle = 0,
  enableScale = false,
  scaleFrom = 1,
  baseOpacity = 1,
  scrollStart = 'top 80%',
  scrollEnd = 'bottom 45%',
  scrub = 0.6,
  stagger = 0.015,
  ease = 'power3.out',
  markers = false,
  once = false,
  invalidateOnRefresh = true,
  refreshPriority = 0,
  containerClassName = '',
  textClassName = '',
  lineClassName = '',
  wordClassName = '',
  letterSpacing = '-0.05em',
  lineHeight = '0.92',
  wordGap = '0.15em',
  textAlign = 'left',
  fontSize = 'clamp(56px, 6vw, 96px)'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate a stable unique class ID to apply scoped responsive typographic styling
  const uniqueId = useMemo(() => Math.random().toString(36).substring(2, 9), []);

  // Helper function to extract plain text for accessibility (screen readers)
  const plainText = useMemo(() => {
    const extractText = (node: ReactNode): string => {
      if (node === null || node === undefined) return '';
      if (typeof node === 'string' || typeof node === 'number') return String(node);
      if (Array.isArray(node)) return node.map(extractText).join(' ');
      if (React.isValidElement(node)) {
        const props = node.props as { children?: ReactNode };
        if (node.type === 'br' || node.type === 'BR') return '\n';
        return extractText(props.children);
      }
      return '';
    };
    return extractText(children).replace(/\s+/g, ' ').trim();
  }, [children]);

  // Parser to split elements into structured lines and words
  const parsedLines = useMemo(() => {
    const lines: ReactNode[][] = [[]];

    const extractAtoms = (node: ReactNode): ReactNode[] => {
      if (node === null || node === undefined) return [];
      if (typeof node === 'string' || typeof node === 'number') {
        const str = String(node);
        const parts = str.split('\n');
        const result: ReactNode[] = [];
        parts.forEach((part, index) => {
          if (index > 0) {
            result.push(<br key={`br-atom-${index}`} />);
          }
          const words = part.split(/\s+/);
          words.forEach((word) => {
            if (word) result.push(word);
          });
        });
        return result;
      }

      if (React.isValidElement(node)) {
        if (node.type === 'br' || node.type === 'BR') {
          return [node];
        }
        
        const props = node.props as { className?: string; children?: ReactNode; [key: string]: any };
        const isWord = typeof props.className === 'string' && props.className.includes('word');
        if (isWord) {
          return [node];
        }

        if (props.children) {
          const childAtoms = React.Children.toArray(props.children).flatMap(extractAtoms);
          return childAtoms.map((atom, idx) => {
            if (React.isValidElement(atom) && (atom.type === 'br' || atom.type === 'BR')) {
              return atom;
            }
            const element = node as React.ReactElement<any>;
            return React.cloneElement(element, {
              ...props,
              key: `${element.key || ''}-atom-${idx}`,
              children: atom
            });
          });
        }
        return [node];
      }

      if (Array.isArray(node)) {
        return node.flatMap(extractAtoms);
      }
      return [node];
    };

    const traverse = (node: ReactNode) => {
      if (node === null || node === undefined) return;
      if (typeof node === 'string' || typeof node === 'number') {
        const atoms = extractAtoms(node);
        atoms.forEach((atom) => {
          if (React.isValidElement(atom) && (atom.type === 'br' || atom.type === 'BR')) {
            lines.push([]);
          } else {
            lines[lines.length - 1].push(atom);
          }
        });
        return;
      }

      if (React.isValidElement(node)) {
        if (node.type === 'br' || node.type === 'BR') {
          lines.push([]);
          return;
        }

        const props = node.props as { className?: string; children?: ReactNode; [key: string]: any };
        const isWord = typeof props.className === 'string' && props.className.includes('word');
        if (isWord) {
          lines[lines.length - 1].push(node);
          return;
        }

        // Inline formatting tags
        const isInline = typeof node.type === 'string' && ['span', 'strong', 'em', 'i', 'b', 'a', 'code'].includes(node.type);
        if (isInline && props.children) {
          const atoms = extractAtoms(node);
          atoms.forEach((atom) => {
            if (React.isValidElement(atom) && (atom.type === 'br' || atom.type === 'BR')) {
              lines.push([]);
            } else {
              lines[lines.length - 1].push(atom);
            }
          });
        } else if (props.children) {
          React.Children.toArray(props.children).forEach(traverse);
        }
        return;
      }

      if (Array.isArray(node)) {
        node.forEach(traverse);
      }
    };

    React.Children.toArray(children).forEach(traverse);
    return lines.filter(line => line.length > 0);
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    
    // Scoped context cleanup and initialization
    const ctx = gsap.context(() => {
      const lineWrappers = el.querySelectorAll('.line-wrapper');
      const words = el.querySelectorAll('.word-reveal');
      if (words.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: scrub,
          markers: markers,
          once: once,
          invalidateOnRefresh: invalidateOnRefresh,
          refreshPriority: refreshPriority
        }
      });

      const wordFromVars: gsap.TweenVars = {
        willChange: 'transform, opacity, filter, color'
      };
      
      const wordToVars: gsap.TweenVars = {
        ease: scrub ? 'none' : ease
      };

      if (baseOpacity !== 1) {
        wordFromVars.opacity = baseOpacity;
        wordToVars.opacity = 1;
      }
      if (enableTranslateY) {
        wordFromVars.y = translateYDistance;
        wordToVars.y = 0;
      }
      if (enableRotation) {
        wordFromVars.rotate = rotationAngle;
        wordToVars.rotate = 0;
      }
      if (enableScale) {
        wordFromVars.scale = scaleFrom;
        wordToVars.scale = 1;
      }
      if (enableBlur) {
        wordFromVars.filter = `blur(${blurStrength}px)`;
        wordToVars.filter = 'blur(0px)';
      }
      if (enableColorReveal) {
        wordFromVars.color = startColor;
        wordToVars.color = endColor;
      }

      // Add animating words properties to timeline sequentially
      words.forEach((word, index) => {
        tl.fromTo(
          word,
          { ...wordFromVars },
          {
            ...wordToVars,
            duration: stagger,
          },
          index * stagger
        );
      });

      // Clip Reveal applied on the Lines (not the words)
      if (enableClipReveal) {
        tl.fromTo(
          lineWrappers,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: scrub ? 'none' : ease,
            stagger: stagger * 1.5
          },
          0
        );
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    blurStrength,
    enableColorReveal,
    startColor,
    endColor,
    enableClipReveal,
    enableTranslateY,
    translateYDistance,
    enableRotation,
    rotationAngle,
    enableScale,
    scaleFrom,
    baseOpacity,
    scrollStart,
    scrollEnd,
    scrub,
    stagger,
    ease,
    markers,
    once,
    invalidateOnRefresh,
    refreshPriority
  ]);

  const justifyMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
  };

  const justifyValue = justifyMap[textAlign];

  return (
    <div ref={containerRef} className={`${containerClassName.includes('w-') ? '' : 'w-full'} ${containerClassName}`}>
      {/* Scope Typography CSS Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .scroll-reveal-container-${uniqueId} {
            font-size: ${fontSize};
            letter-spacing: ${letterSpacing};
            line-height: ${lineHeight};
          }
          @media (max-width: 1024px) {
            .scroll-reveal-container-${uniqueId} {
              font-size: clamp(48px, 5.5vw, 78px);
            }
          }
          @media (max-width: 768px) {
            .scroll-reveal-container-${uniqueId} {
              font-size: clamp(36px, 9vw, 56px);
            }
          }
        `
      }} />

      {/* Accessibility Fallback - Screen Reader Only */}
      <div 
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: 0,
        }}
      >
        {plainText}
      </div>

      {/* Animated Visual Component */}
      <div 
        aria-hidden="true"
        className={`scroll-reveal-container-${uniqueId} ${textClassName}`}
      >
        {parsedLines.map((line, lineIdx) => (
          <div
            key={`line-${lineIdx}`}
            className={`line-wrapper ${lineClassName}`}
            style={{
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: justifyValue,
              gap: wordGap,
              width: '100%',
            }}
          >
            {line.map((word, wordIdx) => {
              if (React.isValidElement(word)) {
                const element = word as React.ReactElement<any>;
                const mergedStyle: React.CSSProperties = {
                  display: 'inline-block',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity, filter, color',
                  transform: `translate3d(0, ${enableTranslateY ? (typeof translateYDistance === 'number' ? `${translateYDistance}px` : translateYDistance) : '0px'}, 0)`,
                  color: enableColorReveal ? startColor : undefined,
                  opacity: baseOpacity,
                  ...element.props.style
                };
                return React.cloneElement(element, {
                  key: `word-${lineIdx}-${wordIdx}`,
                  className: `${element.props.className || ''} word-reveal ${wordClassName}`.trim(),
                  style: mergedStyle
                });
              }

              return (
                <span
                  key={`word-${lineIdx}-${wordIdx}`}
                  className={`word-reveal inline-block ${wordClassName}`.trim()}
                  style={{
                    display: 'inline-block',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform, opacity, filter, color',
                    transform: `translate3d(0, ${enableTranslateY ? (typeof translateYDistance === 'number' ? `${translateYDistance}px` : translateYDistance) : '0px'}, 0)`,
                    color: enableColorReveal ? startColor : undefined,
                    opacity: baseOpacity,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollReveal;


