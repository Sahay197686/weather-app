/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                glass: {
                    light: "rgba(255, 255, 255, 0.1)",
                    DEFAULT: "rgba(255, 255, 255, 0.2)",
                    dark: "rgba(0, 0, 0, 0.2)",
                },
                premium: {
                    charcoal: "#1a1a1a",
                    gold: "#d4af37",
                    sunset: "#ff4e50",
                    ocean: "#2b5876",
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
