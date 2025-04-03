import {
  LitElement,
  html,
  TemplateResult,
  css,
  CSSResultGroup,
} from 'lit';
import { HomeAssistant } from 'custom-card-helpers';

interface Directive {
  id: string;
  message: string;
  status: 'success' | 'warning' | 'error';
  scenario_id: string;
  created_at: string;
}

// interface DirectiveResponse {
//   success: boolean;
//   result: Record<string, unknown>;
//   directives: Directive[];
// }

export class DonderCloudDirectivesDialog extends LitElement {
  // private hass!: HomeAssistant;
  // private directives: Directive[] = [];
  // private newDirectiveMessage = '';
  // private deletingDirectiveId: string | null = null;
  private _isRendered = false;

  public setConfig(): void {
    // this.hass = hass;
    // this.directives = directives;
  }

  // private async _createDirective(): Promise<void> {
  //   if (!this.newDirectiveMessage.trim()) {
  //     this._showNotification("Please enter a directive message", "warning");
  //     return;
  //   }

  //   try {
  //     const response = await this.hass.callWS<DirectiveResponse>({
  //       type: "donder_cloud/create_directive",
  //       message: this.newDirectiveMessage.trim(),
  //     });

  //     if (response.success) {
  //       this.directives = response.directives;
  //       this.newDirectiveMessage = '';
  //       this._showNotification("Directive created successfully", "success");
  //     }
  //   } catch (err) {
  //     console.error("Error creating directive:", err);
  //     this._showNotification("Error creating directive", "error");
  //   }
  // }

  // private async _deleteDirective(directiveId: string): Promise<void> {
  //   try {
  //     const response = await this.hass.callWS<DirectiveResponse>({
  //       type: "donder_cloud/delete_directive",
  //       directive_id: directiveId,
  //     });

  //     if (response.success) {
  //       this.deletingDirectiveId = null;
  //       this._showNotification("Directive deleted successfully", "success");
  //     }
  //   } catch (err) {
  //     console.error("Error deleting directive:", err);
  //     this._showNotification("Error deleting directive", "error");
  //   }
  // }

  // private _showNotification(message: string, type: 'success' | 'error' | 'warning'): void {
  //   this.hass.callService("persistent_notification", "create", {
  //     title: "Donder Cloud",
  //     message,
  //     notification_id: `donder_cloud_${type}`,
  //   });
  // }

  // private _getStatusIcon(status: string): string {
  //   switch (status) {
  //     case 'success':
  //       return 'mdi:check-circle';
  //     case 'warning':
  //       return 'mdi:alert-circle';
  //     case 'error':
  //       return 'mdi:close-circle';
  //     default:
  //       return 'mdi:help-circle';
  //   }
  // }

  // private _getStatusClass(status: string): string {
  //   switch (status) {
  //     case 'success':
  //       return 'status-success';
  //     case 'warning':
  //       return 'status-warning';
  //     case 'error':
  //       return 'status-error';
  //     default:
  //       return 'status-unknown';
  //   }
  // }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        padding: 16px;
        max-width: 600px;
        width: 100%;
      }
      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      .dialog-title {
        font-size: 20px;
        font-weight: bold;
      }
      .directive-list {
        margin-bottom: 20px;
        max-height: 400px;
        overflow-y: auto;
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
      .dialog-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 16px;
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

  protected override render(): TemplateResult {
    this._isRendered = true;

    return html`
      <ha-dialog
          open
          @closed=${() => this.onDialogClose()}
          hideActions
        >
          <ha-dialog-header slot="heading" class="hue-heading detail-hide">
            <ha-icon-button
              slot="navigationIcon"
              dialogAction="cancel"
            >
              <ha-icon
                icon="mdi:close"
                style="height:auto"
              >
              </ha-icon>
            </ha-icon-button>
            <div
              slot="title"
              class="main-title"
            >
              This is a title
            </div>
          </ha-dialog-header>

          <div class="content">
            This is the content of the popup.
          </div>
        </ha-dialog>
    `;
  }
  
  // private _closeDialog(): void {
  //   const event = new CustomEvent('closed', {
  //     bubbles: true,
  //     composed: true,
  //   });
  //   this.dispatchEvent(event);
  // }
}

customElements.define("donder-cloud-directives-dialog", DonderCloudDirectivesDialog); 