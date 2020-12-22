import '@testing-library/jest-dom/extend-expect'

import * as Adapter from 'enzyme-adapter-react-16'
import * as enzyme from 'enzyme'

enzyme.configure({ adapter: new Adapter() })