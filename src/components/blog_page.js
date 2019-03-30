import React, { Component, PureComponent } from 'react';
import Icon from './icons';
import PropTypes from 'prop-types';
import RightSideBar from '../redux_container/right_side_bar_container';
import { timestampToTime } from '../helpers/helpers'
import { notice } from './popup';
import { connect } from 'react-redux';
import { postComment, getAllComments } from '../redux_actions/comments_actions'
import LoadingAnimation from './loading_animation';
import marked from 'marked';
import hljs from 'highlight.js';
import '../styles/marked.css'

export default class BlogPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            show_reply_section: true,
            liked: false
        }
        this.hoverElements = {
            title: false,
            comment: false,
            button: false
        }
        this.liked_by_loggedIn_user = []
        this.isLiked = false
    }

    static propTypes = {
        blog_id: PropTypes.string,
        getBlogDetail: PropTypes.func,
        LikeBlog: PropTypes.func,
        postComment: PropTypes.func,
        blogDetail: PropTypes.object,
        blog_comments: PropTypes.object,
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.blog_id !== nextProps.match.params.blog_id) {
            this.props.getBlogDetail(nextProps.match.params.blog_id)
            this.setState({
                liked: false
            })
        }
    }

    componentDidMount() {
        this.props.getBlogDetail(this.props.match.params.blog_id)
        // marked in mark down
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            },
        });
    }

    hideReplySection = () => {
        this.setState({
            show_reply_section: !this.state.show_reply_section
        })
    }

    _handleClickLike = () => {
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'))
            this.props.LikeBlog(user && user.userId, this.props.match.params.blog_id)
            this.setState({
                liked: true
            })
        } else {
            notice.open('Please login to like!')
        }
    }

    render() {
        const {
            category,
            blog_title,
            num_of_likes,
            blog_content,
            author,
            create_time,
            blog_id,
            views,
            like_users
        } = this.props.blogDetail
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                padding: '50px 100px 20px 100px',
            }}>
                {this.props.blogDetail.isFetching ? <div style={styles.loading}>
                        <LoadingAnimation style={styles.noticeView} width={450} height={450}/>
                    </div> : <div style={styles.blog_page_container}>
                    <div style={{
                        color: '#00bcd4',
                        marginBottom: -20,
                        fontSize: 12
                    }}>{category[0] && category[0].name}</div>
                    <div style={styles.blog_title}>{blog_title}</div>
                    <div style={styles.sub_blog_info}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',

                        }}><Icon icon='date' /><div style={{ marginLeft: 7, alignSelf: 'center' }}>{create_time ? timestampToTime(create_time, false) : ''}</div>
                        </div>

                        <div style={styles.icon_style}><Icon icon='user' /><div style={{ marginLeft: 7, alignSelf: 'center' }}>{author}</div>
                        </div>
                        <div style={styles.icon_style}>
                            <Icon icon='comment' /><div style={{ marginLeft: 7, alignSelf: 'center' }}>{this.props.blog_comments ? this.props.blog_comments.comment_list.length : 'Leave a comment'}</div>
                        </div>

                        <div style={Object.assign({}, styles.icon_style, { cursor: 'pointer' })}
                            onClick={this._handleClickLike}
                        >{this.isLiked || this.state.liked ? <Icon icon='liked' /> : <Icon icon='like' />}<div style={{ marginLeft: 7, alignSelf: 'center' }}>{num_of_likes ? num_of_likes : 0}</div>
                        </div>
                        <div style={styles.icon_style}><Icon icon='views' /><div style={{ marginLeft: 7, marginTop: -3, alignSelf: 'center' }}>{views ? views : ''}</div>
                        </div>

                    </div>
                    <LongSeperatorLine style={{ margin: '10px auto', width: 800 }} />
                    {/* <div style={{ color: '#544031', lineHeight: 2 }}> */}

                    <div
                        id="content"
                        dangerouslySetInnerHTML={{
                            __html: blog_content
                                ? marked(blog_content)
                                : null,
                        }}
                    />

                    {/* </div> */}
                    <LongSeperatorLine style={{ margin: '20px auto', width: 800  }} />
                    <CommentsContainer
                        blog_id={this.props.match.params.blog_id}
                        hideReplySection={this.hideReplySection}
                    />
                    <LongSeperatorLine style={{ margin: '30px auto', width: 800  }} />
                    {this.state.show_reply_section ? <ReplySection
                        postComment={this.props.postComment}
                        blogId={this.props.match.params.blog_id}
                    /> : null}
                </div>}
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



