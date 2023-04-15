import styled from "styled-components";
import Block from "../components/Block";
import HomeBanner from "../components/Banner/HomeBanner";
import { useEffect, useRef, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { HiUserCircle } from "react-icons/hi";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { TbHeartPlus } from "react-icons/tb";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { LoginStateAtom } from "../state/LoginState";

const context = [
  {
    id: 6,
    title: "강아지 귀엽닿 강아지 귀엽닿 강아지 귀엽닿 강아지 귀엽닿 강아지 귀엽닿 강아지 귀엽닿",
    teamName: "팀1",
    missionName: "강아지 사진 찍기",
    status: "PROGRESS",
    totalScore: 50,
    date: "2023-04-03T20:21:48.892632",
    images: [
      {
        url: "https://vitapet.com/media/sz1czkya/benefits-of-getting-a-puppy-900x600.jpg?anchor=center&mode=crop&width=1240&rnd=132503927246630000",
      },
      {
        url: "https://cdn.shopify.com/s/files/1/0535/2738/0144/articles/shutterstock_1290320698.jpg?v=1651099282",
      },
    ],
  },
  {
    id: 6,
    title: "강아지 귀엽닿 강아지 귀엽닿",
    teamName: "팀1",
    missionName: "강아지 사진 찍기",
    status: "PROGRESS",
    totalScore: 50,
    date: "2023-04-03T20:21:48.892632",
    images: [
      {
        url: "https://vitapet.com/media/sz1czkya/benefits-of-getting-a-puppy-900x600.jpg?anchor=center&mode=crop&width=1240&rnd=132503927246630000",
      },
      {
        url: "https://cdn.shopify.com/s/files/1/0535/2738/0144/articles/shutterstock_1290320698.jpg?v=1651099282",
      },
    ],
  },
];

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin: 10px 0;
`;
const TopContainer = styled.div`
  padding: 20px 10px 10px 10px;
  background-color: #f2f2f2;
  border-radius: 10px 10px 0 0;
  display: flex;
  gap: 3px;
`;
const ProfileSvg = styled.p`
  svg {
    font-size: 55px;
    color: #969696;
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

const TeamName = styled.span`
  font-size: 17px;
  font-weight: bold;
`;
const Mission = styled.div`
  display: flex;
  gap: 5px;
  font-size: 14px;
  flex-direction: row !important;
  align-items: center;
`;
const MissionStatus = styled.span`
  svg {
    font-size: 18px;
  }
`;
const ProgressStatus = styled.span`
  color: #ff6a6a;
  svg {
    font-size: 15px;
  }
`;
const CompleteStatus = styled.span`
  color: #609ad3;
`;
const ImgContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const ImgItem = styled.div``;
const Img = styled.img`
  width: 100%;
`;
const ContentContainer = styled.div`
  padding: 15px 20px 15px 20px;
  background-color: #f2f2f2;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  svg {
    font-size: 28px;
  }
  `;
const Score = styled.span`
  font-size: 18px;
`;
const Content = styled.div`
  line-height: 25px;;
`
const ContentTeam = styled.span`
  font-weight: bold;
  margin-right: 7px;
`
const ContentTitle = styled.span``
const ContentDate = styled.p`
  margin-top: 2px;
  font-size: 15px;
  color: #8a8a8a;
`

export default function Home() {
  const loginInfo = useRecoilValue(LoginStateAtom)
  console.log(loginInfo)
  return (
    <>
      <HomeBanner />
      <Block>
        {context.map((item) => {
          return (
            <Card>
              <TopContainer>
                <ProfileSvg>
                  <HiUserCircle />
                </ProfileSvg>
                <TextContainer>
                  <TeamName>{item.teamName}</TeamName>
                  <Mission>
                    <span>{item.missionName}</span>
                    <MissionStatus>
                      {item.status === "PROGRESS" ? (
                        <ProgressStatus>
                          <BsClockHistory />
                        </ProgressStatus>
                      ) : (
                        <CompleteStatus>
                          <AiFillCheckCircle />
                        </CompleteStatus>
                      )}
                    </MissionStatus>
                  </Mission>
                </TextContainer>
              </TopContainer>
              <ImgContainer>
                <SimpleImageSlider
                  width={300}
                  height={300}
                  images={item.images}
                  showBullets={true}
                  showNavs={true}
                />
              </ImgContainer>
              <ContentContainer>
                <ScoreContainer>
                  <TbHeartPlus />
                  <Score>{item.totalScore}점 획득</Score>
                </ScoreContainer>
                <Content>
                  <ContentTeam>{item.teamName}</ContentTeam>
                  <ContentTitle>{item.title}</ContentTitle>
                </Content>
                <ContentDate>
                  {`${item.date.slice(0,4)}년 ${item.date.slice(5,7)}월 ${item.date.slice(8,10)}일 ${item.date.slice(11,13)}시 ${item.date.slice(14,16)}분`}
                </ContentDate>
              </ContentContainer>
            </Card>
          );
        })}
      </Block>
    </>
  );
}
