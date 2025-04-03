import { LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'donder-cloud-directives-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

export interface DonderCloudDirectivesConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  entity: string;
}
