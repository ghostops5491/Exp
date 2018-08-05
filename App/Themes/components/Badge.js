import variable from "./../variables/platform";

export default (variables = variable) => {
  const badgeTheme = {
    ".primary": {
      backgroundColor: variables.btnPrimaryBg
    },
    ".warning": {
      backgroundColor: variables.btnWarningBg
    },
    ".info": {
      backgroundColor: variables.btnInfoBg
    },
    ".success": {
      backgroundColor: variables.btnSuccessBg
    },
    ".danger": {
      backgroundColor: variables.btnDangerBg
    },
    "NativeBase.Text": {
      color: variables.badgeColor,
      // fontSize: variables.fontSizeBase,
      // lineHeight: variables.lineHeight - 1,
      // textAlign: "center",
      // paddingHorizontal: 3
    },
    backgroundColor: variables.badgeBg,
    padding: variables.badgePadding,
    borderRadius: 10,
    // borderWidth: 1,
    height: 10,
    width: 10,

  };
  return badgeTheme;
};
