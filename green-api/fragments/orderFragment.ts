const coreProductAttribs = `
  id
  name
  image
  imageFilename
  description
  smallImage
  googleAnalytics
  slug
  qty
  status
  price
  websiteSubtitle
`;

module.exports = `
order {
  id
  name
  amountTotal
  amountTax
  amountDelivery
  amountDiscounts
  amountGiftCards
  amountSubtotal
  orderUrl
  stage
  totalCount
  lastTransaction{
    payment{
      name
      amount
      paymentReference
    }
    acquirer
    state
    amount
  }
  websiteOrderLine {
    id
    name
    discount
    discountFixedPrice
    accessories{
      name
      priceTotal
      id
      product{
        id
      }
    }
    product {
      ${coreProductAttribs}
      combinationInfoVariant
      manufacturerName
      accessoryProducts{
          id
          name
          combinedName
          description
          image
          price
          combinationInfoVariant
          isInStock
      }
      
    }
    giftCard {
      id
    }
    coupon {
      id
    }
    quantity
    priceTotal
  }
  accessoryLines{
    id
    name
    product{
      id
    }
  }
  orderLines {  
    id
    name
    product {
      ${coreProductAttribs}
    }
    quantity 
    priceTotal
    giftCard {
      id
    }
    coupon {
      id
    }
  }
  partnerInvoice {
    id
    name
    street
    city
    phone
    zip
    country {
      id
    }
    state {
      id
    }
  }
  partner{
    id
    name
    phone
    street
    email
    city
    zip
    company{
      id
      name
    }
  }
  partnerShipping {
    id
    name
    street
    city
    phone
    zip
    country {
      id
    }
    state {
      id
    }
  }
  shippingMethod{
    id
    name
    price
  }
}
`;
