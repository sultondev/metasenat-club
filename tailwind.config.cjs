/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx,css,sass,css}",
        "./src/**/**/*.{vue,js,ts,jsx,tsx,css,sass,css}",
    ],
    theme: {
        screens: {
            'ex-sm': '320px',

            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
            'custom': '1440px',
            // => @media (min-width: 1440px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
            '3xl': '1800px',
        },
        extend: {
            colors: {
                // gray: {
                //     DEFAULT: '',
                //     blue: ''
                // },
                'gray': '#F5F5F7',
                'gray-blue': '#DFE3E8',
                'dark-gray': '#E8E8E8',
                'smoke': '#F1F1F3',
                'primary': '#2E5BFF',
                'dark-blue': '#28293D',
                'black': '#1D1D1F',
                'light-purple': '#E0E7FF',
                'silver': '#B1B1B8',
                'light-silver': '#C4CDD5',
                'dark-silver': '#979797',
                'gold': '#FFA445',
                'dodgerblue': '#5BABF2',
                'my-green': '#00CF83',
                'white': '#fff',
            },
            backgroundColor: {
                skin: {
                    ban1: withoutOpacity("--color-ban-1"),
                    ban2: withoutOpacity("--color-ban-2"),
                    ban3: withoutOpacity("--color-ban-3")
                },
            },
        },

    },
    plugins: [],
}

function withoutOpacity(variableName) {
    return ({opacityValue}) => {
        if (opacityValue !== undefined) {
            return `var(${variableName})`
        }
        return `var(${variableName}))`
    }
}