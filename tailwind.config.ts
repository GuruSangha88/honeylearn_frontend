
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				tutor: {
					purple: '#9b87f5',
					'dark-purple': '#6E59A5',
					'light-purple': '#D6BCFA',
					blue: '#33C3F0',
					dark: '#1A1F2C',
					'dark-gray': '#212429',
					gray: '#8E9196',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)',
						boxShadow: '0 0 0 0 rgba(155, 135, 245, 0.7)'
					},
					'50%': {
						opacity: '0.95',
						transform: 'scale(1.05)',
						boxShadow: '0 0 0 10px rgba(155, 135, 245, 0)'
					}
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'audio-wave1': {
					'0%, 100%': { height: '10px' },
					'50%': { height: '20px' }
				},
				'audio-wave2': {
					'0%, 100%': { height: '14px' },
					'50%': { height: '28px' }
				},
				'audio-wave3': {
					'0%, 100%': { height: '20px' },
					'50%': { height: '36px' }
				},
				'audio-wave4': {
					'0%, 100%': { height: '16px' },
					'50%': { height: '30px' }
				},
				'audio-wave5': {
					'0%, 100%': { height: '8px' },
					'50%': { height: '18px' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 3s ease infinite',
				'audio-wave1': 'audio-wave1 1.2s ease-in-out infinite',
				'audio-wave2': 'audio-wave2 1s ease-in-out infinite',
				'audio-wave3': 'audio-wave3 1.4s ease-in-out infinite',
				'audio-wave4': 'audio-wave4 0.9s ease-in-out infinite',
				'audio-wave5': 'audio-wave5 1.1s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
