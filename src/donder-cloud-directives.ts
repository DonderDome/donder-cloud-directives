/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LitElement,
  html,
  TemplateResult,
  css,
  PropertyValues,
  CSSResultGroup,
} from 'lit';
import { state } from "lit/decorators";
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  LovelaceCardEditor,
} from 'custom-card-helpers';
import { CARD_VERSION } from './constants';
import './editor';
import './donder-cloud-directives-dialog';
import { DonderCloudDirectivesDialog } from './donder-cloud-directives-dialog';

import type { DonderCloudDirectivesConfig } from './types';

interface Directive {
  id: string;
  message: string;
  status: 'success' | 'warning' | 'error';
  scenario_id: string;
  created_at: string;
}

/* eslint no-console: 0 */
console.info(
  `%c  DONDER-CLOUD-DIRECTIVES \n%c  version: ${CARD_VERSION}  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'donder-cloud-directives',
  name: 'Donder Cloud Directives',
  description: 'A custom card for managing directives',
});

export class DonderCloudDirectives extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('donder-cloud-directives-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  @state() public hass!: HomeAssistant;
  @state() private config!: DonderCloudDirectivesConfig;
  @state() private directives: Directive[] = [];
  private dialog: DonderCloudDirectivesDialog | null = null;
  public setConfig(config: DonderCloudDirectivesConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    this.config = {
      ...config,
      name: 'Donder Cloud Directives',
      entity: 'sensor.donder_directives',
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    console.log("should update component", changedProps)
    if (!this.config) {
      return false;
    }

    return this._hasConfigOrEntityChanged(this, changedProps, false) || hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected _hasConfigOrEntityChanged(element: DonderCloudDirectives, changedProps: PropertyValues, forceUpdate: boolean): boolean {
    if (changedProps.has('config') || forceUpdate) {
      return true;
    }
    
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;

    if (oldHass && this.config.entity) {
      const oldEntityState = oldHass.states[this.config.entity].state;
      const newEntityState = element.hass.states[this.config.entity].state;
      return oldEntityState !== newEntityState;
    } else {
      return false;
    }
  }

  private _showWarning(warning: string): TemplateResult {
    return html`
      <hui-warning>${warning}</hui-warning>
    `;
  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement('hui-error-card');
    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this.config,
    });

    return html`
      ${errorCard}
    `;
  }

  private _getStatus(): { total: number; success: number; warning: number } {
    return this.directives.reduce(
      (counts, directive) => {
        counts[directive.status]++;
        counts.total++;
        return counts;
      },
      { total: 0, success: 0, warning: 0 }
    );
  }

  private _openDialog(): void {
    this.dialog = new DonderCloudDirectivesDialog();
    this.dialog.setConfig(this.hass, this.directives);
    this.dialog.show();
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --spacing: 12px;
      }
      .type-custom-donder-cloud-directives {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: var(--spacing);
        display: flex;
        flex-direction: column;
        justify-content: var(--layout-align);
        height: auto;
        cursor: pointer;
      }
      .donder-cloud-directives {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
      }
      .status-icon {
        margin-right: var(--spacing);
      }
      .status-text {
        min-width: 0;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .summary {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: 16px;
      }
      .status-text-total {
        font-weight: var(--card-primary-font-weight);
        font-size: var(--card-primary-font-size);
        line-height: var(--card-primary-line-height);
        color: var(--primary-text-color);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .status-text-subtitle {
        font-weight: var(--card-secondary-font-weight);
        font-size: var(--card-secondary-font-size);
        line-height: var(--card-secondary-line-height);
        color: var(--secondary-text-color);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .status-success {
        color: var(--success-color);
      }
      .status-warning {
        color: var(--warning-color);
      }
    `;
  }

  private _updateDirectivesFromSensor(): void {
    const sensor = this.hass.states[this.config.entity];
    if (sensor && sensor.attributes.directives) {
      this.directives = sensor.attributes.directives;

      if (this.dialog) {
        this.dialog.setConfig(this.hass, this.directives);
      }
    }
  }

  protected firstUpdated(): void {
    this._updateDirectivesFromSensor();
  }

  protected render(): TemplateResult | void {
    if (this.config.show_warning) {
      return this._showWarning('warning message');
    }

    if (this.config.show_error) {
      return this._showError('error message');
    }

    this._updateDirectivesFromSensor();
    
    const status = this._getStatus();
    
    return html`
      <ha-card
        @click=${() => this._openDialog()}
        tabindex="0"
      >
        <div class='donder-cloud-directives'>
          <div class="status-icon">
            ${status.warning > 0 
              ? html`<ha-icon icon="mdi:alert-circle" class="status-warning"></ha-icon>` 
              : html`<ha-icon icon="mdi:alpha-d-circle"></ha-icon>`
            }
          </div>
          <div class="status-text">
            <div class="status-text-total">
              ${status.total} directives
            </div>
            <div class="status-text-subtitle">

            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
}

customElements.define("donder-cloud-directives", DonderCloudDirectives);
