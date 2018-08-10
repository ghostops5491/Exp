/**
 * StyleSheet Mock
 * ~~~~~~~~~~~~~~~
 * 
 * StyleSheet mock for SignupScreen
 */

/**
 * Stub for create method on StyleSheet export of react-native
 * @param {object} styles 
 */
function create( styles ) {

    return Object.keys( styles )
                 .reduce( ( reducedStyles, style ) => Object.assign(
                     reducedStyles,
                     { [style] : { marginBottom : 10 } }
                 ), {} );
}

/** Expose the mock */
module.exports = { create };