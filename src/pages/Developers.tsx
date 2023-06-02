import styled from "styled-components";
import Block from "../components/Block";
import Banner from "../components/Banner/Banner";
import { HiOutlineKey } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Cha from "../static/images/developers/cha.jpg";
import Choi from "../static/images/developers/choi.jpg";
import Lee from "../static/images/developers/lee.jpg";
import { StringLiteralType } from "typescript";

const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
  border-radius: 22px;
  padding: 20px;
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  height: 100px;
`;

const ProfileImg = styled.div<{ image: string }>`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
const Text = styled.span`
  font-size: 15px;

  color: #333;
`;
const MainInfo = styled.div`
    display: flex;
`
const Info = styled.div``;
const Name = styled.p`
    font-size: 27px;
`;
const Dev = styled.p`
    font-size: 17px;
    color: #8d8d8d;
`;
const info = [
  {
    name: "이가은",
    major: "소프트웨어학과 21학번",
    dev: "Frontend Development",
    img: Lee,
  },
  {
    name: "차현민",
    major: "소프트웨어학과 19학번",
    dev: "Backend Development",
    img: Cha,
  },
  {
    name: "최재민",
    major: "소프트웨어학과 19학번",
    dev: "Backend Development",
    img: Choi,
  },
];

export default function Developers() {
  return (
    <>
      <Banner title="만든 사람들" prev/>
      <Block>
        {info.sort(() => Math.random() - 0.5).map((item) => {
          return (
            <Container>
                <ProfileImg image={item.img}></ProfileImg>
                <TextContainer>
                  <Dev>{item.dev}</Dev>
                  <Name>{item.name}</Name>
                  <MainInfo>
                    
                    <Info>
                        {item.major}
                    </Info>
                  </MainInfo>
                </TextContainer>
            </Container>
          );
        })}
      </Block>
    </>
  );
}
