/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/views/**/*.{ejs,html}',
    './public/scripts/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'midnight': "#00132B",
        'midnight-50': '#E0EEFF',
        'midnight-100': '#B0D3FF',
        'midnight-200': '#4F9DFF',
        'midnight-300': '#0069ED',
        'midnight-400': '#003E8C',
        'midnight-500': '#00132B',
        'midnight-600': '#001126',
        'midnight-700': '#000E21',
        'midnight-800': '#000C1C',
        'midnight-900': '#000A17',
        'midnight-950': '#000914',

        'aqua': '#11C8F3',
        'aqua-50': '#EBFAFE',
        'aqua-100': '#D3F5FD',
        'aqua-200': '#A3EAFA',
        'aqua-300': '#72DEF8',
        'aqua-400': '#42D3F5',
        'aqua-500': '#11C8F3',
        'aqua-600': '#0AA3C7',
        'aqua-700': '#087B96',
        'aqua-800': '#055366',
        'aqua-900': '#032C35',
        'aqua-950': '#01181D'
      },

      screens: {
        'custom': '600px'
      }
    },
  },
  plugins: [],
}

