import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Autocomplete from "react-autocomplete";
import { validate } from "./../src/Utils/ValidateFormData";
import ProductTable from "../src/Components/ProductTable/ProductTable";

export default function Home() {
  const [items, setItems] = useState([]);
  const [titleValue, setTitleValue] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [formValue, setFormValue] = useState({
    quantity: 0,
    price: 0,
    date: new Date(),
  });
  const [submitData, setSubmitData] = useState([]);
  const formData = {
    titleValue: titleValue,
    quantity: formValue.quantity,
    price: formValue.price,
    date: formValue.date,
  };
  const renderItemTitle = (state, val) => {
    return state.title.toLowerCase().indexOf(val.toLowerCase()) !== -1;
  };
  function getLocalStorageData(itemName) {
    return JSON.parse(localStorage.getItem(itemName));
  }

  useEffect(() => {
    const loadItems = async () => {
      const result = await axios.get(
        `https://pokemmoprices.com/api/v2/items/all?noDescription=true#`
      );
      const data = result.data.data;
      const list = data.map((item) => {
        return { title: item.n.en };
      });
      setItems(list);
    };

    loadItems();
  }, []);

  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && submitData) {
    }
  }, [formErrors]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formData));
    if (formErrors) {
      setSubmitData([]);
    }
    setSubmitData([...submitData, formData]);
    // localStorage.setItem("items", JSON.stringify(submitData));
  };

  const [allItems, setAllItems] = useState([]);
  useEffect(() => {
    const myExpectedItemsName = "items";
    const data = getLocalStorageData(myExpectedItemsName)
      ? getLocalStorageData(myExpectedItemsName)
      : [];
    /**
     * Handle the settings of items in the local storeage
     */
    submitData.length &&
      localStorage.setItem(
        myExpectedItemsName,
        JSON.stringify([formData, ...data])
      );
    setAllItems(getLocalStorageData(myExpectedItemsName) || []);
  }, [submitData]);
  return (
    <div className="container m-5">
      <form className=" d-flex justify-content-between" onSubmit={handleSubmit}>
        <div className="col-md-2">
          <Autocomplete
            required
            className="form-control"
            placeholder="Item"
            value={titleValue}
            items={items}
            name
            getItemValue={(item) => item.title}
            shouldItemRender={renderItemTitle}
            renderMenu={(item) => <div className="dropdown">{item}</div>}
            renderItem={(item, isHighlighted) => (
              <div className={`item ${isHighlighted ? "selected-item" : ""}`}>
                {item.title}
              </div>
            )}
            onChange={(event, val) => setTitleValue(val)}
            onSelect={(val) => setTitleValue(val)}
          />
          <p className="text-danger">{formErrors.titleValue}</p>
        </div>
        <div className="col-md-2">
          <input
            required
            className="form-control "
            onChange={changeHandler}
            name="quantity"
            placeholder="Quantity"
            type="text"
          ></input>
          <p className="text-danger">{formErrors.quantity}</p>
        </div>

        <div className="col-md-2">
          <input
            required
            className="form-control"
            name="price"
            onChange={changeHandler}
            placeholder="Price"
            type="text"
          ></input>
          <p className="text-danger">{formErrors.price}</p>
        </div>

        <div className="col-md-2">
          <input
            required
            className="form-control"
            name="date"
            onChange={changeHandler}
            placeholder="date"
            type="date"
          ></input>
          <p className="text-danger">{formErrors.date}</p>
        </div>

        <div className="col-md-2">
          <button type="submit" className=" btn btn-success">
            add
          </button>
        </div>
      </form>

      <div className="mt-5 mb-5">
        <h3 className="text-success text-decoration-underline">
          Your Invesments
        </h3>
      </div>

      <ProductTable setAllItems={setAllItems} allItems={allItems} />
    </div>
  );
}
