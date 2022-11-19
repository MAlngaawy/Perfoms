import React from "react";
import UsersCard from "./SubComponents/UsersCard";

type Props = {};

const usersData = [
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
  {
    name: "mohamed",
    id: 1,
    image:
      "https://media.istockphoto.com/id/1221796966/photo/young-soccer-player-portrait-on-the-empty-stadium.jpg?s=612x612&w=0&k=20&c=TbBtuY4YooEd7DxreBBhm0SJ6BX43TK9TBUWF8b5pmc=",
  },
];

const Users = (props: Props) => {
  return (
    <div className="flex flex-col gap-6  p-2 sm:p-6">
      <UsersCard type="Coach" data={usersData} />
      <UsersCard type="Supervisor" data={usersData} />
      <UsersCard type="Player" data={usersData} />
    </div>
  );
};

export default Users;
