import React, { PureComponent, Component } from 'react';
import { LongSeperatorLine, TextInput } from './blog_page';
import '../styles/administration.css';
import 'simplemde/dist/simplemde.min.css';
import Icon from './icons';
import { Link } from 'react-router-dom';
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import { notice } from './popup';
import { Logoutbutton } from './header';
import { timestampToTime } from '../helpers/helpers'


export class AdminPage extends PureComponent {
  
    render() {
        const { history } = this.props
        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div><LeftSideBar history={history} /></div>
                {this.props.children}
            </div>
        )
    }
}

export class BlogManagement extends PureComponent {

    componentDidMount() {
        this.props.getAllBlogs()
        this.props.fetchAllCategories()
    }
    render() {
        return (<AdminPage history={this.props.history}>
            <div style={{
                width: 3000,
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto'
            }}>
                <h1 style={{ alignSelf: 'center' }}>Blog Management</h1>
                <div><BlogsListView {...this.props} /></div>
            </div>
        </AdminPage>)
    }
}

class BlogsListView extends PureComponent {

    render() {
        const blog_list = this.props.allBlogs.blogDetail && Object.values(this.props.allBlogs.blogDetail)
        return (
            <div>
                {blog_list && blog_list.map((blog, index) => <BlogItem
                    blogTitle={blog.blog_title}
                    blogContent={blog.blog_content}
                    category={blog.category[0]}
                    publishedDate={blog.create_time}
                    numOfComment={blog.meta.comments}
                    numOfLikes={blog.meta.likes}
                    views={blog.meta.views}
                    id={blog._id}
                    key={index}
                    deleteBlog={this.props.deleteBlog}
                    history={this.props.history}
                />)}
            </div>
        )
    }
}

class BlogItem extends PureComponent {

    _handleUpdate = () => {
        const {
            id
        } = this.props
        const path = {
            pathname: '/admin/publish_new_blog',
            state: { id },
            hasData: true
        }
        this.props.history.push(path)
    }

    viewBlog = (id) => {
        this.props.history.push(`/blogDetail/${id}`)
    }
    render() {
        const {
            blogTitle,
            publishedDate,
            numOfComment,
            numOfLikes,
            views,
            id,
            deleteBlog,
        } = this.props
        return (
            <div className='blogItem'>
                <div style={{ marginLeft: 20, marginRight: 'auto' }}>
                    <div>{blogTitle}</div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', color: '#9e9c94', fontSize: 13, marginTop: 5 }}>
                        <div>Published date: {publishedDate ? timestampToTime(publishedDate, true) : ''}</div>
                        <div style={{ margin: 'auto 15px' }}>Comments: {numOfComment}</div>
                        <div style={{ marginRight: 15 }}>Likes: {numOfLikes}</div>
                        <div>Views: {views}</div>
                    </div>
                </div>

                <div style={Object.assign({}, styles.blog_management_button_style, { backgroundColor: '#33e662' })} onClick={this._handleUpdate}>Update</div>
                <div style={Object.assign({}, styles.blog_management_button_style, { backgroundColor: '#ff270f' })} onClick={() => deleteBlog(id)}>Delete</div>
                <div style={Object.assign({}, styles.blog_management_button_style, { backgroundColor: '#0fafff' })} onClick={() => this.viewBlog(id)}>View</div>

            </div>
        )
    }
}


export class LeftSideBar extends PureComponent {

    constructor(props) {
        super(props);

    }
    handleLogout = () => {
        this.props.history.push('/admin/login')
        localStorage.removeItem('admin')
    }

    handleClick = (path) => {
        this.props.history.push(path)
    }
    render() {

        return (
            <div className='admin_left_side_bar'>
                <div className='admin_left_side_bar_button'>
                    <div onClick={() => this.handleClick('/admin/blog_management')}><p><Icon icon='blog_management' /><span>Blog Management</span></p></div>
                    <div onClick={() => this.handleClick('/admin/publish_new_blog')}><p><Icon icon='publish_blog' /><span>Publish Blog</span></p></div>
                    <div onClick={() => this.handleClick('/admin/category_management')}><p><Icon icon='category' /><span>Category</span></p></div>
                    <div onClick={() => this.handleClick('/admin/user_management')}><p><Icon icon='user_management' /><span>User Management</span></p></div>
                </div>
                <Logoutbutton handleLogout={this.handleLogout} style={{ marginTop: 30, marginLeft: 35, fontSize: 20 }} />

            </div>
        )
    }
}


