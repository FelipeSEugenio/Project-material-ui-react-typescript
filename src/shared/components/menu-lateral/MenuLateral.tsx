import { Avatar, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import avatarImg from "../menu-lateral/avatar.png"
import HomeIcon from '@mui/icons-material/Home';

// Tipagem das props do componente — vai receber o "children"
interface IMenuLateralProps {
    children: React.ReactNode
}
// Criando o componente MenuLateral
export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
    // Acessando o tema (para pegar cores, espaçamentos, etc.)
    const theme = useTheme()
    return (
        <>
            {/* Drawer = menu lateral fixo */}
            <Drawer open={true} variant="permanent">                
                {/* Caixa principal do Drawer */}
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    {/* Caixa para o Avatar centralizado */}
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">                       
                        {/* Avatar com a imagem importada */}
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src={avatarImg}
                        />

                    </Box>
                    {/* Linha divisória */}
                    <Divider />
                    {/* Caixa para a lista de navegação */}
                    <Box flex={1}>
                        {/* Lista de botões de navegação */}
                        <List component="nav">
                            <ListItemButton>                              
                                {/* Ícone da home */}
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                {/* Texto do item */}
                                <ListItemText primary="Página inicial" />
                            </ListItemButton>
                        </List>

                    </Box>

                </Box>
            </Drawer>

            {/* Caixa principal do conteúdo, ao lado do Drawer */}
            <Box height="100vh" marginLeft={theme.spacing(28)}>
                {/* Aqui vai o conteúdo passado como children */}
                {children}
            </Box>
        </>
    )
}
