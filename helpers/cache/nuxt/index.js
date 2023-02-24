import { resolve } from 'path';
import { requirePackage, requireDriver } from './helpers';
const logger = process.winstonLog;

/**
 * Adds endpoint to invalidate cache
 */
function createInvalidationEndpoint (driver, options) {

  if (!options || !options.endpoint || !options.handlers) {
    return;
  }

  const handler = async (request, response) => {
    try {
      // Resolve handlers paths
      const tags = options.handlers
        .map(handler => typeof handler === 'string' ? requirePackage(handler) : handler)
        .reduce((tags, handler) => {
          const newTags = handler({ request, response, options });
          return tags.concat(newTags);
        }, []);

      const apiTags = [];
      tags.forEach(tag => {
        if (tag.includes('C')) {
          apiTags.push(`API-${tag}-products`);
        }
        apiTags.push(`API-${tag}`);
      });

      // Call driver invalidator with all tags
      await driver.invalidate({
        request,
        response,
        // Removes duplicates
        tags: Array.from(new Set([...tags, ...apiTags]))
      });
      logger.info({
        label: '[REDIS CACHE]',
        message: `Invalidated tags: ${[...tags, ...apiTags].join(',')} with succes`
      });
      response.writeHead(200);
    } catch (error) {
      logger.error({
        label: '[REDIS CACHE]',
        message: 'Cache driver thrown an error when invalidating cache! Operation skipped.',
        error
      });

      response.writeHead(500);
    }

    response.end();
  };

  this.addServerMiddleware({
    path: options.endpoint,
    handler
  });
}

/**
 * Creates custom renderer to use cache as much as possible.
 */
function createRenderer (renderFn) {
  const renderer = this.nuxt.renderer;
  const renderRoute = renderer.renderRoute.bind(renderer);

  renderer.renderRoute = (route, context) => {
    const render = () => renderRoute(route, context);
    return renderFn(route, context, render);
  };
}

/**
 * Main VSF cache module.
 */
export default function cacheModule (options) {

  // This part must be before the condition below
  this.addPlugin({
    src: resolve(__dirname, './plugin.js'),
    mode: 'server',
    options
  });

  if (!this.nuxt || !this.nuxt.renderer || !options.enabled) {
    return;
  }

  // Create cache driver
  const driver = requireDriver(options.driver);

  // Create invalidation endpoint if necessary
  createInvalidationEndpoint.call(this, driver, options.invalidation);

  // Create renderer
  createRenderer.call(this, async (route, context, render) => {
    const getTags = () => {
      const tags = context.req.$vsfCache && context.req.$vsfCache.tagsSet
        ? Array.from(context.req.$vsfCache.tagsSet)
        : [];

      return tags.map(({ prefix, value }) => `${prefix}${value}`);
    };
    if (!driver) {
      return render();
    }

    try {
      return await driver.invoke({
        route,
        context,
        render,
        getTags
      });
    } catch (error) {
      logger.error({
        label: '[REDIS CACHE]',
        message: 'Cache driver thrown an error when fetching cache! Server will render fresh page.',
        error
      });
      return render();
    }
  });
}
