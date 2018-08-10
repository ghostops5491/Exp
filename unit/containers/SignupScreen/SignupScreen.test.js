/**
 * SignupScreen Unit Tests
 * ~~~~~~~~~~~~~~~~~~~~~~~~
 */


/** Disable console errors */
console.error = () => {}

/** Manual mocks */
const dispatch = jest.fn();

/** Remocking react-native to support custom case of SignupScreen test cases */
jest.mock( "react-native", () => Object.assign ( 
    require( "./../../../__mocks__/rn-mock" ),
    { StyleSheet : require( "./rn-stylesheet-mock" ) }
) );

/** Package dependencies */
import React from "react";
import { shallow } from "enzyme";
import componentToJson from "enzyme-to-json";

/** Component in test */
import { SignupScreen } from "../../../App/Containers/SignupScreen";
/** 
 * Component props
 * ~~~~~~~~~~~~~~~ 
 * We need to explicitly define the component props
 * as we will be unit testing the component which is
 * not connected to Redis. So no mapStateToProps and
 * no mapDispatchToProps.
 * */
const props = {
    /** Props */
    error : "",
    email : "",
    password : "",
    passwordConfirmation : "",
    deviceToken : "",
    signingUp : false,
    paymentMethodExists : false,
    profileComplete : false,
    
    /** Dispatch methods */
    registerPushToken : jest.fn( payload => true ),
    clearError : jest.fn( payload => true ),
    addError : jest.fn( payload => true ),
    /** For now its a promise that resolves but the implmentation can be changed */
    signup : jest.fn( payload => Promise.resolve() ),
    changeEmail : jest.fn( payload => true ),
    changePassword : jest.fn( payload => true ),
    changePasswordConfirmation : jest.fn( password => true ),
    clearForm : jest.fn( payload => true )
},

/** Helper to get fresh props for each tests */
getProps = () => Object.assign( {}, props );

/** Tests for component state on initialization */
describe( "@method constructor", () => {

    test( "component state should match snapshot until changed explicitly", () => {
        /** 
         * Shallow rendering helps to get around the actual mounting 
         * and let ourselves be concerned about component properties
         * and its attributes at a particular state.
         */
        const component = shallow ( <SignupScreen { ...getProps() }/> );

        /** 
         * Call to matchSnapshot will either create a new snapshot
         * or assert against an already existing snapshot
         */
        expect( component.state() ).toMatchSnapshot();
    } );
} );

describe( "@method componentWillMount", () => {

    test( "should clear the form on component mount", () => {

        /** Hold a reference to props */
        const props = getProps();

        /** Shallow mount component to trigger componentWillMount */
        const component = shallow ( <SignupScreen { ...props }/> );

        expect( props.clearForm ).toHaveBeenCalledTimes( 1 );
    } );
} );

describe( "@behaviour signup", () => {

    test( "should clear errors and toggle terms and condition modal if inputs are valid", () => {

        /** Necessary mock */
        SignupScreen.prototype.validateInputs = jest.fn( () => true );

        /** Hold props */
        const props = getProps();

        /** Shallow mount component to trigger componentWillMount */
        const component         = shallow ( <SignupScreen { ...props }/> ),
              
              /** Hold modal state before signup */
              modalBeforeSignup = component.state( "termsConditionsModalVisible" );

        /** Trigger signup */
        component.instance().signup();

        const didClearErrorGotCalled    = props.clearError.mock.calls.length > 0,
              modalToggled              = component.state( "termsConditionsModalVisible" ) !== modalBeforeSignup;

        expect( didClearErrorGotCalled && modalToggled ).toBeTruthy();
    } );

    test( "should do nothing in case inputs are no good", () => {

        /** Necessary mock */
        SignupScreen.prototype.validateInputs = jest.fn( () => false );

        /** Hold props */
        const props = getProps();

        /** Shallow mount component to trigger componentWillMount */
        const component         = shallow ( <SignupScreen { ...props }/> ),
              
              /** Hold modal state before signup */
              modalBeforeSignup = component.state( "termsConditionsModalVisible" );

        /** Trigger signup */
        component.instance().signup();

        const didClearErrorGotCalled    = props.clearError.mock.calls.length > 0,
              modalToggled              = component.state( "termsConditionsModalVisible" ) !== modalBeforeSignup;

        expect( didClearErrorGotCalled && modalToggled ).toBeFalsy();
    } );
} );

test( "ui should match snapshot if not altered", () => {

    const component = shallow ( <SignupScreen { ...getProps() }/> );

    expect( componentToJson( component ) ).toMatchSnapshot();
} );