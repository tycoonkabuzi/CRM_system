import styled from "styled-components";
import { SmallButton } from "../reusableStyle/buttons";
import { apiClient } from "../apiCRM";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Main = styled.div``;
const Pagination = () => {
  const [page, setPage] = useState<number>();
  const [pageArray, setPageArray] = useState<number[]>([]);

  const getCustomers = async () => {
    try {
      const response = await apiClient.get(`/customers`);
      setPage(response.data.pages);
      console.log(response.data.pages);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const createPagination = (pageNumber: number) => {
    let arrayPageNumber: number[] = [];
    for (let i = 1; i <= pageNumber; i++) {
      arrayPageNumber.push(i);
    }
    setPageArray(arrayPageNumber);
    console.log(arrayPageNumber);
  };
  useEffect(() => {
    getCustomers();
    createPagination(page);
  }, [page]);
  const navigate = useNavigate();
  return (
    <Main>
      {pageArray.length > 1 ? (
        pageArray.map((aPage) => (
          <SmallButton
            onClick={() => navigate(`/customers?page=${aPage} &limit=10`)}
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
