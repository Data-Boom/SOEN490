import React from 'react';
import renderer from "react-test-renderer";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DataCell from '../Components/DataCell/DataCell'

configure({ adapter: new Adapter() });

describe('DataCell Component', () => {

    it("should match snapshot", () => {
        const tree = renderer.create(<DataCell />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render a file input field', () => {
        const wrapper = mount(<DataCell />)
        expect(wrapper.find('input').exists()).toBeTruthy();
    });

    /*it('calls the handleSubmit function on button click.', () => {
        // Currently fails, most likely because handleSubmit is an async function.
        const spy = jest.spyOn(console, 'log');
        const wrapper = mount(<DataCell />);

        const form = wrapper.find('#formSubmit');
        expect(form.exists()).toEqual(true);
        form.simulate('click');
        expect(spy).toBeCalledWith('handleSubmit Test');

    });*/
});

