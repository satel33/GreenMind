/* eslint-disable @typescript-eslint/ban-types */
import { AttributeValue, Cart, Category, GraphQlProductParam, Order, OrderLine, Partner, PaymentTransaction, Product } from '@vue-storefront/odoo-api';

export enum PaymentTransactionState {
    Draft = 'Draft',
    Pending = 'Pending',
    Authorized = 'Authorized',
    Confirmed = 'Confirmed',
    Canceled = 'Canceled',
    Error = 'Error'
}

export enum ButtonType {
    Primary = 'Primary',
    Secondary = 'Secondary',
    Tertiary = 'Tertiary',
}

export enum ButtonShape {
    Round = 'Round',
    Rectangle = 'Rectangle',
}

export enum ButtonSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    Max = 'Max',
}
export enum ButtonColor {
    Green = 'Green',
    Black = 'Black',
    Grey = 'Grey',
}

export interface CreateUpdatePartnerInput {
    subscribeNewsletter?: boolean
    name: string
    email: string
}

export interface ApplyGiftCardInput {
    promo: string
}
export interface ApplyCouponInput {
    promo: string
}

export interface GiftCard {
    id: number;
}

export interface Coupon {
    id: number;
}

export interface CombinationInfo {
    product_id: number;
    product_template_id: number;
    display_name: string;
    display_image: true;
    price: number;
    list_price: number;
    has_discounted_price: boolean;
    discount: number;
    discount_perc: number;
    grade_name: string;
    slug: string;
    stock_qty: number;
}
export interface CombinationInfoGrade {
    grades: CombinationInfo[];
}

export interface GoogleAnalytics {
    item_id: number;
    currency: string;
    item_variant: string;
    item_color: string;
    item_storage: string;
    item_brand: string;
    item_category: string;
    item_category2: string;
    item_category3: string;
    item_category4: string;
}

export interface GreenCategory extends Category {
    seoTitleTag: string;
    seoMetaDescription: string;
    seoDescription: string;

}

export interface GreenProduct extends Product {
    combinedName?: string;
    jsonLdBreadcrumb?: string;
    isInStock?: boolean;
    inStoreOnly?: boolean;
    jsonLd?: any;
    qty?: number;
    variantAttributeValues?: AttributeValue[];
    schemaAttributeValues?: AttributeValue[];
    websiteSubtitle?: string;
    websiteTagUrl?: string;
    googleAnalytics?: GoogleAnalytics;
    accessoryProducts: GreenProduct[];
    manufacturerName?: string;
    imageFilename?: string;
    combinationInfo?: CombinationInfo;
    combinationInfoGrade?: CombinationInfoGrade;
    combinationInfoVariant?: CombinationInfo;
}
export interface GreenOrderLine extends OrderLine {
    product?: GreenProduct;
    priceTotal?: number;
    accessories?: GreenOrderLine[]
    giftCard?: GiftCard
    coupon?: Coupon
    discount?: number
    discountFixedPrice?: number
}

export interface GreenPaymentTransaction extends PaymentTransaction {
    state?: PaymentTransactionState
}

export interface GreenPartner extends Partner {
    company?: Partner
}
export interface GreenOrder extends Order {
    totalCount?: number,
    amountSubtotal?: number,
    lastTransaction?: GreenPaymentTransaction,
    accessoryLines?: GreenOrderLine[];
    orderLines?: GreenOrderLine[];
    websiteOrderLine?: GreenOrderLine[];
    partner?: GreenPartner;
    amountDiscounts: number;
    amountGiftCards: number;
}

export interface GreenCart extends Cart {
    order: GreenOrder;
}

export interface GreenGraphQlProductParam extends GraphQlProductParam {
    accessoryToIds: number[]
}

export declare type GreenGraphQlAddMultipleProductsParams = {
    products: GreenGraphQlProductParam[];
};

export declare type GetStockInput = {
  productId: number
}

export interface Image {
    name: string
    image: string
}

export interface BannerImage extends Image {
    url: string
}

