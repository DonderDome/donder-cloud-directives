import {
  LitElement,
  html,
  TemplateResult,
  css,
  CSSResultGroup,
  PropertyValues
} from 'lit';
import { state } from "lit/decorators";
import { HomeAssistant, hasConfigOrEntityChanged } from 'custom-card-helpers';
import type { DonderCloudDirectivesConfig } from './types';
interface Directive {
  id: string;
  message: string;
  status: 'success' | 'warning' | 'error';
  scenario_id: string;
  created_at: string;
  active: boolean;
}

interface DirectiveResponse {
  success: boolean;
  result: Record<string, unknown>;
  directives: Directive[];
}

export class DonderCloudDirectivesDialog extends LitElement {
  @state() public hass!: HomeAssistant;
  @state() private config!: DonderCloudDirectivesConfig;
  @state() private directives: Directive[] = [];
  @state() deletingDirectiveId: string | null = null;
  @state() downloadingDirectiveId: string | null = null;
  @state() isDeleting = false;
  @state() isDownloading = false;
  @state() isCreating = false;

  private newDirectiveMessage = '';
  private _isRendered = false;

  public setConfig(hass: HomeAssistant, directives: Directive[]): void {
    this.config = {
      type: 'donder-cloud-directives-dialog',
      name: 'Donder Cloud Directives',
      entity: 'sensor.donder_directives',
    };
    
    this.hass = hass;
    this.directives = directives;
  }

