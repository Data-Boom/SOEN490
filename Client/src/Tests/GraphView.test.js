import React from 'react';
import renderer from "react-test-renderer";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GraphView from '../Views/GraphView'

configure({ adapter: new Adapter() });

describe('GraphView Component', () => {
    it("should match snapshot", () => {
        const tree = renderer.create(<GraphView />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render a button.', () => {
        const wrapper = mount(<GraphView />)
        expect(wrapper.find('button').exists()).toBeTruthy();
    });

    it('calls the handleRequest function on button click.', () => {
        const wrapper = shallow(<GraphView />);
        const mockHandleRequest = wrapper.instance().handleClick();
    });

});