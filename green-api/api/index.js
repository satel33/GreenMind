const createUpdatePartner = require('./createUpdatePartner');
const getPaymentAcquirerList = require('./getPaymentAcquirerList');
const applyGiftCard = require('./applyGiftCard');
const applyCoupon = require('./applyCoupon');
const cartLoadWithUpdate = require('./cartLoadWithUpdate');
const makeGiftCardPayment = require('./makeGiftCardPayment');
const adyenOpenTransaction = require('./adyenOpenTransaction');
const adyenAcquirerInfo = require('./adyenAcquirerInfo');
const adyenPaymentMethods = require('./adyenPaymentMethods');
const adyenPaymentDetails = require('./adyenPaymentDetails');
const adyenMakeDirectPayment = require('./adyenMakeDirectPayment');
const adyenTransactionInfo = require('./adyenTransactionInfo');
const anyPayPaymentMakeExternal = require('./anyPayPaymentMakeExternal');
const getStock = require('./getStock');
const log = require('./log');
const getWebsiteInfo = require('./getWebsiteInfo');
const getWebsiteHomePageData = require('./getWebsiteHomePageData');
const getWebsiteLayoutData = require('./getWebsiteLayoutData');
const getClerkPopularProducts = require('./getClerkPopularProducts');

module.exports = {
  adyenAcquirerInfo,
  anyPayPaymentMakeExternal,
  adyenPaymentMethods,
  adyenPaymentDetails,
  adyenMakeDirectPayment,
  adyenTransactionInfo,
  createUpdatePartner,
  getPaymentAcquirerList,
  applyGiftCard,
  adyenOpenTransaction,
  applyCoupon,
  makeGiftCardPayment,
  cartLoadWithUpdate,
  getStock,
  log,
  getWebsiteInfo,
  getWebsiteHomePageData,
  getWebsiteLayoutData,
  getClerkPopularProducts
};