  protected shouldUpdate(changedProps: any): boolean {
    return this._hasConfigOrEntityChanged(this, changedProps, false) || hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected _hasConfigOrEntityChanged(element: DonderCloudDirectivesDialog, changedProps: PropertyValues, forceUpdate: boolean): boolean {
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

  private _propagateVisionSync() {
    if (this.hass) {
      this.hass.callService('mqtt', 'publish', {
        topic: 'direktive-vision-ha-addon/fetch_vision_entities',
        payload: '{}',
        qos: 0,
        retain: false,
      })
      .then(() => {
        console.log('MQTT message published to trigger entity sync.');
        // Optionally show some feedback to the user, e.g., a toast notification
        // this.hass.notification('Sync command sent!'); 
      })
      .catch(err => {
        console.error('Error publishing MQTT message:', err);
        // Optionally show error feedback
        // this.hass.notification('Error sending sync command.', 'error');
      });
    } else {
      console.error('Home Assistant object (hass) is not available.');
    }
  }

  private async _createDirective(): Promise<void> {
    if (this.isDeleting || this.isCreating || this.isDownloading) {
      return;
    }

    if (!this.newDirectiveMessage.trim()) {
      this._showNotification("Please enter a directive message", "warning");
      return;
    }

    try {
      this.isCreating = true;
      const response = await this.hass.callWS<DirectiveResponse>({
        type: "donder_cloud/create_directive",
        message: this.newDirectiveMessage.trim(),
      });
      
      if (response.success) {
        this.isCreating = false;
        this.directives = response.directives;
        this.newDirectiveMessage = '';
        this._showNotification("Directive created successfully", "success");
        this._propagateVisionSync();
      }
    } catch (err) {
      console.error("Error creating directive:", err);
      this.isCreating = false;
      this._showNotification("Error creating directive", "error");
    }
  }

  private async _deleteDirective(directiveId: string): Promise<void> {
    if (this.isDeleting || this.isCreating || this.isDownloading) {
      return;
    }

    try {
      this.isDeleting = true;
      const response = await this.hass.callWS<DirectiveResponse>({
        type: "donder_cloud/delete_directive",
        directive_id: directiveId,
      });
      
      if (response.success) {
        this.deletingDirectiveId = null;
        this._showNotification("Directive deleted successfully", "success");
        this.isDeleting = false;
        this._propagateVisionSync();
      }
    } catch (err) {
      console.error("Error deleting directive:", err);
      this._showNotification("Error deleting directive", "error");
      this.isDeleting = false;
    }
  }

  private async _downloadDirective(directiveId: string): Promise<void> {
    if (this.isDeleting || this.isCreating || this.isDownloading) {
      return;
    }

    try {
      this.isDownloading = true;
      const response = await this.hass.callWS<DirectiveResponse>({
        type: "donder_cloud/dowload_directive",
        directive_id: directiveId,
      });
      
      if (response.success) {
        this.isDownloading = false;
        this.directives = response.directives;
        this._showNotification("Directive downloaded successfully", "success");
        this._propagateVisionSync();
      }
    } catch (err) {
      console.error("Error downloading directive:", err);
      this.isDownloading = false;
      this._showNotification("Error downloading directive", "error");
    }
  }

  private _showNotification(message: string, type: 'success' | 'error' | 'warning'): void {
    this.hass.callService("persistent_notification", "create", {
      title: "Donder Cloud",
      message,
      notification_id: `donder_cloud_${type}`,
    });
  }

  private _getStatusIcon(status: string, directiveId: string, active: boolean): string {
    if (this.deletingDirectiveId === directiveId && this.isDeleting) {
      return 'mdi:loading';
    }

    if (this.downloadingDirectiveId === directiveId && this.isDownloading) {
      return 'mdi:loading';
    }

    if (active === false) {
      return 'mdi:auto-awesome';
    }

    switch (status) {
      case 'success':
        return 'mdi:check-all';
      case 'warning':
        return 'mdi:alert-circle';
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
      default:
        return 'status-unknown';
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        padding: 16px;
        max-width: 600px;
        width: 100%;
        --spacing: 12px;
      }
      .directive-list {
        margin-bottom: 20px;
        max-height: 400px;
        overflow-y: auto;
      }
      .directive-item {
        display: flex;
        position: relative;
        align-items: center;
        padding: 10px;
        padding-right: 100px;
        border-bottom: 1px solid var(--divider-color);
      }
      .directive-item:last-child {
        border-bottom: none;
      }
      .directive-content {
        flex-grow: 1;
        margin-right: 10px;
        display: flex;
      }
      .directive-message {
        margin-bottom: 5px;
        max-width: 350px;
        flex-wrap: wrap;
      }
      .directive-status-icon {
        margin-right: var(--spacing);
      }
      .directive-actions {
        position: absolute;
        width: 0%;
        right: 0;
        top: 0;
        display: flex;
        gap: 10px;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, var(--mdc-theme-surface) 60%);
        transition: width 0s ease-in-out;
        justify-content: flex-end;
      }
      .directive-actions.expanded {
        width: 100%;
      }
      .status-success {
        color: var(--success-color);
      }
      .status-warning {
        color: var(--warning-color);
      }
      .new-directive {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }
      .new-directive input {
        flex-grow: 1;
      }
      .new-directive-input {
        padding: var(--spacing);
      }
      .confirm-delete {
        display: flex;
        gap: 10px;
      }
      .dialog-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 16px;
      }
      .delete-icon {
        color: var(--secondary-text-color);
      }
      .delete-icon.is-loading {
        opacity: 0.5;
      }
      @keyframes spin {
        100% { transform: rotate(360deg); }
      }

      .rotating-icon {
        animation: spin 1s linear infinite;
      }
    `;
  }

  public show(): void {
    if (this._isRendered)
        throw new Error('Already rendered!');

    this._isRendered = true;
    const haDialog = this.getDialogElement();
    if (haDialog) {
        haDialog.open = true;
    }

    // append to DOM
    const haDom = document.getElementsByTagName('home-assistant');
    const haRoot = haDom.length ? haDom[0].shadowRoot : null;
    if (haRoot) {
        haRoot.appendChild(this);
    }
    else {
        document.body.appendChild(this);
    }
  }

  private onDialogClose() {
    if (this._isRendered) {
        this.remove();
        this._isRendered = false;
    }
  }

  private getDialogElement(): any | null {
    if (!this._isRendered || !this.renderRoot)
        return null;

    return this.renderRoot.querySelector('ha-dialog');
}

  protected render(): TemplateResult {
    this._isRendered = true;
    const isLoading = this.isDeleting || this.isCreating;

    const activeDirectives = this.directives.filter(d => d.active !== false);
    const inactiveDirectives = this.directives.filter(d => d.active === false);

    return html`
      <ha-dialog
          open
          @closed=${() => this.onDialogClose()}
          hideActions
        >
          <div class="content">
            <div class="directive-list">
            ${inactiveDirectives.map(directive => html`
                <div class="directive-item">
                  <div class="directive-content">
                    <div class=${`directive-status-icon ${this.downloadingDirectiveId === directive.id && this.isDownloading ? 'rotating-icon' : ''}`}>
                      <ha-icon
                        icon=${this._getStatusIcon(directive.status, directive.id, directive.active)}
                        class=${this._getStatusClass(directive.status)}
                      ></ha-icon>
                    </div>
                    <div class="directive-message">
                      ${directive.message}  
                    </div>                    
                  </div>
                  <div class="directive-actions ${this.downloadingDirectiveId === directive.id ? 'expanded' : ''}">
                    ${this.downloadingDirectiveId === directive.id
                      ? html`
                        <div class="confirm-delete">
                          <ha-button @click=${() => this._downloadDirective(directive.id)} ?disabled=${isLoading}>Confirm</ha-button>
                          <ha-button @click=${() => this.downloadingDirectiveId = null} ?disabled=${isLoading}>Cancel</ha-button>
                        </div>
                      `
                      : html`
                        <ha-button @click=${() => this.downloadingDirectiveId = directive.id} ?disabled=${isLoading}>
                          <ha-icon icon="mdi:trash-can-outline" class="delete-icon is-loading"></ha-icon>
                        </ha-button>
                      `
                    }
                  </div>
                </div>
              `)}
              ${activeDirectives.map(directive => html`
                <div class="directive-item">
                  <div class="directive-content">
                    <div class=${`directive-status-icon ${this.deletingDirectiveId === directive.id && this.isDeleting ? 'rotating-icon' : ''}`}>
                      <ha-icon
                        icon=${this._getStatusIcon(directive.status, directive.id, directive.active)}
                        class=${this._getStatusClass(directive.status)}
                      ></ha-icon>
                    </div>
                    <div class="directive-message">
                      ${directive.message}  
                    </div>                    
                  </div>
                  <div class="directive-actions ${this.deletingDirectiveId === directive.id ? 'expanded' : ''}">
                    ${this.deletingDirectiveId === directive.id
                      ? html`
                        <div class="confirm-delete">
                          <ha-button @click=${() => this._deleteDirective(directive.id)} ?disabled=${isLoading}>Confirm</ha-button>
                          <ha-button @click=${() => this.deletingDirectiveId = null} ?disabled=${isLoading}>Cancel</ha-button>
                        </div>
                      `
                      : html`
                        <ha-button @click=${() => this.deletingDirectiveId = directive.id} ?disabled=${isLoading}>
                          <ha-icon icon="mdi:trash-can-outline" class="delete-icon is-loading"></ha-icon>
                        </ha-button>
                      `
                    }
                  </div>
                </div>
              `)}
            </div>
            <div class="new-directive">
              <input
                type="text"
                class="new-directive-input"
                .value=${this.newDirectiveMessage}
                @input=${(e: Event) => {
                  const input = e.target as HTMLInputElement;
                  this.newDirectiveMessage = input.value;
                }}
                @click=${(e: Event) => e.stopPropagation()}
                placeholder="Enter new directive..."
                ?disabled=${isLoading}
              />
              <ha-button @click=${() => this._createDirective()} ?disabled=${isLoading}>Create</ha-button>
            </div>
          </div>
        </ha-dialog>
    `;
  }
}

customElements.define("donder-cloud-directives-dialog", DonderCloudDirectivesDialog); 