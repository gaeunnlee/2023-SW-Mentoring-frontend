import styled from "styled-components";
import Banner from "../components/Banner/Banner";
import Block from "../components/Block";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Paging from "../components/Paging";

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
const FilterContainer = styled.div``;
const DifficultyContainer = styled.div`
  display: flex;
  gap: 0.8vw;
`;
const DifficultyLabel = styled.label`
  cursor: pointer;
  border: solid 2px #b2dd94;
  background-color: #fff;
  padding: 8px;
  border-radius: 5px;
  &.difficultySelected {
    background-color: #b2dd94;
  }
`;
const DifficultyInput = styled.input.attrs({ type: "radio" })`
  display: none;
`;
const MissionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface MissionListProps {
  bonusList: [];
  category: string;
  description: string;
  id: number;
  info: string;
  name: string;
  point: number;
}
interface PageProps {
  pageSize: number;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
}
interface DifficultiesProps {
  id: string;
  name: string;
}
interface selectedMissionProps {
  id: number;
  name: string;
}
export default function Mission() {
  const [missionList, setMissionList] = useState<MissionListProps[]>();
  const [difficulties, getDifficulties] = useState<DifficultiesProps[]>();
  const [missions, setMissions] = useState<MissionListProps[]>();
  const [showPage, setShowPage] = useState(true)
  const [originPage, setOriginPage] = useState(1)
  const [pageInfo, setPageInfo] = useState<PageProps>({
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
  });
  const [selectedMission, setSelectedMission] = useState<selectedMissionProps>({
    id: 0,
    name: "",
  });
  const [page, setPage] = useState(1);
  const [inputDefault, setInputDefault] = useState(false);
  useEffect(() => {
    getMission(1);
    axios({
      method: "get",
      url: "/missions/difficulty",
    }).then(function (response) {
      getDifficulties(response.data);
    });
  }, []);
  const getMissionLevel = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const selected = event.currentTarget.value;
    axios({
      method: "get",
      url: `/missions/difficulty/${selected}?page=1&size=100`,
    }).then(function (response) {
      setMissions(response.data.content);
    });
  };
  const getMission = (pageNum: number) => {
    axios({
      method: "get",
      url: `/missions?page=${pageNum}&size=10`,
    }).then(function (response) {
      setMissionList(response.data.content);
      setPageInfo((prev: any) => ({
        ...prev,
        pageSize: response.data.pageSize,
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages,
        pageNumber: response.data.pageNumber,
      }));
    });
  };
  const handlePageClick = (event: any) => {
    getMission(event.selected + 1);
    setOriginPage(event.selected + 1)
    return undefined;
  };

  const handleSelected = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const input = e.currentTarget
    const inputName = e.currentTarget.name;
    const originSelected = document.querySelectorAll(`.${inputName}Selected`);
    setMissionList([]);
    if (originSelected.length >= 1) {
      originSelected[0].classList.remove(`${inputName}Selected`);
    }
    e.currentTarget.parentElement?.classList.add(`${inputName}Selected`);
    setInputDefault(false);
    if (inputName === "difficulty") {
      if (input.className.indexOf("all") < 0 ) {
        setShowPage(false)
      } else {
        setShowPage(true)
      }
      if (document.querySelectorAll(".missionSelected").length > 0) {
        document
          .querySelectorAll(".missionSelected")[0]
          .classList.remove("missionSelected");
      }
    }
  };

  return (
    <>
      <Banner title="미션" />
      <Block>
        <Container>
          <Paging
            show={showPage}
            pageCount={pageInfo.totalPages}
            handlePageClick={handlePageClick}
          />
          <FilterContainer>
            <MissionsContainer>
              <DifficultyContainer>
                <DifficultyLabel>
                  <DifficultyInput
                    name="difficulty"
                    value="all"
                    className="all"
                    onClick={(e) => {
                      getMission(originPage)
                      setMissions([])
                      handleSelected(e);
                    }}
                  />
                  전체
                </DifficultyLabel>
                {difficulties?.map((item) => {
                  return (
                    <DifficultyLabel>
                      <DifficultyInput
                        name="difficulty"
                        value={item.id}
                        onClick={(e) => {
                          getMissionLevel(e);
                          handleSelected(e);
                        }}
                      />
                      {item.name}
                    </DifficultyLabel>
                  );
                })}
              </DifficultyContainer>
              {missions?.map((item) => {
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
            </MissionsContainer>
          </FilterContainer>
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
