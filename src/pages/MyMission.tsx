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
import { useNavigate } from "react-router-dom";
import { get } from "http";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin: 10px 0;
`;
const TopContainer = styled.div`
  padding: 20px 15px 10px 10px;
  background-color: #f2f2f2;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3px;
`;
const LeftContainer = styled.div`
  display: flex;
`
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
const Delete = styled.button`
  background-color: #fa5757;
  color: #fff;
  padding: 6px;
  border-radius:5px;
  font-size: 15px;
`
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
interface PostProps {
  date : string;
  id : number;
  missionName : string;
  status : string;
  teamName : string;
  title : string;
  totalScore : number;
  registerFiles: [];  
}

export default function MyMission() {
  const loginInfo = useRecoilValue(LoginStateAtom)
  const [ post, setPost ] = useState<PostProps[]>();  
  const token = useRecoilValue(LoginStateAtom)
  const navigate = useNavigate()
  useEffect(()=> {
    console.log(token.accessToken)
    getPost()
  },[])
  const getPost = () => {
    axios({
      method: 'get',
      url: `/register/my-team`,
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      },
    }).then(function (response){
      setPost(response.data.content)
    })
  }
  const deletePost =  (id: number) => {
    alert(`${id}를 삭제하겠습니까?`)
       axios.delete(`/register/${id}`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`
        }
      }).then((response)=>{
        alert("삭제 완료되었습니다.")
      })
    }
  
  return (
    <>
      <HomeBanner />
      <Block>
        {post?.map((item) => {
          return (
            <Card>
              <TopContainer>
                <LeftContainer>
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
                </LeftContainer>
                <Delete onClick={() => deletePost(item.id)}>
                  삭제
                </Delete>
              </TopContainer>
              <ImgContainer>
                <SimpleImageSlider
                  width={300}
                  height={300}
                  images={
                    (function(){
                      let imgUrl : string[] = []
                      item.registerFiles.forEach((imgId)=>{
                        imgUrl.push(`http://dku-mentor.site/register/image/${imgId}`)
                      })
                      return(imgUrl)
                    })()
                  }
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
