export const sendMessage = {
  type: 'send',
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
  type: 'send',
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

export const binaryTextMessage = {
  type: 'binary',
  messages: [
    {
      binary: {
        hex: '0048 0065 006c 006c 006f 0020 0077 006f 0072 006c',
      },
      destinations: [
        {
          to: '41793026727',
        },
      ],
      flash: true,
      from: 'InfoSMS',
    },
  ],
};

export const previewMessage = {
  type: 'preview',
  text: "Let's see how many characters remain unused in this message.",
};

export const sendQueryMessage = {
  type: 'sendQuery',
  username: 'Some User',
  password: 'Some Password',
  to: ['41793026727', '41793026728', '41793026729'],
};

export const bulkId = {
  bulkId: 'BULK-ID-123-xyz',
};

export const rescheduleSendAt = {
  sendAt: '2022-07-12T16:00:00.000+0000',
};

export const updateStatus = {
  status: 'PENDING',
};
