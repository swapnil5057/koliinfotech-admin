import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { getSingleBlogStart } from "../../redux/Actions/OurTopBlogsAction";
const baseUrl = process.env.REACT_APP_BASE_URL;

const SingleBlog = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    console.log('single blog id~~~~~>',id)
    const SingleBlog = useSelector((state) => state?.blogsDetail);
    const singleBlogData=SingleBlog?.SingleBlog?.ourBlogData
    console.log('singleBlogData~~~~>',singleBlogData)
    const isLoading = SingleBlog?.isLoading;

    useEffect(() => {
        dispatch(getSingleBlogStart(id));
    }, [id]);

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3">Blog Information</div>
                </div>
            </React.Fragment>
        );
    };

    const gotoPrevious = () => {
        history.goBack();
    };

    return (
        <div className="surface-section card" style={{ margin: "1%", padding: "1%" }} isLoading={isLoading}>
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <ul className="list-none p-0 m-0">
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Title</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleBlogData?.title}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Description</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleBlogData?.description}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Image</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">
                        <img src={singleBlogData?.image} width={"150"} />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default SingleBlog;
