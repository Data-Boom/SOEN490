import React from 'react';
import renderer from "react-test-renderer";
import { shallow } from 'enzyme';
import NavigationMenu from '../Components/NavigationMenu'

describe('NaigationMenu Component', () => {
    it("should match snapshot", () => {
        const tree = renderer.create(<NavigationMenu />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});