import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { IdeaContext } from '../../contexts/IdeaContext';

const PopularIdeas = () => {
    const [search, setSearch] = React.useState('');
    const { ideaState: { ideas }, getAllIdea } = React.useContext(IdeaContext)
    React.useEffect(() => { getAllIdea() }, [])
    const newIdeas = ideas.sort((a, b) => {
        return b.likeCount - a.likeCount
    })

    const goodIdeas = newIdeas.slice(0, 4)
    return (
        <div>
            <React.Fragment sx={{ width: '100%' }}>
                <Table size="larger" sx={{ minWidth: 900, marginTop: '30px' }}>
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Number</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Topic</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>UserName of Staff</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Content of Idea</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Like Count</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Dislike Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {goodIdeas.map((idea, index) => {
                            return (
                                <TableRow key={idea.userId}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{idea.ideaCategoryName}</TableCell>
                                    <TableCell align="center">{idea.userName}</TableCell>
                                    <TableCell align="justify">{idea.content}</TableCell>
                                    <TableCell align="center">{idea.likeCount}</TableCell>
                                    <TableCell align="center">{idea.disLikeCount}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </React.Fragment >
        </div>
    );
};

export default PopularIdeas;