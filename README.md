# infobip-api-node-sdk
Node.js Client SDK for Infobip APIs.

# Supported Channels
- SMS -> [Docs](https://www.infobip.com/docs/api#channels/sms) ⭐ **Now with v3 API Support**
- Whatsapp -> [Docs](https://www.infobip.com/docs/api#channels/whatsapp)
- Email -> [Docs](https://www.infobip.com/docs/api#channels/email)

#### Table of Contents:

- [General Info](#general-info)
- [License](#license)
- [Installation](#installation)
- [Code Examples](#code-examples)
  - [SMS Examples](#sms-examples)
  - [WhatsApp Examples](#whatsapp-examples)
  - [Email Examples](#email-examples)
- [Testing](#testing)
- [Migration Guide](#migration-guide)

## General Info

For the `@infobip-api/sdk` package versioning we use the [Semantic Versioning](https://semver.org) scheme.

[Node.js 14](https://nodejs.org/en/about/releases/) is the minimum supported version by this SDK.

## License

Published under an [MIT License](LICENSE).

## Installation

Install the library by using the following command:
```bash
npm install @infobip-api/sdk
```

## Code Examples

The package is intended to be used with an Infobip account. If you don't already have one, you can create a free trial account [here](https://www.infobip.com/signup).

### SMS Examples

#### Basic SMS Sending (v3 API - Recommended)

The v3 API is the current and recommended way to send SMS messages. It provides a unified interface for both text and binary messages.

```javascript
import { Infobip, AuthType } from "@infobip-api/sdk";

let infobip = new Infobip({
  baseUrl: "YOUR_BASE_URL",
  apiKey: "YOUR_API_KEY",
  authType: AuthType.ApiKey,
});

// Send a simple text message
let response = await infobip.channels.sms.v3.send({
  messages: [{
    from: "InfoSMS",
    destinations: [{ to: "+1234567890" }],
    text: "Hello World from SMS v3 API!"
  }]
});

console.log(response);
```

#### Advanced SMS Features

```javascript
// Send SMS with advanced features
let advancedResponse = await infobip.channels.sms.v3.send({
  messages: [{
    from: "InfoSMS",
    destinations: [
      { to: "+1234567890", messageId: "msg-1" },
      { to: "+0987654321", messageId: "msg-2" }
    ],
    text: "Check out our website: https://example.com",
    // URL shortening and tracking
    urlOptions: {
      shortenUrl: true,
      trackClicks: true,
      customDomain: "short.example.com"
    },
    // Delivery time window
    deliveryTimeWindow: {
      days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
      from: "09:00",
      to: "17:00"
    },
    // Scheduled sending
    sendAt: "2025-12-25T10:00:00.000Z",
    // Delivery notifications
    notifyUrl: "https://your-webhook.com/sms-delivery",
    callbackData: "campaign-123",
    // Message validity
    validityPeriod: 720, // 12 hours in minutes
    // Tracking parameters
    applicationId: "app-123",
    entityId: "entity-456",
    campaignReferenceId: "campaign-789"
  }],
  includeSmsCountInResponse: true
});

console.log(advancedResponse);
```

#### Regional Compliance (India DLT)

```javascript
// Send SMS with India DLT compliance
let indiaSmsResponse = await infobip.channels.sms.v3.send({
  messages: [{
    from: "INFOSMS",
    destinations: [{ to: "+911234567890" }],
    text: "Your OTP is 123456. Valid for 10 minutes.",
    regional: {
      indiaDlt: {
        principalEntityId: "1234567890123456789",
        contentTemplateId: "1234567890123456789"
      }
    }
  }]
});

console.log(indiaSmsResponse);
```

#### Binary SMS

```javascript
// Send binary SMS message
let binaryResponse = await infobip.channels.sms.v3.send({
  messages: [{
    from: "+1234567890",
    destinations: [{ to: "+0987654321" }],
    binary: {
      hex: "48656C6C6F20576F726C6421", // "Hello World!" in hex
      dataCoding: 0,
      esmClass: 0
    }
  }]
});

console.log(binaryResponse);
```

#### Get Delivery Reports (v3 API)

```javascript
// Get delivery reports with filtering
let reports = await infobip.channels.sms.v3.getReports({
  bulkId: "bulk-123",
  limit: 100,
  deliveryStatus: "DELIVERED",
  sentSince: "2025-10-01T00:00:00.000Z",
  sentUntil: "2025-10-10T23:59:59.999Z"
});

console.log(reports);
```

#### Get Message Logs (v3 API)

```javascript
// Get message logs with filtering
let logs = await infobip.channels.sms.v3.getLogs({
  from: "InfoSMS",
  generalStatus: "DELIVERED",
  limit: 500,
  sentSince: "2025-10-01T00:00:00.000Z"
});

console.log(logs);
```

#### Error Handling

```javascript
import { 
  SmsValidationError, 
  SmsApiError, 
  SmsRateLimitError, 
  SmsNetworkError 
} from "@infobip-api/sdk";

try {
  let response = await infobip.channels.sms.v3.send({
    messages: [{
      from: "InfoSMS",
      destinations: [{ to: "+1234567890" }],
      text: "Hello World!"
    }]
  });
  console.log(response);
} catch (error) {
  if (error instanceof SmsValidationError) {
    console.error('Validation Error:', error.message);
    console.error('Field:', error.details?.field);
  } else if (error instanceof SmsRateLimitError) {
    console.error('Rate Limit Exceeded. Retry after:', error.retryAfter, 'seconds');
  } else if (error instanceof SmsApiError) {
    console.error('API Error:', error.message);
    console.error('Status Code:', error.statusCode);
    console.error('API Error Code:', error.apiErrorCode);
  } else if (error instanceof SmsNetworkError) {
    console.error('Network Error:', error.message);
  } else {
    console.error('Unexpected Error:', error.message);
  }
}
```

### WhatsApp Examples

This example shows you how to send a WhatsApp text message. The first step is to import the `Infobip` and `AuthType` dependencies.

```javascript
import { Infobip, AuthType } from "@infobip-api/sdk";
```

Next, you need to create an instance of `Infobip` with your API Base URL and authentication mechanism. You can find all this information on the [Infobip Portal](https://portal.infobip.com/homepage/).

```javascript
let infobip = new Infobip({
  baseUrl: "YOUR_BASE_URL",
  apiKey: "YOUR_API_KEY",
  authType: AuthType.ApiKey,
});
```
After that you can access all the objects from `infobip.channel`.

To send text message you can use the `infobip.channel.whatsapp.send` method and add a payload:

```javascript
let response = await infobip.channels.whatsapp.send({
  type: "text",
  from: "447860099299",
  to: "447123456789",
  content: {
    text: "Hello World",
  },
});

console.log(response);
```

### Email Examples

When sending an E-mail with an attachment or inline image, you'll need to follow the below process

```javascript
import { Infobip, AuthType } from "@infobip-api/sdk";
```

Next, you need to create an instance of `Infobip` with your API Base URL and authentication mechanism. You can find all this information on the [Infobip Portal](https://portal.infobip.com/homepage/).

```javascript
let infobip = new Infobip({
  baseUrl: "YOUR_BASE_URL",
  apiKey: "YOUR_API_KEY",
  authType: AuthType.ApiKey,
});
```

And to send with an attachment, the following way to identify it

```javascript
let response = await infobip.channels.email.send({
  to: 'test@example.com',
  from: 'Tests <testing@example.com>',
  subject: 'Testing',
  text: 'hello world',
  attachment: [{
    data: Fs.readFile('/path/to/your/file'),
    name: 'name-of-the-attachment-in-the-email',
  }]
})

console.log(response);
```

## Testing

To run tests position yourself in the project's root after you've installed dependencies and run:

```bash
npm run test
```

## Migration Guide

### Migrating from SMS v2 to v3 API

The SMS v2 API endpoints (`/sms/2/text/advanced` and `/sms/2/binary/advanced`) were deprecated on October 9, 2024. Please migrate to the v3 unified API for continued support and access to new features.

#### Before (v2 - Deprecated)
```javascript
// Old way - deprecated
let response = await infobip.channels.sms.send({
  messages: [{
    from: "InfoSMS",
    destinations: [{ to: "+1234567890" }],
    text: "Hello World!"
  }]
});
```

#### After (v3 - Recommended)
```javascript
// New way - recommended
let response = await infobip.channels.sms.v3.send({
  messages: [{
    from: "InfoSMS",
    destinations: [{ to: "+1234567890" }],
    text: "Hello World!"
  }]
});
```

#### Key Benefits of v3 API:
- **Unified Interface**: Single endpoint for both text and binary messages
- **Enhanced Features**: URL tracking, advanced scheduling, regional compliance
- **Better Error Handling**: Specific error types with detailed information
- **Type Safety**: Full TypeScript support with comprehensive interfaces
- **Future-Proof**: Active development and new feature additions

#### Breaking Changes:
- Response format may differ slightly
- Some legacy parameters may not be supported
- Error responses follow new format

#### Backward Compatibility:
The legacy `send()` method is still available but will show deprecation warnings. It will be removed in a future major version.

## Building & Installing a Local Version

To build the project for the first time, position yourself in the project's root and run:

```bash
npm install
```

Subsequent builds can be triggered by using:

```bash
npm run build
```

After building a local version of this SDK, you can use it in a local Node.js project. First, position yourself in the new project root, and then run:

```
npm install ../path/to/infobip-node
```
