import { Validator } from '../validator';

export function validateMMSMessage(message: any) {
  if (message.type === 'advanced') {
    return validateMMSAdvanced(message);
  } else {
    return validateMMSSingle();
  }
}

function validateMMSSingle() {
  throw new Error(
    `The send single MMS message endpoint is deprecated as of May 4th 2022.`
  );
}

function validateMMSAdvanced(message: any) {
  Validator.required(message.messages, 'messages');
  Validator.array(message.messages, 'messages');

  message.messages.forEach((message: any) => {
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

    Validator.required(message.messageSegments, 'message.messageSegments');
    Validator.array(message.messageSegments, 'message.messageSegments');
    message.messageSegments.forEach((messageSegment: any) => {
      Validator.string(
        messageSegment.contentId,
        'message.messageSegment.contentId'
      );
      Validator.maxLength(
        messageSegment.contentId,
        20,
        'message.messageSegment.contentId'
      );
      if (messageSegment.text) {
        Validator.string(messageSegment.text, 'message.messageSegment.text');
      } else if (messageSegment.uploadedContentId) {
        Validator.string(
          messageSegment.uploadedContentId,
          'message.messageSegment.uploadedContentId'
        );
      } else {
        Validator.string(
          messageSegment.contentType,
          'message.messageSegment.contentType'
        );
        if (messageSegment.contentTransferEncoding) {
          Validator.string(
            messageSegment.contentTransferEncoding,
            'message.messageSegment.contentTransferEncoding'
          );
          if (messageSegment.contentUrl) {
            Validator.string(
              messageSegment.contentUrl,
              'message.messageSegment.contentUrl'
            );
          } else {
            Validator.string(
              messageSegment.contentBase64,
              'message.messageSegment.contentBase64'
            );
          }
        } else {
          Validator.string(messageSegment.smil, 'message.messageSegment.smil');
        }
      }
    });
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
    Validator.required(
      message.sendingSpeedLimit.timeUnit,
      'message.sendingSpeedLimit.timeUnit'
    );
    Validator.string(
      message.sendingSpeedLimit.timeUnit,
      'message.sendingSpeedLimit.timeUnit'
    );
  }

  return true;
}
