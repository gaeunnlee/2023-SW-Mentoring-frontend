import styled from "styled-components"

const Container = styled.div<{height?: string}>`
    background-color: #F9F9F9;
    height: 85vh;
    border-radius: 20px 20px 0 0;  
    padding: 20px 20px 80px 20px;
    overflow-y: scroll;
`
type BlockProps = {
    children: React.ReactNode;
    height?: string;
  };
export default function Block({children, height}: BlockProps) {
    return (
        <Container height={height}>
            {children}  
        </Container>
    )
}