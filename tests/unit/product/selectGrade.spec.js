import 'regenerator-runtime/runtime';
import { shallowMount } from '@vue/test-utils';
import SelectGrade from '../../../components/Product/SelectGrade';
import productAttributes from './__mocks__/productAttributes.json';

describe('SelectGrade.vue', () => {
  test('check gradeAttributes computed', () => {
    const wrapper = shallowMount(SelectGrade, {
      propsData: { productAttributes, baseProductPrice: 1 }
    });

    expect(wrapper.props().productAttributes).toEqual(productAttributes);
    expect(wrapper.vm.gradeAttributes).toHaveLength(4);
  });

  test('event pop if hit grade span', async () => {
    const wrapper = shallowMount(SelectGrade, {
      propsData: { productAttributes, baseProductPrice: 1 }
    });

    const secondSpan = await wrapper.findAll('.price-wrap').at(1);

    await secondSpan.trigger('click');

    expect(wrapper.emitted().update).toBeTruthy();
    expect(wrapper.emitted().update).toEqual([[{ Grade: 23443 }]]);

  });
});
