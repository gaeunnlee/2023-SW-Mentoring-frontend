import styled from "styled-components";

const Container = styled.div`
  position: sticky;
  height: 3.5rem;
  display: flex;
  padding: 1.5rem;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 1.5rem;
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