export class PublishNewBlog extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            smde: null,
            category: '',
            category_id: '',
            blog_title: '',
            author: 'Admin',
            blog_content: '',
        }
        this.updatedBlog = ''
        this.category_id_to_name = {}
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.location.hasData) {
            if (this.props.newBlog !== nextProps.newBlog && nextProps.newBlog.isPublished) {
                notice.open('Update blog successfully!')
                this.props.history.push('/admin/blog_management')
            }
        } else if (this.props.newBlog !== nextProps.newBlog && nextProps.newBlog.isAddDone) {
            notice.open('Publish blog successfully!')
            this.props.history.push('/admin/blog_management')
        }
    }
    componentDidMount() {

        this.state.smde = new SimpleMDE({
            element: document.getElementById('editor').childElementCount,
            autofocus: true,
            autosave: true,
            previewRender(plainText) {
                return marked(plainText, {
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight(code) {
                        return highlight.highlightAuto(code).value;
                    },
                });
            },
        });
        const { allCategories } = this.props
        /**
         * category_id_to_name = { 5c7d57822209fa44d8cf246a: "Express", 5c7d57872209fa44d8cf246b: "Mongoose", 5c80551799192e61af448aec: "Javascript" }
         */

        allCategories.list && allCategories.list.length > 0 && allCategories.list.forEach(category => this.category_id_to_name[category._id] = category.name)

        if (this.props.location.hasData) {
            const {
                id
            } = this.props.location.state
            const blog_list = Object.values(this.props.allBlogs.blogDetail)
            this.updatedBlog = blog_list && blog_list.filter(blog => blog._id === id)[0]
            this.updatedBlog && this.setState({
                blog_title: this.updatedBlog.blog_title,
                category: this.category_id_to_name[this.updatedBlog.category],
                category_id: this.updatedBlog.category[0]
            })
        }
        this.state.smde && this.state.smde.value(this.updatedBlog.blog_content)

    }

    _handleInputValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    _handleSubmit = () => {
        if (!this.state.blog_title) {
            return notice.open('Title is required')
        }
        if (!this.state.smde.value()) {
            return notice.open('Blog content is required')
        }
        if (!this.state.category) {
            return notice.open('Category is required')
        }
        const blog_info = {
            blog_title: this.state.blog_title,
            blog_content: this.state.smde.value(),
            author: 'admin',
            category: this.state.category_id,
            id: this.props.location.hasData ? this.props.location.state.id : ''
        }
        this.props.location.hasData ? this.props.updateBlog(blog_info) : this.props.addNewBlog(blog_info)
    }

    render() {
        const { allCategories } = this.props
        return (<AdminPage history={this.props.history}>
            <div style={{ width: 3000, height: 'auto', overflow: 'auto', backgroundColor: 'white', display: 'flex', flexDirection: 'column', paddingLeft: 25 }}>
                <h1 style={{ alignSelf: 'center' }}>Publish new blog</h1>

                <div><p>Blog title:</p><div>
                    <input
                        type='text'
                        name='blog_title'
                        value={this.state.blog_title}
                        onChange={this._handleInputValue}
                        style={{ width: 600, height: 30, borderRadius: 4, fontSize: 20, overflow: 'hidden' }} /></div></div>
                <div><p>Main content:</p>
                    <div>
                        <textarea
                            type='text'
                            style={{ width: 800, height: 600, padding: 10 }}
                            size="large"
                            id='editor' />
                    </div>
                </div>
                <div>
                    <p>Category:</p>
                    <div>
                        <input
                            type='text'
                            name='category'
                            value={this.state.category}
                            onChange={this._handleInputValue}
                            style={{ width: 600, height: 30, borderRadius: 4, fontSize: 20, overflow: 'hidden' }} />
                        <div style={{ marginLeft: 580, marginTop: -27, cursor: 'pointer' }} onClick={() => this.setState({ category: '' })}><Icon icon='cross' /></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>{
                        allCategories.list &&
                        allCategories.list.length > 0 &&
                        allCategories.list.map((item, index) => (<div className='categorySelection' onClick={() => this.setState({ category: item.name, category_id: item._id })} key={index}><p>{item.name}</p></div>))}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                    <div style={Object.assign({}, styles.blog_management_button_style, { backgroundColor: '#4a99e8', width: 120 })}
                        onClick={this._handleSubmit}>
                        {this.props.location.hasData ? 'Update' : 'Publish'}
                    </div>
                    {/* <div style={Object.assign({}, styles.blog_management_button_style, { backgroundColor: '#4a99e8' })}>Cancel</div> */}
                </div>
            </div>
        </AdminPage>)
    }
}


