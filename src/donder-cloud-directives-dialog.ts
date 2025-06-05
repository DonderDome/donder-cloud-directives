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
  title: string;
  summary: string;
  status: 'success' | 'warning' | 'error';
  created_at: string;
  active: boolean;
  discovery: boolean;
  follow_up: string | null;
  review_summary: string | null;
  messages?: Array<{
    role: 'user' | 'assistant';
    content: {
      type?: string;
      answer?: string;
      request?: any;
      updated_directive?: string;
      created_at?: string;
    };
    created_at: string;
  }>;
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
  @state() private selectedDirective: Directive | null = null;
  @state() private showDetailsView = false;
  @state() private conversationInput = '';
  @state() private isSendingMessage = false;

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
      return 'mdi:creation-outline';
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

  private async _loadConversation(directiveId: string): Promise<void> {
    try {
      const response = await this.hass.callWS<{success: boolean; messages: any[]}>({
        type: "donder_cloud/get_conversation",
        directive_id: directiveId,
      });
      
      if (response.success && this.selectedDirective) {
        this.selectedDirective.messages = response.messages;
        this.requestUpdate();
      }
    } catch (err) {
      console.error("Error loading conversation:", err);
      this._showNotification("Error loading conversation", "error");
    }
  }

  private async _sendMessage(): Promise<void> {
    if (!this.selectedDirective || !this.conversationInput.trim() || this.isSendingMessage) {
      return;
    }

    try {
      this.isSendingMessage = true;
      const response = await this.hass.callWS<{success: boolean; answer?: string; request?: any; updated_directive?: string}>({
        type: "donder_cloud/send_conversation_message",
        directive_id: this.selectedDirective.id,
        prompt: this.conversationInput.trim(),
      });

      if (response.success) {
        this.conversationInput = '';
        await this._loadConversation(this.selectedDirective.id);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      this._showNotification("Error sending message", "error");
    } finally {
      this.isSendingMessage = false;
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
        transition: opacity 0.25s ease, transform 0.25s ease;
      }
      .directive-list.hidden {
        opacity: 0;
        transform: translateX(-20px);
        pointer-events: none;
      }
      .directive-details {
        position: absolute;
        width: 86%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 16px;
        background: var(--mdc-theme-surface);
        opacity: 0;
        transform: translateX(20px);
        transition: opacity 0.25s ease, transform 0.25s ease;
        pointer-events: none;
      }
      .directive-details.visible {
        opacity: 1;
        transform: translateX(0);
        pointer-events: auto;
      }
      .back-button {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        color: var(--primary-text-color);
      }
      .directive-detail-content {
        margin-top: 26px;
      }
      .detail-item {
        margin-bottom: 12px;
      }
      .detail-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }
      .detail-value {
        font-size: 14px;
        color: var(--primary-text-color);
      }
      .directive-item {
        display: flex;
        position: relative;
        align-items: center;
        padding: 10px;
        padding-right: 100px;
        border-bottom: 1px solid var(--divider-color);
        cursor: pointer;
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
        padding-top: 3px;
      }
      .directive-status-icon {
        margin-right: var(--spacing);
      }
      .directive-actions {
        position: absolute;
        width: 0%;
        right: 0;
        top: 5px;
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
      .new-directive.hidden {
        opacity: 0;
        pointer-events: none;
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
      .delete-icon, .download-icon {
        color: var(--secondary-text-color);
      }
      .delete-icon.is-loading, .download-icon.is-loading {
        opacity: 0.5;
      }
      @keyframes spin {
        100% { transform: rotate(360deg); }
      }

      .rotating-icon {
        animation: spin 1s linear infinite;
      }
      .directive-list-subtitle {
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 10px;
        color: var(--secondary-text-color);
      }
      .create-directive-button {
        flex: 0 1 70px;
      }
      .message-icon {
        margin-left: 10px;
        color: var(--secondary-text-color);
      }
      .muted {
        color: var(--secondary-text-color);
      }
      .conversation-container {
        margin-top: 20px;
        border-top: 1px solid var(--divider-color);
        padding-top: 16px;
      }

      .message-list {
        max-height: 300px;
        overflow-y: auto;
        margin-bottom: 16px;
      }

      .message {
        margin-bottom: 12px;
        padding: 8px 12px;
        border-radius: 8px;
        max-width: 80%;
      }

      .message.user {
        background-color: var(--primary-color);
        color: var(--text-primary-color);
        margin-left: auto;
      }

      .message.assistant {
        background-color: var(--secondary-background-color);
        margin-right: auto;
      }

      .message-time {
        font-size: 11px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      .conversation-input {
        display: flex;
        gap: 8px;
        margin-top: 16px;
      }

      .conversation-input input {
        flex-grow: 1;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
      }

      .conversation-input button {
        min-width: 80px;
      }

      .conversation-input button:disabled {
        opacity: 0.5;
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
    const isLoading = this.isDeleting || this.isCreating || this.isDownloading;

    const activeDirectives = this.directives.filter(d => d.active === true);
    const discoveredDirectives = this.directives.filter(d => d.discovery === true && d.active === false);
    // const inactiveDirectives = this.directives.filter(d => d.active === false);

    return html`
      <ha-dialog
          open
          @closed=${() => this.onDialogClose()}
          hideActions
        >
          <div class="content">
            <div class="directive-list ${this.showDetailsView ? 'hidden' : ''}">
              <div class="directive-list-subtitle">Suggested Directives</div>
              ${discoveredDirectives.map(directive => html`
                <div class="directive-item" @click=${() => this._showDirectiveDetails(directive)}>
                  <div class="directive-content">
                    <div class=${`directive-status-icon ${this.downloadingDirectiveId === directive.id && this.isDownloading ? 'rotating-icon' : ''}`}>
                      <ha-icon
                        icon=${this._getStatusIcon(directive.status, directive.id, directive.active)}
                        class=${this._getStatusClass(directive.status)}
                      ></ha-icon>
                    </div>
                    <div class="directive-message">
                      ${directive.title}  
                      <ha-icon icon="mdi:chevron-right" class="message-icon"></ha-icon>
                    </div>                    
                  </div>
                  <div class="directive-actions ${this.downloadingDirectiveId === directive.id ? 'expanded' : ''}">
                    ${this.downloadingDirectiveId === directive.id
                      ? html`
                        <div class="confirm-delete">
                          <ha-button @click=${(e: Event) => { e.stopPropagation(); this._downloadDirective(directive.id); }} ?disabled=${isLoading}>Confirm</ha-button>
                          <ha-button @click=${(e: Event) => { e.stopPropagation(); this.downloadingDirectiveId = null; }} ?disabled=${isLoading}>Cancel</ha-button>
                        </div>
                      `
                      : html`
                        <ha-button @click=${(e: Event) => { e.stopPropagation(); this.downloadingDirectiveId = directive.id; }} ?disabled=${isLoading}>
                          <ha-icon icon="mdi:cloud-download-outline" class="download-icon is-loading"></ha-icon>
                        </ha-button>
                      `
                    }
                  </div>
                </div>
              `)}
            </div>
            <div class="directive-list ${this.showDetailsView ? 'hidden' : ''}">
              <div class="directive-list-subtitle">Active Directives</div>
              ${activeDirectives.map(directive => html`
                <div class="directive-item" @click=${() => this._showDirectiveDetails(directive)}>
                  <div class="directive-content">
                    <div class=${`directive-status-icon ${this.deletingDirectiveId === directive.id && this.isDeleting ? 'rotating-icon' : ''}`}>
                      <ha-icon
                        icon=${this._getStatusIcon(directive.status, directive.id, directive.active)}
                        class=${this._getStatusClass(directive.status)}
                      ></ha-icon>
                    </div>
                    <div class="directive-message">
                      ${directive.title}  
                    </div>                    
                  </div>
                  <div class="directive-actions ${this.deletingDirectiveId === directive.id ? 'expanded' : ''}">
                    ${this.deletingDirectiveId === directive.id
                      ? html`
                        <div class="confirm-delete">
                          <ha-button @click=${(e: Event) => { e.stopPropagation(); this._deleteDirective(directive.id); }} ?disabled=${isLoading}>Confirm</ha-button>
                          <ha-button @click=${(e: Event) => { e.stopPropagation(); this.deletingDirectiveId = null; }} ?disabled=${isLoading}>Cancel</ha-button>
                        </div>
                      `
                      : html`
                        <ha-button @click=${(e: Event) => { e.stopPropagation(); this.deletingDirectiveId = directive.id; }} ?disabled=${isLoading}>
                          <ha-icon icon="mdi:trash-can-outline" class="delete-icon is-loading"></ha-icon>
                        </ha-button>
                      `
                    }
                  </div>
                </div>
              `)}
              ${activeDirectives.length === 0 ? html`
                <div class="directive-item">
                  <div class="directive-content">
                    <div class="directive-message muted">No active directives</div>
                  </div>
                </div>
              ` : ''}
            </div>
            <div class="directive-details ${this.showDetailsView ? 'visible' : ''}">
              ${this.selectedDirective ? html`
                <div class="back-button" @click=${this._hideDirectiveDetails}>
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                  <span>Back to Directives</span>
                </div>
                <div class="directive-detail-content">
                  <div class="detail-item">
                    <div class="detail-label">Automation</div>
                    <div class="detail-value">${this.selectedDirective.title}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Status</div>
                    <div class="detail-value">${this.selectedDirective.status}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Created At</div>
                    <div class="detail-value">${new Date(this.selectedDirective.created_at).toLocaleString()}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Summary</div>
                    <div class="detail-value">${this.selectedDirective.summary}</div>
                  </div>
                  ${this.selectedDirective.follow_up ? html`
                    <div class="detail-item">
                      <div class="detail-label">Follow Up</div>
                      <div class="detail-value">${this.selectedDirective.follow_up}</div>
                    </div>
                  ` : ''}
                  ${this.selectedDirective.review_summary ? html`
                    <div class="detail-item">
                      <div class="detail-label">Review Summary</div>
                      <div class="detail-value">${this.selectedDirective.review_summary}</div>
                    </div>
                  ` : ''}

                  <div class="conversation-container">
                    <div class="message-list">
                      ${console.log(this.selectedDirective)}
                      ${this.selectedDirective.messages?.map(message => html`
                        <div class="message ${message.role}">
                          ${message.content.type === 'question' ? html`
                            <div>${message.content.answer}</div>
                          ` : message.content.type === 'request' ? html`
                            <div>${message.content.request}</div>
                          ` : html`
                            <div>${message.content.answer || JSON.stringify(message.content)}</div>
                          `}
                          <div class="message-time">
                            ${new Date(message.created_at).toLocaleString()}
                          </div>
                        </div>
                      `)}
                    </div>
                    <div class="conversation-input">
                      <input
                        type="text"
                        .value=${this.conversationInput}
                        @input=${(e: Event) => {
                          const input = e.target as HTMLInputElement;
                          this.conversationInput = input.value;
                        }}
                        @keydown=${(e: KeyboardEvent) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            this._sendMessage();
                          }
                        }}
                        placeholder="Type your message..."
                        ?disabled=${this.isSendingMessage}
                      />
                      <ha-button
                        @click=${() => this._sendMessage()}
                        ?disabled=${this.isSendingMessage}
                      >
                        ${this.isSendingMessage ? html`
                          <ha-icon icon="mdi:loading" class="rotating-icon"></ha-icon>
                        ` : 'Send'}
                      </ha-button>
                    </div>
                  </div>
                </div>
              ` : ''}
            </div>
            <div class="new-directive ${this.showDetailsView ? 'hidden' : ''}">
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
              <div class=${`create-directive-button ${this.isCreating ? 'rotating-icon' : ''}`}>
                ${this.isCreating
                  ? html`<ha-icon icon="mdi:loading" class="rotating-icon"></ha-icon>`
                  : html`<ha-button @click=${() => this._createDirective()} ?disabled=${isLoading}>Create</ha-button>`
                }
              </div>
            </div>
          </div>
        </ha-dialog>
    `;
  }

  private _showDirectiveDetails(directive: Directive): void {
    this.selectedDirective = directive;
    this.showDetailsView = true;
    this._loadConversation(directive.id);
  }

  private _hideDirectiveDetails(): void {
    this.showDetailsView = false;
    this.selectedDirective = null;
  }
}

customElements.define("donder-cloud-directives-dialog", DonderCloudDirectivesDialog); 