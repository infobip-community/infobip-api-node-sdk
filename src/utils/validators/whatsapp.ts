import { Validator } from '../validator';

export function validateWhatsappSend(message: any) {
  if (message.type !== 'template') {
    Validator.required(message.from, 'message.from');
    Validator.string(message.from, 'message.from');
    Validator.required(message.to, 'message.to');
    Validator.string(message.to, 'message.to');
    Validator.required(message.content, 'message.content');
    Validator.object(message.content, 'message.content');
  }

  if (
    message.type === 'interactive-buttons' ||
    message.type === 'interactive-list' ||
    message.type === 'interactive-multi-product' ||
    message.type === 'interactive-product'
  ) {
    if (message.type !== 'interactive-product') {
      Validator.required(message.content.body, 'message.content.body');
      Validator.object(message.content.body, 'message.content.body');

      Validator.required(
        message.content.body.text,
        'message.content.body.text'
      );
      Validator.string(message.content.body.text, 'message.content.body.text');
    }

    if (message.content.header) {
      Validator.required(
        message.content.header.type,
        'message.content.header.type'
      );
      Validator.string(
        message.content.header.type,
        'message.content.header.type'
      );

      if (message.content.header.type === 'TEXT') {
        Validator.required(
          message.content.header.text,
          'message.content.header.text'
        );
        Validator.string(
          message.content.header.text,
          'message.content.header.text'
        );
      }

      if (
        message.content.header.type === 'VIDEO' ||
        message.content.header.type === 'IMAGE' ||
        message.content.header.type === 'DOCUMENT'
      ) {
        Validator.required(
          message.content.header.mediaUrl,
          'message.content.header.mediaUrl'
        );
        Validator.string(
          message.content.header.mediaUrl,
          'message.content.header.mediaUrl'
        );
      }
    }

    if (message.content.footer) {
      Validator.required(
        message.content.footer.text,
        'message.content.footer.text'
      );
      Validator.string(
        message.content.footer.text,
        'message.content.footer.text'
      );
    }

    Validator.required(message.content.action, 'message.content.action');
    Validator.object(message.content.action, 'message.content.action');
  }

  switch (message.type) {
    case 'template':
      Validator.required(message.messages, 'message.messages');
      Validator.array(message.messages, 'message.messages');
      message.messages.forEach((m: any) => {
        Validator.required(m.from, 'message.messages.from');
        Validator.string(m.from, 'message.messages.from');
        Validator.required(m.to, 'message.messages.to');
        Validator.string(m.to, 'message.messages.to');
        Validator.required(m.content, 'message.messages.content');
        Validator.object(m.content, 'message.messages.content');

        Validator.required(
          m.content.templateName,
          'message.messages.content.templateName'
        );
        Validator.string(
          m.content.templateName,
          'message.messages.content.templateName'
        );
        Validator.required(
          m.content.language,
          'message.messages.content.language'
        );
        Validator.string(
          m.content.language,
          'message.messages.content.language'
        );
        Validator.required(
          m.content.templateData,
          'message.messages.content.templateData'
        );
        Validator.object(
          m.content.templateData,
          'message.messages.content.templateData'
        );

        Validator.required(
          m.content.templateData.body,
          'message.messages.content.templateData.body'
        );
        Validator.object(
          m.content.templateData.body,
          'message.messages.content.templateData.body'
        );

        Validator.required(
          m.content.templateData.body.placeholders,
          'message.messages.content.templateData.body.placeholders'
        );
        Validator.array(
          m.content.templateData.body.placeholders,
          'message.messages.content.templateData.body.placeholders'
        );
      });
      break;

    case 'text':
      Validator.required(message.content.text, 'message.content.text');
      Validator.string(message.content.text, 'message.content.text');
      break;

    case 'document':
    case 'image':
    case 'video':
    case 'audio':
    case 'sticker':
      Validator.required(message.content.mediaUrl, 'message.content.mediaUrl');
      Validator.string(message.content.mediaUrl, 'message.content.mediaUrl');
      break;

    case 'location':
      Validator.required(
        message.content.longitude,
        'message.content.longitude'
      );
      Validator.number(message.content.longitude, 'message.content.longitude');

      Validator.required(message.content.latitude, 'message.content.latitude');
      Validator.number(message.content.latitude, 'message.content.latitude');
      break;

    case 'contact':
      Validator.required(message.content.contacts, 'message.content.contacts');
      Validator.array(message.content.contacts, 'message.content.contacts');

      message.content.contacts.forEach((contact: any) => {
        Validator.required(contact.name, 'message.content.contacts.name');
        Validator.object(contact.name, 'message.content.contacts.name');

        Validator.required(
          contact.name.firstName,
          'message.content.contacts.name.firstName'
        );
        Validator.string(
          contact.name.firstName,
          'message.content.contacts.name.firstName'
        );

        Validator.required(
          contact.name.formattedName,
          'message.content.contacts.name.formattedName'
        );
        Validator.string(
          contact.name.formattedName,
          'message.content.contacts.name.formattedName'
        );
      });
      break;

    case 'interactive-buttons':
      Validator.required(
        message.content.action.buttons,
        'message.content.action.buttons'
      );
      Validator.array(
        message.content.action.buttons,
        'message.content.action.buttons'
      );

      message.content.action.buttons.forEach((button: any) => {
        Validator.required(button.type, 'message.content.action.buttons.type');
        Validator.string(button.type, 'message.content.action.buttons.type');

        Validator.required(button.id, 'message.content.action.buttons.id');
        Validator.string(button.id, 'message.content.action.buttons.id');

        Validator.required(
          button.title,
          'message.content.action.buttons.title'
        );
        Validator.string(button.title, 'message.content.action.buttons.title');
      });
      break;

    case 'interactive-list':
      Validator.required(
        message.content.action.title,
        'message.content.action.title'
      );
      Validator.string(
        message.content.action.title,
        'message.content.action.title'
      );

      Validator.required(
        message.content.action.sections,
        'message.content.action.sections'
      );
      Validator.array(
        message.content.action.sections,
        'message.content.action.sections'
      );

      message.content.action.sections.forEach((section: any) => {
        Validator.required(
          section.rows,
          'message.content.action.sections.rows'
        );
        Validator.array(section.rows, 'message.content.action.sections.rows');

        section.rows.forEach((row: any) => {
          Validator.required(row.id, 'message.content.action.sections.rows.id');
          Validator.string(row.id, 'message.content.action.sections.rows.id');

          Validator.required(
            row.title,
            'message.content.action.sections.rows.title'
          );
          Validator.string(
            row.title,
            'message.content.action.sections.rows.title'
          );
        });
      });
      break;

    case 'interactive-product':
      Validator.required(
        message.content.action.catalogId,
        'message.content.action.catalogId'
      );
      Validator.string(
        message.content.action.catalogId,
        'message.content.action.catalogId'
      );

      Validator.required(
        message.content.action.productRetailerId,
        'message.content.action.productRetailerId'
      );
      Validator.string(
        message.content.action.productRetailerId,
        'message.content.action.productRetailerId'
      );
      break;

    case 'interactive-multi-product':
      Validator.required(message.content.header, 'message.content.header');
      Validator.object(message.content.header, 'message.content.header');

      Validator.required(
        message.content.header.type,
        'message.content.header.type'
      );
      Validator.string(
        message.content.header.type,
        'message.content.header.type'
      );

      Validator.required(
        message.content.action.catalogId,
        'message.content.action.catalogId'
      );
      Validator.string(
        message.content.action.catalogId,
        'message.content.action.catalogId'
      );

      Validator.required(
        message.content.action.sections,
        'message.content.action.sections'
      );
      Validator.array(
        message.content.action.sections,
        'message.content.action.sections'
      );

      message.content.action.sections.forEach((section: any) => {
        Validator.required(
          section.productRetailerIds,
          'message.content.action.sections.productRetailerIds'
        );
        Validator.array(
          section.productRetailerIds,
          'message.content.action.sections.productRetailerIds'
        );
      });
      break;

    default:
      throw new Error("Invalid message type '" + message.type + "'");
  }

  return true;
}

