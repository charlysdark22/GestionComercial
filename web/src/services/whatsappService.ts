import axios from 'axios';
import { WHATSAPP_CONFIG } from '@shared/constants';

export interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'image' | 'document' | 'audio' | 'video';
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

export interface WhatsAppConversation {
  id: string;
  contactName: string;
  contactPhone: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: WhatsAppMessage[];
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  content: string;
  variables: string[];
  category: 'marketing' | 'utility' | 'authentication';
}

class WhatsAppService {
  private baseURL = WHATSAPP_CONFIG.API_URL;
  private accessToken = WHATSAPP_CONFIG.ACCESS_TOKEN;
  private phoneNumberId = WHATSAPP_CONFIG.BUSINESS_PHONE_NUMBER_ID;

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  // Enviar mensaje de texto
  async sendTextMessage(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await axios.post(
        `${this.baseURL}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: to.replace(/[^\d]/g, ''), // Limpiar número
          type: 'text',
          text: {
            body: message,
          },
        },
        { headers: this.getHeaders() }
      );

      return {
        success: true,
        messageId: response.data.messages[0].id,
      };
    } catch (error: any) {
      console.error('Error enviando mensaje WhatsApp:', error);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Error desconocido',
      };
    }
  }

  // Enviar mensaje con plantilla
  async sendTemplateMessage(
    to: string, 
    templateName: string, 
    variables: string[] = []
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await axios.post(
        `${this.baseURL}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: to.replace(/[^\d]/g, ''),
          type: 'template',
          template: {
            name: templateName,
            language: {
              code: 'es',
            },
            components: variables.length > 0 ? [
              {
                type: 'body',
                parameters: variables.map(variable => ({
                  type: 'text',
                  text: variable,
                })),
              },
            ] : [],
          },
        },
        { headers: this.getHeaders() }
      );

