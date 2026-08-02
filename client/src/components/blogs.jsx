import { Link } from "react-router-dom";
import SuccessNotification from "./successNotification";
const Blogs = ({ blogs, message }) => {
  return (
    <div>
      <SuccessNotification message={message} />
      <h1>Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
