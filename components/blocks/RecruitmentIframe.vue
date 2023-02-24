<template>
  <div id="job-iframe">
    <iframe
      :src="data.String"
      height="600px"
      width="100%"
      title="jobs"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'RecruitmentIframe',
  props: {
    data: {
      default: null
    }
  }
});
</script>
