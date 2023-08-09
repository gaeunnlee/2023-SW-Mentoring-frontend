import styled from "styled-components";
import Banner from "../components/Banner/Banner";
import Block from "../components/Block";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Paging from "../components/Paging";
import { ImSearch } from "react-icons/im";

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
  font-size: 1rem;
  color: #000;
`;
const MissionCate = styled.div`
  padding: 10px 0;
  font-size: 0.7rem;
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
  position: sticky;
  top: -20px;
  padding: 10px;
  background-color: #f9f9f9;
`;
const DifficultyLabel = styled.label`
  cursor: pointer;
  border: solid 2px #b2dd94;
  background-color: #fff;
  padding: 6px;
  font-size: 14px;
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
const SearchContainer = styled.div`
  position: fixed;
  bottom: 80px;
  max-width: 480px;
  width: 100%;
  box-sizing: border-box;
  padding-right: 30px;
  display: flex;
  justify-content: right;
  z-index: 9999;
`;
const SearchWrapper = styled.button`
  background-color: #85b6e6;
  opacity: 0.6;
  color: #fff;
  padding: 15px;
  font-size: 35px;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  z-index: 99999;
`;
const BlurContainer = styled.button`
  width: 100vw;
  height: 100vh;
  position: fixed;
  max-width: 480px;
  backdrop-filter: blur(2px);
  z-index: 99998;
`;
const SearchInputContainer = styled.form`
  position: fixed;
  border: 0;
  width: 100%;
  height: 100vh;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 450px;
  padding: 20px 0;

  z-index: 999;
`;
const SearchTextInput = styled.input`
  padding: 10px;
  width: 180px;
  font-size: 30px;
  border: 5px solid #85b6e6;
  border-radius: 5px 0px 0px 5px;
  border-right: 0;
  z-index: 999999;
`;
const SearchSubmitInput = styled.input`
  background-color: #85b6e6;
  font-size: 13px;
  -webkit-appearance: none;
  -webkit-border-radius: 0;
  border-radius: 0px 5px 5px 0px;
  -webkit-border-radius: 0px 5px 5px 0px;
  width: 60px;
  color: #fff;
  height: 60px;
  &:hover {
    cursor: pointer;
  }
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
  const [showPage, setShowPage] = useState(true);
  const [originPage, setOriginPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);
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
    setMissionList([]);
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
    setOriginPage(event.selected + 1);
    return undefined;
  };

  const handleSelected = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const input = e.currentTarget;
    const inputName = e.currentTarget.name;
    const originSelected = document.querySelectorAll(`.${inputName}Selected`);
    setMissionList([]);
    if (originSelected.length >= 1) {
      originSelected[0].classList.remove(`${inputName}Selected`);
    }
    e.currentTarget.parentElement?.classList.add(`${inputName}Selected`);
    setInputDefault(false);
    if (inputName === "difficulty") {
      if (input.className.indexOf("all") < 0) {
        setShowPage(false);
      } else {
        setShowPage(true);
      }
      if (document.querySelectorAll(".missionSelected").length > 0) {
        document
          .querySelectorAll(".missionSelected")[0]
          .classList.remove("missionSelected");
      }
    }
  };

  const handleSearch = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowSearch(false);
    setMissions([]);
    handleSelected(event);
    axios({
      method: "get",
      url: `/missions/search?keyword=${encodeURIComponent(
        searchInput
      )}&page=1&size=10`,
    }).then(function (response) {
      setShowSearch((prev) => {
        return !prev;
      });
      setMissionList(response.data.content);
    });
  };

  return (
    <>
      <Banner title="미션" />
      {showSearch && (
        <BlurContainer
          onClick={() => {
            setShowSearch((prev) => {
              return !prev;
            });
          }}
        >
          <SearchInputContainer>
            <SearchTextInput
              type="text"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onChange={(e) => {
                setSearchInput(e.currentTarget.value);
              }}
            />
            <SearchSubmitInput
              type="submit"
              value="검색"
              onClick={(e) => {
                handleSearch(e);
              }}
            />
          </SearchInputContainer>
        </BlurContainer>
      )}
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
                      getMission(originPage);
                      setMissions([]);
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
        <SearchContainer>
          <SearchWrapper
            onClick={() => {
              setShowSearch((prev) => {
                return !prev;
              });
            }}
          >
            <ImSearch />
          </SearchWrapper>
        </SearchContainer>
      </Block>
    </>
  );
}
