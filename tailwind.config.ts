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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 12px)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Consolas",
          "Monaco",
          "monospace",
        ],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      animation: {
        // Accordion animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        
        // Enhanced entrance animations
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "fade-in-left": "fadeInLeft 0.6s ease-out",
        "fade-in-right": "fadeInRight 0.6s ease-out",
        
        // Scale animations
        "scale-in": "scaleIn 0.3s ease-out",
        "scale-out": "scaleOut 0.3s ease-out",
        "scale-bounce": "scaleBounce 0.6s ease-out",
        
        // Rotation animations
        "rotate-in": "rotateIn 0.6s ease-out",
        "rotate-out": "rotateOut 0.6s ease-out",
        
        // Slide animations
        "slide-in-bottom": "slideInBottom 0.4s ease-out",
        "slide-in-top": "slideInTop 0.4s ease-out",
        "slide-in-left": "slideInLeft 0.4s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        
        // Premium effects
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float-3d": "float3D 6s ease-in-out infinite",
        "morph-shape": "morphShape 8s ease-in-out infinite",
        "gradient-shift": "gradientShift 4s ease infinite",
        "crystalline": "crystalline 3s ease-in-out infinite",
        
        // Interactive animations
        "bounce-gentle": "bounceGentle 0.6s ease-out",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "heartbeat": "heartbeat 1.5s ease-in-out infinite",
        
        // Loading animations
        "spin-slow": "spin 3s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        // Accordion
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        
        // Fade animations
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        
        // Scale animations
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        scaleOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.9)" },
        },
        scaleBounce: {
          "0%": { transform: "scale(0.3)" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        
        // Rotation animations
        rotateIn: {
          "0%": { opacity: "0", transform: "rotate(-200deg)" },
          "100%": { opacity: "1", transform: "rotate(0)" },
        },
        rotateOut: {
          "0%": { opacity: "1", transform: "rotate(0)" },
          "100%": { opacity: "0", transform: "rotate(200deg)" },
        },
        
        // Slide animations
        slideInBottom: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideInTop: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        
        // Premium 3D effects
        float3D: {
          "0%, 100%": { 
            transform: "translateY(0px) rotateX(0deg) rotateY(0deg)" 
          },
          "33%": { 
            transform: "translateY(-15px) rotateX(5deg) rotateY(10deg)" 
          },
          "66%": { 
            transform: "translateY(5px) rotateX(-3deg) rotateY(-5deg)" 
          },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(59, 130, 246, 0.6), 0 0 80px rgba(59, 130, 246, 0.3)",
          },
        },
        morphShape: {
          "0%, 100%": {
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          "50%": {
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
          },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        crystalline: {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
        },
        
        // Interactive effects
        bounceGentle: {
          "0%, 20%, 53%, 80%, 100%": { transform: "translateY(0)" },
          "40%, 43%": { transform: "translateY(-15px)" },
          "70%": { transform: "translateY(-7px)" },
          "90%": { transform: "translateY(-2px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        heartbeat: {
          "0%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.1)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.1)" },
          "70%": { transform: "scale(1)" },
        },
      },
      boxShadow: {
        'glass': 'var(--shadow-glass)',
        'glass-hover': 'var(--shadow-glass-hover)',
        'premium': 'var(--shadow-premium)',
        'luxury': 'var(--shadow-luxury)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
        'outer-glow': '0 0 40px rgba(59, 130, 246, 0.4)',
        '3d': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      perspective: {
        '500': '500px',
        '1000': '1000px',
        '2000': '2000px',
        '3000': '3000px',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
