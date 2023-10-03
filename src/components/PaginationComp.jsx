import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationComp = ({ setTo, limit, count }) => {
  const [activePage, setActivePage] = useState(1);
  let items = [];

  let limitItems = Math.ceil(count / limit);

  const handlePageChange = (pageNumber) => setActivePage(pageNumber);

  for (let number = 1; number <= limitItems; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handleClick = (ev) => {
    const { text, textContent } = ev.target;

    let page = text ? text : textContent.split("(")[0];
    setTo(page);
  };
  return (
    <Pagination size="md" onClick={handleClick}>
      {items}
    </Pagination>
  );
};

export default PaginationComp;
