/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: {
                    50: '#425370',
                    100: '#757a91',
                    200: '#6f7592',
                    300: '#2f3b50',
                    350: '#3e6183',
                    400: '#1a2236',
                    450: '#293145',
                    500: '#151a23',
                },
                content: {
                    100: '#adb5bd',
                    200: '#dddddd',
                    300: '#888',
                    blue: '#1e74fd',
                    ['blue-100']: '#05f',
                    ['light-grey']: '#eee',
                },
                light: {
                    100: 'rgba(255, 255, 255, 0.3)',
                    200: '#fbfcfe',
                    300: '#eeeeee',
                    400: '#ced0d4',
                },
                blue: {
                    light: '#649fe8',
                },
                blur: {
                    100: 'rgba(0,0,0,.6)',
                },
            },
        },
        keyframes: {
            wiggle: {
                '0%': { transform: 'translateX(100%)' },
                '100%': { transform: 'translateX(0)' },
            },
        },
        screens: {
            xl: { max: '1279px' },
            // => @media (max-width: 1279px) { ... }

            lg: { max: '1023px' },
            // => @media (max-width: 1023px) { ... }

            tablet: { max: '767px' },
            // => @media (max-width: 767px) { ... }

            mobile: { max: '639px' },
            // => @media (max-width: 639px) { ... }
        },
    },
    plugins: [],
};
