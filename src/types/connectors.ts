export type ConnectorCategory =
  | 'productivity'
  | 'communication'
  | 'crm'
  | 'finance'
  | 'developer'
  | 'ecommerce'
  | 'mobility_travel'
  | 'food_delivery'
  | 'marketing'
  | 'sovereign_india'
  | 'custom';

export type AuthProtocol = 'oauth' | 'api_key' | 'webhook' | 'custom_api' | 'direct_intent';

export interface CommerceDispatchItem {
  id: string;
  provider: 'amazon' | 'flipkart' | 'uber' | 'flights' | 'zomato' | 'swiggy' | 'irctc' | 'general';
  providerName: string;
  providerLogoText: string;
  title: string;
  description: string;
  category: 'shopping' | 'ride' | 'flight' | 'food' | 'train';
  targetUrl: string;
  accentColor: string;
  parameters: {
    query?: string;
    pickup?: string;
    destination?: string;
    origin?: string;
    date?: string;
    city?: string;
    priceHint?: string;
  };
}

export interface ConnectorAction {
  id: string;
  name: string;
  description: string;
  type: 'read' | 'write' | 'action';
  samplePrompt: string;
  fields?: {
    key: string;
    label: string;
    type: 'string' | 'number' | 'boolean' | 'json';
    required: boolean;
    placeholder?: string;
  }[];
}

export interface ConnectorDefinition {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ConnectorCategory;
  supportedProtocols: AuthProtocol[];
  defaultProtocol: AuthProtocol;
  iconSlug?: string;
  logoText?: string;
  accentColor: string;
  bgTint: string;
  borderColor: string;
  badge?: string;
  isPopular?: boolean;
  isEnterprise?: boolean;
  docUrl?: string;
  actions: ConnectorAction[];
  mockLatencyMs?: number;
}

export interface ActiveConnectorConfig {
  connectorId: string;
  name: string;
  protocol: AuthProtocol;
  connectedAt: string;
  status: 'active' | 'paused' | 'error';
  authData?: {
    apiKeyMasked?: string;
    apiKeySecret?: string;
    webhookUrl?: string;
    accountEmail?: string;
    endpointUrl?: string;
    headers?: Record<string, string>;
  };
  lastTestedAt?: string;
  pingLatencyMs?: number;
}

export interface ConnectorExecutionRequest {
  id: string;
  connectorId: string;
  connectorName: string;
  actionId: string;
  actionName: string;
  parameters: Record<string, any>;
  status: 'pending_approval' | 'executing' | 'success' | 'failed' | 'cancelled';
  requiresApproval: boolean;
  result?: {
    summary: string;
    data?: any;
    executionTimeMs: number;
    externalId?: string;
  };
}
