import { Plugin } from "@nuxt/types";
declare module "vue/types/vue" {
  interface Vue {
    $transformStoryBlockImage(imageUrl: string, options?: string): string;
  }
}
declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $transformStoryBlockImage(imageUrl: string, options?: string): string;
  }
  interface Context {
    $transformStoryBlockImage(imageUrl: string, options?: string): string;
  }
}

const getStoryBlockImage: Plugin = (context, inject) => {
  inject("transformStoryBlockImage", (imageUrl: string, options?: string) => {
    if (!imageUrl) return "";
    if (!options) return imageUrl;

    const imageServiceUrl = "https://img2.storyblok.com/";
    const imagePath = imageUrl.replace("https://a.storyblok.com", "");

    return imageServiceUrl + options + imagePath;
  });
};

export default getStoryBlockImage;
