/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Base palette
				background: '#0A0A0B',
				surface: '#141416',
				'surface-hover': '#1C1C1F',
				border: '#27272A',
				'border-focus': '#3F3F46',
				
				// Text
				'text-primary': '#FAFAFA',
				'text-secondary': '#A1A1AA',
				'text-tertiary': '#71717A',
				'text-disabled': '#52525B',
				
				// Accent
				'accent-primary': '#3B82F6',
				'accent-hover': '#2563EB',
				'accent-muted': '#1E3A5F',
			},
			fontFamily: {
				sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				mobs: {
					"primary": "#3B82F6",
					"secondary": "#A1A1AA",
					"accent": "#3B82F6",
					"neutral": "#141416",
					"base-100": "#0A0A0B",
					"base-200": "#141416",
					"base-300": "#1C1C1F",
					"info": "#3B82F6",
					"success": "#22C55E",
					"warning": "#EAB308",
					"error": "#EF4444",
				}
			}
		]
	}
};
