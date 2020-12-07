import React from 'react';
import renderer from "react-test-renderer";
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationMenu from '../Components/NavigationMenu'

configure({ adapter: new Adapter() });

describe('NaigationMenu Component', () => {
    it("should match snapshot", () => {
        const tree = renderer.create(<NavigationMenu />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render an HashRouter.', () => {
        const wrapper = mount(<NavigationMenu />);
        expect(wrapper.find('HashRouter').exists()).toEqual(true);
    });

    it("should open and close the drawer.", () => {
        const spy = jest.spyOn(console, 'log');
        const wrapper = shallow(<NavigationMenu />);

        const icon = wrapper.find('#Open');
        expect(icon.exists()).toEqual(true);
        icon.simulate('click');
        expect(spy).toBeCalledWith('openDrawer Test');

        const drawer = wrapper.find('#Close');
        expect(drawer.exists()).toEqual(true);
        drawer.simulate('click');
        expect(spy).toBeCalledWith('closeDrawer Test');
    });
});