import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useBlogActions } from '../blogstore'

const Input = styled.input`
  border: 1px solid #9a9a9a;
  padding: 10px 10px;
  font-size: 1rem;
  outline: none;
  margin-bottom: 10px;
   margin-right: 10px;
  border-radius: 3px;
  width:10rem;
  height: 40px;
  box-sizing: border-box;
  &:focus {
    border-bottom: 1px solid black;
  }
`;

const CreateButton = styled.button`
  background-color: #2b71b2;
  color: #ffffff;
  border-radius: 4px;
  padding: 10px 10px;
  height: 40px;
  box-sizing: border-box;
  width: 8rem;
  cursor: pointer;
  border: none;
  margin-top: 10px;

  &:hover {
    background-color: #112f4b;
  }
`;

const Wrapper = styled.div`
  margin-top: 10px;
  border: 1px;
  border-radius: 4px;
  box-shadow: 1px 1px 10px #c4c4c4;
  padding: 10px;
`;
const Wrapper2 = styled.div`
  display: flex;
  align-items: center;
`;

const H2 = styled.h2`
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 0;
`;
const LI = styled.li`
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
`;
const P1 = styled.p`
  font-weight: normal;
  color: #928e8e;
  font-size: 18px;
  margin-top: 8px;
  margin-bottom: 0;
`;
const P2 = styled.p`
  font-weight: normal;
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 0;
`;
const P3 = styled.p`
  font-weight: normal;
  color: #928e8e;
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 0;
`;
const P4 = styled.p`
  font-weight: normal;
  color: #000000;
  font-size: 18px;
  margin-top: 8px;
  margin-bottom: 0;
  margin-right: 10px;
`;
const LikeButton = styled.button`
  color: #3c8fe7;
  border-radius: 4px;
  padding: 8px 10px;
  width: 60px;
  cursor: pointer;
  border: 1px solid #3c8fe7;
  margin-top: 10px;
  font-size: 14px;
  background-color: white;
  margin-right: 10px;

  &:hover {
    background-color: #0b4e8d;
  }
`;
const RemoveButton = styled.button`
  color: #ed3a3a;
  border-radius: 4px;
  padding: 8px 10px;
  width: 60px;
  cursor: pointer;
  border: 1px solid #ed3a3a;
  margin-top: 10px;
  font-size: 14px;
  background-color: white;
  margin-right: 10px;
  width: 90px;

  &:hover {
    background-color: #810f0f;
  }
`;

const Blog = ({ blogs, user, handleBlogRemove }) => {
  const navigate = useNavigate();
  const { blogLike } = useBlogActions()
  const { blogComment } = useBlogActions()
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  const [comment, setComment] = useState('')



  if (!blog) {
    return <div>loading...</div>;
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleBlogRemove(blog?.id);
    }
  };

  const handleLike = () => {
    const object = {
      id: blog.id,
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    };
    blogLike(object);
  };

  const handleComment = () => {
    const id = blog.id
    blogComment(id, comment)
    setComment('')
  }
  return (
    <Wrapper>
      <H2>{blog.title}</H2>
      <P1>by {blog.author}</P1>
      <P2>
        <a href={blog.url}>{blog.url}</a>
      </P2>
      <P3>Added by {blog.user.name}</P3>
      <Wrapper2>
        <P4>{blog.likes} likes</P4>
        {user && <LikeButton onClick={handleLike}>LIKE</LikeButton>}
        {user && user.username === blog.user.username && (
          <RemoveButton onClick={handleRemove}>REMOVE</RemoveButton>
        )}
      </Wrapper2>
      <h3 style={{ fontWeight: 'normal' }}>Comments</h3>
      <form onSubmit={handleComment}>
        <div>
          <Input
            placeholder="Add a comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <CreateButton type="submit">ADD COMMENT</CreateButton>
        </div>
      </form>
      <ul>

        {
          blog?.comments.map((comment, index) => (
            <LI key={index}>{comment}</LI>
          )
          )
        }
      </ul>
    </Wrapper>
  );
};

export default Blog;
