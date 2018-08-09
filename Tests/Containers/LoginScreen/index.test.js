import LoginScreen from '../../../App/Containers/LoginScreen/index.js'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme'
import enzymeToJson from 'enzyme-to-json';
import * as mockCamera from '../../../__mocks__/react_native_camera.js'
import * as mockCard from '../../../__mocks__/react_native_card.js'

jest.mock('react-native-camera', () => mockCamera);
jest.mock('react-native-awesome-card-io', ()=> mockCard); 

it('renders correctly', () => {
  const tree = shallow(<LoginScreen/>);
    console.log(tree);
});

/* describe('LoginScreen', ()=> {
it('renders correctly',()=>
  {let wrapper = renderer.create(<Component/>).toJSON;
    console.log(wrapper);
    expect(wrapper).toMatchSnapshot();  
    });});
 */

    
