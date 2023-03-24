import { shallowMount, mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createI18n } from 'vue-i18n';
import sinon from 'sinon';
import AntVue, {
  Table, Tag, Row, Col, Input, Button,
} from 'ant-design-vue';

import DataTableAnt from '../DataTableAnt.vue';

const i18n = createI18n({ locale: 'en', messages: { en: { message: { inputPlaceholder: 'Input', clear: 'Clear' } } } });

describe('DataTableAnt', () => {
  it('empty table will be displayed with on props passed', () => {
    const store = createStore({
      getters: {
        requestIsPending: () => false,
      },
    });

    const wrapper = shallowMount(DataTableAnt, {
      store,
      global: {
        plugins: [AntVue, store],
        stubs: {
          'a-table': Table,
        },
      },
    });
    expect(wrapper.find('.dataTable').element.style.overflow).toBe('visible');
    wrapper.unmount();
  });

  it('no table will be displayed if request is in pending state', () => {
    const store = createStore({
      getters: {
        requestIsPending: () => true,
      },
    });

    const wrapper = shallowMount(DataTableAnt, {
      store,
      global: {
        plugins: [AntVue, store],
        stubs: {
          'a-table': Table,
        },
      },
    });
    expect(wrapper.find('.dataTable').element.style.overflow).toBe('hidden');
    wrapper.unmount();
  });

  it.skip('will react to the changes', () => { // TODO: write new filter tests
    expect.assertions(1);

    const clock = sinon.useFakeTimers();
    const store = createStore({
      getters: {
        requestIsPending: () => false,
      },
    });
    const getDataMock = jest.fn();
    const onLocalFilterMock = jest.fn();
    const props = {
      fields: [
        {
          key: 'name',
          dataIndex: 'name',
          title: 'Name',
          visibleInOverview: true,
        },
        {
          key: 'surname',
          dataIndex: 'surname',
          title: 'Surname',
          visibleInOverview: true,
        },
        {
          key: 'is-admin',
          dataIndex: 'is-admin',
          title: 'Is admin',
          visibleInOverview: true,
          scopedSlots: {
            customRender: 'badge',
          },
        },
      ],
      items: [
        {
          name: 'Ivan',
          key: 'Ivan',
          surname: 'Ivanoff',
          'is-admin': 'No',
        },
        {
          name: 'Andrzej',
          key: 'Andrzej',
          surname: 'Kowalski',
          'is-admin': 'No',
        },
        {
          name: 'John',
          key: 'John',
          surname: 'Dou',
          'is-admin': 'Yes',
        },
      ],
      rows: 3,
      localFilterEnabled: true,
      localFilterTerm: 'user',
      onLocalFilter: onLocalFilterMock,
      getData: getDataMock,
      visibleInOverview: true,
    };

    const wrapper = mount(DataTableAnt, {
      props,
      global: {
        plugins: [store, i18n],
        stubs: {
          'a-table': Table,
          'a-tag': Tag,
          'a-row': Row,
          'a-col': Col,
          'a-input-search': Input.Search,
          'a-button': Button,
        },
      },
    });
    const inputComponent = wrapper.findComponent(Input.Search);

    wrapper.findComponent(Table).vm.$emit('change', { current: 1 });
    expect(getDataMock).toHaveBeenCalledWith(1);

    inputComponent.vm.$emit('change', { target: { value: 'fakeSearchTerm' } });
    clock.tick(500);
    expect(onLocalFilterMock).toHaveBeenCalledWith('fakeSearchTerm');

    inputComponent.findComponent(Button).vm.$emit('mousedown', { stopPropagation: () => null });
    expect(onLocalFilterMock).toHaveBeenCalledTimes(2);

    wrapper.unmount();
    clock.restore();
  });
});
