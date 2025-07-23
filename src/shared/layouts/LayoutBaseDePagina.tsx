import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { ReactNode } from "react";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {
    titulo: string;
    barraDeFerramentas?: ReactNode;

}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({children, titulo, barraDeFerramentas}) => {
    
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
    const theme = useTheme();
    const { toggleDrawerOpen } = useDrawerContext();
   
    return(
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={1} display="flex" height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} gap={1} >
                {smDown && ( 

                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}

                <Typography 
                overflow="hidden" // cut the text
                whiteSpace="nowrap" // don't break lines in the text
                textOverflow="ellipsis" // show 3 dots
                variant={smDown ? "h5" : mdDown ? "h4" : "h3" }
                >

                {titulo} 
                </Typography>
            </Box>

            
            {barraDeFerramentas &&(
                <Box>
                {Barra de ferramentas}
                </Box>)}

            <Box flex={1} overflow="auto">
            {children} 
            </Box>
        </Box>
    )
}