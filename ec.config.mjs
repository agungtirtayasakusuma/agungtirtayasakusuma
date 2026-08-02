// ec.config.mjs
import { defineEcConfig } from 'astro-expressive-code';

export default defineEcConfig({
  themes: ['github-dark'],
  defaultProps: {
    wrap: false,
    showLineNumbers: false,
  },
  styleOverrides: {
    borderRadius: '8px',
    borderColor: 'var(--color-border)',
    codeFontFamily: "'JetBrains Mono Variable', ui-monospace, monospace",
    codeFontSize: '0.9rem',
    codeLineHeight: '1.6',
    uiFontFamily: "'JetBrains Mono Variable', ui-monospace, monospace",
    frames: {
      terminalBackground: 'var(--color-surface)',
      terminalTitlebarBackground: 'var(--color-bg)',
      terminalTitlebarBorderBottom: 'var(--color-border)',
      frameBoxShadowCssValue: 'none',
    },
  },
});