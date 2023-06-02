import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GrFormPreviousLink } from "react-icons/gr"

const Container = styled.div`
  height: 15vh;
  display: flex;
  padding: 25px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  max-width: 500px;
`;
const Prev = styled.button<{ prev?: boolean }>`
  font-size: 50px;
  color: #fff;
  path {
    stroke: #fff;
  }
  position: absolute;
  top: 20px;
  left: 30px;
  display: ${ props => props.prev ? "block" : "none" };
  &:hover{
    cursor: pointer;
  }
`;
const Title = styled.h1`
  font-size: 30px;
  color: #f9f9f9;
  font-family: "Jalnan";
`;
interface BannerProps {
  title: string;
  prev?: boolean;
}
export default function Banner({ title, prev }: BannerProps) {
  const navigate = useNavigate();<GrFormPreviousLink/>

  return (
    <Container>
      <Prev onClick={() => navigate(-1)} prev={prev}>
        <GrFormPreviousLink/>
      </Prev>
      <Title>{title}</Title>
    </Container>
  );
}
