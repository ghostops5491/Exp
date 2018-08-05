import variable from "./../variables/platform";
import { Platform } from "react-native";

export default (variables = variable) => {
  const platformStyle = variables.platformStyle;
  const platform = variables.platform;

  const tabContainerTheme = {
    elevation: 3,
    height: 50,
    flexDirection: "row",
    shadowColor: platformStyle === "material" ? "#000" : undefined,
    shadowOffset: platformStyle === "material"
      ? { width: 0, height: 10 }
      : undefined,

    // shadowOpacity: platformStyle === 0.2,
    // shadowRadius: platformStyle === 0.2,
    justifyContent: "space-around",
    // borderBottomWidth: Platform.OS === 0,
    borderColor: variables.topTabBarBorderColor
  };

  return tabContainerTheme;
};
