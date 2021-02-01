import { configure, mount } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
import DataCell from '../Components/FileUpload/DataCell'
import React from 'react'
import renderer from "react-test-renderer"

configure({ adapter: new Adapter() })

describe('DataCell Component', () => {

    it("should match snapshot", () => {
        const tree = renderer.create(<DataCell />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('should render a file input field', () => {
        const wrapper = mount(<DataCell />)
        expect(wrapper.find('input').exists()).toEqual(true)
    })

    it('should render a way to submit the form.', () => {
        const wrapper = mount(<DataCell />)

        const form = wrapper.find('#formSubmit')
        expect(form.exists()).toEqual(true)
    })
})

