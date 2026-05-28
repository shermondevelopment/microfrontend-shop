import type { Config } from 'tailwindcss'

const sharedConfig = {
  theme: {
    extend: {
      
    },
  },
  plugins: [],
} satisfies Omit<Config, 'content'>

export default sharedConfig
