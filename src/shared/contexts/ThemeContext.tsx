import { ThemeProvider } from "@emotion/react";
import React, { createContext, useContext, useState } from "react";
import { DarkTheme, LightTheme } from "../themes/";
import { Box } from "@mui/material";

interface IThemeContextData {
    themeName: 'light' | 'dark'
    toggleTheme: () => void
}

const ThemeContext = createContext({}as IThemeContextData)

export const useAppThemeContext = () => {
    return useContext(ThemeContext)
}

export const AppThemeProvider: React.FC = ({children}) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light')

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light')
    }, [])

    const theme =useMemo(() => {
        if (themeName === 'light' ) return LightTheme

        return DarkTheme
    }, [themeName])

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
            <Box width="100vw" height="100vw" bgcolor={theme.pallete.background.default}>

            {children}

            </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )

}