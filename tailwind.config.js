import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'dark-blue-sell': '#14293F',
				'light-blue-sell': '#3999D5',
				'green-sell': '#6EB858',
				'surface-sell': '#0a1e33'
			},
			fontFamily: {
				sans: ['Poppins', 'sans-serif']
			}
		}
	},

	plugins: [typography, forms, containerQueries, aspectRatio]
};