      return {
        success: true,
        messageId: response.data.messages[0].id,
      };
    } catch (error: any) {
      console.error('Error enviando plantilla WhatsApp:', error);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Error desconocido',
      };
    }
  }

  // Enviar imagen
  async sendImageMessage(
    to: string, 
    imageUrl: string, 
    caption?: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await axios.post(
        `${this.baseURL}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: to.replace(/[^\d]/g, ''),
          type: 'image',
          image: {
            link: imageUrl,
            caption: caption,
          },
        },
        { headers: this.getHeaders() }
      );

      return {
        success: true,
        messageId: response.data.messages[0].id,
      };
    } catch (error: any) {
      console.error('Error enviando imagen WhatsApp:', error);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Error desconocido',
      };
    }
  }

  // Enviar documento
  async sendDocumentMessage(
    to: string, 
    documentUrl: string, 
    filename: string,
    caption?: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await axios.post(
        `${this.baseURL}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: to.replace(/[^\d]/g, ''),
          type: 'document',
          document: {
            link: documentUrl,
            filename: filename,
            caption: caption,
          },
        },
        { headers: this.getHeaders() }
      );

      return {
        success: true,
        messageId: response.data.messages[0].id,
      };
    } catch (error: any) {
      console.error('Error enviando documento WhatsApp:', error);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Error desconocido',
      };
    }
  }

  // Obtener conversaciones (simulado - requiere webhook)
  async getConversations(): Promise<WhatsAppConversation[]> {
    // En una implementación real, esto vendría de tu base de datos
    // donde almacenas los mensajes recibidos via webhook
    return [
      {
        id: '1',
        contactName: 'María García',
        contactPhone: '+34612345678',
        lastMessage: 'Hola, ¿cómo están los proyectos?',
        lastMessageTime: new Date(),
        unreadCount: 2,
        messages: [
          {
            id: '1',
            from: '+34612345678',
            to: this.phoneNumberId || '',
            message: 'Hola, ¿cómo están los proyectos?',
            timestamp: new Date(),
            type: 'text',
            status: 'delivered',
          },
        ],
      },
      {
        id: '2',
        contactName: 'Carlos Rodríguez',
        contactPhone: '+34687654321',
        lastMessage: 'Perfecto, nos vemos mañana',
        lastMessageTime: new Date(Date.now() - 3600000),
        unreadCount: 0,
        messages: [],
      },
    ];
  }

  // Obtener mensajes de una conversación
  async getMessages(conversationId: string): Promise<WhatsAppMessage[]> {
    // En una implementación real, esto vendría de tu base de datos
    return [
      {
        id: '1',
        from: '+34612345678',
        to: this.phoneNumberId || '',
        message: 'Hola, ¿cómo están los proyectos?',
        timestamp: new Date(Date.now() - 7200000),
        type: 'text',
        status: 'delivered',
      },
      {
        id: '2',
        from: this.phoneNumberId || '',
        to: '+34612345678',
        message: 'Hola María, todos los proyectos van según lo planificado. Te envío el reporte actualizado.',
        timestamp: new Date(Date.now() - 3600000),
        type: 'text',
        status: 'read',
      },
      {
        id: '3',
        from: '+34612345678',
        to: this.phoneNumberId || '',
        message: 'Excelente, muchas gracias por la actualización.',
        timestamp: new Date(),
        type: 'text',
        status: 'delivered',
      },
    ];
  }

  // Obtener plantillas disponibles
  async getTemplates(): Promise<WhatsAppTemplate[]> {
    try {
      // En una implementación real, esto vendría de la API de WhatsApp
      return [
        {
          id: '1',
          name: 'bienvenida_cliente',
          content: 'Hola {{1}}, bienvenido a nuestro CRM. Estamos aquí para ayudarte.',
          variables: ['nombre'],
          category: 'utility',
        },
        {
          id: '2',
          name: 'recordatorio_reunion',
          content: 'Hola {{1}}, te recordamos que tienes una reunión programada para {{2}}.',
          variables: ['nombre', 'fecha'],
          category: 'utility',
        },
        {
          id: '3',
          name: 'seguimiento_proyecto',
          content: 'Hola {{1}}, el proyecto {{2}} tiene un progreso del {{3}}%.',
          variables: ['nombre', 'proyecto', 'progreso'],
          category: 'utility',
        },
      ];
    } catch (error) {
      console.error('Error obteniendo plantillas:', error);
      return [];
    }
  }

  // Marcar mensaje como leído
  async markAsRead(messageId: string): Promise<boolean> {
    try {
      await axios.post(
        `${this.baseURL}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId,
        },
        { headers: this.getHeaders() }
      );
      return true;
    } catch (error) {
      console.error('Error marcando mensaje como leído:', error);
      return false;
    }
  }

  // Validar número de WhatsApp
  async validatePhoneNumber(phoneNumber: string): Promise<{ valid: boolean; formatted?: string }> {
    const cleaned = phoneNumber.replace(/[^\d]/g, '');
    
    // Validaciones básicas
    if (cleaned.length < 10 || cleaned.length > 15) {
      return { valid: false };
    }

    // Formatear número (ejemplo para España)
    let formatted = cleaned;
    if (cleaned.startsWith('34') && cleaned.length === 11) {
      formatted = `+${cleaned}`;
    } else if (cleaned.startsWith('6') || cleaned.startsWith('7')) {
      formatted = `+34${cleaned}`;
    }

    return { valid: true, formatted };
  }

  // Webhook para recibir mensajes (configuración)
  static validateWebhook(mode: string, token: string, challenge: string): string | null {
    if (mode === 'subscribe' && token === WHATSAPP_CONFIG.WEBHOOK_VERIFY_TOKEN) {
      return challenge;
    }
    return null;
  }

  // Procesar webhook de mensaje entrante
  static processIncomingMessage(webhookData: any): WhatsAppMessage | null {
    try {
      const entry = webhookData.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const messages = value?.messages?.[0];

      if (!messages) return null;

      return {
        id: messages.id,
        from: messages.from,
        to: value.metadata.phone_number_id,
        message: messages.text?.body || messages.caption || 'Archivo multimedia',
        timestamp: new Date(parseInt(messages.timestamp) * 1000),
        type: messages.type,
        status: 'delivered',
      };
    } catch (error) {
      console.error('Error procesando mensaje entrante:', error);
      return null;
    }
  }
}

export const whatsappService = new WhatsAppService();

// Hooks para React Query
export const useWhatsAppConversations = () => {
  // Implementar con React Query
  return {
    data: [],
    isLoading: false,
    error: null,
    refetch: () => {},
  };
};

export const useWhatsAppMessages = (conversationId: string) => {
  // Implementar con React Query
  return {
    data: [],
    isLoading: false,
    error: null,
    refetch: () => {},
  };
};

export const useWhatsAppTemplates = () => {
  // Implementar con React Query
  return {
    data: [],
    isLoading: false,
    error: null,
    refetch: () => {},
  };
};