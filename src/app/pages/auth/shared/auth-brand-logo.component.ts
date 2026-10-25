import { Component, input } from '@angular/core';

/** Vrindavan Rasa logo for auth cards and the admin sidebar. */
@Component({
  selector: 'app-auth-brand-logo',
  template: `
    <div
      class="brand-logo"
      [class.brand-logo--sidebar]="variant() === 'sidebar'"
    >
      <img
        class="brand-logo__mark"
        src="/logo/logo.svg"
        alt="Vrindavan Rasa"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        max-width: 100%;
      }
      .brand-logo {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
        max-width: 100%;
      }
      .brand-logo__mark {
        display: block;
        height: 56px;
        width: auto;
        max-width: min(280px, 100%);
        min-width: 0;
        object-fit: contain;
      }
      .brand-logo--sidebar .brand-logo__mark {
        height: 42px;
        max-width: min(240px, 100%);
      }
    `,
  ],
})
export class AuthBrandLogoComponent {
  readonly variant = input<'auth' | 'sidebar'>('auth');
}