export class Comments extends Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate(prevProps) {
        if (this.props.blog_id !== prevProps.blog_id) {
            this.props.getAllComments(this.props.blog_id)
        }
    }

    componentDidMount() {
        this.props.getAllComments(this.props.blog_id)
    }
    render() {
        const { comment_list } = this.props.blog_comments;
        const main_comments = [];
        const sub_comments = [];
        comment_list.length > 0 && comment_list.forEach(comment => {
            const sub_comment = {};
            //Seperate sub_comment and main_comment
            if (typeof (comment.parent_id) === 'string' && comment.target_name) {
                // sub_comment = {
                //     parent_id:XX,
                //     target_name:XXXX,
                //     comment:{

                //    }
                // }
                sub_comment.parent_id = comment.parent_id;
                sub_comment.target_name = comment.target_name;
                sub_comment.comment = comment;
                sub_comments.push(sub_comment)
            } else {
                main_comments.push(comment)
            }

        })

        const all_comments = [];
        const sub_comments_parent_id = [];
        sub_comments.forEach(sub_comment => sub_comments_parent_id.push(sub_comment.parent_id));
        //iterate blog_comments, seperate main comments and sub comments
        //Find all the sub comments for a main comment
        main_comments.map((comment, index) => {
            let all_sub_comments = [];
            if (sub_comments_parent_id.includes(comment._id)) {
                sub_comments.map((sub_comment, index) => {
                    if (sub_comment.parent_id === comment._id) {
                        all_sub_comments.push(sub_comment)
                    }
                })
            }
            all_comments.push(<SingleComment
                key={index}
                {...comment}
                commentsOfReply={all_sub_comments}
                hideReplySection={this.props.hideReplySection}
                numOfTotalComments={comment_list.length}
                postComment={this.props.postComment}
            />)
        })
        return (

            <div>
                <h2 style={{
                    fontFamily: 'arial',
                    fontSize: 25,
                    fontWeight: 'bold'
                }}> COMMENTS <span>({comment_list ? comment_list.length : 0})</span></h2>

                {all_comments}
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        blog_comments: state.commentState.commentsInfo,
    }
}

const mapDispatchToProps = {
    postComment,
    getAllComments
}


const CommentsContainer = connect(mapStateToProps, mapDispatchToProps)(Comments)



class SingleComment extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show_reply_section: false
        }
    }

    handleClickReply = () => {
        this.props.hideReplySection()
        this.setState({
            show_reply_section: !this.state.show_reply_section
        })
    }

    handleCloseReplySection = () => {
        this.props.hideReplySection()
        this.setState({
            show_reply_section: false
        })
    }

    render() {
        const { user_name, create_time, comment_content, _id, blog_id, numOfTotalComments, commentsOfReply } = this.props;
        return (
            <div>
                <div style={styles.single_comment_header}>
                    <div style={{
                        fontFamily: 'arial',
                        fontSize: 20,
                        color: '#3CB371'
                    }}>{user_name}</div>
                    <div style={styles.dot_style} />
                    <div style={{ fontSize: 8, color: 'grey' }}>{create_time ? timestampToTime(create_time, false) : ''}</div>
                </div>

                <div>
                    <div>{comment_content}</div>
                    <div style={styles.single_comment_reply_button} onClick={this.handleClickReply}><Icon icon={this.state.show_reply_section ? 'down_reply' : 'up_reply'} /><p>Reply</p></div>
                </div>

                <div style={styles.sub_comment_style}>
                    {this.state.show_reply_section ? <ReplySection style={{ marginBottom: 50, color: 'black' }}
                        postComment={this.props.postComment}
                        targetName={user_name}
                        parentId={_id}
                        blogId={blog_id}
                        handleCloseReplySection={this.handleCloseReplySection}
                    /> : null}
                    {commentsOfReply ? commentsOfReply.map((sub_comment, index) => <CommentsOfReply
                        {...sub_comment}
                        hideReplySection={this.props.hideReplySection}
                        key={index}
                        postComment={this.props.postComment}
                    />) : null}
                </div>
            </div>
        )
    }
}

class CommentsOfReply extends PureComponent {

    state = {
        show_reply_section: false
    }
    handleClickSubReply = () => {
        this.props.hideReplySection()
        this.setState({
            show_reply_section: !this.state.show_reply_section
        })
    }

    handleCloseReplySection = () => {
        this.props.hideReplySection()
        this.setState({
            show_reply_section: false
        })
    }
    render() {
        return (
            <div>
                <div style={styles.sub_comment_container}>

                    <div style={styles.sub_comment_header}>
                        <p style={{
                            fontFamily: 'arial',
                            fontSize: 20,
                            color: '#3CB371'
                        }}>{this.props.comment.user_name}</p>
                        <div style={styles.dot_style} />
                        <p>{this.props.comment.create_time ? timestampToTime(this.props.comment.create_time, false) : ''}</p>
                        <div style={{ fontSize: 8, color: '#DC143C', marginLeft: 10 }}>@{this.props.target_name}</div>
                    </div>

                    <div style={{ fontSize: 15, lineHeight: 1.5, color: 'black' }}>
                        {this.props.comment.comment_content}
                    </div>
                    <div style={styles.single_comment_reply_button} onClick={this.handleClickSubReply}>
                        <Icon icon={this.state.show_reply_section ? 'down_reply' : 'up_reply'} /><p>Reply</p></div>
                </div>
                {this.state.show_reply_section ? <ReplySection
                    style={{ marginBottom: 30, color: 'black' }}
                    postComment={this.props.postComment}
                    targetName={this.props.comment.user_name}
                    parentId={this.props.parent_id}
                    blogId={this.props.comment.blog_id}
                    handleCloseReplySection={this.handleCloseReplySection}
                /> : null}
            </div>
        )
    }
}



