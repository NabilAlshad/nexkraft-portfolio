import React, { useEffect, useState } from "react";
import { tableHeads } from "./../../Constants/TableHeads";

const ProductTable = ({ setAllItems, allItems }) => {
  console.log("items is ", allItems);
  const handleDelete = (index) => {
    const updatedData = [...allItems];
    updatedData.splice(index, 1);
    setAllItems(updatedData);
    localStorage.setItem("items", JSON.stringify(updatedData));
  };
  console.log({ allItems });
  return (
    <>
      <table class="table">
        <thead>
          <tr>
            {tableHeads.map((title, index) => (
              <th className="text-center" key={index} scope="col">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allItems.map((item, index) => (
            <tr key={index}>
              <td className="text-center">{item.titleValue}</td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-center">{item.price}</td>
              <td className="text-center">{item.date}</td>
              <td className="text-center">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
