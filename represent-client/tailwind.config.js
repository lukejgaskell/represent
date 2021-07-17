const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
	purge: {
		content: ['./src/**/*.tsx', './public/index.html'],
		options: {
			safelist: ['h-8', 'h-11'],
		},
	},
	darkMode: 'media',
	theme: {
		theme: {
			colors: {
				gray: colors.coolGray,
				blue: colors.sky,
				red: colors.rose,
				pink: colors.fuchsia,
			},
			fontFamily: {
				sans: ['Graphik', 'sans-serif'],
				serif: ['Merriweather', 'serif'],
			},
			extend: {
				spacing: {
					128: '32rem',
					144: '36rem',
				},
				borderRadius: {
					'4xl': '2rem',
				},
			},
		},
		variants: {
			extend: {
				borderColor: ['focus-visible'],
				opacity: ['disabled'],
			},
		},
	},
	plugins: [require('tailwindcss-safe-area')],
}
