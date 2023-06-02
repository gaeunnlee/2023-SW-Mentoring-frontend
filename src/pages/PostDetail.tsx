import styled from "styled-components";
import Block from "../components/Block";
import HomeBanner from "../components/Banner/HomeBanner";
import { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { HiUserCircle } from "react-icons/hi";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { TbHeartPlus } from "react-icons/tb";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { LoginStateAtom } from "../state/LoginState";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Paging from "../components/Paging";
import Banner from "../components/Banner/Banner";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 10px;
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
  width: 100%;
`;

const TeamName = styled.span`
  font-size: 17px;
  font-weight: bold;
`;
const Mission = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  font-size: 14px;
  flex-direction: row !important;
  align-items: center;
  justify-content: space-between;
`;

const MissionContainer = styled.div`
  display: flex;
  gap: 7px;
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
  line-height: 25px;
`;
const ContentTeam = styled.span`
  font-weight: bold;
  margin-right: 7px;
`;
const ContentTitle = styled.span``;
const ContentBody = styled.p`
  line-height: 125%;
`;
const ContentDate = styled.p`
  margin-top: 2px;
  font-size: 15px;
  color: #8a8a8a;
`;

interface PostProps {
  body: string;
  createAt: string;
  id: number;
  registerFiles: [];
  lastModifiedAt: string;
  missionBonuses: [];
  missionCategory: string;
  missionName: string;
  missionPoint: number;
  status: string;
  teamName: string;
  title: string;
  totalPoint: number;
}

interface RouteState {
  imgIds: [];
}

export default function PostDetail() {
  const [post, setPost] = useState<PostProps>();
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState<string[]>([]);
  const location = useLocation();
  let imgUrl: string[] = [];
    

  const getPost = (postId: number) => {
    axios({
      method: "get",
      url: `/register/${postId}/view`,
    }).then(function (response) {
      setPost(response.data);
      response.data.registerFiles.forEach((id: number) => {
        setImages((prev) => {
            setLoading(false)
            return (
                [...prev, `http://dku-mentor.site/register/image/${id}`]
            )
          });
        
      });
    });
  };
  useEffect(() => {
    const postId = Number(location.pathname.split("/")[2]);
    getPost(postId);
  }, []);

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
            {!loading && <SimpleImageSlider
              width={300}
              height={300}
              images={images}
              showBullets={true}
              showNavs={images.length > 1}
            />
            }
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
              {`${post?.createAt.slice(0, 4)}년 ${post?.createAt.slice(
                5,
                7
              )}월 ${post?.createAt.slice(8, 10)}일 ${post?.createAt.slice(
                11,
                13
              )}시 ${post?.createAt.slice(14, 16)}분`}
            </ContentDate>
          </ContentContainer>
        </Card>
      </Block>
    </>
  );
}
