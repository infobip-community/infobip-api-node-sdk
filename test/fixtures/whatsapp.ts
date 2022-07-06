export const templateMessage = {
  type: 'template',
  messages: [
    {
      from: '447860099299',
      to: '447481738558',
      content: {
        templateName: 'yolo',
        language: 'en',
        templateData: {
          body: {
            placeholders: ['Infobip API'],
          },
        },
      },
    },
  ],
};

export const textMessage = {
  type: 'text',
  from: '447860099299',
  to: '44123456789',
  content: {
    text: 'Some text',
  },
};

export const documentMessage = {
  type: 'document',
  from: '447860099299',
  to: '44123456789',
  content: {
    mediaUrl:
      'https://www.infobip.com/wp-content/themes/infobip/static/ui/infobip-logo.svg',
  },
};

export const imageMessage = {
  type: 'image',
  from: '447860099299',
  to: '44123456789',
  content: {
    mediaUrl:
      'https://www.infobip.com/wp-content/themes/infobip/static/ui/favicon/favicon-32x32.png',
  },
};

export const audioMessage = {
  type: 'audio',
  from: '447860099299',
  to: '44123456789',
  content: {
    mediaUrl:
      'https://file-examples.com/storage/feb8f98f1d627c0dc94b8cf/2017/11/file_example_MP3_700KB.mp3',
  },
};

export const videoMessage = {
  type: 'video',
  from: '447860099299',
  to: '44123456789',
  content: {
    mediaUrl:
      'https://file-examples.com/storage/feb8f98f1d627c0dc94b8cf/2017/04/file_example_MP4_480_1_5MG.mp4',
  },
};

export const stickerMessage = {
  type: 'sticker',
  from: '447860099299',
  to: '44123456789',
  content: {
    mediaUrl:
      'https://raw.githubusercontent.com/WhatsApp/stickers/2bf2582ac81d81122dd0307a82eac18b3c11f953/Android/app/src/main/assets/1/01_Cuppy_smile.webp',
  },
};

export const locationMessage = {
  type: 'location',
  from: '447860099299',
  to: '44123456789',
  content: {
    latitude: 43.5200857,
    longitude: 16.4456471,
  },
};

export const contactMessage = {
  type: 'contact',
  from: '447860099299',
  to: '44123456789',
  content: {
    contacts: [
      {
        name: {
          firstName: 'Infobip',
          formattedName: 'Infobip API',
        },
      },
      {
        name: {
          firstName: 'Infobip Dev',
          formattedName: 'Infobip Developers',
        },
      },
    ],
  },
};

export const interactiveButtonsMessage = {
  type: 'interactive-buttons',
  from: '447860099299',
  to: '44123456789',
  content: {
    body: {
      text: 'Hello World',
    },
    action: {
      buttons: [{ type: 'REPLY', id: '1', title: 'Hello' }],
    },
  },
};

export const interactiveButtonsWithHeaderMessage = {
  type: 'interactive-buttons',
  from: '447860099299',
  to: '44123456789',
  content: {
    header: {
      type: 'IMAGE',
      mediaUrl:
        'https://www.infobip.com/wp-content/themes/infobip/static/ui/infobip-logo.svg',
    },
    body: {
      text: 'Hello World',
    },
    action: {
      buttons: [{ type: 'REPLY', id: '1', title: 'Hello' }],
    },
  },
};

export const interactiveListMessage = {
  type: 'interactive-list',
  from: '447860099299',
  to: '44123456789',
  content: {
    body: {
      text: 'Hello World',
    },
    action: {
      title: 'Infobip APIs',
      sections: [{ rows: [{ id: '1', title: 'Send' }], title: 'WhatsApp' }],
    },
  },
};

export const interactiveProductMessage = {
  type: 'interactive-product',
  from: '447860099299',
  to: '44123456789',
  content: {
    body: {
      text: 'Hello World',
    },
    footer: {
      text: 'Hello World',
    },
    action: {
      catalogId: '1',
      productRetailerId: '2',
    },
  },
};

export const interactiveMultiProductMessage = {
  type: 'interactive-multi-product',
  from: '447860099299',
  to: '44123456789',
  content: {
    header: {
      type: 'TEXT',
      text: 'Infobip APIs',
    },
    body: {
      text: 'Hello World',
    },
    footer: {
      text: 'Hello World',
    },
    action: {
      catalogId: '1',
      sections: [
        {
          productRetailerIds: ['2'],
        },
      ],
    },
  },
};
