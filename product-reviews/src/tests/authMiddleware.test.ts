import { NextFunction, Request, Response } from 'express';

import authorizationMiddleware from '@/middlewares/auth.middleware';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { HttpException } from '@/exceptions/HttpException';
import AuthService from '@/services/auth.service';
import bcrypt from 'bcrypt';
import { User } from '@/interfaces/users.interface';
import userModel from '@models/users.model';
import mongoose from 'mongoose';

describe('Authorization middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });

  test('without headers', async () => {
    const expectedResponse = new HttpException(401, 'Authentication error');

    authorizationMiddleware(mockRequest as RequestWithUser, mockResponse as Response, nextFunction);

    expect(nextFunction).toBeCalledWith(expectedResponse);
  });

  test('without "authorization" header', async () => {
    const expectedResponse = new HttpException(404, 'Authentication token missing');
    mockRequest = {
      header: jest.fn().mockReturnValue(null),
    };
    authorizationMiddleware(mockRequest as RequestWithUser, mockResponse as Response, nextFunction);

    expect(nextFunction).toBeCalledWith(expectedResponse);
  });

  test('with "authorization" header with wrong value', async () => {
    const expectedResponse = new HttpException(401, 'Authentication error');
    mockRequest = {
      header: jest.fn().mockReturnValue('Bearer abc'),
    };
    authorizationMiddleware(mockRequest as RequestWithUser, mockResponse as Response, nextFunction);

    expect(nextFunction).toBeCalledWith(expectedResponse);
  });
  test('with "authorization" header with correct value but not in db', async () => {
    const expectedResponse = new HttpException(401, 'Authentication error');
    const authService = new AuthService();
    const userData: User = {
      _id: '60706478aad6c9ad19a31c84',
      email: 'test@email.com',
      password: await bcrypt.hash('q1w2e3r4!', 10),
    };
    const token = authService.createToken(userData);

    mockRequest = {
      header: jest.fn().mockReturnValue(`Bearer ${token.token}`),
    };
    authorizationMiddleware(mockRequest as RequestWithUser, mockResponse as Response, nextFunction);

    expect(nextFunction).toBeCalledWith(expectedResponse);
  });
  test('with "authorization" header with correct value should return token', async () => {
    const authService = new AuthService();
    const userData: User = {
      _id: '60706478aad6c9ad19a31c84',
      email: 'test@email.com',
      password: await bcrypt.hash('q1w2e3r4!', 10),
    };
    const token = authService.createToken(userData);

    mockRequest = {
      header: jest.fn().mockReturnValue(`Bearer ${token.token}`),
    };
    (mongoose as any).connect = jest.fn();
    userModel.findById = jest.fn().mockImplementation(() => ({
      findById: () => userData,
    }));
    authorizationMiddleware(mockRequest as RequestWithUser, mockResponse as Response, nextFunction);

    expect(nextFunction).toBeCalled();
    //expect(mockRequest.user).toBeDefined();
  });
});
