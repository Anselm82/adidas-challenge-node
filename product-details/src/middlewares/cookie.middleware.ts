import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';

const realFetch = fetch;

function cookieFetch(fetch, cookie) {
  return (url: string, opts: any) => {
    opts = opts || {};
    return fetch(
      url,
      Object.assign(opts, {
        headers: Object.assign(opts.headers || {}, { cookie }),
      }),
    );
  };
}

export function cookieMiddleware(req: Request, res: Response, next: NextFunction) {
  const cookied = req.headers.cookie;
  global.fetch = cookied ? cookieFetch(realFetch, cookied) : realFetch;
  return next();
}

module.exports = cookieMiddleware;
