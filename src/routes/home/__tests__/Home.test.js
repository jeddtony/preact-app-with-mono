import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';

import Home from '../index';

configure({ adapter: new Adapter() });

describe('Home', () => {
    it('should display the account balance', () => {
      const wrapper = mount(<Home />);
      expect(wrapper.text()).to.include('Account Balance');
    });
  
   
  });