/**
 * Arohi AI Model Context Protocol (MCP) Standardized Schema Framework
 * Version: 1.0.0
 * Protocol Definition for Local Services, Healthcare, E-Commerce, Utilities & Communication.
 */

export type McpDomain = 
  | 'healthcare_appointments'
  | 'email_communication'
  | 'quick_commerce'
  | 'food_delivery'
  | 'ride_hailing'
  | 'travel_rail'
  | 'utility_bills';

export type McpActionStatus = 
  | 'PENDING_APPROVAL'
  | 'CONFIRMED'
  | 'EXECUTED'
  | 'FAILED'
  | 'CANCELLED';

export type McpSecurityLevel = 'user_approval_required' | 'instant_read_only';

/**
 * Standardized Tool Definition Schema registered in Arohi MCP Hub
 */
export interface McpToolDefinition {
  toolId: string;
  domain: McpDomain;
  name: string;
  provider: string;
  version: string;
  description: string;
  securityLevel: McpSecurityLevel;
  requiredParameters: string[];
  parametersSchema: {
    type: 'object';
    properties: Record<string, {
      type: string;
      description: string;
      enum?: string[];
      example?: any;
    }>;
  };
}

/**
 * Standardized Request Payload sent from Arohi AI Engine to MCP Gateway
 */
export interface McpRequestPayload<T = Record<string, any>> {
  mcpVersion: '1.0.0';
  transactionId: string;
  timestamp: string;
  domain: McpDomain;
  toolName: string;
  provider: string;
  userContext: {
    userId?: string;
    userEmail: string;
    userName?: string;
    deliveryAddress?: string;
    pincode?: string;
    phone?: string;
  };
  parameters: T;
  securityPolicy: {
    approvalRequired: boolean;
    authTokenPresent: boolean;
    humanInTheLoop: boolean;
  };
}

/**
 * Standardized Response Payload returned from MCP Gateway / API Connectors
 */
export interface McpResponsePayload<T = Record<string, any>> {
  mcpVersion: '1.0.0';
  transactionId: string;
  status: McpActionStatus;
  domain: McpDomain;
  toolName: string;
  provider: {
    name: string;
    logoText: string;
    connectorVersion: string;
  };
  summary: {
    title: string;
    subtitle: string;
    estimatedTime: string;
    currency: 'INR' | 'USD';
    pricing: {
      itemsTotal: number;
      taxesAndFees: number;
      discount?: number;
      totalPayable: number;
    };
  };
  details: T;
  actionPayload: {
    type: 'APPOINTMENT_RESERVE' | 'MAILSENT_OR_MAILTO' | 'PAYMENT_GATEWAY' | 'DIRECT_API_EXECUTE';
    actionUrl?: string;
    confirmEndpoint?: string;
    payloadSignature?: string;
  };
}

/**
 * Specific Payload Types for Everyday Services
 */

export interface HospitalAppointmentDetails {
  hospitalName: string;
  department: string;
  doctorName: string;
  doctorQualification: string;
  patientName: string;
  patientAge?: number;
  appointmentDate: string;
  appointmentSlot: string;
  consultationType: 'In-Clinic' | 'Video Consultation';
  consultationFee: number;
  symptomsSummary?: string;
}

export interface EmailCommunicationDetails {
  recipientEmail: string;
  recipientName?: string;
  subject: string;
  bodyText: string;
  isHtml: boolean;
  attachmentsCount: number;
}

export interface QuickCommerceCartDetails {
  storeName: string;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  deliveryAddress: string;
  deliveryInstructions?: string;
}

export interface RideBookingDetails {
  pickupLocation: string;
  dropLocation: string;
  rideClass: 'UberGo' | 'UberAuto' | 'Ola Mini' | 'Rapido Bike' | 'Namma Yatri';
  driverEta: string;
  distanceKm: number;
}

export interface UtilityBillDetails {
  serviceType: 'LPG Gas Cylinder' | 'Electricity Bill' | 'Water Bill' | 'FASTag Recharge';
  consumerId: string;
  billerName: string;
  dueDate?: string;
  billAmount: number;
}

