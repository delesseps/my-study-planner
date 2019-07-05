import React from "react";
import styled from "styled-components";
import { List, Switch } from "antd";
import { ApplicationState } from "store/types";
import IUserConfig from "interfaces/IUserConfig";
import { useDispatch, connect } from "react-redux";
import { updateUserConfig } from "store/effects";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  width: 60rem;

  justify-content: center;
  align-items: center;

  margin-top: 8rem;
`;

const Title = styled.h4`
  font-weight: 500;
  align-self: flex-start;

  letter-spacing: 1px;
  margin: 0;
  margin-bottom: 1rem;

  color: ${props => props.theme.fontColors.textRgba(0.8)};
`;

const StyledList = styled(List)`
  min-width: 100%;
  background-color: ${props => props.theme.panelBackgroundColor};
`;

const Name = styled.span`
  color: ${props => props.theme.fontColors.textRgba(0.8)};
`;

const Description = styled.span`
  color: ${props => props.theme.fontColors.textRgba(0.6)};
`;

interface IPreferencesProps {
  config: IUserConfig;
}

const settings = [
  {
    name: "Dark Mode",
    description: "Make My Study Planner cooler for your eyes."
  }
];

const Preferences: React.FunctionComponent<IPreferencesProps> = ({
  config
}) => {
  const dispatch = useDispatch();

  const handleChange = (action: string) => (
    checked: boolean,
    event: MouseEvent
  ) => {
    const newConfig: IUserConfig = config;

    switch (action) {
      case "DARK_MODE":
        newConfig.darkMode = checked;
        return dispatch(updateUserConfig(newConfig));
      default:
    }
  };

  return (
    <Wrapper>
      <Title>Appereance</Title>
      <StyledList
        bordered
        itemLayout="horizontal"
        dataSource={settings}
        renderItem={(setting: any) => (
          <List.Item
            actions={[
              <Switch
                checked={config.darkMode}
                onChange={handleChange("DARK_MODE")}
              />
            ]}
          >
            <List.Item.Meta
              title={<Name>{setting.name}</Name>}
              description={<Description>{setting.description}</Description>}
            />
          </List.Item>
        )}
      />
    </Wrapper>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  config: state.reducer.user.configuration
});

export default connect(
  mapStateToProps,
  null
)(Preferences);