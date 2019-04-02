import React, { Component, PureComponent } from 'react';
import Icon from './icons';
import { PageNumber } from './footer';
import RightSideBar from '../redux_container/right_side_bar_container';
import { timestampToTime } from '../helpers/helpers'
import LoadingPage from './loading_page';
import LoadingAnimation from './loading_animation';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Pagination } from 'antd'
import '../styles/pagination.css';
import '../styles/blogs.css'

export default class Blogs extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            blog_list: [],
            current_page_num: 1,
            total: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        const { allBlogs } = this.props
        const { blogList } = allBlogs
        if (this.props.location !== nextProps.location && nextProps.location.query && nextProps.location.query.category_id) {
            this.setState({
                blog_list: blogList[nextProps.location.query.category_id].slice(0, 5),
                total: blogList[nextProps.location.query.category_id].length
            })
        }
        else {
            this.setState({
                blog_list: Object.values(nextProps.allBlogs.blogDetail).slice(0, 5),
                total: Object.values(nextProps.allBlogs.blogDetail).length
            })
        }
    }

    componentDidMount() {
        this.props.getAllBlogs()
        this.props.fetchAllCategories()
    }
    handlePageNumChange = (pageNum) => {
        this.setState({
            current_page_num: pageNum
        })
    }

    onChangeBlogList = (pageNum) => {
        const { allBlogs, location } = this.props
        const { blogList } = allBlogs
        let start_index = pageNum > 1 ? (pageNum - 1) * 5 : 0
        let end_index = pageNum > 1 ? pageNum * 5 : 5
        this.setState({
            blog_list: Object.values(location.query && location.query.category_id ? 
                blogList[location.query.category_id] : allBlogs.blogDetail).slice(start_index, end_index)
        })
    }
   
    render() {
        const {
            allBlogs,
            history,
            allCategories
        } = this.props
        const { blogList, total } = allBlogs
        const categories_name = {}
        allCategories && allCategories.list && allCategories.list.forEach(category => categories_name[category._id] = category.name)

        return (
            this.props.allBlogs.is_fetching ? <div style={styles.loading}>
                <LoadingAnimation style={styles.noticeView} width={550} height={550} />
            </div> : <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: 'auto',
                padding: '50px 100px 100px 120px'
            }}>
                    <div style={{
                        top: 50,
                        left: 170,
                        marginRight: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        width: 780,
                        height: 'auto'
                    }}>

                        {this.state.blog_list && this.state.blog_list.map((blog, index) => {
                            const { category,
                                blog_title,
                                blog_content,
                                author,
                                create_time,
                                blog_comments,
                                _id,
                            } = blog;
                            return (<SingleBlog
                                category={categories_name[category[0]]}
                                blog_title={blog_title}
                                num_of_likes={blog.meta.likes}
                                views={blog.meta.views}
                                blog_content={blog_content}
                                author={author}
                                create_time={create_time}
                                blog_comments={blog_comments}
                                blog_id={_id}
                                blog={blog}
                                history={history}
                                key={index}
                            />)
                        })}
                        {this.state.blog_list.length > 0 && <div style={{ textAlign: 'center', marginTop: 20 }}>
                            <Pagination
                                defaultPageSize={5}
                                onChange={(pageNum) => {
                                    this.onChangeBlogList(pageNum);
                                    this.handlePageNumChange(pageNum)
                                }}
                                current={this.state.current_page_num}
                                total={this.state.total ? this.state.total : total}
                            />
                        </div>}
                    </div>
                    <div style={{
                        top: 50,
                        padding: '10px 15px 70px 15px',
                        width: 300,
                        height: 600,
                        backgroundColor: 'white',
                    }}><RightSideBar history={this.props.history} /></div>
                </div>
        )
    }
}

