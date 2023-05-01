import styled from "styled-components";
import Banner from "../components/Banner/Banner";
import Block from "../components/Block";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const context = [
  {
    id: 1,
    name: "한강에서 치킨먹기",
    description: "한강에서 BBQ 뿌링클 시켜 먹기",
    point: 30,
    category: "CULTURE",
    bonusList: [
      {
        plusMission: "음식 다 비우기",
        plusPoint: 10,
      },
      {
        plusMission: "쓰레기 치우기",
        plusPoint: 10,
      },
    ],
    info: "EASY",
  },
  {
    id: 2,
    name: "도서관에서 공부하기",
    description: "도서관에서 공부하기",
    point: 30,
    category: "STUDY",
    bonusList: [
      {
        plusMission: "4시간 이상하기",
        plusPoint: 10,
      },
    ],
    info: "VERY_EASY",
  },
  {
    id: 48,
    name: "짚라인 타기",
    description: "짚라인 타기",
    point: 50,
    category: "ACTIVITY",
    bonusList: [
      {
        plusMission: "4시간 이상하기",
        plusPoint: 10,
      },
    ],
    info: "VERY_EASY",
  },
];

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const MissionList = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.1);
  padding: 20px 2rem;
  border-radius: 20px;
  background-color: #fff;
`;
const ListLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;
const MissionName = styled.p`
    margin: 3px 0 0 2px;
    font-size: 20px;
    color: #000;
`;
const MissionCate = styled.div`
    padding: 10px 0;
    font-size: 11px;
  span {
    background-color: #b2dd94;
    color: #fff;
    border-radius: 5px;
    padding: 5px;
    width: auto;
  }
`;
const MissionScore = styled.p`
    font-size: 40px;
    font-weight: bold;
    color: #de7474;
`;
interface MissionListProps {
  bonusList : [];
  category : string;
  description : string;
  id : number;
  info : string;
  name : string;
  point : number;
}
export default function Mission() {
  const [ missionList, setMissionList ] = useState<MissionListProps[]>()
  useEffect(()=> {
    axios({
      method: 'get',
      url: 'http://193.123.241.9:8080/missions?page=1&size=10'
    }).then(function (response){
      setMissionList(response.data.content)
    })
  },[])

  return (
    <>
      <Banner title="미션" />
      <Block>
        <Container>
          {missionList?.map((item) => {
            return (
              <MissionList to={`/mission/${item.id}`}>
                <ListLeft>
                  <MissionCate>
                    <span>{item.category}</span>
                  </MissionCate>
                  <MissionName>{item.name}</MissionName>
                </ListLeft>
                <MissionScore>{item.point}</MissionScore>
              </MissionList>
            );
          })}
        </Container>
      </Block>
    </>
  );
}
