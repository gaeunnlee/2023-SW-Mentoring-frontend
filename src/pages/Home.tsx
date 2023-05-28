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
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Paging from "../components/Paging";

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
  line-height: 25px;
`;
const ContentTeam = styled.span`
  font-weight: bold;
  margin-right: 7px;
`;
const ContentTitle = styled.span``;
const ContentLink = styled(Link)``;
const ContentDate = styled.p`
  margin-top: 2px;
  font-size: 15px;
  color: #8a8a8a;
`;
interface PostProps {
  date: string;
  id: number;
  missionName: string;
  status: string;
  teamName: string;
  title: string;
  totalScore: number;
  registerFiles: [];
}

interface PageProps {
  pageSize: number;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
}

export default function Home() {
  const loginInfo = useRecoilValue(LoginStateAtom);
  const [post, setPost] = useState<PostProps[]>([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState<PageProps>({
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
  });
  const limit = 5;
  const token = useRecoilValue(LoginStateAtom);
  const location = useLocation();
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!(token.accessToken.length > 0)) {
      navigate("/login");
    }
    const pageNum = location.search.split("?page=")[1];
    getPost(Number(pageNum));
  }, [location]);
  useEffect(() => {
    getPost(1);
  }, []);

  const getPost = (pageNum: number) => {
    axios({
      method: "get",
      url: `/register?page=${pageNum}&size=${limit}`,
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    }).then(function (response) {
      setPageInfo((prev: any) => ({
        ...prev,
        pageSize: response.data.pageSize,
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages,
        pageNumber: response.data.pageNumber,
      }));
      setPage(response.data.pageNumber);
      setPost(response.data.content);
    });
  };
  const handlePageClick = (event: any) => {
    getPost(event.selected + 1);
    return undefined;
  };

  return (
    <>
      <HomeBanner />
      <Block>
        <Paging
          pageCount={pageInfo.totalPages}
          handlePageClick={handlePageClick}
        />
        {post?.map((item) => {
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
                  images={(function () {
                    let imgUrl: string[] = [];
                    item.registerFiles.forEach((imgId) => {
                      imgUrl.push(
                        `http://dku-mentor.site/register/image/${imgId}`
                      );
                    });
                    return imgUrl;
                  })()}
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
                  <ContentLink to={`/post/${item.id}`} state={{imgIds: item.registerFiles}}> 더보기</ContentLink>
                </Content>
                <ContentDate>
                  {`${item.date.slice(0, 4)}년 ${item.date.slice(
                    5,
                    7
                  )}월 ${item.date.slice(8, 10)}일 ${item.date.slice(
                    11,
                    13
                  )}시 ${item.date.slice(14, 16)}분`}
                </ContentDate>
              </ContentContainer>
            </Card>
          );
        })}
      </Block>
    </>
  );
}
