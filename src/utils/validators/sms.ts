import { Validator } from '../validator';

export function validateSMSMessage(message: any) {
  if (message.type === 'preview') {
    return validatePreview(message);
  }
  if (message.type === 'sendQuery') {
    return validateSMSSendQuery(message);
  } else {
    return validateSMSSendTextAndBinary(message);
  }
}

export function validateQueryParameters(query: any) {
  Validator.required(query, 'bulkId');
  Validator.object(query, 'bulkId');
  Validator.string(query.bulkId, 'bulkId');

  return true;
}

export function validateBodyParameters(body: any) {
  if (body.sendAt) {
    Validator.required(body, 'sendAt');
    Validator.object(body, 'sendAt');
    Validator.string(body.sendAt, 'sendAt');
  }
  if (body.status) {
    Validator.required(body, 'status');
    Validator.object(body, 'status');
    Validator.string(body.status, 'status');
  }

  return true;
}

function validatePreview(message: any) {
  Validator.required(message.text, 'text');
  Validator.string(message.text, 'text');

  return true;
}

function validateSMSSendTextAndBinary(message: any) {
  Validator.required(message.messages, 'messages');
  Validator.array(message.messages, 'messages');

  const tempMessage: any = message;
  message.messages.forEach((message: any) => {
    if (tempMessage.type === 'binary') {
      if (message.binary) {
        Validator.object(message.binary);
        Validator.required(message.binary.hex, 'message.binary.hex');
        Validator.string(message.binary.hex, 'message.binary.hex');
      }
    }
    Validator.required(message, 'message');
    Validator.object(message, 'message');

    Validator.required(message.destinations, 'message.destinations');
    Validator.array(message.destinations, 'message.destinations');

    message.destinations.forEach((destination: any) => {
      Validator.object(destination, 'message.destination');
      Validator.required(destination.to, 'message.destination.to');
      Validator.string(destination.to, 'message.destination.to');
      Validator.maxLength(destination.to, 50, 'message.destination.to');
    });

    if (message.deliveryTimeWindow) {
      Validator.required(
        message.deliveryTimeWindow,
        'message.deliveryTimeWindow'
      );
      Validator.object(
        message.deliveryTimeWindow,
        'message.deliveryTimeWindow'
      );

      Validator.required(
        message.deliveryTimeWindow.days,
        'message.deliveryTimeWindow.days'
      );
      Validator.array(
        message.deliveryTimeWindow.days,
        'message.deliveryTimeWindow.days'
      );

      message.deliveryTimeWindow.days.forEach((day: any) => {
        Validator.string(day);
      });

      if (message.deliveryTimeWindow.from) {
        Validator.required(
          message.deliveryTimeWindow.from.hour,
          'message.deliveryTimeWindow.from.hour'
        );
        Validator.integer(
          message.deliveryTimeWindow.from.hour,
          'message.deliveryTimeWindow.from.hour'
        );

        Validator.max(
          message.deliveryTimeWindow.from.hour,
          23,
          'message.deliveryTimeWindow.from.hour'
        );

        Validator.required(
          message.deliveryTimeWindow.from.minute,
          'message.deliveryTimeWindow.from.minute'
        );
        Validator.integer(
          message.deliveryTimeWindow.from.minute,
          'message.deliveryTimeWindow.from.minute'
        );
        Validator.max(
          message.deliveryTimeWindow.from.minute,
          59,
          'message.deliveryTimeWindow.from.minute'
        );
      }

      if (message.deliveryTimeWindow.to) {
        Validator.required(
          message.deliveryTimeWindow.to.hour,
          'message.deliveryTimeWindow.to.hour'
        );
        Validator.integer(
          message.deliveryTimeWindow.to.hour,
          'message.deliveryTimeWindow.to.hour'
        );

        Validator.max(
          message.deliveryTimeWindow.to.hour,
          23,
          'message.deliveryTimeWindow.to.hour'
        );

        Validator.required(
          message.deliveryTimeWindow.to.minute,
          'message.deliveryTimeWindow.to.minute'
        );
        Validator.integer(
          message.deliveryTimeWindow.to.minute,
          'message.deliveryTimeWindow.to.minute'
        );
        Validator.max(
          message.deliveryTimeWindow.to.minute,
          59,
          'message.deliveryTimeWindow.to.minute'
        );
      }
    }

    if (message.regional && message.regional.indiaDlt) {
      Validator.required(
        message.regional.indiaDlt.principalEntityId,
        'message.regional.indiaDlt.principalEntityId'
      );
      Validator.string(
        message.regional.indiaDlt.principalEntityId,
        'message.regional.indiaDlt.principalEntityId'
      );
    }
  });

  if (message.sendingSpeedLimit) {
    Validator.required(
      message.sendingSpeedLimit.amount,
      'message.sendingSpeedLimit.amount'
    );
    Validator.integer(
      message.sendingSpeedLimit.amount,
      'message.sendingSpeedLimit.amount'
    );
  }

  return true;
}

function validateSMSSendQuery(message: any) {
  Validator.required(message.username, 'username');
  Validator.string(message.username, 'username');
  Validator.required(message.password, 'password');
  Validator.string(message.password, 'password');
  Validator.required(message.to, 'to');
  Validator.array(message.to, 'to');
  message.to.forEach((to: any) => {
    Validator.string(to, 'to');
  });

  return true;
}
