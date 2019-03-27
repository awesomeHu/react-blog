import React, { Component, PureComponent } from 'react';
import Icon, { SocialMediaIcon } from './icons';
import '../styles/right_side_bar.css';
import { withRouter } from 'react-router-dom'

export default class RightSideBar extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        allBlogs: { allBlogList: [] },
        allCategories: { list: [] }
    }
    componentDidMount() {
        if (this.props.allBlogs.allBlogList && this.props.allBlogs.allBlogList.length <= 0 || (this.props.allCategories && this.props.allCategories.list && this.props.allCategories.list.length <= 0)) {
            this.props.getAllBlogs()
            this.props.fetchAllCategories()
        }
    }


    render() {
        const { allBlogs, history, allCategories } = this.props;
        const { blogList, allBlogList, blogDetail } = allBlogs
        const blog_list = Object.values(blogDetail)
        const categories = []
        const categories_name = {}
        allCategories && allCategories.list && allCategories.list.forEach(category => categories_name[category._id] = category.name)
        for (let key in blogList) {
            let tempCategories = {}
            tempCategories[key] = blogList[key]
            tempCategories['name'] = categories_name[key]
            categories.push(tempCategories)
        }
        return (
            <div>
                <RecentBlog blogsData={blog_list} history={history} />
                <div className='right_side_bar_seperator' />
                <Categories categoryList={categories} history={history} />
                <div className='right_side_bar_seperator' />
                <SociaMedia />
            </div>
        )
    }
}



class RecentBlog extends PureComponent {
    constructor(props) {
        super(props);

    }

    _handleClickRecentPost = (blog_id) => {
        this.props.history.push({ pathname: `/blogDetail/${blog_id}` })
    }

    render() {
        return (
            <div className='recent_blog'>
                <h3 style={{
                    fontFamily: 'Times New Roman',
                }}>RECENT POSTS</h3>
                <div>
                    <ul>
                        {this.props.blogsData.slice(0, 5).map((blog, index) => <li onClick={() => { this._handleClickRecentPost(blog._id) }} key={index}>{blog.blog_title}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

class Categories extends PureComponent {

    _handleClickCategory = (id) => {

        const path = {
            pathname: '/blogs',
            search: `?category_id=${id}`,
            query: { category_id: id },
            clickCategory: true
        }
        this.props.history.push(path)
    }
    render() {
        return (
            <div className='categories'>
                <h3 style={{
                    fontFamily: 'Times New Roman',
                }}>CATEGORIES</h3>
                <ul>
                    {this.props.categoryList.map((category, index) => {
                        return <li key={index} onClick={() => this._handleClickCategory(Object.keys(category)[0])}>
                            {category.name} <span>(</span>{Object.values(category)[0].length}<span>)</span>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}


class PersonalSocialMedia extends PureComponent {


    handleClickIcon = () => {
        this.props.history.push('/about_me')
    }
    render() {
        const socialMedia = [];
        {
            ['facebook', 'email', 'github', 'weChat'].map((name, index) => {
                socialMedia.push(<div className='social_icon_style' key={index} onClick={this.handleClickIcon}><SocialMediaIcon icon={name} /></div>)
            })
        }

        return (
            <div className='socia_media'>
                <h3 style={{
                    fontFamily: 'Roboto Slab, Times New Roman, serif',
                }}>CONTACT ME</h3>
                <div className='socia_media_icon'>
                    {socialMedia}
                </div>

            </div>
        )
    }
}

const SociaMedia = withRouter(PersonalSocialMedia)