import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GrFormPreviousLink } from "react-icons/gr"

const Container = styled.div`
  position: sticky;
  height: 3.5rem;
  display: flex;
  padding: 1.5rem;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  max-width: 500px;
`;
const Prev = styled.button<{ prev?: boolean }>`
  font-size: 2.5rem;
  color: #fff;
  path {
    stroke: #fff;
  }
  position: absolute;
  top: 0.5rem;
  left: 1.5rem;
  display: ${ props => props.prev ? "block" : "none" };
  &:hover{
    cursor: pointer;
  }
`;
const Title = styled.h1`
  font-size: 1.5rem;
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
