/**
 * Jest Pre Test
 * ~~~~~~~~~~~~~
 * 
 * Our pre test files which shall be run before each test
 * by Jest using setupFiles option exposed by jest configuration
 * 
 * WARNING :
 * It is tempting to pollute this file with indefinite number of
 * globals but that will make our test cases more dependent on
 * a central configuration that will eventually make them unreliable
 * 
 * Having a shared state acorss all tests is a bad practice and since
 * we are using Jest we can utilize its parallel mode of test execution
 * if we somehow manage to provide each test case their own separate 
 * state independent of each other. 
 * 
 * So for the good sake we will limit ourselves and only write
 * framework bootstrap necessary things here
 */

/** Package dependencies */
const Enzyme    = require( "enzyme" ),
      Adapter   = require( "enzyme-adapter-react-16" );

/** 
 * Configure enzyme to utilize react-16 adapter 
 * More info : https://github.com/airbnb/enzyme
 * */
Enzyme.configure({ adapter: new Adapter() });

/** 
 * React Native mock 
 * Resets react-native modules with custom mock implementation 
 * 
 * */

jest.mock( "react-native", () => require( "./__mocks__/rn-mock" ) );

jest.mock( "react-native-camera", () => jest.fn() );

jest.mock( "react-native-simple-radio-button", () => jest.fn() );

jest.mock( "react-native-awesome-card-io", () => ( {
    CardIOModule : jest.fn(), 
    CardIOUtilities : jest.fn()
} ) );

jest.mock( "react-native-check-box", () => jest.fn() );

jest.mock( "native-base", () => ( { 
    Button : jest.fn(),
    Text : jest.fn(),
    Form : jest.fn(),
    Item : jest.fn(),
    Input : jest.fn(),
    Icon : jest.fn()
} ) );