import React, { useState, useRef, useEffect } from 'react';
import { X, Home, Mail, User, Settings, Menu } from 'lucide-react';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [animating, setAnimating] = useState(false);
  const menuRef = useRef(null);

  const menuItems = [
    { id: 'close', icon: X },
    { id: 'home', icon: Home },
    { id: 'mail', icon: Mail },
    { id: 'profile', icon: User },
    { id: 'settings', icon: Settings }
  ];

  const toggleMenu = () => {
    setAnimating(true);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  return (
    <div className="fixed top-8 left-8 z-50">
      <div className="relative">
        <button
          onClick={toggleMenu}
          className={`
            size-12 bg-neutral-100 rounded-full 
            flex items-center justify-center 
            transition-all duration-700 ease-in-out
            ${isOpen ? 'opacity-0' : 'opacity-100'}
          `}
          style={{
            position: isOpen ? 'absolute' : 'relative',
            touchAction: 'pan-x pan-y pinch-zoom'
          }}
          onMouseEnter={() => setHoveredItem('menu')}
          onMouseLeave={() => setHoveredItem(null)}
          aria-label="Menu"
          tabIndex="0"
        >
          <Menu size={24} className={'text-zinc-950 transition-colors duration-700 cursor-pointer'} />
        </button>

        <div
          ref={menuRef}
          className={`
            flex flex-col items-center
            transition-all duration-700 ease-in-out
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}
          `}
          style={{
            filter: 'url(#gooey)',
            transformOrigin: 'top center',
            position: 'absolute',
            top: 0,
            left: 0,
            transitionDelay: isOpen ? '0ms' : '0ms'
          }}
        >
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`
                flex items-center justify-center size-12
                rounded-full bg-neutral-100
                cursor-pointer 
                transition-all duration-700 ease-in-out
                ${index > 0 ? '-mt-0.5' : ''}
              `}
              style={{
                transitionDelay: `${index * 30}ms`,
                opacity: isOpen || index === 0 ? 1 : 0,
                transform: isOpen || index === 0 ? 'translateY(0)' : 'translateY(-10px)',
                touchAction: 'pan-x pan-y pinch-zoom'
              }}
              onClick={() => {
                if (item.id === 'close') {
                  toggleMenu();
                } else {
                  setActiveItem(item.id);
                }
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <item.icon
                size={24}
                className={`
                  ${activeItem === item.id || index === 0 ? 'text-zinc-950' :
                    hoveredItem === item.id ? 'text-zinc-950' : 'text-zinc-500'} 
                  transition-colors duration-700
                `}
              />
            </div>
          ))}

          <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
            <defs>
              <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
                <feBlend in="SourceGraphic" in2="gooey" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;