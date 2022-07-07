export const sendMessage = {
  bulkId: 'BULK-ID-123-xyz',
  messages: [
    {
      callbackData: 'DLR callback data',
      destinations: [
        {
          messageId: 'MESSAGE-ID-123-xyz',
          to: '41793026727',
        },
        {
          to: '41793026834',
        },
      ],
      flash: false,
      from: 'InfoSMS',
      intermediateReport: true,
      language: {
        languageCode: 'TR',
      },
      regional: {
        indiaDlt: {
          principalEntityId: 'someEntityId',
        },
      },
      notifyContentType: 'application/json',
      notifyUrl: 'https://www.example.com/sms/advanced',
      text: 'Artık Ulusal',
      transliteration: 'TURKISH',
      validityPeriod: 720,
    },
    {
      deliveryTimeWindow: {
        days: [
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
          'SUNDAY',
        ],
        from: {
          hour: 6,
          minute: 0,
        },
        to: {
          hour: 15,
          minute: 30,
        },
      },
      destinations: [
        {
          to: '41793026700',
        },
      ],
      from: '41793026700',
      sendAt: '2021-08-25T16:00:00.000+0000',
      text: 'A long time ago, in a galaxy far, far away...',
    },
  ],
  sendingSpeedLimit: {
    amount: 12,
  },
  tracking: {
    track: 'SMS',
    type: 'MY_CAMPAIGN',
  },
};

export const basicTextMessage = {
  messages: [
    {
      destinations: [
        {
          to: '41793026700',
        },
      ],
    },
  ],
};