export class CategoryManagement extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            category_input_value: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllCategories()
    }

    _handleInputValueChange = (e) => {
        this.setState({
            category_input_value: e.target.value
        })
    }


    render() {
        const { allCategories, removeCategory, addCategory } = this.props
        return (
            <AdminPage history={this.props.history}>
                <div style={{ width: 3000, height: 'auto', overflow: 'auto', backgroundColor: 'white', paddingLeft: 30 }}>
                    <h2>Category Management</h2>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <input
                            type='text'
                            value={this.state.category_input_value}
                            onChange={this._handleInputValueChange}
                            style={{ width: 250, height: 30, fontSize: 20 }} />
                        <div style={Object.assign({}, styles.blog_management_button_style, { backgroundColor: '#4a99e8', width: 120 })}
                            onClick={() => {
                                addCategory(this.state.category_input_value);
                                this.setState({ category_input_value: '' })
                            }}>Add Category</div>
                    </div>
                    {allCategories.list && allCategories.list.length > 0 && allCategories.list.map((item, index) => (<TagName key={index} name={item.name} id={item._id} removeCategory={removeCategory} />))}
                </div>
            </AdminPage>

        )
    }
}

const TagName = ({ name, id, removeCategory }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 5,
            width: 150,
            height: 30,
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#e9e8e8',
            margin: '20px auto 20px 20px'
        }}><div>{name}</div><div style={{ marginTop: 4, cursor: 'pointer' }}><div onClick={() => removeCategory(id)}><Icon icon='cross' /></div></div>
        </div>

    )
}


export class UserManagement extends PureComponent {
    componentDidMount() {
        this.props.get_all_users()
    }
    render() {
        const { users } = this.props
        let users_arr = [];
        for (let key in users) {
            users_arr.push(users[key])
        }
        return (<AdminPage history={this.props.history}> <div style={{ width: 1000, height: 'auto', overflow: 'auto', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', fontSize: 25 }}><p>Username</p> <p style={{ margin: 'auto 200px', flex: 0.5 }}>Email</p> <p>Created_time</p></div>
            <LongSeperatorLine style={{ width: 1000 }} />
            {users_arr.map((user, index) => <div style={{
                display: 'flex', justifyContent: 'center', flexDirection: 'row', fontSize: 20, color: 'grey'
            }} key={index}><p style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>{user.name}</p> <p style={{ margin: 'auto 150px', flex: 1 }}>{user.email}</p> <p style={{ flex: 1 }}>{user.create_time.split('T')[0]}</p></div>)}
            <LongSeperatorLine style={{ width: 1000 }} />
            <div style={{ fontSize: 20, margin: '30px 50px auto auto', float: 'right' }}>Total: {users_arr.length}</div>
        </div></AdminPage>

        )
    }
}

const styles = {
    blog_management_button_style: {
        width: 70,
        height: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 'auto 20px',
        cursor: 'pointer',
        color: 'white'
    },
}