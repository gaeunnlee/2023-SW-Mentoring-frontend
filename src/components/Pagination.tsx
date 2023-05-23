import axios from "axios";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { LoginStateAtom } from "../state/LoginState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button<{ areaCurrent?: string }>`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: #f4c855;
  color: #fdf6e5;
  font-size: 1rem;

  &:hover {
    background: #ffa46c;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: #fdf6e5;
    color: #f4c855;
    cursor: revert;
    transform: revert;
    pointer-events: none;
  }

  .current {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

interface PageProps {
  total: number;
  limit: number;
  page: number;
  currentPage: number;
  setPage(arg0: number): void;
}

interface PageInfoProps {
  pageSize: number;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
}
export default function Pagination({ total, limit, page, currentPage, setPage }: PageProps) {
  const token = useRecoilValue(LoginStateAtom);
  const [pageInfo, getPageInfo] = useState<PageInfoProps>({
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0
  });
  const [ pageData, setPageData ] = useState<PageProps>({
    total: 0,
    limit: 0,
    page: 0,
    currentPage: 0,
    setPage
  })
  const navigate = useNavigate();
  const numPages = Math.ceil(total / limit);
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
      console.log(response.data);
      getPageInfo((prev: any) => ({
        ...prev,
        pageSize: response.data.pageSize,
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages,
        pageNumber: response.data.pageNumber
      }));
    });
  };
  return (
    <>
      <Nav>
        <Button
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={pageInfo.pageNumber === 1}
        >
          &lt;
        </Button>
        {Array(numPages)
          .fill(0)
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => {
                setPage(i + 1)
                navigate(`?page=${i + 1}`)
                console.log(currentPage)
              }}
              className={currentPage === i + 1 ? "current" : undefined}
            >
              {i + 1}
            </Button>
          ))}
        <Button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page === numPages}
        >
          &gt;
        </Button>
      </Nav>
    </>
  );
}
