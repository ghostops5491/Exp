import { Platform } from "react-native";

import variable from "./../variables/platform";

export default (variables = variable) => {
  const platform = variables.platform;

  const footerTabTheme = {
    "NativeBase.Button": {
      ".active": {
        "NativeBase.Text": {
          color: variables.tabBarActiveTextColor,
          fontSize: variables.tabBarTextSize,
          lineHeight: 16
        },
        "NativeBase.Icon": {
          color: variables.tabBarActiveTextColor
        },
        "NativeBase.IconNB": {
          color: variables.tabBarActiveTextColor
        },
        backgroundColor: variables.tabActiveBgColor
      },
      fontFamily: 'Roboto-Regular',
      flexDirection: null,
      backgroundColor: "transparent",
      borderColor: null,
      elevation: 0,
      shadowColor: null,
      shadowOffset: null,
      shadowRadius: null,
      shadowOpacity: null,
      alignSelf: "center",
      ".badge": {
        "NativeBase.Badge": {
          "NativeBase.Text": {
            fontSize: 8,
            // fontWeight: platform === "ios" ? "600" : undefined,
            // lineHeight: 10
          },
          top: -5,
          // alignSelf: "center",
          left: 10,
          // zIndex: 99,
          // height: 18,
          padding: 1.7,
          // paddingHorizontal: 3
        },
        "NativeBase.Icon": {
          marginTop: -18
        }
      },
      "NativeBase.Icon": {
        color: variables.tabBarTextColor
      },
      "NativeBase.IconNB": {
        color: variables.tabBarTextColor
      },
      "NativeBase.Text": {
        color: variables.tabBarTextColor,
        fontSize: variables.tabBarTextSize,
        lineHeight: 16,
        width: '100%',
        marginTop: 5,
      }
    },
    backgroundColor: Platform.OS === "android"
      ? variables.tabActiveBgColor
      : undefined,
  };

  return footerTabTheme;
};
