import styled from "styled-components";
import LoadingGif from "../static/images/loading.gif";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 500px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.898);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 4px solid #ffffff;
  padding: 30px;
  img {
    ${({ theme }) => theme.media.mobile} {
      width: 80px;
      height: 80px;
    }
    margin-bottom: 10px;
  }
  p {
    font-size: 20px;
    background-color: #ff9500;
    padding: 5px;
    color: #ffffff;
    border-radius: 10px;
    ${({ theme }) => theme.media.mobile} {
        font-size: 15px;
    }
  }
`;

export default function Loading() {
  return (
    <Container>
      <Wrapper>
        <img src={LoadingGif} />
        <p>Loading...</p>
      </Wrapper>
    </Container>
  );
}
