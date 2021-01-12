import { configure, mount } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
import GraphView from '../Components/Graph/GraphView'
import React from 'react'
import renderer from "react-test-renderer"

configure({ adapter: new Adapter() })

describe('GraphView Component', () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<GraphView />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('calls the handleRequest and loadOptionsList function on button click.', () => {
    const spy = jest.spyOn(console, 'log')
    //Since the loadOptionsList affects the html of the page, it is necessary to attach to the document body,
    const wrapper = mount(<GraphView />, { attachTo: document.body })

    const button1 = wrapper.find('button#handleRequest')
    expect(button1.exists()).toEqual(true)
    button1.simulate('click')
    expect(spy).toBeCalledWith('handleRequest Test')
    expect(spy).toBeCalledWith('loadOptionsList Test')

    // This second part of the test verifies the functionality of the deleteDataset function.
    const button2 = wrapper.find('button#delete-dataset-btn')
    expect(button2.exists()).toEqual(true)
    button2.simulate('click')
    expect(spy).toBeCalledWith('deleteDataset Test')
  })



})