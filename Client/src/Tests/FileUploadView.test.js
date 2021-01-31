import { configure, mount } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
import FileUploadView from '../Components/FileUpload/FileUploadView'
import React from 'react'
import renderer from "react-test-renderer"

configure({ adapter: new Adapter() })

describe('App', () => {
    const wrapper = mount(<FileUploadView />)

    it("should match snapshot", () => {
        const tree = renderer.create(<FileUploadView />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('should render the DataCell component.', () => {
        expect(wrapper.find('DataCell').exists()).toEqual(true)
    })
})
