import {theme as chakraTheme} from '@chakra-ui/core';

const theme = {
    ...chakraTheme,
    fonts: {
        ...chakraTheme.fonts,
        body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helbetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Symbol"`,
    },
    fontWeights: {
        normal: 400,
        medium: 600,
        bold: 800,
    },
}

export default theme;