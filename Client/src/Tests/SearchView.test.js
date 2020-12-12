import React from 'react';
import renderer from "react-test-renderer";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchView from '../Views/SearchView'

configure({ adapter: new Adapter() });

describe('App', () => {
    const wrapper = mount(<SearchView />)

    it("should match snapshot", () => {
        const tree = renderer.create(<SearchView />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render the Search component.', () => {
        expect(wrapper.find('Search').exists()).toEqual(true);;
    });
});
