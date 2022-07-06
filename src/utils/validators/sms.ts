import { Validator } from '../validator';

export function validateSMSSend(message: any) {
  Validator.array(message.messages, 'messages');
  message.messages.forEach((message: any) => {
    Validator.object(message, 'messages.destinations');
    if (message.deliveryTimeWindow) {
      Validator.object(message.deliveryTimeWindow);
      Validator.required(message.deliveryTimeWindow.days);
      Validator.array(message.deliveryTimeWindow.days);
      message.deliveryTimeWindow.days.forEach((day: any) => {
        Validator.string(day);
      });
      if (message.deliveryTimeWindow.from) {
        Validator.required(
          message.deliveryTimeWindow.from.hour,
          'message.deliveryTimeWindow.from.hour'
        );
        Validator.required(
          message.deliveryTimeWindow.from.minute,
          'message.deliveryTimeWindow.from.minute'
        );
      }
      if (message.deliveryTimeWindow.to) {
        Validator.required(
          message.deliveryTimeWindow.from.hour,
          'message.deliveryTimeWindow.from.hour'
        );
        Validator.required(
          message.deliveryTimeWindow.from.minute,
          'message.deliveryTimeWindow.from.minute'
        );
      }
    }
    if (message.regional && message.regional.indiaDlt) {
      Validator.object(message.regional.indiaDlt);
      Validator.required(
        message.regional.indiaDlt.principalEntityId,
        'message.regional.indiaDlt.principalEntityId'
      );
    }
    message.destinations.forEach((destination: any) => {
      Validator.required(destination.to, 'messages.destinations.to');
      Validator.string(destination.to, 'messages.destinations.to');
    });
  });
  if (message.sendingSpeedLimit) {
    Validator.object(message.sendingSpeedLimit);
    Validator.required(
      message.sendingSpeedLimit.amount,
      'message.sendingSpeedLimit.amount'
    );
    Validator.number(
      message.sendingSpeedLimit.amount,
      'message.sendingSpeedLimit.amount'
    );
  }
}
