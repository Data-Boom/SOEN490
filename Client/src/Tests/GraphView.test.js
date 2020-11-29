import React from 'react';
import renderer from "react-test-renderer";
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GraphView from '../Views/GraphView'

configure({ adapter: new Adapter() });

describe('GraphView Component', () => {
    it("should match snapshot", () => {
        const tree = renderer.create(<GraphView />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('calls the handleRequest and loadOptionsList function on button click.', () => {
        const spy = jest.spyOn(console, 'log');
        const wrapper = mount(<GraphView />, { attachTo: document.body });

        const button = wrapper.find('button#handleRequest');
        expect(button.exists()).toEqual(true);
        button.simulate('click');
        expect(spy).toBeCalledWith('handleRequest Test');
        expect(spy).toBeCalledWith('loadOptionsList Test');
    });

});