class ReplySection extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            textarea_value: '',
            is_hovered: false
        }
    }

    _handleTextareaChange = (event) => {
        this.setState({
            textarea_value: event.target.value
        })
    }


    _handleClickPostComment = () => {
        if (!localStorage.getItem('user')) {
            return notice.open("Please login to comment!")
        }
        if (!this.state.textarea_value) {
            return notice.open('The comment is required!')
        }

        const user = JSON.parse(localStorage.getItem('user'))
        const new_comment = {
            blog_id: this.props.blogId,
            user_id: user.userId,
            user_name: user.name,
            comment_content: this.state.textarea_value,

            parent_id: this.props.parentId || '',
            target_name: this.props.targetName || ''
        }
        this.props.postComment(this.props.blogId, new_comment)
        this.setState({
            textarea_value: ''
        })
        this.props.handleCloseReplySection && this.props.handleCloseReplySection()
    }

    render() {
        const { textarea_value } = this.state;
        return (
            <div>
                <h2>LEAVE A REPLY</h2>
                <div style={this.props.style}>
                    <div><p style={{ fontWeight: 'bold', fontSize: 14 }}>Comment</p>
                        <textarea
                            type='text'
                            style={styles.reply_textarea}
                            value={textarea_value}
                            onChange={this._handleTextareaChange} />
                    </div>

                    <div style={Object.assign({}, styles.post_comment_button, { backgroundColor: this.state.is_hovered ? '#c3c0c0' : '#00bcd4' })}
                        onClick={this._handleClickPostComment}
                        onMouseEnter={() => this.setState({ is_hovered: true })}
                        onMouseLeave={() => this.setState({ is_hovered: false })}
                    ><p>POST COMMENT</p></div>

                </div>
            </div>
        )
    }
}

export class TextInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            input_value: ''
        }
    }
    _handleInputValueChange = (event) => {
        this.setState({
            input_value: event.target.value
        }, () => this.props.uploadInputValue(this.state.input_value, this.props.name))
    }


    render() {
        return (
            <div>
                <input
                    type='text'
                    name={this.props.name}
                    value={this.state.input_value}
                    onChange={this._handleInputValueChange}
                    style={this.props.style}
                /></div>

        )
    }
}

export const LongSeperatorLine = (props) => (
    <div style={Object.assign({}, styles.seperator_line_style, props.style)} />
)



const styles = {
    blog_page_container: {
        top: 50,
        left: 150,
        marginBottom: 180,
        marginRight: 50,
        display: 'flex',
        flexDirection: 'column',
        width: 800,
        height: 'auto',
        backgroundColor: 'white',
        padding: 40,
        lineHeight: 2,
        letterSpacing: '0.5px',
    },
    sub_blog_info: {
        marginTop: 5,
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        opacity: 0.5,
        fontSize: 13
    },
    blog_title: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        alignSelf: 'flex-start',

    },
    icon_style: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 30
    },
    single_comment_header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    dot_style: {
        width: 4,
        height: 4,
        borderRadius: '50%',
        backgroundColor: 'grey',
        margin: 'auto 10px'
    },
    single_comment_reply_button: {
        margin: '-10px 15px 0px 6px',
        fontSize: 10,
        width: 60,
        color: 'grey',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },

    sub_comment_style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        color: 'grey',
        fontSize: 9,
        // border: '1px solid red',
        marginLeft: 18,
    },
    sub_comment_container: {
        width: 'auto',
        height: 'auto',
        borderLeft: '3px solid #F5F5F5',
        padding: '0 20px 10px 20px ',
    },
    sub_comment_header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '-15px auto'
    },
    reply_textarea: {
        width: 720,
        height: 150,
        display: 'block',
        fontSize: 15,
        marginTop: '-15px',
        padding: 15
    },
    post_comment_button: {
        width: 140,
        height: 40,
        borderRadius: 3,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        marginTop: 30,
        cursor: 'pointer',
        boxShadow: '1px 3px grey'
    },
    seperator_line_style: {
        width: 750,
        height: 1,
        opacity: 0.5,
        backgroundColor: 'grey'
    },
    loading: {
        display: 'flex',
        alignSelf: 'stretch',
        flex: 0.7,
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