/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Config from '@odoogap/nuxt-config';
import { resolve } from 'path';
import webpack from 'webpack';
import redirect from './customRoutes/redirects.json';
import { getRoutes } from './routes';
import getAppRoutes from './sitemap';
import theme from './themeConfig';

import { format, transports } from 'winston';
import {
  anyDayTagToken, baseDomain,
  baseURL,
  cookieBotKey, gtmKey, klaviyoKey,
  logBrowserErrorsInApi,
  nodeLocale,
  rebuildRefreshToken,
  robots,
  sbMode,
  sbToken,
  siteUrl,
  sitemapCacheTime
} from './ENV';
const { combine, timestamp, prettyPrint } = format;
const { makeBuild } = Config();
const isDev = process.env.NODE_ENV !== 'production';

const baseURLWithoutLastBar = baseURL.slice(0, -1);

const localesMap = {
  'en-EN': 'en',
  'de-DE': 'de',
  'da-DK': 'da',
  'sv-SV': 'sv'
};

const localeIndex = localesMap[nodeLocale];

export default {
  // hooks,
  vue: {
    config: {
      ignoredElements: ['anyday-price-tag']

    }
  },
  render: {
    static: {
      maxAge: 60 * 60 * 24 * 365 * 1000
    }
  },
  dir: {
    // using to ignore auto-generated routes
    pages: 'routes'
  },
  alias: {
    'green-api': resolve(__dirname, './green-api')
  },
  winstonLog: {
    useDefaultLogger: false,
    skipRequestMiddlewareHandler: true,
    skipErrorMiddlewareHandler: true,
    loggerOptions: {
      format: combine(
        timestamp(),
        prettyPrint()
      ),
      transports: [new transports.Console()]
    }
  },
  components: ['~/components/', '~/components/blocks', '~/components/core/atoms', '~/components/core/organisms', '~/components/core/molecules'],
  head: {
    title: 'GreenMind',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        hid: 'Facebook-domain-verification',
        name: 'facebook-domain-verification',
        content: 'ef18vp0ug7n4ctpw1qkopdjz8a90qy'
      },
      {
        hid: 'Google-site-verification',
        name: 'google-site-verification',
        content: 'AIYIV7nc1Lm3ntUPUE02Z-4a6VTJAc3udymwuqcXSPY'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'dns-prefetch',
        href: 'https://www.google-analytics.com'
      },
      {
        rel: 'dns-prefetch',
        href: baseURLWithoutLastBar
      },
      {
        rel: 'dns-prefetch',
        href: 'https://cdn.clerk.io'
      },
      {
        rel: 'dns-prefetch',
        href: 'http://cdn.clerk.io'
      },
      {
        rel: 'dns-prefetch',
        href: 'https://api.clerk.io'
      },
      {
        rel: 'dns-prefetch',
        href: 'https://consent.cookiebot.com'
      },
      {
        rel: 'preconnect',
        href: 'https://consent.cookiebot.com'
      },
      {
        rel: 'dns-prefetch',
        href: 'https://static.klaviyo.com'
      },
      {
        rel: 'preconnect',
        href: 'https://static.klaviyo.com'
      },
      {
        rel: 'preconnect',
        href: 'https://www.google-analytics.com'
      },
      {
        rel: 'preconnect',
        href: 'https://cdn.clerk.io'
      },
      {
        rel: 'preconnect',
        href: baseURLWithoutLastBar
      },
      {
        rel: 'preconnect',
        href: 'https://api.clerk.io'
      },
      {
        rel: 'preload',
        as: 'image',
        href: `${baseURL}web/image/website.homepage.hero_banner/1/image_desktop`
      }
    ]
  },
  googleFonts: {
    families: {
      Outfit: {
        wght: [700, 500, 300]
      }
    },
    download: false,
    prefetch: true,
    preconnect: true,
    preload: true,
    display: 'swap'
  },
  routeRules: {
    '/_ipx/**': { headers: { 'cache-control': 's-maxage=86400' } }
  },
  router: {
    extendRoutes(routes) {
      getRoutes(localeIndex, `${__dirname}`).forEach((route) => routes.unshift(route));
    },
    middleware: ['checkout', 'redirects']
  },

  pwa: {
    meta: {
      name: 'Greenmind',
      theme_color: '#32463D',
      description: 'Greenmind Description',
      lang: localeIndex
    },

    icon: {
      source: '/logo_two_lines.png',
      fileName: 'logo_two_lines.png'
    },
    manifest: {
      name: 'Greenmind',
      theme_color: '#32463D',
      short_name: 'Greenmind',
      description: 'Greenmind Description',
      lang: localeIndex,
      background_color: '#fff'
    }
  },
  loading: { color: '#fff' },
  plugins: [
    '~/plugins/getStoryBlockImage.ts',
    '~/plugins/rich-text-renderer.ts',
    '~/plugins/composition-api.ts',
    '~/plugins/googleTag.client.js',
    '~/plugins/clerkIo.client.ts',
    '~/plugins/dkkCustomCurrency.ts',
    '~/plugins/vee-validate.ts',
    '~/plugins/getImage.ts'
  ],
  device: {
    refreshOnResize: true
  },
  webVitals: {
    provider: 'log',
    debug: false,
    disabled: true
  },
  buildModules: [
    '@nuxtjs/google-fonts',
    '@unlighthouse/nuxt',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/pwa',

    '@nuxtjs/device',
    '@nuxtjs/web-vitals',
    '@nuxtjs/tailwindcss',
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    [
      '@vue-storefront/nuxt',
      {
        performance: {
          httpPush: true
        },
        i18nExtension: false,
        // @core-development-only-start
        // @core-development-only-end
        useRawSource: {
          dev: ['@vue-storefront/odoo', '@vue-storefront/core'],
          prod: ['@vue-storefront/odoo', '@vue-storefront/core']
        }
      }
    ],
    // @core-development-only-start
    [
      '@vue-storefront/nuxt-theme',
      {
        routes: false
      }
    ],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/odoo/nuxt', {}],
    [
      '@storyblok/nuxt-2/module',
      {
        accessToken: sbToken,
        cacheProvider: 'memory',
        bridge: isDev,
        useApiClient: true,
        version: sbMode
      }
    ],
    '@unlighthouse/nuxt'
  ],
  unlighthouse: {
    // , 'pwa', 'seo'
    onlyCategories: ['performance'],
    urls: [
      '/'
    ],
    scanner: {
      sitemap: false,
      device: 'desktop'
    }
  },
  publicRuntimeConfig: {
    klaviyoKey,
    anyDayTagToken,
    logBrowserErrorsInApi,
    baseURL,
    baseURLWithoutLastBar,
    siteUrl,
    rebuildRefreshToken,
    cookieBotKey,
    localeIndex,
    theme,
    nodeLocale,
    robots,
    sbMode
  },
  modules: [

    'nuxt-winston-log',
    '@nuxtjs/robots',
    '@nuxtjs/pwa',
    'nuxt-precompress',
    '@vue-storefront/middleware/nuxt',
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
    '@nuxtjs/gtm',
    ['@nuxtjs/redirect-module', { statusCode: 301 }],
    [
      'nuxt-breakpoints',
      {
        breakpoints: {
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
          '2xl': 1536
        }
      }
    ],
    [
      '~/helpers/cache/nuxt',
      {
        enabled: !isDev,
        invalidation: {
          endpoint: '/cache-invalidate',
          key: '0ead60c3-d118-40be-9519-d531462ddc60',
          handlers: ['./helpers/cache/defaultHandler']
        },
        driver: [
          './helpers/cache',
          {
            enabled: !isDev,
            defaultTimeout: 86400,
            redis: {
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
              password: process.env.REDIS_PASSWORD,
              db: process.env.REDIS_DATABASE
            }
          }
        ]
      }
    ],
    ['@vue-storefront/http-cache/nuxt', {
      default: 'max-age=300, s-maxage=3600, stale-while-revalidate=86400'
    }]
  ],
  robots: {
    UserAgent: '*',
    Disallow: robots === 'true' ? '' : '/'
  },
  redirect,
  gtm: {
    id: gtmKey,
    debug: false,
    enabled: !isDev,
    pageTracking: true,
    scriptDefer: true
  },
  // Static Files cache policy
  nuxtPrecompress: {
    enabled: !isDev,
    report: false,
    test: /\.(js|css|html|txt|xml|svg)$/,
    // Serving options
    middleware: {
      enabled: true,
      enabledStatic: true,
      encodingsPriority: ['br', 'gzip']
    },

    // build time compression settings
    gzip: {
      enabled: true,
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].gz[query]',
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 }
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].br[query]',
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8
    }
  },
  i18n: {
    baseUrl: siteUrl,
    strategy: 'no_prefix',
    countries: [
      { name: 'US', label: 'United States' },
      { name: 'DE', label: 'Germany' }
    ],
    currencies: [
      { name: 'DKK', label: 'Kroner' },
      { name: 'EUR', label: 'Euro' },
      { name: 'USD', label: 'Dollar' }
    ],
    locales: [
      {
        code: 'da',
        label: 'Danish',
        file: 'da.json',
        iso: 'da-DK'
      },
      {
        code: 'sv',
        label: 'Swedish',
        file: 'sv.json',
        iso: 'sv-SV'
      },
      {
        code: 'de',
        label: 'German',
        file: 'de.json',
        iso: 'de-DE'
      },
      {
        code: 'en',
        label: 'English',
        file: 'en.json',
        iso: 'en-US'
      }
    ],
    fallbackLocale: localeIndex,
    defaultLocale: localeIndex,
    seo: true,
    locale: localeIndex,
    langDir: 'lang',
    detectBrowserLanguage: false
  },
  sitemap: {
    exclude: ['/checkout/**', '/checkout', '/dashboard/**', '/dashboard'],
    hostname: siteUrl,
    i18n: false,
    cacheTime: sitemapCacheTime,
    gzip: true,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    routes: getAppRoutes
  },

  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })]
  },
  build: makeBuild({
    // watch: ['.nuxt/routes.json'],
    babel: {
      compact: true,
      plugins: [['@babel/plugin-proposal-private-property-in-object', { loose: true }]]
    },
    transpile: ['vee-validate/dist/rules', '/^@storefront-ui/'],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  })
};
