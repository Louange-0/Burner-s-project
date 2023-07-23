const annotations = {
    openapi: '3.0.0',
    info: {
      title: `Tourist  APIs`,
      version: '1.0.0',
      description: 'Your  System',
      contact: {
        name: 'tourist',
        email: 'tourism@gmail.com',
        url: 'https://www.instagram.com/',
      },
      social: {
        instagram: 'https://www.instagram.com/',
      },
    },
    servers: [
        {
          url: 'http://localhost:5000',
        },
      ],
    'tags':[
        {name:'Users'},
        {name:'Email Verification'},
        {name:'Messages'},
      ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      Message: {
        type: 'object',
        properties: {
          from: { type: 'string', required: true },
          to: { type: 'string', default:"me" },
          content: { type: 'string', required: true },
          replyId: { type: 'string', default:"no reply" },
          timeStamp: { type: 'Date', format: 'date',default:new Date},
        },
      },
      User:{
        type:'object',
        properties:{
          username: { type: 'string', required: true, example: 'tourism', description: "the username of the User" },
          fullName:{type: 'string', required: true, example:'tourism lt',description:"the name of the User"},
          email: { type: 'string', required: true, example: 'tourism@gmail.com', description: "the email of the User" },
          phoneNumber: { type: 'number', required: true, example: '764379882', description: "the phone number of the User" },
          image: { type: 'string', required: false, example: 'tourism', description: "the name of the User" },
          IsEmailVerified: { type: 'boolean', required: false, example: 'True', description: "the name of the User" },
        }
      }
    },
  },
    paths: {
      '/v1/api/signup': {
        post: {
          tags:["Users"],
          summary: 'Create a new user',
          description: 'Endpoint to create a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: {
                      type: 'string',
                      description: 'The username of the user',
                      example: 'john123',
                    },
                    email: {
                      type: 'string',
                      description: 'The email address of the user',
                      example: 'johndoe@example.com',
                    },
                    password: {
                      type: 'string',
                      description: 'The password for the user',
                      example: 'p@ssw0rd',
                    },
                    fullName: {
                      type: 'string',
                      description: 'The full name of the user',
                      example: 'John Doe',
                    },
                    phoneNumber: {
                      type: 'string',
                      description: 'The phone number of the user',
                      example: '1234567890',
                    },
                    image: {
                      type: 'string',
                      description: 'Juss binary data',
                      example: '12ewbcwnnewn3849wkdnej',
                    },
                  },
                  required: ['username', 'email', 'password'],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'User created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string',
                        description: 'The ID of the created user',
                        example: '123456789',
                      },
                      username: {
                        type: 'string',
                        description: 'The username of the user',
                        example: 'john123',
                      },
                      email: {
                        type: 'string',
                        description: 'The email address of the user',
                        example: 'johndoe@example.com',
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Invalid request data',
            },
          },
        },
      },
      '/v1/api/login': {
        post: {
          tags: ["Users"],
          summary: 'User login',
          description: 'Endpoint for user login',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      description: 'The email address of the user',
                      example: 'johndoe@example.com',
                    },
                    password: {
                      type: 'string',
                      description: 'The password for the user',
                      example: 'p@ssw0rdHRH1',
                    },
                  },
                  required: ['email', 'password'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful login',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: {
                        type: 'string',
                        description: 'Access token for the authenticated user',
                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE2MzAwMzM1MjV9.TsfxzxLHf9vGS8NMh4oHXht0O-vW9w3U5XvW7_VJ18M',
                      },
                      message: {
                        type: 'string',
                        description: 'Login success message',
                        example: 'Successful login',
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Invalid request data',
            },
            '401': {
              description: 'Invalid email or password',
            },
            '500': {
              description: 'Internal Server Error',
            },
          },
        },
      },
      'v1/api/usersProfile/': {
        get: {
          tags: ['User Profiles'],
          summary: 'Get User Profile',
          security: [
            {
              bearerAuth: []
            }
          ],
          description: 'Fetches the user profile based on the unique user ID.',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the User',
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            '404': {
              description: 'User not found',
            },
            '500': {
              description: 'Internal Server Error',
            },
          },
        },
        put: {
          tags: ['User Profiles'],
          summary: 'Update User Profile',
          security: [
            {
              bearerAuth: []
            }
          ],
          description: 'Updates the user profile information.',
          parameters: [
            {
              
            },
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    image: {
                      type: 'string',
                      description: 'the new updated user Image',
                      example: '1232i4uo4udbdfnjoiewhfncuedhfeuw123434uhrfewjrb4rsambk',
                    },
                    fullName: {
                      type: 'string',
                      description: 'the new updated user names',
                      example: 'Hirwa hope',
                    },
                    phoneNumber: {
                      type: 'string',
                      description: 'the new updated user phoneNumber',
                      example: '1232i4uo4u',
                    },
                    email: {
                      type: 'string',
                      description: 'user email',
                      example: 'yourcurrentemail@example.com //for confirming ',
                    },
                    username: {
                      type: 'string',
                      description: 'username to confirm',
                      example: 'hope23 //it is the current username to confirm',
                    },
                    password: {
                      type: 'string',
                      description: 'password to confirm',
                      example: '1232i4uo4u //it is the current password to confirm',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            '404': {
              description: 'User not found',
            },
            '500': {
              description: 'Internal Server Error',
            },
          },
        },
      },
      '/v1/api/message': {
        get: {
          tags: ["Messages"],
          summary: 'Get all messages',
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Message',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Messages"],
          summary: 'Send new message',
          security: [
            {
              bearerAuth: []
            }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Message',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Created',
            },
          },
        },
      },
      '/v1/api/message/{id}': {
        get: {
          tags: ["Messages"],
          summary: 'Get a Message by ID',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the Message',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Message',
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ["Messages"],
          summary: 'Update a Message',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the Message',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Message',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'OK',
            },
          },
        },
        delete: {
          tags: ["Messages"],
          summary: "Delete a Message by ID",
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID of the Message",
              required: true,
              schema: {
                type: "string"
              }
            }
          ],
          responses: {
            200: {
              description: "OK"
            }
          }
        }
      },
      '/v1/api/emailVerification/{token}':{
        get: {
          tags: ["Email Verification"],
          summary: 'Get all messages',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'token',
              in: 'path',
              description: 'token ',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      Verification: {
                        type: 'string',
                        description: 'approved verification',
                        example: 'your email is already verified you can now log in',
                      },
                    }
                  },
                },
              },
            },
          },
        },
      },
      '/v1/api/emailVerification': {
        post: {
          tags: ["Email Verification"],
          summary: 'Send new message',
          security: [
            {
              bearerAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    tokenString: {
                      type: 'string',
                      description: 'add the code recieved on email',
                      example: 'johndoe@example.com',
                    },
                  },
                  required: ['tokenString'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful login',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: {
                        type: 'string',
                        description: 'approval message',
                        example: 'your account is now verified',
                  },
                },
              },
            },
            '400': {
              description: 'Invalid token',
            },
            '401': {
              description: 'Invalid token',
            },
            '500': {
              description: 'invalid token',
            },
          },
        },
      },
        },
      },
    },
  };
  
  module.exports = { annotations };
 