export interface ISbLinks {
  [key: string]: {
    id: number;
    slug: string;
    name: string;
    is_folder: boolean;
    parent_id: number;
    published: boolean;
    path: string;
    position: string;
    uuid: string;
    is_startpage: boolean;
    real_path: string;
  }
}

export interface IGAPurchaseInfo {
    transaction_id: string;
    affiliation: string;
    value: number;
    tax: number;
    shipping: number;
    currency?: string;
    coupon?: string;
  }
export interface IGAProduct {
    item_id: number;
    item_name: string;
    affiliation?: string;
    coupon?: string;
    currency?: string;
    discount?: number;
    index?: number;
    item_brand?: string;
    item_category?: string;
    item_category2?: string;
    item_category3?: string;
    item_category4?: string;
    item_category5?: string;
    item_list_id?: string;
    item_list_name?: string;
    item_variant?: string;
    location_id?: string;
    price?: number;
    quantity?: number;
    item_addon?: boolean;
  }

export interface IGAECommerce {
    currency: string;
    value: number;
    coupon?: string;
    items: IGAProduct[];
  }
export interface IGADataLayer {
    event: string;
    ecommerce: IGAECommerce;
    debug?: boolean;
  }

export interface IGACart {
    products: GreenProduct[];
    accessories: GreenOrderLine[];
    orderLines: OrderLine[];
  }

export enum GA_EVENTS {
    addPersonalInfo = 'add_personal_info',
    addPaymentInfo = 'add_payment_info',
    addShippingInfo = 'add_shipping_info',
    beginCheckout = 'begin_checkout',
    removeFromCart = 'remove_from_cart',
    addToCart = 'add_to_cart',
    purchase = 'purchase',
    viewItem = 'view_item',
    viewItemList = 'view_item_list',
    viewCart = 'view_cart',
    selectItem = 'select_item',
  }

export interface CallToActionItem {
    imageUrl: string,
    upperTitle: string,
    title: string,
    text: string,
    textClass: string
    buttonText: string
    hasBackgroundImage: boolean
}

export interface WebsiteHomepageHeroBanner {
  title?: string
  imageDesktop?: string
  imageMobile?: string
  buttonText?: string
  buttonUrl?: string
  titleColor?: string
}

export interface WebsiteHomepageBanner {
  title?: string
  subtitle?: string
  miniTitle?: string
  imageMobile?: string
  imageDesktop?: string
  buttonText?: string
  buttonUrl?: string
  size?: string
  titleColor?: string
}

export interface WebsiteHomepageHighlight {
  title?: string
  image?: string
}

export interface WebsiteHomepageNotice {
  title?: string
  image?: string
}

export interface WebsiteHomepagePopularTitle {
  title?: string
}

export interface WebsiteHomepage {
  websiteHomepagePopularTitle: WebsiteHomepagePopularTitle[]
  websiteHomepageHeroBanner: WebsiteHomepageHeroBanner[]
  websiteHomepageHighlight?: WebsiteHomepageHighlight[]
  websiteHomepageBanner?: WebsiteHomepageBanner[]
  websiteHomepageNotice?: WebsiteHomepageNotice[]
}

export interface WebsiteMenu {
  name?: string
  url?: string
}

export interface WebsiteMenuItem {
  name?: string
  url?: string
  isFooter?: boolean
  sequence?: number
}

export interface WebsiteMenuImage {
  title?: string
  subtitle?: string
  tag?: string
  image?: string
  sequence?: number
  buttonText?: string
  buttonUrl?: string
  textColor?: string
}

export interface WebsiteMegaMenu {
  name?: string
  url?: string
  isFooter?: boolean
  sequence?: number
  parent?: WebsiteMenuItem
  childs?: WebsiteMenuItem[]
  images?: WebsiteMenuImage[]
}

export type WebsiteFooter = WebsiteMenu
export interface WebsiteLayout {
  websiteMenu: WebsiteMenu[]
  websiteMegaMenu: WebsiteMegaMenu[]
  websiteFooter: WebsiteMegaMenu
}

