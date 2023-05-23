import styled from "styled-components";
import Block from "../components/Block";
import Banner from "../components/Banner/Banner";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const context = [
    {
        "id": 33,
        "teamName": "팀5",
        "userName_mentor": "조성현",
        "score": 80
    },
    {
        "id": 30,
        "teamName": "팀4",
        "userName_mentor": "홍길동",
        "score": 60
    },
    {
        "id": 4,
        "teamName": "팀1",
        "userName_mentor": "차현민",
        "score": 40
    },
    {
        "id": 24,
        "teamName": "팀2",
        "userName_mentor": "김한이",
        "score": 40
    },
    {
        "id": 36,
        "teamName": "팀7",
        "userName_mentor": "안재헌",
        "score": 40
    },
    {
        "id": 27,
        "teamName": "팀3",
        "userName_mentor": "이수경",
        "score": 20
    },
    {
        "id": 39,
        "teamName": "팀8",
        "userName_mentor": "이가은",
        "score": 20
    }
]

interface TeamProps {
  "id": number,
  "teamName": string,
  "userName_mentor": string,
  "score": number
}
const Container = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;
const Rank = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: #de7474;
`;
const TeamItem = styled(Link)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  border-radius: 20px;
  background-color: #fff;
`;
const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const TeamName = styled.p`
  font-weight: bold;
  font-size: 20px;
  width: 150px;
  text-align: center;
`;
const TeamMentor = styled.p`
  color: #71717a;
  text-align: center;
`;
const TeamScore = styled.div`
  font-size: 30px;
  background-color: #edf4e9;
  padding: 15px 50px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 5px;
  color: #333;
`;
const TeamScoreText = styled.p`
  color: #5fa860;
  font-size: 20px;
  font-weight: bold;
`;

export default function Team() {
  const [ team, setTeam ] = useState<TeamProps[]>();
  useEffect(()=> {
    axios({
      method: 'get',
      url: '/team?page=1&size=10'
    }).then(function (response){
      setTeam(response.data.content)
      console.log(response.data.content)
    })
  },[]) 
  return (
    <>
      <Banner title="팀 목록" />
      <Block>
        <Container>
          {team?.map(({ id, teamName, userName_mentor, score }, index) => {
            return (
              <TeamItem to={`/team/${id}`}>
                {/* <Rank>
                    {index !== 0 && (
                        team[index - 1].score === score
                    )? index : index + 1 }
                </Rank> */}
                <NameContainer>
                  <TeamName>{teamName}</TeamName>
                  <TeamMentor>{userName_mentor}</TeamMentor>
                </NameContainer>
                <TeamScore>
                  <TeamScoreText>Score</TeamScoreText>
                  {score}
                </TeamScore>
              </TeamItem>
            );
          })}
        </Container>
      </Block>
    </>
  );
}
