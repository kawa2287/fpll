import { extendTheme } from 'native-base';

const mainApp_fonts = {
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto',
    text: 'Roboto Condensed',
};

export const colorThemes = {
    brand: {
        primary: '#577E4E', // Fern Green
        dark: '#394648', // Space Gray
        light: '#E0E1DD', // Platinum
    },
};

export const appMainTheme = extendTheme({
    colors: colorThemes,
    components: {
        fonts: mainApp_fonts,
        Text: {
            baseStyle: {
                style: { color: colorThemes.brand.light },
            },
        },
        Heading: {
            baseStyle: {
                color: 'coolGray.200',
                fontFamily: 'Roboto',
                fontWeight: 100,
            },
            defaultProps: { size: 'lg' },
        },
        Link: {
            baseStyle: {
                _text: {
                    style: {
                        textDecoration: 'none',
                        color: colorThemes.brand.light,
                        fontFamily: 'Roboto Condensed',
                    },
                },
                _hover: {
                    _text: {
                        style: {
                            textDecoration: 'none',
                            color: colorThemes.brand.dark,
                        },
                    },
                },
            },
        },
    },
});
