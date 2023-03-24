import { shallowMount, mount } from '@vue/test-utils';
import AntVue, { Row, Col, List } from 'ant-design-vue';
import VerticalListAnt from '../VerticalListAnt.vue';

describe('VerticalListAnt', () => {
  it('empty list will be displayed with on props passed', () => {
    expect.assertions(1);

    const wrapper = shallowMount(VerticalListAnt, {
      global: {
        plugins: [AntVue],
        stubs: {
          'a-list': List,
        },
      },
    });

    expect(wrapper.findComponent(List)).toBeTruthy();
    wrapper.unmount();
  });

  it('will build list of items if correct prop was passed', () => {
    expect.assertions(1);

    const props = {
      dataSource: [{
        key: 'first',
        value: 'First item value',
      }, {
        key: 'second',
        value: 'Second item value',
      }],
    };
    const wrapper = mount(VerticalListAnt, {
      props,
      global: {
        stubs: {
          'a-row': Row,
          'a-col': Col,
          'a-list': List,
          'a-list-item': List.Item,
        },
      },
    });

    expect(wrapper.findAllComponents(List.Item).length).toBe(props.dataSource.length);
    wrapper.unmount();
  });
});
