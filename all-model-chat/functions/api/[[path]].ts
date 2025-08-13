// functions/api/[[path]].ts

import type { PagesFunction } from '@cloudflare/workers-types';

interface Env {
  API_HOST?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const url = new URL(request.url);

  // 目标 API 地址，优先从环境变量 `API_HOST` 中读取，如果未设置，则使用默认值。
  // 您可以在 Cloudflare Pages 的设置中配置 `API_HOST` 环境变量。
  const targetHost = env.API_HOST || '';
  
  const targetUrl = `${targetHost}/${(params.path as string[]).join('/')}${url.search}`;

  const headers = new Headers(request.headers);
  // Cloudflare 会自动处理 Host 头，我们不需要手动设置
  headers.delete('host');

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: headers,
    body: request.body,
    redirect: 'follow',
  });

  return response;
};