import React from 'react';
import renderer from "react-test-renderer";
import { shallow } from 'enzyme';
import Search from '../Components/Search/Search'

describe('Search Component', () => {
    it("should match snapshot", () => {
        const tree = renderer.create(<Search />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});