export function validateWhatsappTemplateCreate(sender: string, request: any) {
  Validator.required(sender, 'sender');
  Validator.string(sender, 'sender');

  Validator.required(request.name, 'request.name');
  Validator.string(request.name, 'request.name');

  Validator.required(request.language, 'request.language');
  Validator.string(request.language, 'request.language');

  Validator.required(request.category, 'request.category');
  Validator.string(request.category, 'request.category');

  Validator.required(request.structure, 'request.structure');
  Validator.object(request.structure, 'request.structure');

  Validator.required(request.structure.body, 'request.structure.body');
  Validator.object(request.structure.body, 'request.structure.body');

  Validator.required(
    request.structure.body.text,
    'request.structure.body.text'
  );
  Validator.string(request.structure.body.text, 'request.structure.body.text');

  if (request.structure.header && request.structure.header.format === 'TEXT') {
    Validator.required(
      request.structure.header.text,
      'request.structure.header.text'
    );
    Validator.string(
      request.structure.header.text,
      'request.structure.header.text'
    );
  }

  if (request.structure.footer) {
    Validator.required(
      request.structure.footer.text,
      'request.structure.footer.text'
    );
    Validator.string(
      request.structure.footer.text,
      'request.structure.footer.text'
    );
  }

  if (request.structure.buttons) {
    Validator.required(request.structure.buttons, 'request.structure.buttons');
    Validator.array(request.structure.buttons, 'request.structure.buttons');

    request.structure.buttons.forEach((button: any) => {
      Validator.required(button.text, 'button.text');
      Validator.string(button.text, 'button.text');

      if (button.type === 'PHONE_NUMBER') {
        Validator.required(button.phoneNumber, 'button.phoneNumber');
        Validator.string(button.phoneNumber, 'button.phoneNumber');
      }

      if (button.type === 'URL') {
        Validator.required(button.url, 'button.url');
        Validator.string(button.url, 'button.url');
      }
    });
  }

  return true;
}
