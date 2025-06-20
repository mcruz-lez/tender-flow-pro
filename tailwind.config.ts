/**
 * 🎨 GitHub Copilot UI/UX Enhancement Instruction – TendProcure Web App
 * 
 * 📌 OBJECTIVE:
 * Enhance the visual design, user experience, and responsiveness of the app across Dashboard, Templates, and Property Detail views—while keeping performance and compatibility with ShadCN, Tailwind, and Vite intact.
 * 
 * ✅ STYLE & DESIGN TASKS:
 * 
 * 1. 🌈 COLORS & GRADIENTS:
 *    - Apply modern, non-clashing gradients to header backgrounds and key components.
 *    - Use `bg-gradient-to-r`, `from-purple-600`, `to-indigo-500` where needed.
 *    - Maintain consistent light/dark mode support.
 * 
 * 2. 🧩 COMPONENT AESTHETICS:
 *    - Apply `rounded-2xl`, `shadow-md`, `hover:scale-105`, and `transition-all` to cards and widgets.
 *    - Use subtle borders like `border border-slate-200/40` for clean separation.
 * 
 * 3. 💠 3D FEEL + INTERACTION:
 *    - Add 3D-like effects using shadows (`drop-shadow-lg`, `shadow-xl`) and scaling on hover.
 *    - Animate card entry using Framer Motion: `initial`, `animate`, `exit`, `whileHover`.
 * 
 * 4. ✨ TEXT & FONTS:
 *    - Use Tailwind’s `font-semibold`, `tracking-tight`, and `text-slate-800` for clean headings.
 *    - Enhance visual hierarchy with `text-lg`, `text-xl`, and `text-2xl` properly spaced.
 *    - Use `line-clamp-2` or `truncate` for overflowed text in templates.
 * 
 * 5. 🚀 TRANSITIONS & MOTION:
 *    - Smooth transitions: `transition-all duration-300 ease-in-out`
 *    - Apply fade/slide animation for modals and tooltips.
 *    - On hover, cards slightly lift (`hover:translate-y-1`) with glow (`hover:shadow-indigo-300`)
 * 
 * 6. 🧠 RESPONSIVENESS & LAYOUT:
 *    - Ensure mobile-first responsive layouts with `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
 *    - Sidebar should collapse neatly on mobile (`lg:flex hidden`, `md:hidden block`)
 * 
 * 7. 🛠️ COMPONENTS TO ENHANCE:
 *    - Dashboard widgets (metrics): Add background gradient + subtle pulse animation
 *    - Template Cards: Elevate with border glow on hover + animated button CTA
 *    - Property Details: Add animated chart bar with CSS transitions or `motion.div` entry
 * 
 * 8. 🧾 EXAMPLE TAILWIND SNIPPETS:
 *    ```tsx
 *    <div className="bg-gradient-to-br from-[#1e1e3f] to-[#3c1d60] text-white p-6 rounded-2xl shadow-xl transition-all hover:scale-105">
 *      <h2 className="text-xl font-semibold tracking-tight">HVAC Contract</h2>
 *    </div>
 * 
 *    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
 *      Use Template
 *    </button>
 *    ```
 * 
 * 9. 🧩 PERFORMANT GRADING VISUALS:
 *    - Use progress bars (`<progress>` or `div w-full bg-gray-200`) with `animate-[pulse]` or `transition-width`.
 *    - Use color-coded badge systems (`text-green-500 bg-green-100 px-2 rounded-full`) for status indicators.
 * 
 * 10. 💬 Captions & Status Texts:
 *     - Use `text-sm text-muted-foreground italic` for sub-captions.
 *     - Align text with icons using `inline-flex items-center gap-2`
 * 
 * ✅ GOAL:
 * A polished, smooth, high-performing interface with no conflicts, optimized CSS, and clear design language.
 */




import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [animate],
} satisfies Config;
