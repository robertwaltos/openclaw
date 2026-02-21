import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/**
 * LUMIQ Theme Configuration
 * Maps theme IDs to display names, descriptions, and recommended use cases
 */
export interface ThemeOption {
  id: LumiqTheme;
  name: string;
  tagline: string;
  swatch: string[];
  bestFor: string;
  emoji: string;
}

export type LumiqTheme =
  | "parchment"
  | "garden"
  | "sunlit"
  | "ocean"
  | "terra"
  | "chalk"
  | "ember"
  | "cosmos"
  | "mist"
  | "festival";

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "parchment",
    name: "Parchment",
    tagline: "Scholar's Desk — calm and focused",
    swatch: ["#f7f0e6", "#c4956a", "#6366f1"],
    bestFor: "Grade 6-12 humanities",
    emoji: "📜",
  },
  {
    id: "garden",
    name: "Garden",
    tagline: "Growth metaphor — learning blooms",
    swatch: ["#f1fdf4", "#6ee7b7", "#059669"],
    bestFor: "Science, Health, PE",
    emoji: "🌱",
  },
  {
    id: "sunlit",
    name: "Sunlit",
    tagline: "Playful clarity — bright and joyful",
    swatch: ["#fffbf0", "#fcd34d", "#f59e0b"],
    bestFor: "Pre-K, K-2, Grade 3-5",
    emoji: "☀️",
  },
  {
    id: "ocean",
    name: "Ocean",
    tagline: "Flow state — deep concentration",
    swatch: ["#f0f9ff", "#7dd3fc", "#0284c7"],
    bestFor: "Physics, Geography, Math",
    emoji: "🌊",
  },
  {
    id: "terra",
    name: "Terra",
    tagline: "Human story — warm and editorial",
    swatch: ["#fff5f2", "#e8856a", "#c45536"],
    bestFor: "History, Social Studies",
    emoji: "🏺",
  },
  {
    id: "chalk",
    name: "Chalk",
    tagline: "Classroom board — familiar and structured",
    swatch: ["#f7faf0", "#86efac", "#4d7c0f"],
    bestFor: "All subjects K-8",
    emoji: "✏️",
  },
  {
    id: "ember",
    name: "Ember",
    tagline: "Focused intensity — exam preparation",
    swatch: ["#fafaf9", "#fed7aa", "#ea580c"],
    bestFor: "SAT, ACT, AP prep",
    emoji: "🔥",
  },
  {
    id: "cosmos",
    name: "Cosmos",
    tagline: "Wonder space — curiosity and exploration",
    swatch: ["#fdfcfb", "#c4b5fd", "#7c3aed"],
    bestFor: "Astronomy, Physics",
    emoji: "✨",
  },
  {
    id: "mist",
    name: "Mist",
    tagline: "Gentle clarity — minimal and focused",
    swatch: ["#f8fafc", "#94a3b8", "#0e7490"],
    bestFor: "Reading, essay writing",
    emoji: "🌫️",
  },
  {
    id: "festival",
    name: "Festival",
    tagline: "Global celebration — vibrant and welcoming",
    swatch: ["#fff8f0", "#fb923c", "#be185d"],
    bestFor: "Onboarding, achievements",
    emoji: "🎉",
  },
];

/**
 * Theme Switcher Component
 * Allows users to switch between 10 LUMIQ organic theme directions
 */
