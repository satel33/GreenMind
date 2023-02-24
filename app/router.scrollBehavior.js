/* eslint-disable func-names */
export default function(to, from, savedPosition) {
  const nuxt = window.$nuxt;
  if (to.name === 'product' && from.name === 'product' && nuxt.$device.isMobile) {
    return { x: 28, y: 250, behavior: 'smooth'};
  }

  return (
    savedPosition || {
      x: 0,
      y: 0
    }
  );

}
