/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LitElement,
  html,
  TemplateResult,
  css,
  CSSResultGroup,
} from 'lit';
import { customElement, property, state } from 'lit/decorators';
import {
  HomeAssistant,
  LovelaceCardEditor,
} from 'custom-card-helpers';

import type { DonderCloudDirectivesConfig } from './types';

@customElement('donder-cloud-directives-editor')
export class DonderCloudDirectivesEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: DonderCloudDirectivesConfig;

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
      <ha-form
        .data=${this._config}
        .schema=${[
          {
            type: 'string',
            name: 'name',
            label: 'Name',
            required: true,
          },
          {
            type: 'string',
            name: 'entity',
            label: 'Entity',
            required: true,
          },
        ]}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value;
    if (!config) {
      return;
    }
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config } }));
  }
}
