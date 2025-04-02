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
  getLovelace,
} from 'custom-card-helpers';
import { CARD_VERSION } from './constants';
import './editor';

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

export class BoilerplateCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('donder-cloud-directives-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  @state() public hass!: HomeAssistant;
  @state() private config!: DonderCloudDirectivesConfig;
  @state() private directives: Directive[] = [];
  @state() private newDirectiveMessage = '';
  @state() private deletingDirectiveId: string | null = null;

  public setConfig(config: DonderCloudDirectivesConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      ...config,
      name: 'Donder Cloud Directives',
      entity: 'sensor.donder_directives',
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return this._hasConfigOrEntityChanged(this, changedProps, false) || hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected _hasConfigOrEntityChanged(element: any, changedProps: PropertyValues, forceUpdate: boolean): boolean {
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

  private async _createDirective(): Promise<void> {
    if (!this.newDirectiveMessage.trim()) {
      this._showNotification("Please enter a directive message", "warning");
      return;
    }

    try {
      const response = await this.hass.callWS<{ success: boolean; result: any; directives: Directive[] }>({
        type: "donder_cloud/create_directive",
        message: this.newDirectiveMessage.trim(),
      });

      if (response.success) {
        this.directives = response.directives;
        this.newDirectiveMessage = '';
        this._showNotification("Directive created successfully", "success");
      }
    } catch (err) {
      console.error("Error creating directive:", err);
      this._showNotification("Error creating directive", "error");
    }
  }

  private async _deleteDirective(directiveId: string): Promise<void> {
    try {
      const response = await this.hass.callWS<{ success: boolean; result: any }>({
        type: "donder_cloud/delete_directive",
        directive_id: directiveId,
      });

      if (response.success) {
        this.deletingDirectiveId = null;
        this._showNotification("Directive deleted successfully", "success");
      }
    } catch (err) {
      console.error("Error deleting directive:", err);
      this._showNotification("Error deleting directive", "error");
    }
  }

  private _showNotification(message: string, type: 'success' | 'error' | 'warning'): void {
    this.hass.callService("persistent_notification", "create", {
      title: "Donder Cloud",
      message,
      notification_id: `donder_cloud_${type}`,
    });
  }

  private _getStatusIcon(status: string): string {
    switch (status) {
      case 'success':
        return 'mdi:check-circle';
      case 'warning':
        return 'mdi:alert-circle';
      case 'error':
        return 'mdi:close-circle';
      default:
        return 'mdi:help-circle';
    }
  }

  private _getStatusClass(status: string): string {
    switch (status) {
      case 'success':
        return 'status-success';
      case 'warning':
        return 'status-warning';
      case 'error':
        return 'status-error';
      default:
        return 'status-unknown';
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      .type-custom-donder-cloud-directives {
        height: 100%;
        width: 100%;
      }
      .donder-cloud-directives {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #fff;
      }
      .directive-list {
        margin-bottom: 20px;
      }
      .directive-item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid var(--divider-color);
      }
      .directive-content {
        flex-grow: 1;
        margin-right: 10px;
      }
      .directive-message {
        margin-bottom: 5px;
      }
      .directive-actions {
        display: flex;
        gap: 10px;
      }
      .status-success {
        color: var(--success-color);
      }
      .status-warning {
        color: var(--warning-color);
      }
      .status-error {
        color: var(--error-color);
      }
      .status-unknown {
        color: var(--secondary-text-color);
      }
      .new-directive {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }
      .new-directive input {
        flex-grow: 1;
      }
      .confirm-delete {
        display: flex;
        gap: 10px;
      }
    `;
  }

  private _updateDirectivesFromSensor(): void {
    const sensor = this.hass.states[this.config.entity];
    if (sensor && sensor.attributes.directives) {
      this.directives = sensor.attributes.directives;
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
    
    return html`
      <ha-card
        .header=${this.config.name}
        @click=${(e: Event) => e.stopPropagation()}
        tabindex="0"
      >
        <div class='donder-cloud-directives'>
          <div class="directive-list">
            ${this.directives.map(directive => html`
              <div class="directive-item">
                <div class="directive-content">
                  <div class="directive-message">
                    <ha-icon
                      icon=${this._getStatusIcon(directive.status)}
                      class=${this._getStatusClass(directive.status)}
                    ></ha-icon>
                    ${directive.message}
                  </div>
                  <div class="directive-actions">
                    ${this.deletingDirectiveId === directive.id
                      ? html`
                        <div class="confirm-delete">
                          <ha-button @click=${() => this._deleteDirective(directive.id)}>Confirm</ha-button>
                          <ha-button @click=${() => this.deletingDirectiveId = null}>Cancel</ha-button>
                        </div>
                      `
                      : html`
                        <ha-button @click=${() => this.deletingDirectiveId = directive.id}>
                          <ha-icon icon="mdi:delete"></ha-icon>
                        </ha-button>
                      `
                    }
                  </div>
                </div>
              </div>
            `)}
          </div>

          <div class="new-directive">
            <input
              type="text"
              .value=${this.newDirectiveMessage}
              @input=${(e: Event) => {
                const input = e.target as HTMLInputElement;
                this.newDirectiveMessage = input.value;
              }}
              @click=${(e: Event) => e.stopPropagation()}
              placeholder="Enter new directive..."
            />
            <ha-button @click=${() => this._createDirective()}>Create</ha-button>
          </div>
        </div>
      </ha-card>
    `;
  }
}

customElements.define("donder-cloud-directives", BoilerplateCard);
