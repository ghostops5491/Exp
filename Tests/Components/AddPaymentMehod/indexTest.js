import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import AddPaymentModal from '../../../App/Components/AddPaymentMethod/index.js'
import * as mockCamera from '../../../__mocks__/react_native_camera.js'
import * as mockCard from '../../../__mocks__/react_native_card.js'

jest.mock('react-native-camera', () => mockCamera);
jest.mock('react-native-awesome-card-io', ()=> mockCard); 

it("Test the AddPaymentMethod",()=> {
    let tree=renderer.create(<AddPaymentModal/>).toJSON();
console.log(tree);
console.log(tree.children);
console.log(tree.props);
console.log(tree.type);
console.log(tree.View);
expect(tree).toMatchSnapshot();
});