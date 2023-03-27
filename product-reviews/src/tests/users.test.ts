import UsersController from '@/controllers/users.controller';
import UserService from '../services/users.service';
import { NextFunction, Request, Response } from 'express';

describe('Testing Users', () => {
  let mockRequest: Request;
  let mockResponse: Response;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {} as Request;
    mockResponse = {
      json: jest.fn().mockImplementation(() => jest.fn()),
      status: jest.fn(),
    } as unknown as Response;
  });

  describe('[GET] /users', () => {
    it('response findAll Users if authenticated', async () => {
      const users = [
        {
          _id: 'qpwoeiruty',
          email: '@email.com',
          password: 'q1w2e3r4!',
        },
        {
          _id: 'alskdjfhg',
          email: 'b@email.com',
          password: 'q1w2e3r4!',
        },
        {
          _id: 'zmxncbv',
          email: 'c@email.com',
          password: 'q1w2e3r4!',
        },
      ];
      const controller = new UsersController();
      const service = new UserService();
      service.findAllUser = jest.fn().mockImplementation(() => Promise.resolve(users));
      controller.userService = service;
      await controller.getUsers(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });
});
