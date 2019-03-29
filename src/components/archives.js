import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllBlogs } from '../redux_actions/blogs_actions'
import { timestampToTime } from '../helpers/helpers'
import '../styles/archives.css'

class Archives extends PureComponent {

    componentDidMount() {
        this.props.getAllBlogs()
    }
    render() {
        const { allBlogs } = this.props
        const { blogDetail } = allBlogs
        const blog_list = Object.values(blogDetail)
        return (
            <div className='archives_container'>
                <div>
                    <h1>2019</h1>
                    <ul>
                        {blog_list.map((blog, index) => {
                            return <li style={{ alignSelf: 'flex-start' }} key={index}>
                                <Link to={`/blogDetail/${blog._id}`} style={{ color: '#0fa0fa', textDecoration: 'none', fontSize: 30 }}>{blog.blog_title} 
                                <span style={{ fontSize: 10, marginLeft: 10, color:'black' }}>{blog.create_time ? timestampToTime(blog.create_time, false) : ''}
                                </span></Link>
                               </li>
                        })}

                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allBlogs: state.blogState.blogListInfo,
    }
}

const mapDispatchToProps = {
    getAllBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(Archives)