/**
 * Sample Pre-built Registered MCP Tools Catalogue
 */
export const AROHI_REGISTERED_MCP_TOOLS: McpToolDefinition[] = [
  {
    toolId: 'mcp_apollo_doctor_appointment',
    domain: 'healthcare_appointments',
    name: 'Apollo Clinics Doctor Appointment Scheduler',
    provider: 'Apollo Healthcare MCP',
    version: '1.2.0',
    description: 'Schedules specialist doctor appointments & video consultations across Apollo Hospitals & Clinics.',
    securityLevel: 'user_approval_required',
    requiredParameters: ['hospitalName', 'doctorName', 'patientName', 'appointmentDate', 'appointmentSlot'],
    parametersSchema: {
      type: 'object',
      properties: {
        hospitalName: { type: 'string', description: 'Name of hospital or clinic branch' },
        doctorName: { type: 'string', description: 'Name of practitioner or specialist' },
        patientName: { type: 'string', description: 'Full name of patient' },
        appointmentDate: { type: 'string', description: 'Date YYYY-MM-DD' },
        appointmentSlot: { type: 'string', description: 'Time slot e.g. 10:30 AM' },
        consultationType: { type: 'string', description: 'In-Clinic or Video Consultation', enum: ['In-Clinic', 'Video Consultation'] }
      }
    }
  },
  {
    toolId: 'mcp_gmail_draft_send',
    domain: 'email_communication',
    name: 'Gmail MCP Communication Agent',
    provider: 'Gmail MCP Connector',
    version: '2.0.1',
    description: 'Drafts, previews, and dispatches formal emails via Gmail API with 1-click human approval.',
    securityLevel: 'user_approval_required',
    requiredParameters: ['recipientEmail', 'subject', 'bodyText'],
    parametersSchema: {
      type: 'object',
      properties: {
        recipientEmail: { type: 'string', description: 'Target email address' },
        subject: { type: 'string', description: 'Email subject line' },
        bodyText: { type: 'string', description: 'Full email body text or markdown' }
      }
    }
  },
  {
    toolId: 'mcp_blinkit_quick_grocery',
    domain: 'quick_commerce',
    name: 'Blinkit Instant 10-Min Grocery Cart',
    provider: 'Blinkit MCP Connector',
    version: '1.4.0',
    description: 'Orders daily fresh groceries, dairy, vegetables & snacks delivered in 10 minutes.',
    securityLevel: 'user_approval_required',
    requiredParameters: ['items', 'deliveryAddress'],
    parametersSchema: {
      type: 'object',
      properties: {
        items: { type: 'array', description: 'List of items with quantity' },
        deliveryAddress: { type: 'string', description: 'Street delivery address' }
      }
    }
  },
  {
    toolId: 'mcp_uber_ride_hailing',
    domain: 'ride_hailing',
    name: 'Uber India Ride Dispatcher',
    provider: 'Uber MCP Connector',
    version: '1.1.0',
    description: 'Estimates fares and dispatches UberGo, Premier, and Auto rides.',
    securityLevel: 'user_approval_required',
    requiredParameters: ['pickupLocation', 'dropLocation', 'rideClass'],
    parametersSchema: {
      type: 'object',
      properties: {
        pickupLocation: { type: 'string', description: 'Pickup spot address or landmark' },
        dropLocation: { type: 'string', description: 'Destination address' },
        rideClass: { type: 'string', description: 'Uber vehicle type' }
      }
    }
  },
  {
    toolId: 'mcp_indane_gas_refill',
    domain: 'utility_bills',
    name: 'Indane LPG Gas Cylinder Refill',
    provider: 'Indane Gas MCP Connector',
    version: '1.0.5',
    description: 'Books LPG domestic cooking gas refills and generates BBPS payment links.',
    securityLevel: 'user_approval_required',
    requiredParameters: ['consumerId', 'billerName'],
    parametersSchema: {
      type: 'object',
      properties: {
        consumerId: { type: 'string', description: '16-digit LPG Consumer ID or Registered Mobile' },
        billerName: { type: 'string', description: 'Indane Gas / Bharat Gas / HP Gas' }
      }
    }
  }
];
