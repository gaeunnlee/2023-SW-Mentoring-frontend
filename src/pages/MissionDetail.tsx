import styled from "styled-components";
import Banner from "../components/Banner/Banner";
import Block from "../components/Block";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const context = {
  id: 1,
  name: "한강에서 치킨먹기",
  description: "한강에서 BBQ 뿌링클 시켜 먹기",
  info: "EASY",
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
  point: 30,
  category: "CULTURE",
};

const MissionCard = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px 20px 40px 20px;
  border-radius: 15px;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.1);
`;
const MissionCate = styled.span`
  line-height: 30px;
  margin-right: 8px;
  span {
    background-color: #b2dd94;
    color: #fff;
    border-radius: 5px;
    padding: 5px;
    font-size: 15px;
  }
`;
const MissionName = styled.p`
  font-size: 35px;
  margin-top: 10px;
  color: #222;
`;
const MissionDesc = styled.p`
  color: #777;
  margin-top: 10px;
  font-size: 17px;
`;
const Hr = styled.hr`
  border: 1.5px solid #ddd;
  width: 100%;
`;
const MissionPoint = styled(MissionCate)`
  span {
    background-color: #de7474;
  }
`;
const BonusList = styled.li`
  display: flex;
  gap: 5px;
  margin-top: 10px;
`;
const BonusTitle = styled.span`
  font-size: 20px;
  margin: 10px 0;
  line-height: 30px;
  span {
    background-color: #609ad3;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
  }
`;
const CheckBox = styled.div`
  width: 20px;
  height: 20px;
  background: url("https://s.wemep.co.kr/ui/v2.8.307/dist/pc/css/spr/common.png")
    0 -438px no-repeat;
  background-position: -200px -438px;
  vertical-align: top;
`;
const BonusName = styled.p`
  font-size: 18px;
  color: #222;
`;
const BonusPoint = styled.p`
  color: #609ad3;
  font-weight: bold;
`;

interface BonusProps {
  plusMission?: string;
  plusPoint?: number;
}

interface MissionProps {
  id: number;
  name: string;
  description: string;
  info: string;
  bonusList: [];
  point: number;
  category: string;
}

export default function MissionDetail() {
  const [mission, setMission] = useState<MissionProps>();
  const location = useLocation().pathname;
  const missionId = location.split("/")[2];

  useEffect(() => {
    axios({
      method: "get",
      url: `http://193.123.241.9:8080/missions/${missionId}`,
    }).then(function (response) {
      setMission(response.data);
    });
  }, []);
  return (
    <>
      <Banner title="미션상세" prev />
      <Block>
        <MissionCard>
          <div>
            <MissionCate>
              <span>{mission?.category}</span>
            </MissionCate>
            <MissionPoint>
              <span>{mission?.point}점</span>
            </MissionPoint>
          </div>
          <MissionName>{mission?.name}</MissionName>
          <MissionDesc>{mission?.description}</MissionDesc>
          <Hr />
          <BonusTitle>
            <span>보너스 미션</span>
          </BonusTitle>
          {mission?.bonusList?.length !== 0 ? (
            <>
              {mission?.bonusList.map((item: BonusProps) => {
                  <BonusList>
                    <CheckBox />
                    <BonusName>{item.plusMission}</BonusName>
                    <BonusPoint>+{item.plusPoint}점</BonusPoint>
                  </BonusList>
              })}
            </>
          ) : (
            <BonusList>
              <CheckBox />
              <BonusName>없습니다😢</BonusName>
            </BonusList>
          )}
        </MissionCard>
      </Block>
    </>
  );
}
