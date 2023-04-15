import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { RiTeamFill, RiTodoFill } from "react-icons/ri";

const Container = styled.div`
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  position: fixed;
  width: 100%;
  max-width: 500px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index:999;
`;
const NavItem = styled(Link)<{ isActive: boolean }>`
  color: ${ props => props.isActive ? '#F4C855' : '#b9bcbe' };
  font-size: 35px;
`;
const PostBtn = styled(Link)`
  color: #fff;
  font-size: 30px;
  line-height: 38px;
  width: 64px;
  height: 38px;
  background: linear-gradient(139.68deg, #f0c268 5.07%, #fd9569 117.95%);
  box-shadow: 0px 100px 196px rgba(0, 0, 0, 0.07),
    0px 41.7776px 81.8841px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 43.7792px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 24.5422px rgba(0, 0, 0, 0.035),
    0px 6.6501px 13.0342px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 5.42382px rgba(0, 0, 0, 0.0196802);
  border-radius: 67.8261px;
  text-align: center;
  svg {
    color: #fff;
  }
`;
export default function Nav() {
  const {pathname} = useLocation();
  return (
    <Container>
      <NavItem to="/" isActive={ pathname === '/' }>
        <AiFillHome />
      </NavItem>
      <NavItem to="/mission" isActive={ pathname === '/mission' }>
        <RiTodoFill />
      </NavItem>
      <PostBtn to="/post">
        +
      </PostBtn>
      <NavItem to="/team" isActive={ pathname === '/team' }>
        <RiTeamFill />
      </NavItem>
      <NavItem to="/setting" isActive={ pathname === '/setting' }>
        <AiFillSetting />
      </NavItem>
    </Container>
  );
}
