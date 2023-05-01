import styled from "styled-components";
import Banner from "../components/Banner/Banner";
import Block from "../components/Block";
import { HiUserCircle } from "react-icons/hi";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { TbHeartPlus } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { LoginStateAtom } from "../state/LoginState";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

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
  line-height: 25px; ;
`;
const ContentTeam = styled.span`
  font-weight: bold;
  margin-right: 7px;
`;
const ContentTitle = styled.span``;
const ContentBody = styled.p``;
const ContentDate = styled.p`
  margin-top: 2px;
  font-size: 15px;
  color: #8a8a8a;
`;

interface PostProps {
    body : string;
    createAt : string;
    id : number ;
    imageIds : [] ;
    lastModifiedAt : string;
    missionBonuses : [] ;
    missionCategory : string;
    missionName : string;
    missionPoint : number ;
    status : string;
    teamName : string;
    title : string ;
    totalPoint : number;
}

export default function PostDetail() {
  const [ post, setPost ] = useState<PostProps>()
    const token = useRecoilValue(LoginStateAtom);
  const location = useLocation();
  useEffect(() => {
    const postId = Number(location.pathname.split("/")[2]);
    getPost(postId);
  }, []);

  const getPost = (postId: number) => {
    axios({
      method: "get",
      url: `http://193.123.241.9:8080/register/${postId}/view`,
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    }).then(function (response) {
      console.log(response.data);
      setPost(response.data)
    });
  };
  return (
    <>
      <Banner title="글 상세보기" prev />
      <Block>
        <Card>
          <TopContainer>
                <ProfileSvg>
                  <HiUserCircle />
                </ProfileSvg>
                <TextContainer>
                  <TeamName>{post?.teamName}</TeamName>
                  <Mission>
                    <span>{post?.missionName}</span>
                    <MissionStatus>
                      {post?.status === "PROGRESS" ? (
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
                {/* <SimpleImageSlider
                  width={300}
                  height={300}
                  images={context[0].images}
                  showBullets={true}
                  showNavs={true}
                /> */}
              </ImgContainer>
              <ContentContainer>
                <ScoreContainer>
                  <TbHeartPlus />
                  <Score>{post?.totalPoint}점 획득</Score>
                </ScoreContainer>
                <Content>
                  <ContentTeam>{post?.teamName}</ContentTeam>
                  <ContentTitle>{post?.title}</ContentTitle>
                  <ContentBody>{post?.body}</ContentBody>
                </Content>
                <ContentDate>
                  {`${post?.createAt.slice(0,4)}년 ${post?.createAt.slice(5,7)}월 ${post?.createAt.slice(8,10)}일 ${post?.createAt.slice(11,13)}시 ${post?.createAt.slice(14,16)}분`}
                </ContentDate>
              </ContentContainer>
        </Card>
      </Block>
    </>
  );
}