@customElement("theme-switcher")
export class ThemeSwitcher extends LitElement {
  @property({ type: String }) currentTheme: LumiqTheme = "parchment";
  @property({ type: Boolean }) showDarkMode = true;
  @state() private expanded = false;
  @state() private darkMode = false;

  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .theme-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: var(--bg-surface);
      border: 2px solid var(--border-subtle);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: var(--text-sm);
      font-weight: 500;
      cursor: pointer;
      transition: all var(--dur-fast) var(--ease-settle);
    }

    .theme-button:hover {
      background: var(--bg-hover);
      border-color: var(--border-strong);
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
    }

    .theme-button:focus-visible {
      outline: 3px solid var(--accent-primary);
      outline-offset: 2px;
    }

    .theme-icon {
      font-size: 20px;
      line-height: 1;
    }

    .theme-dropdown {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 380px;
      max-height: 540px;
      overflow-y: auto;
      background: var(--bg-elevated);
      border: 2px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      opacity: 0;
      transform: translateY(-8px);
      pointer-events: none;
      transition:
        opacity var(--dur-normal) var(--ease-settle),
        transform var(--dur-normal) var(--ease-settle);
    }

    .theme-dropdown.expanded {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .theme-header {
      padding: 16px;
      border-bottom: 2px solid var(--border-subtle);
    }

    .theme-header h3 {
      margin: 0 0 4px 0;
      font-family: var(--font-display);
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--text-strong);
    }

    .theme-header p {
      margin: 0;
      font-size: var(--text-xs);
      color: var(--text-secondary);
    }

    .theme-grid {
      padding: 12px;
      display: grid;
      gap: 8px;
    }

    .theme-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: var(--bg-surface);
      border: 2px solid var(--border-subtle);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--dur-fast) var(--ease-settle);
    }

    .theme-option:hover {
      background: var(--bg-hover);
      border-color: var(--border-strong);
      transform: translateX(4px);
    }

    .theme-option.active {
      background: var(--accent-subtle);
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 3px var(--accent-subtle);
    }

    .theme-emoji {
      font-size: 24px;
      line-height: 1;
      flex-shrink: 0;
    }

    .theme-info {
      flex: 1;
      min-width: 0;
    }

    .theme-name {
      font-weight: 600;
      font-size: var(--text-sm);
      color: var(--text-primary);
      margin-bottom: 2px;
    }

    .theme-tagline {
      font-size: var(--text-xs);
      color: var(--text-secondary);
      font-style: italic;
      margin-bottom: 4px;
    }

    .theme-bestfor {
      font-size: 10px;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .theme-swatch {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }

    .swatch-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    }

    .dark-mode-toggle {
      padding: 12px 16px;
      border-top: 2px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .dark-mode-label {
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--text-primary);
    }

    .toggle-switch {
      position: relative;
      width: 48px;
      height: 28px;
      background: var(--border-strong);
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: background var(--dur-fast) var(--ease-settle);
    }

    .toggle-switch.active {
      background: var(--accent-primary);
    }

    .toggle-knob {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      transition: transform var(--dur-normal) var(--ease-spring);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .toggle-switch.active .toggle-knob {
      transform: translateX(20px);
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .theme-dropdown,
      .theme-option,
      .toggle-knob {
        transition-duration: 0.01ms !important;
      }
    }

    /* Responsive */
    @media (max-width: 480px) {
      .theme-dropdown {
        width: calc(100vw - 32px);
        right: auto;
        left: 50%;
        transform: translateX(-50%) translateY(-8px);
      }

      .theme-dropdown.expanded {
        transform: translateX(-50%) translateY(0);
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // Load saved theme and dark mode preference
    this.loadPreferences();
    // Apply theme on mount
    this.applyTheme(this.currentTheme, this.darkMode);
  }

  private loadPreferences() {
    try {
      const savedTheme = localStorage.getItem("lumiq-theme") as LumiqTheme;
      const savedDarkMode = localStorage.getItem("lumiq-dark-mode") === "true";

      if (savedTheme && THEME_OPTIONS.find((t) => t.id === savedTheme)) {
        this.currentTheme = savedTheme;
      }

      this.darkMode = savedDarkMode;
    } catch (error) {
      console.warn("Failed to load theme preferences:", error);
    }
  }

  private savePreferences() {
    try {
      localStorage.setItem("lumiq-theme", this.currentTheme);
      localStorage.setItem("lumiq-dark-mode", String(this.darkMode));
    } catch (error) {
      console.warn("Failed to save theme preferences:", error);
    }
  }

  private applyTheme(theme: LumiqTheme, darkMode: boolean) {
    const root = document.documentElement;

    // Set theme
    root.setAttribute("data-theme", theme);

    // Set dark mode variant
    if (darkMode) {
      root.setAttribute("data-theme-variant", "dark");
    } else {
      root.removeAttribute("data-theme-variant");
    }

    // Emit custom event for other components
    this.dispatchEvent(
      new CustomEvent("theme-change", {
        detail: { theme, darkMode },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleThemeSelect(theme: LumiqTheme) {
    this.currentTheme = theme;
    this.applyTheme(theme, this.darkMode);
    this.savePreferences();
    this.expanded = false;

    // Announce to screen readers
    this.announce(`Theme changed to ${THEME_OPTIONS.find((t) => t.id === theme)?.name}`);
  }

  private handleDarkModeToggle() {
    this.darkMode = !this.darkMode;
    this.applyTheme(this.currentTheme, this.darkMode);
    this.savePreferences();

    // Announce to screen readers
    this.announce(`Dark mode ${this.darkMode ? "enabled" : "disabled"}`);
  }

  private announce(message: string) {
    // Simple screen reader announcement
    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    announcement.style.position = "absolute";
    announcement.style.left = "-10000px";
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  }

  private toggleExpanded() {
    this.expanded = !this.expanded;
  }

  private handleClickOutside(e: MouseEvent) {
    if (this.expanded && !this.contains(e.target as Node)) {
      this.expanded = false;
    }
  }

  firstUpdated() {
    // Close dropdown when clicking outside
    document.addEventListener("click", this.handleClickOutside.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleClickOutside.bind(this));
  }

  render() {
    const currentOption = THEME_OPTIONS.find((t) => t.id === this.currentTheme);

    return html`
      <button
        class="theme-button"
        @click=${this.toggleExpanded}
        aria-label="Theme selector"
        aria-expanded=${this.expanded}
      >
        <span class="theme-icon">${currentOption?.emoji || "🎨"}</span>
        <span>${currentOption?.name || "Select Theme"}</span>
      </button>

      <div class="theme-dropdown ${this.expanded ? "expanded" : ""}" role="menu">
        <div class="theme-header">
          <h3>Choose your theme</h3>
        </div>

        <div class="theme-grid" role="group" aria-label="Theme options">
          ${THEME_OPTIONS.map(
            (theme) => html`
              <div
                class="theme-option ${theme.id === this.currentTheme ? "active" : ""}"
                role="menuitem"
                tabindex="0"
                @click=${() => this.handleThemeSelect(theme.id)}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.handleThemeSelect(theme.id);
                  }
                }}
              >
                <span class="theme-emoji">${theme.emoji}</span>
                <div class="theme-info">
                  <div class="theme-name">${theme.name}</div>
                </div>
                <div class="theme-swatch">
                  ${theme.swatch.map(
                    (color) => html`<div class="swatch-dot" style="background: ${color}"></div>`,
                  )}
                </div>
              </div>
            `,
          )}
        </div>

        ${this.showDarkMode
          ? html`
              <div class="dark-mode-toggle">
                <span class="dark-mode-label">Dark Mode</span>
                <div
                  class="toggle-switch ${this.darkMode ? "active" : ""}"
                  role="switch"
                  aria-checked=${this.darkMode}
                  tabindex="0"
                  @click=${this.handleDarkModeToggle}
                  @keydown=${(e: KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      this.handleDarkModeToggle();
                    }
                  }}
                >
                  <div class="toggle-knob"></div>
                </div>
              </div>
            `
          : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-switcher": ThemeSwitcher;
  }
}
