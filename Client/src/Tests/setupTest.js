import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect'

enzyme.configure({ adapter: new Adapter() });