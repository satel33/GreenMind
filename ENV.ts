const chalk = require('chalk');

const isDev = process.env.NODE_ENV !== 'production';

const removeLastBar = (url) => (url[url.length - 1] === '/' ? url.slice(0, -1) : url);

const notDefinedEnvs = [];

const pushToNotDefined = (name) => {
  notDefinedEnvs.push(name);
  return '';
};

/** Default values for DEV */
let clerkioKey = 'CEhYajX1WwY3uAClBKte5UC6qAC6d7W1';
let cookieBotKey = 'd2da6edf-44b1-4063-a6ef-fe4f37edeb0c';
let gtagKey = 'G-YYZ9TG2MS2';
let gtmKey = 'GTM-K9V7Q37';
let klaviyoKey = 'NzYWAu';
let nodeLocale = 'da-DK';
let baseURL = 'https://web-dev.greenmind.space/';
let siteUrl = 'http://localhost:3000';
let odooBaseUrl = 'https://web-dev.greenmind.space/';
let rebuildRefreshToken = '0ead60c3-d118-40be-9519-d531462ddc60';
let baseDomain = 'vue-dev.greenmind.space';
let robots = 'false';
let sitemapCacheTime = 6000;
let sbToken = '0vS0uwQC7Ym1Wuf2siDT6gtt';
let sbMode = 'draft';
let logBrowserErrorsInApi = 'false';
let anyDayTagToken = 'a2c3f6d0891949428b77a058d627076b';
let redisHost = '';
let redisPort = '';
let redisPassword = '';
let redisDatabase = '';
let ttlCacheMinimum = 3600;
let ttlCacheMaximum = 7200;

/** ENV Vars for production */
if (!isDev) {
  anyDayTagToken = process.env.SB_MODE || pushToNotDefined('ANYDAY_TOKEN');
  sbMode = process.env.SB_MODE || pushToNotDefined('SB_MODE');
  sbToken = process.env.SB_TOKEN || pushToNotDefined('SB_TOKEN');
  logBrowserErrorsInApi = process.env.LOG_BROWSER_IN_API || pushToNotDefined('LOG_BROWSER_IN_API');
  robots = process.env.ROBOTS || pushToNotDefined('ROBOTS');
  clerkioKey = process.env.CLERK_PUBLIC_KEY || pushToNotDefined('CLERK_PUBLIC_KEY');
  cookieBotKey = process.env.COOKIEBOT_KEY || pushToNotDefined('COOKIEBOT_KEY');
  gtagKey = process.env.GTAG_KEY || pushToNotDefined('GTAG_KEY');
  gtmKey = process.env.GTM_KEY || pushToNotDefined('GTM_KEY');
  klaviyoKey = process.env.KLAVIYO_KEY || pushToNotDefined('KLAVIYO_KEY');
  nodeLocale = process.env.NODE_LOCALE || pushToNotDefined('NODE_LOCALE');
  baseURL = process.env.PUBLIC_PATH || process.env.BASE_URL || pushToNotDefined('PUBLIC_PATH or BASE_URL');
  siteUrl = process.env.SITE_URL ? removeLastBar(process.env.SITE_URL) : pushToNotDefined('SITE_URL');
  rebuildRefreshToken = process.env.INVALIDATION_KEY || pushToNotDefined('INVALIDATION_KEY');
  sitemapCacheTime = Number(process.env.SITEMAP_CACHE || pushToNotDefined('SITEMAP_CACHE'));
  // TODO: BACKEND_BASE_URL NOT being used in production yet
  odooBaseUrl = process.env.BASE_URL;
  // odooBaseUrl = process.env.BACKEND_BASE_URL || pushToNotDefined('BACKEND_BASE_URL');
  baseDomain = process.env.BASE_DOMAIN || pushToNotDefined('BASE_DOMAIN');
  redisHost = process.env.REDIS_HOST || pushToNotDefined('REDIS_HOST');
  redisPort = process.env.REDIS_PORT || pushToNotDefined('REDIS_PORT');
  redisPassword = process.env.REDIS_PASSWORD;
  redisDatabase = process.env.REDIS_DATABASE;
  ttlCacheMinimum = Number(process.env.REDIS_TTL_CACHE_MINIMUM || pushToNotDefined('REDIS_TTL_CACHE_MINIMUM'));
  ttlCacheMaximum = Number(process.env.REDIS_TTL_CACHE_MAXIMUM || pushToNotDefined('REDIS_TTL_CACHE_MAXIMUM'));
}

if (notDefinedEnvs.length > 0) {
  throw new Error(
    `${chalk.red('Some env vars are not found!')}
     ${chalk.greenBright('› ' + notDefinedEnvs.join(' \n › '))}
     `
  );
}

export {
  redisHost,
  redisPassword,
  redisPort,
  redisDatabase,
  robots,
  clerkioKey,
  cookieBotKey,
  gtagKey,
  gtmKey,
  klaviyoKey,
  nodeLocale,
  baseURL,
  siteUrl,
  rebuildRefreshToken,
  sitemapCacheTime,
  odooBaseUrl,
  baseDomain,
  sbToken,
  sbMode,
  logBrowserErrorsInApi,
  anyDayTagToken,
  ttlCacheMinimum,
  ttlCacheMaximum
};
