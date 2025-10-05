import React, { useState, createContext, useContext } from 'react';

// Theme definitions
const themes = {
  coolGray: {
    name: 'Cool Gray',
    base1: '#FFFFFF',
    base2: '#F8F9FA',
    shade1: '#F1F3F5',
    shade2: '#E9ECEF',
    shade3: '#DEE2E6',
    shade4: '#CED4DA',
    text1: '#212529',
    text2: '#495057',
    text3: '#6C757D',
    accent1: '#495057',
    accent2: '#343A40',
    accent3: '#212529',
    accent4: '#ADB5BD',
    border: '#E9ECEF'
  },
  pearlWhite: {
    name: 'Pearl White',
    base1: '#FFFFFF',
    base2: '#FCFCFC',
    shade1: '#F9F9F9',
    shade2: '#F0F0F0',
    shade3: '#E8E8E8',
    shade4: '#DFDFDF',
    text1: '#0A0A0A',
    text2: '#2E2E2E',
    text3: '#6B6B6B',
    accent1: '#2E2E2E',
    accent2: '#1A1A1A',
    accent3: '#0A0A0A',
    accent4: '#C5C5C5',
    border: '#ECECEC'
  },
  slateGray: {
    name: 'Slate Gray',
    base1: '#FAFBFC',
    base2: '#F5F6F8',
    shade1: '#EFF1F3',
    shade2: '#E4E7EB',
    shade3: '#D5DAE1',
    shade4: '#BCC3CD',
    text1: '#1E293B',
    text2: '#334155',
    text3: '#64748B',
    accent1: '#475569',
    accent2: '#334155',
    accent3: '#1E293B',
    accent4: '#94A3B8',
    border: '#E2E8F0'
  },
  charcoal: {
    name: 'Charcoal',
    base1: '#18181B',
    base2: '#1F1F23',
    shade1: '#27272A',
    shade2: '#3F3F46',
    shade3: '#52525B',
    shade4: '#71717A',
    text1: '#FAFAFA',
    text2: '#E4E4E7',
    text3: '#A1A1AA',
    accent1: '#D4D4D8',
    accent2: '#E4E4E7',
    accent3: '#F4F4F5',
    accent4: '#52525B',
    border: '#3F3F46',
    isDark: true
  },
  warmBeige: {
    name: 'Warm Beige',
    base1: '#FEFDFB',
    base2: '#FAF8F5',
    shade1: '#F5F3EF',
    shade2: '#EBE8E1',
    shade3: '#DDD9D0',
    shade4: '#C7C2B8',
    text1: '#2C2A27',
    text2: '#4A4741',
    text3: '#78736B',
    accent1: '#5E5950',
    accent2: '#3D3B36',
    accent3: '#2C2A27',
    accent4: '#B5AFA3',
    border: '#E5E1D8'
  },
  coolBlueGray: {
    name: 'Cool Blue-Gray',
    base1: '#FBFCFD',
    base2: '#F7F9FB',
    shade1: '#F1F4F7',
    shade2: '#E7ECF1',
    shade3: '#D9E1E8',
    shade4: '#C1CDD9',
    text1: '#1A2332',
    text2: '#2D3B4E',
    text3: '#5D6B7E',
    accent1: '#415166',
    accent2: '#2D3B4E',
    accent3: '#1A2332',
    accent4: '#8B98A9',
    border: '#DFE6ED'
  },
  platinum: {
    name: 'Platinum',
    base1: '#FDFEFE',
    base2: '#F8FAFB',
    shade1: '#F2F5F7',
    shade2: '#E9EEF1',
    shade3: '#DDE4E9',
    shade4: '#CAD5DD',
    text1: '#13191E',
    text2: '#2B353D',
    text3: '#5A6670',
    accent1: '#3D4B56',
    accent2: '#2B353D',
    accent3: '#13191E',
    accent4: '#95A3AE',
    border: '#E3EAEF'
  }
};

// Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('coolGray');
  
  return (
    <ThemeContext.Provider value={{ theme: themes[currentTheme], themeName: currentTheme, setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Theme Switcher Component
function ThemeSwitcher() {
  const { themeName, setCurrentTheme, themes, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: theme.base1,
          border: `1px solid ${theme.border}`,
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          color: theme.text2,
          transition: 'all 200ms ease-out'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.shade1;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme.base1;
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="8" r="3"/>
          <path d="M8 1v2M8 13v2M15 8h-2M3 8H1M13.5 2.5l-1.4 1.4M3.9 12.1l-1.4 1.4M13.5 13.5l-1.4-1.4M3.9 3.9L2.5 2.5"/>
        </svg>
        <span>Theme</span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 16 16" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms ease-out'
          }}
        >
          <path d="M4 6l4 4 4-4"/>
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
          />
          
          {/* Dropdown */}
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            backgroundColor: theme.base1,
            border: `1px solid ${theme.border}`,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            minWidth: '220px',
            zIndex: 1000,
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '8px 12px',
              fontSize: '11px',
              fontWeight: '500',
              color: theme.text3,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              borderBottom: `1px solid ${theme.border}`
            }}>
              Select Theme
            </div>
            
            {Object.entries(themes).map(([key, themeData]) => (
              <button
                key={key}
                onClick={() => {
                  setCurrentTheme(key);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: themeName === key ? theme.shade1 : 'transparent',
                  border: 'none',
                  borderBottom: `1px solid ${theme.border}`,
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: theme.text1,
                  transition: 'background-color 150ms ease-out',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (themeName !== key) {
                    e.currentTarget.style.backgroundColor = theme.shade1;
                  }
                }}
                onMouseLeave={(e) => {
                  if (themeName !== key) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Color preview */}
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    backgroundColor: themeData.base2,
                    border: `1px solid ${themeData.border}`,
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '12px',
                      height: '12px',
                      backgroundColor: themeData.accent1,
                      borderRadius: '2px'
                    }}></div>
                  </div>
                  <span>{themeData.name}</span>
                </div>
                
                {themeName === key && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l3 3 7-7"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ThemeSwitcher;