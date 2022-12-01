import React from "react";
import SingleRequest from "./components/SingleRequest";

type Props = {};

// dummy data
const requests = [
  {
    id: 0,
    name: "Ahmed Saleh Mustafa",
    phone: "+01015949764",
    address: "Egypt, cairo",
  },
  {
    id: 1,
    name: "Ahmed Saleh Mustafa",
    phone: "+01015949764",
    address: "Egypt, cairo",
  },
  {
    id: 2,
    name: "Ahmed Saleh Mustafa",
    phone: "+01015949764",
    address: "Egypt, cairo",
  },
  {
    id: 3,
    name: "Ahmed Saleh Mustafa",
    phone: "+01015949764",
    address: "Egypt, cairo",
  },
  {
    id: 4,
    name: "Ahmed Saleh Mustafa",
    phone: "+01015949764",
    address: "Egypt, cairo",
  },
  {
    id: 5,
    name: "Ahmed Saleh Mustafa",
    phone: "+01015949764",
    address: "Egypt, cairo",
  },
  {
    id: 6,
    name: "Ahmed Saleh Mustafa",
    phone: "+01015949764",
    address: "Egypt, cairo",
  },
  {
    id: 7,
    name: "Ahmed Saleh Mustafa",
    phone: "+01015949764",
    address: "Egypt, cairo",
  },
];

const RequestPage = (props: Props) => {
  return (
    <div className="flex flex-col xs:flex-row xs:items-center justify-center mt-10 lg:justify-start flex-wrap gap-2 m-4">
      {requests.map((request) => {
        return <SingleRequest {...request} key={request.id} />;
      })}
    </div>
  );
};

export default RequestPage;
