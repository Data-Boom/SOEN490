import React from 'react';
import renderer from "react-test-renderer";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from '../Components/Search/Search'
configure({ adapter: new Adapter() });

describe('Search Component', () => {
    it("should match snapshot", () => {
        const tree = renderer.create(<Search />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Should render the form containing the search arguments, results, etc.", () => {
        const spy = jest.spyOn(console, 'log');
        const wrapper = mount(<Search />);
        expect(spy).toBeCalledWith('rendered form');
    });
});