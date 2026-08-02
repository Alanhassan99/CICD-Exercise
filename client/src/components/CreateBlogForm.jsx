import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const Input = styled.input`
  border: 1px solid #9a9a9a;
  padding: 6px 10px;
  font-size: 1rem;
  outline: none;
  margin-bottom: 10px;
  border-radius: 3px;
  width: 25rem;
  &:focus {
    border-bottom: 1px solid black;
  }
`;

const CreateButton = styled.button`
  background-color: #2b71b2;
  color: #ffffff;
  border-radius: 4px;
  padding: 8px 10px;
  width: 80px;
  cursor: pointer;
  border: none;
  margin-top: 10px;

  &:hover {
    background-color: #112f4b;
  }
`;

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const handleCreation = async () => {
    event.preventDefault();
    const objecto = {
      title,
      author,
      url,
    };
    createBlog(objecto);
    setTitle("");
    setAuthor("");
    setUrl("");
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleCreation}>
        <h2>create new</h2>
        <div>
          <Input
            placeholder="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <Input
            placeholder="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <Input
            placeholder="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <CreateButton type="submit">CREATE</CreateButton>
      </form>
    </div>
  );
};
export default CreateBlogForm;
