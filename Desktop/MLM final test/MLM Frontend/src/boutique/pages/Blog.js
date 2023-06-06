import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment/moment";


const Blog = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state?.blogweb?.blog);
  useEffect(() => {
    getBlog();
  }, []);
  const getBlog = () => {
    dispatch(getAllBlogs());
  };
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Rechercher par catégories</h3>
              <div>
                <ul className="ps-0">
                  <li>Vetements</li>
                  <li>Cosmétique</li>
                  <li>Accessoires</li>
                  <li>Accessoires voitures</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
            {blogState && blogState.map((item, index) => {
                return (
                  <div className="col-4 mb-3 pb-2" key={index}>
                    <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      image={item?.images[0]?.url} 
                      date = {moment(item?.createdAt).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
