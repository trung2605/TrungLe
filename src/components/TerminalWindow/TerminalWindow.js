import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './TerminalWindow.scss';

const TerminalWindow = ({ 
  title = "terminal", 
  children, 
  className = "", 
  height = "auto",
  commands = [],
  autoType = false 
}) => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!autoType || !commands.length) return;

    const command = commands[currentCommand];
    if (!command) return;

    let index = 0;
    setDisplayedText('');

    const typeInterval = setInterval(() => {
      if (index < command.length) {
        setDisplayedText(command.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentCommand((prev) => (prev + 1) % commands.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentCommand, commands, autoType]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`terminal-window ${className}`}
      style={{ height }}
    >
      {/* Terminal Header */}
      <div className="terminal-window__header">
        <div className="terminal-window__dots">
          <div className="terminal-window__dot terminal-window__dot--red"></div>
          <div className="terminal-window__dot terminal-window__dot--yellow"></div>
          <div className="terminal-window__dot terminal-window__dot--green"></div>
        </div>
        <span className="terminal-window__title">{title}</span>
      </div>

      {/* Terminal Content */}
      <div className="terminal-window__content">
        {autoType && commands.length > 0 ? (
          <div className="terminal-window__auto-type">
            <div className="terminal-window__prompt-line">
              <span className="terminal-window__prompt">$</span>
              <span className="terminal-window__command">
                {displayedText}
                {showCursor && <span className="terminal-window__cursor">|</span>}
              </span>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </motion.div>
  );
};

// Terminal prompt component
export const TerminalPrompt = ({ command, output, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!isVisible) return null;

  return (
    <div className={`terminal-prompt ${className}`}>
      <div className="terminal-prompt__line">
        <span className="terminal-prompt__symbol">$</span>
        <span className="terminal-prompt__command">{command}</span>
      </div>
      {output && (
        <div className="terminal-prompt__output">
          {output}
        </div>
      )}
    </div>
  );
};

// Code block component with syntax highlighting colors
export const CodeBlock = ({ children, language = "javascript", className = "" }) => {
  const getLanguageColor = (lang) => {
    const colors = {
      javascript: "terminal-code--javascript",
      python: "terminal-code--python",
      java: "terminal-code--java",
      html: "terminal-code--html",
      css: "terminal-code--css",
      json: "terminal-code--json",
      default: "terminal-code--default"
    };
    return colors[lang] || colors.default;
  };

  return (
    <div className={`terminal-code ${className}`}>
      <div className="terminal-code__header">
        <span className={`terminal-code__language ${getLanguageColor(language)}`}>
          {language.toUpperCase()}
        </span>
        <div className="terminal-code__controls">
          <div className="terminal-code__control terminal-code__control--red"></div>
          <div className="terminal-code__control terminal-code__control--yellow"></div>
          <div className="terminal-code__control terminal-code__control--green"></div>
        </div>
      </div>
      <pre className="terminal-code__content">
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default TerminalWindow;