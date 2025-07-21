import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, toggleButtonClasses, useTheme } from "@mui/material"
import { Box, useMediaQuery } from "@mui/system"
import avatarImg from "../menu-lateral/avatar.png"
import HomeIcon from '@mui/icons-material/Home';
import { useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";


interface IListItemLinkProps {
    to: string
    icon: string
    label: string
    onClick: (() => void) | undefined
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
    
    const navigate = useNavigate()

    const resolvedPath = useResolvedPath(to)
    const match = useMatch({path: resolvedPath.pathname, end: false})
    
    const handleClick = () => {
        navigate(to)
        onClick?.() // forma pratica sem utilazr o if em caso de undefined "?."
    }
    
    return (
        <ListItemButton selected={!!match} onClick={handleClick}>                              
             {/* Ícone da home */}
                <ListItemIcon>
                    <Icon>{icon}</Icon>
                    </ListItemIcon>
                 {/* Texto do item */}
                <ListItemText primary={label} />
        </ListItemButton>
    )
}


// Tipagem das props do componente — vai receber o "children"
interface IMenuLateralProps {
    children: React.ReactNode
}
// Criando o componente MenuLateral
export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
    // Acessando o tema (para pegar cores, espaçamentos, etc.)
    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext()

    return (
        <>
            {/* Drawer = menu lateral fixo */}
            <Drawer open={isDrawerOpen} variant={ smDown ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>                
                {/* Caixa principal do Drawer */}
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    {/* Caixa para o Avatar centralizado */}
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">                       
                        {/* Avatar com a imagem importada */}
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src={avatarImg}/>
                    </Box>
                    {/* Linha divisória */}
                    <Divider />
                    {/* Caixa para a lista de navegação */}
                    <Box flex={1}>
                        {/* Lista de botões de navegação */}
                        <List component="nav">
                            {drawerOptions.map(drawerOptions =>( 
                            <ListItemLink
                            to={drawerOptions.icon}
                            key={drawerOptions.path}
                            icon={drawerOptions.path}
                            label={drawerOptions.label}
                            onClick={smDown ? toggleDrawerOpen : undefined} // para não alterar o valor ou alternando
                            
                            />
                        ))}
                        </List>

                    </Box>

                </Box>
            </Drawer>

            {/* Caixa principal do conteúdo, ao lado do Drawer */}
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {/* Aqui vai o conteúdo passado como children */}
                {children}
            </Box>
        </>
    )
}
