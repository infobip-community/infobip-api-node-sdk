export const advancedMessage = {
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
      from: 'InfoMMS',
      intermediateReport: true,
      notifyContentType: 'application/json',
      notifyUrl: 'https://www.example.com/sms/advanced',
      title: 'Hello World',
      validityPeriod: 720,
      messageSegments: [
        {
          contentId: 'rando-string-ID',
          text: 'Hello World',
        },
      ],
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
      title: 'A long time ago, in a galaxy far, far away...',
      messageSegments: [
        {
          contentId: 'rando-string-ID',
          contentType: 'image/svg+xml',
          contentTransferEncoding: 'base64',
          contentUrl:
            'https://www.infobip.com/wp-content/themes/infobip/static/ui/infobip-logo.svg',
        },
        {
          contentId: 'rando-string-ID',
          contentType: 'image/svg+xml',
          contentTransferEncoding: 'base64',
          contentBase64:
            'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNDAgNDMuNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTQwIDQzLjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojMzczQTNCO30KCS5zdDF7ZmlsbDojRjE1QzIyO30KPC9zdHlsZT4KPGc+Cgk8Zz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjguNywxNWMtMS44LDAtMy4zLDAuNi00LjQsMS44bC0wLjYtMS41SDYwdjEzLjNoNC43di03LjFjMC0xLjYsMS0yLjYsMi41LTIuNmMxLjIsMCwyLjEsMC45LDIuMSwyLjF2Ny42CgkJCUg3NHYtOC40YzAtMS41LTAuNS0yLjgtMS41LTMuN0M3MS42LDE1LjUsNzAuMywxNSw2OC43LDE1eiIvPgoJCTxnPgoJCQk8cmVjdCB4PSI1Mi43IiB5PSI5LjIiIGNsYXNzPSJzdDAiIHdpZHRoPSI0LjciIGhlaWdodD0iNC43Ii8+CgkJCTxyZWN0IHg9IjUyLjciIHk9IjE1LjQiIGNsYXNzPSJzdDAiIHdpZHRoPSI0LjciIGhlaWdodD0iMTMuMyIvPgoJCTwvZz4KCQk8Zz4KCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEzOC4zLDE3Yy0xLjItMS4zLTIuNi0yLTQuNC0yYy0xLjYsMC0yLjksMC41LTQsMS42bC0wLjYtMS4yaC0zLjh2MTguOWg0Ljd2LTYuNWMxLjEsMC44LDIuMiwxLjMsMy42LDEuMwoJCQkJYzEuOCwwLDMuMy0wLjcsNC40LTEuOWMxLjItMS4zLDEuNy0zLDEuNy01QzE0MCwyMCwxMzkuNCwxOC4zLDEzOC4zLDE3eiBNMTMyLjYsMjUuM2MtMS40LDAtMi40LTEuMS0yLjQtMi42di0xLjQKCQkJCWMwLTEuNSwxLTIuNiwyLjQtMi42YzEuNSwwLDIuNiwxLjMsMi42LDMuM0MxMzUuMiwyMy45LDEzNC4xLDI1LjMsMTMyLjYsMjUuM3oiLz4KCQk8L2c+CgkJPGc+CgkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMjAuNiw5LjFjLTEuNSwwLTIuNywxLjEtMi43LDIuN2MwLDEuNSwxLjIsMi43LDIuNywyLjdjMS42LDAsMi43LTEuMiwyLjctMi43CgkJCQlDMTIzLjMsMTAuMywxMjIuMiw5LjEsMTIwLjYsOS4xeiIvPgoJCQk8cmVjdCB4PSIxMTguMiIgeT0iMTUuNCIgY2xhc3M9InN0MCIgd2lkdGg9IjQuNyIgaGVpZ2h0PSIxMy4zIi8+CgkJPC9nPgoJCTxnPgoJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTguNSwxN2MtMS40LTEuMy0zLjItMi01LjUtMmMtMi4yLDAtNCwwLjYtNS41LDJjLTEuNCwxLjMtMi4xLDMtMi4xLDVjMCwyLDAuNywzLjcsMi4xLDUKCQkJCUM4OSwyOC4zLDkwLjgsMjksOTMsMjljMi4yLDAsNC4xLTAuNyw1LjUtMS45YzEuNC0xLjMsMi4xLTMsMi4xLTVDMTAwLjYsMjAsOTkuOSwxOC4zLDk4LjUsMTd6IE05MywyNS4zYy0xLjYsMC0yLjctMS40LTIuNy0zLjMKCQkJCWMwLTIsMS4xLTMuMywyLjctMy4zYzEuNiwwLDIuOCwxLjQsMi44LDMuM0M5NS44LDI0LDk0LjYsMjUuMyw5MywyNS4zeiIvPgoJCTwvZz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODMuNSwxMy4yYzAuNCwwLDAuOSwwLjEsMS42LDAuMmwwLjYtMy41Yy0xLjEtMC4zLTIuMi0wLjQtMy4zLTAuNGMtMS41LDAtMi43LDAuNC0zLjYsMS4zCgkJCWMtMC45LDAuOS0xLjQsMi0xLjQsMy40djEuMmgtMi4ydjMuNmgyLjJ2OS43aDQuN3YtOS43aDIuN3YtMy42aC0yLjd2LTAuOEM4Mi4xLDEzLjcsODIuNiwxMy4yLDgzLjUsMTMuMnoiLz4KCQk8Zz4KCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTExNC43LDE3Yy0xLjItMS4zLTIuNi0yLTQuNC0yYy0xLjQsMC0yLjYsMC40LTMuNiwxLjNWOS43SDEwMnYxOC45aDMuOGwwLjYtMS4yYzEsMSwyLjMsMS42LDMuOSwxLjYKCQkJCWMxLjgsMCwzLjMtMC43LDQuNC0xLjljMS4yLTEuMywxLjgtMywxLjgtNUMxMTYuNSwyMCwxMTUuOSwxOC4zLDExNC43LDE3eiBNMTA5LjEsMjUuM2MtMS40LDAtMi40LTEuMS0yLjQtMi42di0xLjQKCQkJCWMwLTEuNSwxLTIuNiwyLjQtMi42YzEuNSwwLDIuNiwxLjMsMi42LDMuM0MxMTEuNywyMy45LDExMC42LDI1LjMsMTA5LjEsMjUuM3oiLz4KCQk8L2c+Cgk8L2c+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTI1LjksMTguN3Y1LjljMCwwLjctMC42LDEuMi0xLjIsMS4yaC01LjljLTAuNywwLTEuMi0wLjYtMS4yLTEuMnYtNS45YzAtMC43LDAuNi0xLjIsMS4yLTEuMmg1LjkKCQkJCUMyNS40LDE3LjUsMjUuOSwxOCwyNS45LDE4Ljd6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMS45LDExLjVjLTEuNy0xLjctNS43LTIuOC0xMC4yLTIuOHMtOC41LDEuMS0xMC4yLDIuOGMtMS43LDEuNy0yLjgsNS43LTIuOCwxMC4yczEuMSw4LjUsMi44LDEwLjIKCQkJCWMxLjcsMS43LDUuNywyLjgsMTAuMiwyLjhzOC41LTEuMSwxMC4yLTIuOGMwLjgtMC44LDEuNS0yLjMsMi00YzAuNS0xLjgsMC44LTMuOSwwLjgtNi4xQzM0LjYsMTcuMiwzMy42LDEzLjIsMzEuOSwxMS41egoJCQkJIE0yNy45LDI3LjljLTAuNCwwLjQtMS40LDEuNC02LjMsMS40Yy00LjksMC01LjktMS4xLTYuMy0xLjRDMTUsMjcuNSwxNCwyNi41LDE0LDIxLjZzMS4xLTUuOSwxLjQtNi4zYzAuMy0wLjQsMS40LTEuNCw2LjMtMS40CgkJCQljNC45LDAsNS45LDEuMSw2LjMsMS40YzAuMywwLjQsMS40LDEuNCwxLjQsNi4zUzI4LjMsMjcuNSwyNy45LDI3Ljl6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yNS45LDE4Ljd2NS45YzAsMC43LTAuNiwxLjItMS4yLDEuMmgtNS45Yy0wLjcsMC0xLjItMC42LTEuMi0xLjJ2LTUuOWMwLTAuNywwLjYtMS4yLDEuMi0xLjJoNS45CgkJCQlDMjUuNCwxNy41LDI1LjksMTgsMjUuOSwxOC43eiIvPgoJCTwvZz4KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjUuOSwxOC43djUuOWMwLDAuNy0wLjYsMS4yLTEuMiwxLjJoLTUuOWMtMC43LDAtMS4yLTAuNi0xLjItMS4ydi01LjljMC0wLjcsMC42LTEuMiwxLjItMS4yaDUuOQoJCQlDMjUuNCwxNy41LDI1LjksMTgsMjUuOSwxOC43eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yNS45LDE4Ljd2NS45YzAsMC43LTAuNiwxLjItMS4yLDEuMmgtNS45Yy0wLjcsMC0xLjItMC42LTEuMi0xLjJ2LTUuOWMwLTAuNywwLjYtMS4yLDEuMi0xLjJoNS45CgkJCUMyNS40LDE3LjUsMjUuOSwxOCwyNS45LDE4Ljd6Ii8+CgkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMxLjksMTEuNWMtMS43LTEuNy01LjctMi44LTEwLjItMi44cy04LjUsMS4xLTEwLjIsMi44Yy0xLjcsMS43LTIuOCw1LjctMi44LDEwLjJzMS4xLDguNSwyLjgsMTAuMgoJCQljMS43LDEuNyw1LjcsMi44LDEwLjIsMi44czguNS0xLjEsMTAuMi0yLjhjMC44LTAuOCwxLjUtMi4zLDItNGMwLjUtMS44LDAuOC0zLjksMC44LTYuMUMzNC42LDE3LjIsMzMuNiwxMy4yLDMxLjksMTEuNXoKCQkJIE0yNy45LDI3LjljLTAuNCwwLjQtMS40LDEuNC02LjMsMS40Yy00LjksMC01LjktMS4xLTYuMy0xLjRDMTUsMjcuNSwxNCwyNi41LDE0LDIxLjZzMS4xLTUuOSwxLjQtNi4zYzAuMy0wLjQsMS40LTEuNCw2LjMtMS40CgkJCWM0LjksMCw1LjksMS4xLDYuMywxLjRjMC4zLDAuNCwxLjQsMS40LDEuNCw2LjNTMjguMywyNy41LDI3LjksMjcuOXoiLz4KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjEuNywwQzkuNywwLDAsOS43LDAsMjEuN2MwLDExLjksOS42LDIxLjUsMjEuNCwyMS43YzEyLjEsMC4yLDIyLjItOS45LDIyLTIyQzQzLjIsOS42LDMzLjYsMCwyMS43LDB6CgkJCSBNMzQuMSwzNC4yYy0yLjQsMi40LTcsMy44LTEyLjQsMy44Yy01LjQsMC0xMC4xLTEuNC0xMi40LTMuOGMtMi40LTIuNC0zLjgtNy0zLjgtMTIuNGMwLTUuNCwxLjQtMTAsMy44LTEyLjQKCQkJYzIuNC0yLjQsNy0zLjgsMTIuNC0zLjhjNS40LDAsMTAsMS40LDEyLjQsMy44YzIuNCwyLjQsMy44LDcsMy44LDEyLjRDMzcuOSwyNy4yLDM2LjUsMzEuOCwzNC4xLDM0LjJ6Ii8+Cgk8L2c+CjwvZz4KPC9zdmc+Cg==',
        },
      ],
    },
    {
      destinations: [
        {
          to: '41793026700',
        },
      ],
      from: '41793026700',
      messageSegments: [
        {
          contentId: 'rando-string-ID',
          uploadedContentId: 'ID-of-previously-uploaded-binary-file',
        },
      ],
    },
    {
      destinations: [
        {
          to: '41793026700',
        },
      ],
      from: '41793026700',
      messageSegments: [
        {
          contentId: 'rando-string-ID',
          contentType: 'application/smil',
          smil:
            '<smil><head><meta name="author" content="Jane Morales"/><meta name="title" content="Multimedia My Way"/><meta name="copyright" content="(c)1998 Jane Morales"/></head><body><seq><audio src="audio/newsong.wav"/><audio src="audio/oldsong.snd"/></seq></body></smil>',
        },
      ],
    },
  ],
  sendingSpeedLimit: {
    amount: 12,
    timeUnit: 'MINUTE',
  },
  tracking: {
    track: 'SMS',
    type: 'MY_CAMPAIGN',
  },
};
