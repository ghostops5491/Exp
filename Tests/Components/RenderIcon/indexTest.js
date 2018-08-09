import { AddPhotoButton }  from '../../../App/Components/AddPhotoButton/index.js'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

describe ("AddPhotoButton",()=> {
it('disables the button element',()=>{

    let wrapper = renderer.create(<button/>).toJSON();
console.log(wrapper);
    expect(wrapper).toMatchSnapshot();
  });
});
