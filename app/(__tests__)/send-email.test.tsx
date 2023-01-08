import { createMocks } from 'node-mocks-http';
import sendEmail from '../../pages/api/send-email';
import nodemailer from 'nodemailer';

jest.mock('nodemailer', () => ({
  createTransport: ({
    host,
    port,
    auth: { user, pass },
  }: {
    host: string;
    port: number;
    auth: {
      user: string;
      pass: string;
    };
  }) => {},
}));

describe('/api/send-email', () => {
  beforeEach(() => {});
  it('returns status 400 and error if any value is missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await sendEmail(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      error: 'Missing required fields',
    });
  });
  it('returns 400 and error if any values length is below 3', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        subject: 'hello',
        name: 'o',
        email: 'hello@gmail.com',
        text: 'text',
      },
    });

    await sendEmail(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      error: 'All fields must be at least 3 characters long',
    });
  });

  it('returns 400 and error if subject length is above 50', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        subject:
          'hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
        name: 'oooo',
        email: 'hello@gmail.com',
        text: 'text',
      },
    });

    await sendEmail(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      error: 'Subject must contain 50 or less characters',
    });
  });

  it('returns 400 and error if name length is above 50', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        subject: 'oooo',
        name: 'hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
        email: 'hello@gmail.com',
        text: 'text',
      },
    });

    await sendEmail(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      error: 'Name must contain 50 or less characters',
    });
  });

  it('returns 400 and error if email length is above 50', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        subject: 'oooo',
        name: 'helloooo',
        email:
          'hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo@gmail.com',
        text: 'text',
      },
    });

    await sendEmail(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      error: 'Email must contain 50 or less characters',
    });
  });

  it('returns 400 and error if text length is above 900', async () => {
    let text = '';
    for (let i = 0; i < 9; i += 1) {
      text +=
        'ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo';
    }
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        subject: 'oooo',
        name: 'helloooo',
        email: 'oooooooooooooooooooo@gmail.com',
        text: text,
      },
    });

    await sendEmail(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      error: 'Text must contain 900 or less characters',
    });
  });

  it('should return status 400 and error if email does not include @ symbol', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        subject: 'hello',
        name: 'ooooo',
        email: 'hellogmail.com',
        text: 'text',
      },
    });
    await sendEmail(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      error: 'Invalid email',
    });
  });

  it('nodemailer.createTransport should be called with correct parameters if values are ok', async () => {
    const createTransportSpy = jest.spyOn(nodemailer, 'createTransport');

    // @ts-ignore
    createTransportSpy.mockReturnValue({
      sendMail: jest.fn(),
    });
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        subject: 'hello',
        name: 'ooooo',
        email: 'hello@gmail.com',
        text: 'text',
      },
    });
    await sendEmail(req, res);

    expect(createTransportSpy).toHaveBeenCalledTimes(1);
    expect(createTransportSpy).toHaveBeenCalledWith({
      auth: { pass: undefined, user: undefined },
      host: 'smtp.elasticemail.com',
      port: 2525,
    });
  });

  it('should return status 500 and json if transport.sendMail returns error', async () => {
    const createTransportSpy = jest.spyOn(nodemailer, 'createTransport');

    const sendMailFunction = jest.fn();
    // @ts-ignore
    createTransportSpy.mockReturnValue({
      sendMail: sendMailFunction,
    });

    const error = new Error('Error');
    sendMailFunction.mockImplementation((options, callback) => {
      callback(error, {});
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        subject: 'hello',
        name: 'ooooo',
        email: 'hello@gmail.com',
        text: 'text',
      },
    });

    await sendEmail(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({
      success: false,
      error: error.message,
      message: 'Something went wrong. Please try again later.',
    });
  });

  it('should return status 500 and json if transport.sendMail does not return error', async () => {
    const createTransportSpy = jest.spyOn(nodemailer, 'createTransport');

    const sendMailFunction = jest.fn();
    // @ts-ignore
    createTransportSpy.mockReturnValue({
      sendMail: sendMailFunction,
    });

    sendMailFunction.mockImplementation((options, callback) => {
      callback(null, {});
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        subject: 'hello',
        name: 'ooooo',
        email: 'hello@gmail.com',
        text: 'text',
      },
    });

    await sendEmail(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      success: true,
      error: null,
      message: 'Email sent successfully',
    });
  });
});
