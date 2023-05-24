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
export default function Mission() {
  const [missionList, setMissionList] = useState<MissionListProps[]>();
  const [pageInfo, setPageInfo] = useState<PageProps>({
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    getMission(1);
  }, []);

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
    return undefined;
  };

  return (
    <>
      <Banner title="미션" />
      <Block>
        <Container>
          <Paging
            pageCount={pageInfo.totalPages}
            handlePageClick={handlePageClick}
          />
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
