import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';

import Login from '../index';

configure({ adapter: new Adapter() });

describe('Login', () => {
    it('should display the account balance', () => {
      const wrapper = mount(<Login />);
      expect(wrapper.text()).to.include(<input/>);
    });
  
   
  });