export class SingleBlog extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
        }
        this.hoverElements = {
            title: false,
            button: false
        }
    }

    handleClickReadMore = () => {
        const { blog_id,
            history,
        } = this.props;
        const path = {
            pathname: `/blogDetail/${blog_id}`,
        }
        history.push(path)
    }

    render() {
        const {
            category,
            blog_title,
            num_of_likes,
            blog_content,
            blog_comments,
            author,
            create_time,
            views
        } = this.props
        return (<ReactCSSTransitionGroup
            key={this.props.blog_id}
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
        >
            <div style={styles.blogStyle}>
                <div style={{
                    color: '#00bcd4',
                    marginBottom: 8,
                    fontSize: 12
                }}>{category}</div>
                <div style={Object.assign({}, styles.blogTitleStyle, { color: this.state.hovered && this.hoverElements.title ? '#DC143C' : 'black' })}
                    onMouseEnter={() => { this.setState({ hovered: true }); this.hoverElements.title = true }}
                    onMouseLeave={() => { this.setState({ hovered: false }); this.hoverElements.title = false }}
                    onClick={this.handleClickReadMore}
                >
                    {blog_title} </div>

                <div style={styles.blogInfoStyle}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',

                    }}><Icon icon='date' /><div style={{ marginLeft: 7, alignSelf: 'center' }}>{create_time ? timestampToTime(create_time, false) : ''}</div>
                    </div>

                    <div style={styles.icon_style}><Icon icon='user' /><div style={{ marginLeft: 7, alignSelf: 'center' }}>{author}</div>
                    </div>
                    <div style={Object.assign({}, styles.icon_style, { color: 'black' })}
                        onMouseEnter={() => { this.setState({ hovered: true }); this.hoverElements.comment = true }}
                        onMouseLeave={() => { this.setState({ hovered: false }); this.hoverElements.comment = false }}>
                        <Icon icon='comment' /><div style={{ marginLeft: 7, alignSelf: 'center' }}>{blog_comments ? blog_comments.length : 'Leave a comment'}</div>
                    </div>

                    <div style={styles.icon_style}><Icon icon='like' /><div style={{ marginLeft: 7, marginTop: 5, alignSelf: 'center' }}>{num_of_likes ? num_of_likes : 0}</div>
                    </div>
                    <div style={Object.assign({}, styles.icon_style, { marginTop: 3 })}><Icon icon='views' /><div style={{ marginLeft: 7, alignSelf: 'center' }}>{views ? views : 0}</div>
                    </div>
                </div>

                <div style={{
                    lineHeight: 1.6,
                    fontSize: 15,
                    color: '#544031',
                    width: 700,
                    overflow: 'hidden'
                }}>
                    {blog_content.split(' ').slice(0, 40).join(' ')}
                </div>

                <div style={Object.assign({}, styles.buttonStyle, { backgroundColor: this.state.hovered && this.hoverElements.button ? '#808080' : '#DC143C' })}
                    onClick={this.handleClickReadMore}
                    onMouseEnter={() => { this.setState({ hovered: true }); this.hoverElements.button = true }}
                    onMouseLeave={() => { this.setState({ hovered: false }); this.hoverElements.button = false }}
                ><p>READ MORE</p>
                </div>


            </div>
        </ReactCSSTransitionGroup>
        )

    }
}


const styles = {
    blogStyle: {
        padding: 40,
        // marginTop: 50,
        marginBottom: 50,
        width: 700,
        height: 'auto',
        borderRadius: 2,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Verdana',
    },
    blogTitleStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        cursor: 'pointer',
    },
    blogInfoStyle: {
        marginTop: 25,
        marginBottom: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        opacity: 0.5,
        fontSize: 13
    },
    buttonStyle: {
        cursor: 'pointer',
        width: 90,
        height: 40,
        marginTop: 'auto',
        borderRadius: 5,
        color: 'white',
        fontSize: 11,
        textDecoration: 'underline',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: 20,
        left: 600
    },
    icon_style: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 30
    },
    loading: {
        display: 'flex',
        alignSelf: 'stretch',
        flex: 1,
        minHeight: 800,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noticeView: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',
    }

}
