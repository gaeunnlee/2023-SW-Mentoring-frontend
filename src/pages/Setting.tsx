import styled from "styled-components";
import Block from "../components/Block";
import Banner from "../components/Banner/Banner";
import { FiLogIn } from "react-icons/fi";
import { HiOutlineKey } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoginStateAtom } from "../state/LoginState";
import { LoginProps } from "../props/LoginProps";

const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
  border-radius: 22px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const ListItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Icon = styled.span`
  padding: 10px;
  border-radius: 100%;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;
const LoginIcon = styled(Icon)`
  color: #5fa860;
  background-color: #edf4e9;
`;
const ProfileIcon = styled(Icon)`
  color: #609ad3;
  background-color: #e3f1ff;
`;
const MissionIcon = styled(Icon)`
  color: #6240AE;
  background-color: #EDEAF1;
`;
const PwIcon = styled(Icon)`
  color: #F4C855;
  background-color: #FDF6E5;
`;
const Text = styled.span`
  font-size: 25px;
  color: #333;
`;

export default function Setting() {
  const loginInfo = useRecoilValue(LoginStateAtom);
  const setLogin = useSetRecoilState(LoginStateAtom);
  const logoutHandler = () => {
    setLogin((prev: LoginProps) => {
      return {
        state: false,
        accessToken: "",
        refreshToken: "",
        name: "",
        studentId: "",
        teamName: "",
      };
    });
  };

  return (
    <>
      <Banner title="설정" />
      <Block>
        <Container>
          {!loginInfo.state ? (
            <ListItem to="/login">
              <LoginIcon>
                <FiLogIn />
              </LoginIcon>
              <Text>로그인</Text>
            </ListItem>
          ) : (
            <>
              <ListItem to="_" style={{pointerEvents: "none"}}>
                <ProfileIcon>
                  <CgProfile />
                </ProfileIcon>
                <Text>{loginInfo.name} ({loginInfo.teamName})</Text>
              </ListItem>
              <ListItem to="/my-mission">
                <MissionIcon>
                  <BsFillBookmarkCheckFill />
                </MissionIcon>
                <Text>내 미션 현황</Text>
              </ListItem>
              <ListItem to="/lost-pw">
                <PwIcon>
                  <HiOutlineKey />
                </PwIcon>
                <Text>비밀번호 변경</Text>
              </ListItem>
              <ListItem to="/login" onClick={logoutHandler}>
                <LoginIcon>
                  <FiLogIn />
                </LoginIcon>
                <Text>로그아웃</Text>
              </ListItem>
            </>
          )}
        </Container>
      </Block>
    </>
  );
}
