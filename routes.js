const path = require('path');
const fsExtra = require('fs-extra');
import i18nRoutes from './i18nRoutes';

export function getRoutes(localeIndex, themeDir = __dirname) {
  let categoriesPrefixes = fsExtra.readJsonSync('./customRoutes/categories.json');
  categoriesPrefixes = categoriesPrefixes.filter((item) => item !== '/category');
  const categoryRoutes = categoriesPrefixes.map((item) => ({
    path: item,
    meta: {
      productPage: true
    },
    component: path.resolve(themeDir, 'pages/Category.vue')
  }));

  const productRoutes = categoriesPrefixes.map((item) => ({
    path: item + '/:slug+',
    component: path.resolve(themeDir, 'pages/Product.vue')
  }));

  return [
    {
      name: 'dynamicPage',
      path: '/*',
      component: path.resolve(themeDir, 'pages/DynamicPage.vue')
    },
    {
      name: 'home',
      path: '/',
      component: path.resolve(themeDir, 'pages/Home.vue')
    },
    {
      name: 'cart',
      path: '/cart',
      component: path.resolve(themeDir, 'pages/Cart/Cart.vue')
    },
    ...productRoutes,
    ...categoryRoutes,
    // {
    //   name: 'product',
    //   path: '/product/:slug_2+',
    //   component: path.resolve(themeDir, 'pages/Product.vue'),
    //   alias: productPrefixes.map(alias => `${alias}/:slug_2+`)
    // },
    // {
    //   name: 'category',
    //   path: '/category',
    //   component: path.resolve(themeDir, 'pages/Category.vue'),
    //   alias: categoriesPrefixes.map(alias => `${alias}`)
    // },
    {
      name: 'my-account',
      path: '/my-account',
      component: path.resolve(themeDir, 'pages/MyAccount.vue')
    },
    {
      name: 'checkout',
      path: '/checkout',
      component: path.resolve(themeDir, 'pages/Checkout.vue'),
      children: [
        {
          path: 'personaldetails',
          name: 'personaldetails',
          component: path.resolve(themeDir, 'pages/Checkout/Personaldetails.vue')
        },
        {
          path: 'shipping',
          name: 'shipping',
          component: path.resolve(themeDir, 'pages/Checkout/Shipping.vue')
        },
        {
          path: 'billing',
          name: 'billing',
          component: path.resolve(themeDir, 'pages/Checkout/Billing.vue')
        },
        {
          path: 'revieworder',
          name: 'revieworder',
          component: path.resolve(themeDir, 'pages/Checkout/Revieworder.vue')
        },
        {
          path: 'payment',
          name: 'payment',
          component: path.resolve(themeDir, 'pages/Checkout/Payment.vue')
        }
      ]
    },
    {
      name: 'successPaymentResponse',
      path: `${i18nRoutes.successPaymentResponse[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Checkout/SuccessPaymentResponse.vue')
    },
    {
      name: 'failedPaymentResponse',
      path: `${i18nRoutes.failedPaymentResponse[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Checkout/FailedPaymentResponse.vue')
    },
    {
      name: 'discountCampaign',
      path: `${i18nRoutes.discountCampaign[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/DiscountCampaigns.vue')
    }
  ];
}
