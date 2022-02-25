import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import colors from './colors'

let theme = createTheme({
    palette: {
        primary: {
            main: colors.main.primary,
        },
        error: {
            main: '#DC494A',
        },
        warning: {
            main: '#F8991D',
        },
        secondary: {
            main: '#fff'
        },
        background: {
            default: '#fff'
        },
        text: {
            primary: '#4d4d4d'
        },
    }, 
    typography: {
        fontFamily: [
            'Asap, Arial'
        ]
    }
})

theme = responsiveFontSizes(theme, {
    factor: 5
})

export default theme