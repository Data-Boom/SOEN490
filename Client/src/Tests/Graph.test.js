import React from 'react';
import renderer from "react-test-renderer";
import { shallow } from 'enzyme';
import Graph from '../Components/Graph/Graph'

describe('Graph Component', () => {
    it("should match snapshot", () => {
        const tree = renderer.create(<Graph />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    /*it("should change the xscale upon toggle", () => {

    });

    it("should change the xscale upon toggle", () => {

    });*/
});