import React, { Component, PureComponent } from 'react';
import Icon from './icons';
import { PageNumber } from './footer';
import RightSideBar from '../redux_container/right_side_bar_container';
import { timestampToTime } from '../helpers/helpers'
import LoadingPage from './loading_page';
import LoadingAnimation from './loading_animation';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../styles/blogs.css'

export default class Blogs extends PureComponent {
    constructor(props) {
        super(props);
        this.blog_list = ''
    }

    componentDidMount() {
        this.props.getAllBlogs()
        this.props.fetchAllCategories()
    }


    render() {
        const {
            allBlogs,
            history,
            allCategories
        } = this.props
        const { blogList } = allBlogs
        const categories_name = {}
        allCategories && allCategories.list && allCategories.list.forEach(category => categories_name[category._id] = category.name)
        this.blog_list = this.props.location.query && this.props.location.query.category_id ? blogList[this.props.location.query.category_id] : Object.values(allBlogs.blogDetail)

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                padding:'50px 100px 100px 170px'
            }}>
                <div style={{
                    top: 50,
                    left: 170,
                    marginRight:100,
                    display: 'flex',
                    flexDirection: 'column',
                    width: 780,
                    height: 'auto'
                }}>

                    {this.props.allBlogs.is_fetching ? <div style={styles.loading}>
                        <LoadingAnimation style={styles.noticeView} width={450} height={450}/>
                    </div> : this.blog_list && this.blog_list.map((blog, index) => {
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
        return ( <ReactCSSTransitionGroup
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

                <div style={styles.icon_style}><Icon icon='like' /><div style={{ marginLeft: 7, marginTop:5, alignSelf: 'center' }}>{num_of_likes ? num_of_likes : 0}</div>
                </div>
                <div style={Object.assign({}, styles.icon_style,{ marginTop:3} )}><Icon icon='views' /><div style={{ marginLeft: 7, alignSelf: 'center' }}>{views ? views : 0}</div>
                </div>
            </div>

            <div style={{
                lineHeight: 1.6,
                fontSize: 15,
                color: '#544031',
                width:700,
                overflow:'hidden'
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
        border: '0.4px solid grey',
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
