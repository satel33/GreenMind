import Redis from 'redis-tag-cache';
import { randomIntegerBetween } from '@vue-storefront/odoo-api/';
const logger = process.winstonLog;

export default function RedisCache (options) {
  const client = new Redis(options);

  logger.info({
    label: '[REDIS CACHE]',
    message: 'Bootstrap redis cache with params:',
    params: options
  });
  return {
    async invoke({ route, render, getTags }) {
      const content = await render();
      const tags = getTags();
      const regexProduct = /[P]\d/;
      const isProductTag = regexProduct.test(tags?.[0]);
      const productSlug = route?.split('?')?.[0];

      const key = isProductTag ? `page:${ productSlug }` : `page:${ route }`;

      const cachedResponse = await client.get(key);

      if (cachedResponse) {
        return cachedResponse;
      }

      if (!tags.length) {
        return content;
      }

      // We could add "await" here, but saving content in cache doesn't have to block the request
      client.set(
        key,
        content,
        tags,
        { timeout: randomIntegerBetween(process.env.REDIS_TTL_CACHE_MINIMUM, process.env.REDIS_TTL_CACHE_MAXIMUM)}

      );

      logger.info({
        label: '[REDIS CACHE]',
        message: `Created redis cache with tags: ${tags}.`
      });

      return content;
    },
    invalidate({ tags }) {
      const clearAll = tags.includes('*');

      if (!clearAll) {
        return client.invalidate(...tags);
      }

      return new Promise((resolve, reject) => {
        const prefix = `${options.redis.keyPrefix || ''}tags:`;
        const stream = client.redis.scanStream({ match: `${prefix}*` });

        const tags = [];

        stream.on('data', rawTags => tags.push(...rawTags.map(tag => tag.replace(prefix, ''))));
        stream.on('end', async () => {
          if (tags.length) {
            await client.invalidate(...tags);
          }
          resolve();
        });
        stream.on('error', reject);
      });
    }
  };

}
