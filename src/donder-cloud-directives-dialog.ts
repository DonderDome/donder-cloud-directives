import {
  LitElement,
  html,
  TemplateResult,
  css,
  CSSResultGroup,
} from 'lit';
import { state } from "lit/decorators";
import { HomeAssistant } from 'custom-card-helpers';

interface Directive {
  id: string;
  message: string;
  status: 'success' | 'warning' | 'error';
  scenario_id: string;
  created_at: string;
}

interface DirectiveResponse {
  success: boolean;
  result: Record<string, unknown>;
  directives: Directive[];
}

export class DonderCloudDirectivesDialog extends LitElement {
  @state() public hass!: HomeAssistant;
  @state() private directives: Directive[] = [];
  @state() deletingDirectiveId: string | null = null;
  @state() isLoading = false;
  private newDirectiveMessage = '';
  private _isRendered = false;

  public setConfig(hass: HomeAssistant, directives: Directive[]): void {
    this.hass = hass;
    this.directives = directives;
  }

  protected shouldUpdate(changedProps: any): boolean {
    console.log("should update dialog", changedProps)
    return true;
  }

  private async _createDirective(): Promise<void> {
    if (this.isLoading) {
      return;
    }

    if (!this.newDirectiveMessage.trim()) {
      this._showNotification("Please enter a directive message", "warning");
      return;
    }

    try {
      const response = await this.hass.callWS<DirectiveResponse>({
        type: "donder_cloud/create_directive",
        message: this.newDirectiveMessage.trim(),
      });
      this.isLoading = true;
      if (response.success) {
        this.isLoading = false;
        this.directives = response.directives;
        this.newDirectiveMessage = '';
        this._showNotification("Directive created successfully", "success");
      }
    } catch (err) {
      console.error("Error creating directive:", err);
      this.isLoading = false;
      this._showNotification("Error creating directive", "error");
    }
  }

  private async _deleteDirective(directiveId: string): Promise<void> {
    if (this.isLoading) {
      return;
    }

    try {
      const response = await this.hass.callWS<DirectiveResponse>({
        type: "donder_cloud/delete_directive",
        directive_id: directiveId,
      });
      this.isLoading = true;
      if (response.success) {
        this.deletingDirectiveId = null;
        this._showNotification("Directive deleted successfully", "success");
        this.isLoading = false;
      }
    } catch (err) {
      console.error("Error deleting directive:", err);
      this._showNotification("Error deleting directive", "error");
      this.isLoading = false;
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

    return html`
      <ha-dialog
          open
          @closed=${() => this.onDialogClose()}
          hideActions
        >
          <div class="content">
            <div class="directive-list">
              ${this.directives.map(directive => html`
                <div class="directive-item">
                  <div class="directive-content">
                    <div class="directive-status-icon">
                      <ha-icon
                        icon=${this._getStatusIcon(directive.status)}
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
                          <ha-button @click=${() => this._deleteDirective(directive.id)} ?disabled=${this.isLoading}>Confirm</ha-button>
                          <ha-button @click=${() => this.deletingDirectiveId = null} ?disabled=${this.isLoading}>Cancel</ha-button>
                        </div>
                      `
                      : html`
                        <ha-button @click=${() => this.deletingDirectiveId = directive.id} ?disabled=${this.isLoading}>
                          <ha-icon icon="mdi:trash-can-outline" class="delete-icon"></ha-icon>
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
                ?disabled=${this.isLoading}
              />
              <ha-button @click=${() => this._createDirective()} ?disabled=${this.isLoading}>Create</ha-button>
            </div>
          </div>
        </ha-dialog>
    `;
  }
}

customElements.define("donder-cloud-directives-dialog", DonderCloudDirectivesDialog); 