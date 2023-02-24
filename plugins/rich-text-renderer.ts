import Vue from 'vue';
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer';
import SbLink from '../components/blocks/SbLink.vue';

Vue.use(VueRichTextRenderer, {
  resolvers: {
    blocks: {
      SbLink: SbLink
    }
  }
});
