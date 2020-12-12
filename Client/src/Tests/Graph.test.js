import React from 'react';
import renderer from "react-test-renderer";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Graph from '../Components/Graph/Graph'

configure({ adapter: new Adapter() });

describe('Graph Component', () => {
    it("should match snapshot", () => {
        const tree = renderer.create(<Graph />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should change the xscale upon toggle", () => {
        const spy = jest.spyOn(console, 'log');
        const wrapper = shallow(<Graph />);

        const button = wrapper.find('#btn1');
        expect(button.exists()).toEqual(true);
        button.simulate('click');
        expect(spy).toBeCalledWith('Changed X: false');
    });

    it("should change the xscale upon toggle", () => {
        const spy = jest.spyOn(console, 'log');
        const wrapper = shallow(<Graph />);

        const button = wrapper.find('#btn2');
        expect(button.exists()).toEqual(true);
        button.simulate('click');
        expect(spy).toBeCalledWith('Changed Y: false');
    });
});

/*describe('useEffect Test', () => {
    //Currently does not work.
    let props;
    let wrapper;
    let useEffect;

    let mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    }

    beforeEach(() => {
        useEffect = jest.spyOn(React, "useEffect");
    });

    props = {
        getScale: jest.fn().mockResolvedValue(false)

    };

    mockUseEffect();
    mockUseEffect();
    wrapper = shallow(<Graph {...props} />)

    describe("on start", () => {
        it("calls the getScale function", () => {
            expect(props.getScale).toHaveBeenCalled();
        })
    })
});*/