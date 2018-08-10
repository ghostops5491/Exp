/**
 * Jest Configuration
 * ~~~~~~~~~~~~~~~~~~
 * We keep out jest config separate to let the test runner remain pluggable/removable
 * 
 * Configuration Reference - https://jestjs.io/docs/en/configuration
 */

const JEST_CONFIG = {

    /** Detailed output of every test run */
    verbose : true,

    /** Cache the artifacts here */
    cacheDirectory : "<rootDir>/.jest/cache",

    /** Clear the mock calls of mock implementation after every test run */
    clearMocks : true,

    /** Where to collect coverage from */
    collectCoverageFrom : [
        "<rootDir>/App"
    ],

    /** Where to store coverage */
    coverageDirectory : "<rootDir>/.jest/coverage",

    /** In what format will the coverage be collected */
    coverageReporters : ["json", "html", "text"],

    /** Using this we stub out our static resources */
    moduleNameMapper : {
        "^[./a-zA-Z0-9$_-]+\\.(png|jpg|jpeg)" : "Stub-Image"
    },

    /** 
     * Preset to be used for jest configuration 
     * Since we are testing react-native hence react-native
     */
    preset : "react-native",

    /** Set of files-configuration that will be run before each test */
    setupFiles : [],

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
        "**/unit/**/*.js"
    ],

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
        /** This won't be transformed by default */
        "/node_modules/"
    ]
};

/** Expose the configuration */
module.exports = JEST_CONFIG;