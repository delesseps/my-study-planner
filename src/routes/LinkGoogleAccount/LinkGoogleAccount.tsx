import * as React from "react";
import { ReactComponent as Logo } from "assets/logo.svg";
import { ReactComponent as Done } from "assets/change_password_done.svg";
import styled from "styled-components";
import { Button, message } from "antd";
import FadeIn from "components/FadeIn/FadeIn";
import { match } from "react-router-dom";
import Loading from "components/Loading/Loading";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import {
  linkAccountGoogleTokenConfirmation,
  linkAccountGoogle
} from "services/linkAccount";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 4rem 0;
  min-height: 100vh;

  background-color: ${props => props.theme.colors.main};
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 8rem;
`;

const StyledLogo = styled(Logo)`
  width: 5rem;
  height: 5rem;

  fill: white;

  margin-right: 1rem;
`;

const Title = styled.h1`
  font-weight: 600;
  margin-bottom: 0;
  color: white;
`;

const Card = styled.div`
  background-color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 2rem 4rem;

  width: 44rem;

  border-radius: 6px;

  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const CardTitle = styled.h2`
  font-weight: 300;
  font-size: 2.4rem;
  color: ${props => props.theme.colors.main};
`;

const CardBody = styled.h4`
  font-weight: 400;
  color: rgba(39, 39, 39, 0.7);
  text-align: center;

  && {
    margin-bottom: 3rem;
  }
`;

const CardButtonsWrapper = styled.div`
  & > *:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ILinkGoogleAccountProps {
  match: match<{ token: string; email: string }>;
}

const LinkGoogleAccount: React.FunctionComponent<ILinkGoogleAccountProps> = ({
  match
}) => {
  const dispatch = useDispatch();

  const [requestLoading, setRequestLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    const confirmToken = async () => {
      try {
        const response = await linkAccountGoogleTokenConfirmation(
          match.params.token
        );

        if (!response) {
          throw new Error(response);
        }

        setLoading(false);
      } catch (e) {
        message.error("Invalid link");
        dispatch(push("/signin"));
      }
    };

    confirmToken();
  }, []);

  const handleLinkClick = async () => {
    try {
      setRequestLoading(true);

      const response = await linkAccountGoogle(
        match.params.token,
        match.params.email
      );

      if (!response) {
        throw new Error(response);
      }

      setRequestLoading(false);
      setSuccess(true);
    } catch (e) {
      message.error("An error has occured please try again!");
      dispatch(push("/signin"));
    }
  };

  const handleRedirectClick = () => {
    dispatch(push("/signin"));
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <FadeIn>
        <Wrapper>
          <LogoBox>
            <StyledLogo />
            <Title>My Study Planner</Title>
          </LogoBox>
          <Card>
            <CardTitle>Link account to Google</CardTitle>
            <CardBody>
              {success
                ? "Successfuly linked account!"
                : "To continue through Google you must link your account. This action can not be undone!"}
            </CardBody>
            {success ? (
              <Done />
            ) : (
              <CardButtonsWrapper>
                <Button
                  loading={requestLoading}
                  onClick={handleLinkClick}
                  size="large"
                  type="primary"
                >
                  Link
                </Button>
                <Button onClick={handleRedirectClick} size="large">
                  Cancel
                </Button>
              </CardButtonsWrapper>
            )}
            {success && (
              <Button type="primary" onClick={handleRedirectClick} size="large">
                Sign in
              </Button>
            )}
          </Card>
        </Wrapper>
      </FadeIn>
    );
  }
};

export default LinkGoogleAccount;
