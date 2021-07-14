const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
	purge: {
		content: ['./src/**/*.tsx', './public/index.html'],
		options: {
			safelist: ['h-8', 'h-11'],
		},
	},
	darkMode: 'class',
	theme: {
		extend: {},
	},
	plugins: [require('tailwindcss-safe-area')],
}
