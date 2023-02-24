<template>
  <SfButton
    :class="classes"
    v-bind="$props"
    @click="$emit('click')"
  >
    <span style="grid-column-start: 2"><slot /> </span>
    <div
      v-show="loading"
      class="lds-ring"
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  </SfButton>
</template>

<script lang="ts">
import { SfButton } from '@storefront-ui/vue';
import { defineComponent, PropType, ComputedRef, computed } from '@nuxtjs/composition-api';
import { ButtonColor, ButtonShape, ButtonSize, ButtonType } from '~/green-api/types';
export default defineComponent({
  components: {
    SfButton
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    link: {
      type: [String, Object],
      default: null
    },
    styleType: {
      type: String as PropType<ButtonType>,
      default: ButtonType.Primary
    },
    shape: {
      type: String as PropType<ButtonShape>,
      default: ButtonShape.Round
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: ButtonSize.Small
    },
    color: {
      type: String as PropType<ButtonColor>,
      default: ButtonColor.Green
    }
  },
  emits: ['click'],
  setup (props) {
    const typeClasses : ComputedRef<string> = computed(() => {
      if (props.styleType === ButtonType.Primary && props.shape === ButtonShape.Round && props.color === ButtonColor.Green) {
        return 'bg-pine-primary-dark-green__with-hover big-text font-semibold';
      }
      if (props.styleType === ButtonType.Primary && props.shape === ButtonShape.Rectangle && props.color === ButtonColor.Green) {
        return 'bg-pine-primary-dark-green__with-hover';
      }
      if (props.styleType === ButtonType.Primary && props.color === ButtonColor.Black) {
        return 'bg-primary-black big-text font-semibold';
      }
      if (props.styleType === ButtonType.Tertiary && props.color === ButtonColor.Grey) {
        return 'btn-navigate';
      }

      switch (props.styleType) {
        case ButtonType.Secondary: return 'bg-fern-primary-medium-green__with-hover';
        default: break;
      }
    });

    const classes : ComputedRef<string> =
      computed(() => `btn ${typeClasses.value} ${props.shape.toLowerCase()} ${props.size.toLowerCase()} cursor-pointer`);

    return {
      classes
    };
  }
});
</script>

<style lang="scss" scoped>
$button-height: 50px;

.small {
  height: var($button-height);
  width: 168px;
  @include for-mobile {
    height: 52px;
    width: 216px;
  }
}
.medium {
  height: var($button-height);
  width: 280px;
}

.large {
  height: var($button-height);
  width: 400px;
  @include for-mobile {
    width: 343px;
  }
}
.max {
  height: var($button-height);
  width: 100%;
}

.big-text {
  font-size: 16px !important;
}
.round {
  border-radius: 100px;
}
.btn{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-family: var(--font-family--primary);
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    padding: 16x 32px 16px 32px;
    @include for-mobile {
      padding: 18px 52px 18px 52px;
    }
}
.btn:active {
    --button-box-shadow: none;
    background: var(--_c-greenmind-fern-secondary-medium-green)
      radial-gradient(
        circle,
        transparent 40%,
        var(--_c-greenmind-mint-secondary-light-green) 1%
      )
      center/15000%;
    --button-transition: background 0s;
    background-size: 100%;
}
.bg-tertiary-grey:active {
  --button-box-shadow: none;
  background: var(--_c-greenmind-dark-grey-accent)
      radial-gradient(
        circle,
        transparent 40%,
        var(--_c-greenmind-light-grey-accent) 1%
      )
      center/15000% ;
    --button-transition: background 0s;
    background-size: 100%;

}

.is-disabled--button {
  color: var(--_c-greenmind-dark-grey-accent);
  background: var(--_c-greenmind-light-grey-accent);
}

.lds-ring {
  margin-left: auto;
  display: inline-block;
  position: relative;

  width: 16px;
  height: 16px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  //margin: 0px 6px 0px 11px;
  border: 4px solid var(--_c-greenmind-pine-primary-dark-green);
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--_c-greenmind-pine-primary-dark-green) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
