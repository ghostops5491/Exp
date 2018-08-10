/**
 * Jest Configuration
 * ~~~~~~~~~~~~~~~~~~
 * We keep out jest config separate to let the test runner remain pluggable/removable
 * 
 * Configuration Reference - https://jestjs.io/docs/en/configuration
 */

const TRANSFORM_WHITELIST = [
    "react-native",
    "react-navigation",
    "native-base-shoutem-theme",
    "react-native-easy-grid",
    "react-native-drawer",
    "native-base",
    "react-native-vector-icons",
    "react-native-keyboard-aware-scroll-view",
    "react-native-iphone-x-helper",
    "react-native-phone-call",
    "react-native-camera",
    "react-native-easy-grid",
    "react-native-awesome-card-io",
    "react-native-check-box"
]

const JEST_CONFIG = {

    /** Detailed output of every test run */
    verbose : true,

    /** Cache the artifacts here */
    cacheDirectory : "<rootDir>/.jest/cache",

    /** Clear the mock calls of mock implementation after every test run */
    clearMocks : true,

    /** Where to collect coverage from */
    collectCoverageFrom : [
        "<rootDir>/App/**/*.js"
    ],

    /** Where to store coverage */
    coverageDirectory : "<rootDir>/.jest/coverage",

    /** In what format will the coverage be collected */
    coverageReporters : ["json", "html", "text"],

    /** Using this we stub out our static resources */
    moduleNameMapper : {
        "^[./a-zA-Z0-9$_-]+\\.(png|jpg|jpeg)" : "<rootDir>/__mocks__/static-stub.js"
    },

    /** 
     * Preset to be used for jest configuration 
     * Since we are testing react-native hence react-native
     */
    preset : "react-native",

    /** Set of files-configuration that will be run before each test */
    setupFiles : [
        "<rootDir>/jest.pretest.js"
    ],

    /** File to run right after setupFiles but before each test */
    setupTestFrameworkScriptFile : "",

    /** 
     * Environment under which the test cases should run
     * Defaults to jsdom but can be switched to node as well
     * React native testing requires jsdom
     */
    testEnvironment : "jsdom",

    /** 
     * Paths where the test files are 
     * We plan to store out unit tests in folder named unit
     * and integration tests in folder named integration
     * */
    testMatch : [
        "**/unit/**/*.test.js"
    ],

    /** Modules/Files that will be transformed */
    transform: {
        "^.+\\.js$": "babel-jest",
    },

    /**
     * This will contain list of modules which needs to be either
     * whitelisted or blacklisted in the eye of babel transformer
     * Whitelisted modules will be transformed before being used
     * By default Jest will use babel to transform the project
     * source but if a module is not pre-compiled then that can
     * also be transformed here
     * 
     * Example : https://jestjs.io/docs/en/tutorial-react-native#transformignorepatterns-customization
     */
    transformIgnorePatterns : [
        "node_modules/(?!("+ TRANSFORM_WHITELIST.join( "|" ) +")/)"
    ]
};

/** Expose the configuration */
module.exports = JEST_CONFIG;