import React from 'react';
import Grid from '@mui/material/Grid'
import GoodIdea from './GoodIdea'
import Topic from '../../components/home/Topic'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { IdeaContext } from '../../contexts/IdeaContext';
import { ReactionContext } from '../../contexts/ReactionContext';
import { AuthContext } from '../../contexts/AuthContext';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CircularProgress from '@mui/material/CircularProgress';
import Vote from './Vote';
import Paginations from '../../components/Pagination';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { saveAs } from "file-saver";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Home.css"


const Body = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [ideaPerPage] = React.useState(5);

    const { ideaState: { ideas }, getAllIdea, findIdea, downloadFile } = React.useContext(IdeaContext)
    const { reactionState: { reactions }, getReactionByUser } = React.useContext(ReactionContext)
    const { authState: { user } } = React.useContext(AuthContext)
    React.useEffect(() => { getReactionByUser(user.userId) }, [])
    React.useEffect(() => { getAllIdea() }, [ideas.length])

    const newIdeas = ideas.sort((a, b) => {
        return b.likeCount - a.likeCount
    })

    const goodIdeas = newIdeas.slice(0, 4)

    // get current users
    const indexOfLastUser = currentPage * ideaPerPage
    const indexOfFirstUser = indexOfLastUser - ideaPerPage
    const currentIdeas = ideas.slice(indexOfFirstUser, indexOfLastUser)

    // change pagination
    const paginate = number => {
        setCurrentPage(number)
    }

    const download = async (id) => {
        const file = await downloadFile(id)
        const url = file.slice(61)
        saveAs(
            `/${url}`
        );
    }

    if (!reactions) {
        return (
            <div className="admin-progress">
                <CircularProgress />
            </div>
        )
    }

    return (
        <Grid container sx={{ width: '60%', margin: '0 auto 10px' }}>
            <Grid item xs={12} sx={{ margin: '20px 0', padding: '0' }}>
                <Swiper
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        "@1.00": {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        "@2.00": {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {goodIdeas.map(goodIdea => {
                        return (
                            <SwiperSlide>
                                <GoodIdea goodIdea={goodIdea} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={8} xs={12}>
                    {currentIdeas.map(ideaData => {
                        let reaction = reactions.find(reaction => {
                            return reaction.ideaId === ideaData.id
                        })
                        const data = { reaction, ideaData }
                        return (
                            <Box sx={{ mb: 1 }} onClick={findIdea.bind(this, ideaData.id)}>
                                <div className='post' >
                                    <Box sx={{ display: 'flex', }}>
                                        <Box sx={{ fontWeight: 'bold', fontSize: '20px', color: '#333' }}>
                                            {ideaData.privacy ? "Anonymous" : ideaData.userName}
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        color: '#fff',
                                        padding: '5px',
                                        backgroundColor: '#4991df',
                                        // maxWidth: '395px',
                                        borderRadius: '5px'
                                    }}>
                                        {ideaData.ideaCategoryName}
                                    </Box>
                                    <Box sx={{ textAlign: 'justify', fontSize: '16px', color: '#333' }}>
                                        {ideaData.content}
                                    </Box>
                                    <Box>
                                        <IconButton
                                            color='primary'
                                            size="small"
                                            onClick={download.bind(this, ideaData.id)}
                                        >
                                            <FileDownloadIcon />
                                            download document
                                        </IconButton>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box className="control" >
                                            <Button
                                                as={Link}
                                                to="/ideaDetail-home"
                                                sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', color: '#6c6b6b' }}

                                            >
                                                <ChatBubbleOutlineIcon fontSize='small' />
                                                <span>comments</span>
                                            </Button>
                                        </Box>
                                        <Box sx={{ padding: '5px 10px', backgroundColor: '#4991df', color: '#fff', borderRadius: '5px' }}>
                                            <span style={{ marginRight: "5px" }}>Vote</span>
                                            <span>{ideaData.likeCount - ideaData.disLikeCount}</span>
                                        </Box>
                                    </Box>
                                </div >
                            </Box>
                        )
                    })}
                    {ideas.length / ideaPerPage <= 1
                        ? null
                        : <Paginations perPage={ideaPerPage} total={ideas.length} paginate={paginate} />
                    }
                </Grid>
                <Grid item xs={4} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Topic />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Body;