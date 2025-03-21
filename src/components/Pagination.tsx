import styled from "styled-components";
import { SmallButton } from "../reusableStyle/buttons";
import { apiClient } from "../apiCRM";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Main = styled.div``;
const Pagination = () => {
  const [page, setPage] = useState<number>();
  const [pageArray, setPageArray] = useState<number[]>([]);
  const navigate = useNavigate();

  const clickedPage = useSelector((state) => state.paginationState.clickedPage);
  const id = useSelector((state) => state.paginationState.idCustomer);

  const getCustomers = async (triggedPage: string, _id: string) => {
    try {
      const response = await apiClient.get(
        `/${triggedPage}/${triggedPage === "actions" ? id : ""}`
      );
      setPage(response.data.pages);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const createPagination = (pageNumber: number) => {
    let arrayPageNumber: number[] = [];
    if (clickedPage === "actions") {
      for (let i = 1; i <= pageNumber - 1; i++) {
        arrayPageNumber.push(i);
      }
    } else if (clickedPage === "customers") {
      for (let i = 1; i <= pageNumber; i++) {
        arrayPageNumber.push(i);
      }
    }

    setPageArray(arrayPageNumber);
  };

  useEffect(() => {
    getCustomers(clickedPage, id);
    createPagination(page);
  }, [page]);

  return (
    <Main>
      {pageArray.length > 1 ? (
        pageArray.map((aPage) => (
          <SmallButton
            onClick={() => {
              if (clickedPage === "actions") {
                navigate(`/customer/${id}/?page=${aPage}&limit=10`);
              } else if (clickedPage === "customers") {
                navigate(`/?page=${aPage}&limit=10`);
              }
            }}
          >
            {aPage}
          </SmallButton>
        ))
      ) : (
        <></>
      )}
    </Main>
  );
};

export default Pagination;
