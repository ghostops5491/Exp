import * as mockCamera from '../../../__mocks__/react_native_camera.js'
import * as mockCard from '../../../__mocks__/react_native_card.js'
jest.mock('react-native-camera', () => mockCamera);
jest.mock('react-native-awesome-card-io', ()=> mockCard);   

import { SignupScreen } from './signup';
import { shallow, mount } from 'enzyme';
import enzymeToJson from 'enzyme-to-json';

/**
 * 1. React native mock library
 * 2. Root test setup file to use react-native-mock library
 * 3. Figure out how the actions are dispatched and which of them are asynchronous
 * 4. Actions - How the reduxsauce works with actions
 */

/** Parallel testing -  */

/** 
 *  Components - [ Unit Tests, Scenario Tests, Snapshot tests ]
 *  Redux - [ Actions, Reducers ]
 */

describe( "UNIT TESTS - Signup Screen", function ( )  {

    describe( "@method signup", function () {

        /**
         * List of tasks - 
         * 1. Does nothing if the input is not valid
         * 2. If valid, then clears the error and toggles terms and condition modal
         */

        // beforeEach( function () { jest.resetAllMock(); } )

        // jest.fn() will return an empty spy

        const props = { 
            error: jest.fn(),
            email: jest.fn(),
            password: jest.fn(),
            passwordConfirmation: jest.fn(),
            deviceToken: jest.fn(),
            signingUp: jest.fn(),
            paymentMethodExists: jest.fn(),
            profileComplete: jest.fn(),
            clearError: jest.fn(),
            addError: jest.fn(),
            signup: jest.fn(),
            
            changeEmail: jest.fn(),
            changePassword: jest.fn(),
            changePasswordConfirmation:jest.fn() ,
                clearForm: jest.fn()
        };

        /**
         * Pure function to return a deep copy
         * @param {*} param 
         */
        function deepCopy ( param ) {
            return JSON.parse( JSON.stringify( param ) );
        }

        test( "should clear the errors and toggle the state of terms and condition modal, if the input is valid", function () {

            const conponentProps        = deepCopy( props ),  
                  signupcomponent       = shallow( <SignupScreen props={ conponentProps } /> ),
                  currentStateOfModal   = true;

            /** Ensure some state */
            signupcomponent.setState( { termsConditionsModalVisible : currentStateOfModal } );

            /** Mock the dependency */
            jest.mock( signupcomponent.instance(), "validateInputs", function () { return true; } );
            /**
             * const validateInputsMock = jest.mock( signupcomponent.instance(), "validateInputs" );
             * validateInputsMock.mockImplementation( function() { return true; } );
             */

            /** Setup spies on toggleTermsConditionsModal */
            const toggleTermsConditionsModalSpy = jest.spy( signupcomponent.instance(), "toggleTermsConditionsModal" );

            /** Initiate signup */
            signupcomponent.instance().signup();

            /** Assertions */
            /** Raw/Crude/Not so good assertions | Doesn't really state anyhitng */
            expect( componentProps.clearError ).tohaveBeenCalled();
            expect( toggleTermsConditionsModalSpy ).tohaveBeenCalled();

            /** Good assertion */
            expect( signupcomponent.state( "termsConditionsModalVisible" ).toBe( !currentStateOfModal ) );
        } );

        test( "should do nothing if the inputs are not valid", function () {
            const conponentProps        = deepCopy( props ),  
                  signupcomponent       = shallow( <SignupScreen props={ conponentProps } /> ),
                  currentStateOfModal   = true;

            /** Ensure some state */
            signupcomponent.setState( { termsConditionsModalVisible : currentStateOfModal } );

            /** Mock the dependency */
            jest.mock( signupcomponent.instance(), "validateInputs", function () { return false; } );

            /** Initiate signup */
            signupcomponent.instance().signup();

            /** Good assertion */
            expect( signupcomponent.state( "termsConditionsModalVisible" ).toBe( currentStateOfModal ) );
        } );

        test( "render tree should not change", function () {

            const component = shallow ( <SignupScreen props={deepCopy(props)} /> );

            expect( enzymeToJson( component ) ).toMatchSnapshot();
        } );
    } );
} );
