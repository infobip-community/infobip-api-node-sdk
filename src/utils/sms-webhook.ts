/**
 * SMS Webhook Utilities
 * 
 * Utilities for handling SMS webhook callbacks and delivery reports
 * 
 * @author SMS Modernization Team
 * @version 1.0.0
 */

import * as crypto from 'crypto';
import { SmsDeliveryReport } from '../types/sms';
import { SmsValidationError } from '../errors/sms-errors';

/**
 * Webhook delivery report payload structure
 */
export interface SmsWebhookPayload {
  results: SmsDeliveryReport[];
}

/**
 * Webhook signature verification options
 */
export interface WebhookVerificationOptions {
  /** Webhook secret key */
  secret: string;
  /** Request body as string */
  body: string;
  /** Signature from webhook headers */
  signature: string;
  /** Signature algorithm (default: sha256) */
  algorithm?: string;
}

/**
 * Verifies webhook signature to ensure authenticity
 * 
 * @param options - Verification options
 * @returns boolean - True if signature is valid
 */
export function verifyWebhookSignature(options: WebhookVerificationOptions): boolean {
  try {
    const { secret, body, signature, algorithm = 'sha256' } = options;

    if (!secret || !body || !signature) {
      throw new SmsValidationError('secret, body, and signature are required for webhook verification');
    }

    // Generate expected signature
    const expectedSignature = crypto
      .createHmac(algorithm, secret)
      .update(body, 'utf8')
      .digest('hex');

    // Compare signatures using timing-safe comparison
    const expectedBuffer = Buffer.from(`sha256=${expectedSignature}`, 'utf8');
    const actualBuffer = Buffer.from(signature, 'utf8');

    if (expectedBuffer.length !== actualBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return false;
  }
}

/**
 * Parses webhook payload and validates structure
 * 
 * @param payload - Raw webhook payload
 * @returns SmsWebhookPayload - Parsed and validated payload
 */
export function parseWebhookPayload(payload: any): SmsWebhookPayload {
  if (!payload) {
    throw new SmsValidationError('Webhook payload is required');
  }

  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch (error) {
      throw new SmsValidationError('Invalid JSON in webhook payload');
    }
  }

  if (!payload.results || !Array.isArray(payload.results)) {
    throw new SmsValidationError('Webhook payload must contain results array');
  }

  // Validate each delivery report
  payload.results.forEach((result: any, index: number) => {
    validateDeliveryReport(result, `results[${index}]`);
  });

  return payload as SmsWebhookPayload;
}

/**
 * Validates delivery report structure
 */
function validateDeliveryReport(report: any, fieldPrefix: string): void {
  const requiredFields = ['messageId', 'to', 'from', 'sentAt', 'status'];
  
  requiredFields.forEach(field => {
    if (!report[field]) {
      throw new SmsValidationError(`${fieldPrefix}.${field} is required in delivery report`);
    }
  });

  if (report.status && typeof report.status === 'object') {
    const statusFields = ['groupId', 'groupName', 'id', 'name'];
    statusFields.forEach(field => {
      if (report.status[field] === undefined) {
        throw new SmsValidationError(`${fieldPrefix}.status.${field} is required`);
      }
    });
  }
}

/**
 * Extracts delivery status from webhook payload
 * 
 * @param payload - Webhook payload
 * @returns Map<string, string> - Map of messageId to delivery status
 */
export function extractDeliveryStatuses(payload: SmsWebhookPayload): Map<string, string> {
  const statusMap = new Map<string, string>();

  payload.results.forEach(result => {
    if (result.messageId && result.status?.name) {
      statusMap.set(result.messageId, result.status.name);
    }
  });

  return statusMap;
}

/**
 * Filters delivery reports by status
 * 
 * @param payload - Webhook payload
 * @param statusNames - Array of status names to filter by
 * @returns SmsDeliveryReport[] - Filtered delivery reports
 */
export function filterReportsByStatus(
  payload: SmsWebhookPayload, 
  statusNames: string[]
): SmsDeliveryReport[] {
  return payload.results.filter(result => 
    result.status?.name && statusNames.includes(result.status.name)
  );
}

/**
 * Gets failed delivery reports
 * 
 * @param payload - Webhook payload
 * @returns SmsDeliveryReport[] - Failed delivery reports
 */
export function getFailedDeliveries(payload: SmsWebhookPayload): SmsDeliveryReport[] {
  const failedStatuses = ['REJECTED', 'UNDELIVERABLE', 'EXPIRED'];
  return filterReportsByStatus(payload, failedStatuses);
}

/**
 * Gets successful delivery reports
 * 
 * @param payload - Webhook payload
 * @returns SmsDeliveryReport[] - Successful delivery reports
 */
export function getSuccessfulDeliveries(payload: SmsWebhookPayload): SmsDeliveryReport[] {
  const successStatuses = ['DELIVERED'];
  return filterReportsByStatus(payload, successStatuses);
}

/**
 * Calculates delivery statistics from webhook payload
 * 
 * @param payload - Webhook payload
 * @returns Object with delivery statistics
 */
export function calculateDeliveryStats(payload: SmsWebhookPayload): {
  total: number;
  delivered: number;
  failed: number;
  pending: number;
  deliveryRate: number;
} {
  const total = payload.results.length;
  const delivered = getSuccessfulDeliveries(payload).length;
  const failed = getFailedDeliveries(payload).length;
  const pending = total - delivered - failed;
  const deliveryRate = total > 0 ? (delivered / total) * 100 : 0;

  return {
    total,
    delivered,
    failed,
    pending,
    deliveryRate: Math.round(deliveryRate * 100) / 100 // Round to 2 decimal places
  };
}

/**
 * Express.js middleware for handling SMS webhooks
 * 
 * @param secret - Webhook secret for signature verification
 * @returns Express middleware function
 */
export function createWebhookMiddleware(secret: string) {
  return (req: any, res: any, next: any) => {
    try {
      // Get signature from headers
      const signature = req.headers['x-infobip-signature'] || req.headers['x-hub-signature-256'];
      
      if (!signature) {
        return res.status(400).json({ error: 'Missing webhook signature' });
      }

      // Verify signature
      const isValid = verifyWebhookSignature({
        secret,
        body: JSON.stringify(req.body),
        signature
      });

      if (!isValid) {
        return res.status(401).json({ error: 'Invalid webhook signature' });
      }

      // Parse and validate payload
      const payload = parseWebhookPayload(req.body);
      
      // Add parsed payload to request
      req.smsWebhook = payload;
      
      next();
    } catch (error) {
      console.error('Webhook middleware error:', error);
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }
  };
}
