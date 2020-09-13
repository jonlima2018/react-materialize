import React from 'react';
import { shallow, mount } from 'enzyme';
import Tabs from '../src/Tabs';
import Tab from '../src/Tab';
import mocker from './helper/new-mocker';

describe('Tabs', () => {
  let wrapper;
  let wrapperWithIdx;
  const tabsInitMock = jest.fn();
  const tabInstanceDestroyMock = jest.fn();
  const tabsMock = {
    init: (el, options) => {
      tabsInitMock(options);
      return {
        destroy: tabInstanceDestroyMock
      };
    }
  };
  const restore = mocker('Tabs', tabsMock);

  const options = {
    duration: 400,
    onShow: jest.fn(),
    swipeable: true,
    responsiveThreshold: 2
  };

  wrapper = shallow(
    <Tabs>
      <Tab title="one">One</Tab>
      <Tab title="Two">Two</Tab>
    </Tabs>
  );

  wrapperWithIdx = shallow(
    <Tabs>
      <Tab idx={'tab-one'} title="one">
        One
      </Tab>
      <Tab idx={'tab-two'} title="Two">
        Two
      </Tab>
    </Tabs>
  );

  afterAll(() => {
    restore();
  });

  beforeEach(() => {
    tabsInitMock.mockClear();
  });

  test('should create list of Tab items', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should create list of Tab items with Idx', () => {
    expect(wrapperWithIdx).toMatchSnapshot();
  });

  describe('with options', () => {
    beforeEach(() => {
      wrapper = mount(
        <Tabs options={options}>
          <Tab title="one">One</Tab>
          <Tab title="Two">Two</Tab>
        </Tabs>
      );
      wrapperWithIdx = mount(
        <Tabs options={options}>
          <Tab idx={'tab-one'} title="one">
            One
          </Tab>
          <Tab idx={'tab-two'} title="Two">
            Two
          </Tab>
        </Tabs>
      );
    });

    test('initializes Tabs with options', () => {
      expect(tabsInitMock).toHaveBeenCalledWith(options);
    });
  });

  describe('when unmounted', () => {
    beforeEach(() => {
      tabInstanceDestroyMock.mockClear();
      wrapper.unmount();
      wrapperWithIdx.unmount();
    });

    test('should be destroyed', () => {
      expect(tabInstanceDestroyMock).toHaveBeenCalled();
    });
  });
});
