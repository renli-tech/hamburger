import React from "react";
import { ScrollView, IScrollViewProps } from "native-base";

export type ScreenProps = IScrollViewProps;

export const Screen: React.FC<ScreenProps> = (props) => {
  const { children } = props;
  return (
    <ScrollView
      _dark={{
        backgroundColor: "darkBlue.900",
      }}
      _light={{
        backgroundColor: "coolGray.100",
      }}
      {...props}
    >
      {children}
    </ScrollView>
  );
};
