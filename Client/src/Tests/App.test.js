import React from 'react';
import renderer from "react-test-renderer";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App'

configure({ adapter: new Adapter() });

describe('App', () => {
  const wrapper = mount(<App />)

  it("should match snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should return a div', () => {
    expect(wrapper.find('div').exists()).toEqual(true);;
  });
});
