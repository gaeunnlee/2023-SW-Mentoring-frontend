import styled from "styled-components";

const Container = styled.div`
  height: 15vh;
  display: flex;
  padding: 25px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 30px;
  color: #f9f9f9;
  font-family: "Jalnan";
`;

export default function HomeBanner() {
  return (
    <Container>
      <Title>SW멘토멘티</Title>
    </Container>
  );
}
