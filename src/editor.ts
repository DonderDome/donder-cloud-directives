/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LitElement,
  html,
  TemplateResult,
  css,
  CSSResultGroup,
} from 'lit';
import { customElement } from 'lit/decorators';
import {
  HomeAssistant,
  LovelaceCardEditor,
} from 'custom-card-helpers';

import type { DonderCloudDirectivesConfig } from './types';

@customElement('donder-cloud-directives-editor')
export class DonderCloudDirectivesEditor extends LitElement implements LovelaceCardEditor {
  private _config: DonderCloudDirectivesConfig = {
    type: 'donder-cloud-directives',
    name: '',
    entities: [],
  };
  private _hass: HomeAssistant = {} as HomeAssistant;

  set hass(hass: HomeAssistant) {
    this._hass = hass;
  }

  get hass(): HomeAssistant {
    return this._hass;
  }

  set config(config: DonderCloudDirectivesConfig) {
    this._config = config;
  }

  get config(): DonderCloudDirectivesConfig {
    return this._config;
  }

  public setConfig(config: DonderCloudDirectivesConfig): void {
    this._config = config;
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-form {
        padding: 16px;
      }
    `;
  }

  protected render(): TemplateResult | void {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <ha-form>
        <ha-textfield
          label="Name"
          .value=${this._config.name || ''}
          .configValue=${'name'}
          @input=${this._valueChanged}
        ></ha-textfield>
      </ha-form>
    `;
  }

  private _valueChanged(ev: Event): void {
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target as HTMLElement;
    if (!target.hasAttribute('configValue')) {
      return;
    }

    const configValue = target.getAttribute('configValue')!;
    const value = (target as any).value;

    if (this._config[configValue] === value) {
      return;
    }

    this._config = {
      ...this._config,
      [configValue]: value,
    };

    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }
}
