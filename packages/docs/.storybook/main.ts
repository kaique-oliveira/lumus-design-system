import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  core: { disableTelemetry: true },
  viteFinal: async (config, { configType }) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()]
    if (configType === 'PRODUCTION') config.base = '/lumus-design-system/'
    return config
  },
}

export default config
