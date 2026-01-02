import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { themes } from '../utils/themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('dark');

    useEffect(() => {
        const theme = themes[currentTheme];
        const root = document.documentElement;

        // Batch DOM updates for better performance
        const updates = [];
        
        // Prepare color updates
        Object.entries(theme.colors).forEach(([key, value]) => {
            updates.push([`--${key}`, value]);
        });
        
        // Prepare style updates
        updates.push(['--radius', theme.styles.radius]);
        
        // Apply all updates in a single batch
        updates.forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });

        // Apply font
        root.style.fontFamily = theme.styles.font;

    }, [currentTheme]);

    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        currentTheme,
        setCurrentTheme,
        themes
    }), [currentTheme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
