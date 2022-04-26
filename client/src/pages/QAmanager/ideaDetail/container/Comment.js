import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { CommentContext } from '../../../../contexts/CommentContext';
import { TopicContext } from '../../../../contexts/TopicContext';

import '../../../home/ideaDetail/IdeaDetail.css';

const Comment = ({ data }) => {
    const { users, idea, user } = data;
    const [comment, setComment] = React.useState('')
    const { commentState: { comments }, getCommentByIdea, PostComment } = React.useContext(CommentContext)
    const { topicState: { topics }, getAllTopic } = React.useContext(TopicContext)
    React.useEffect(() => { getCommentByIdea(idea.id) }, [])
    React.useEffect(() => { getAllTopic() }, [])

    const handelComment = async () => {
        const commentForm = {
            ideaId: idea.id,
            replyBy: user.userId,
            content: comment
        }
        const findTopic = topics.find(topic => topic.title === idea.ideaCategoryName)
        const today = new Date();
        const someday = new Date();
        const year = findTopic.finalClosureDate.slice(0, 4)
        const month = findTopic.finalClosureDate.slice(5, 7) - 1
        const day = findTopic.finalClosureDate.slice(8, 10)
        someday.setFullYear(year, month, day);
        console.log(someday);
        if (today > someday) {
            window.alert('You were late for the comment.!')
            setComment('')
        }
        else {
            await PostComment(commentForm)
            setComment('')
        }
    }

    return (
        <>
            <Grid container sx={{ mt: 1, mb: 3, alignItems: 'center' }}>
                <Grid item md={1} xs={2} >
                    <Avatar
                        alt="Remy Sharp" src="https://th.bing.com/th/id/R.03e726787c9f981a4954f521a80424af?rik=Ceuu5CZ8AH5Msw&riu=http%3a%2f%2fcreativeartsworkshop.org%2fwp-content%2fuploads%2f2020%2f02%2fblank-profile-picture-973460_960_720-300x300-1-300x300.png&ehk=J%2bDw294HSHRvhlyrl6fvIPVYRvi7ZoffP0BxPNVmtgw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
                        sx={{
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                            width: { lg: '60px', md: '50px', xs: '40px' },
                            height: { lg: '60px', md: '50px', xs: '40px' },
                            margin: '10px auto 0'
                        }}
                    />
                </Grid>
                <Grid item md={10.5} xs={9.5}>
                    <form className="idea-comment__content">
                        <TextField
                            id="standard-search"
                            label="Write your comment..."
                            variant="standard"
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{ width: '100%', paddingRight: '50px' }}
                        />
                        <div className="idea-comment__send-icon">
                            <IconButton onClick={handelComment}>
                                <SendIcon />
                            </IconButton>
                        </div>
                    </form>
                </Grid>
            </Grid>
            <Grid container>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {comments.map((comment) => {
                        const findUser = users.find(user => user.userId === comment.replyBy)
                        if (!findUser) {
                            return null
                        }
                        return (
                            <>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar
                                            alt="Remy Sharp" src="https://th.bing.com/th/id/R.03e726787c9f981a4954f521a80424af?rik=Ceuu5CZ8AH5Msw&riu=http%3a%2f%2fcreativeartsworkshop.org%2fwp-content%2fuploads%2f2020%2f02%2fblank-profile-picture-973460_960_720-300x300-1-300x300.png&ehk=J%2bDw294HSHRvhlyrl6fvIPVYRvi7ZoffP0BxPNVmtgw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
                                            sx={{
                                                boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                                                width: { md: '40px', xs: '30px' },
                                                height: { md: '40px', xs: '30px' }
                                            }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <>
                                                <span className="Comment-detail__name">{findUser.userName}</span>
                                            </>
                                        }
                                        secondary={
                                            <span>
                                                {comment.content}
                                            </span>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        )
                    })}
                </List>
            </Grid>
        </>
    );
};

export default Comment;