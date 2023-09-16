# infobip-api-node-sdk
Node.js Client SDK for Infobip APIs.

# Supported Channels
- Whatsapp -> [Docs](https://www.infobip.com/docs/api#channels/whatsapp)
- Email -> [Docs](https://www.infobip.com/docs/api#channels/email)
- SMS -> [Docs](https://www.infobip.com/docs/api#channels/sms)

#### Table of Contents:

- [General Info](#general-info)
- [License](#license)
- [Installation](#installation)
- [Code example](#code-example)
- [Testing](#testing)

## General Info

For the `@infobip-api/sdk` package versioning we use the [Semantic Versioning](https://semver.org) scheme.

[Node.js 14](https://nodejs.org/en/about/releases/) is minimum supported version by this SDK.

## License

Published under an [MIT License](LICENSE).

## Installation

Install the library by using the following command:
```bash
npm install @infobip-api/sdk
```

## Code Example

The package is intended to be used with an Infobip account. If you don't already have one, you can create a free trial account [here](https://www.infobip.com/signup).

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

### E-mail Attachment Example

When sending an E-mail with an attachment or inline image, you'll need follow the below process

``javascript
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