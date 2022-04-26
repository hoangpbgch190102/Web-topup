import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { IdeaContext } from '../../../contexts/IdeaContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const BarChart = () => {
    const { getAllIdea, ideaState: { ideas } } = React.useContext(IdeaContext)
    React.useEffect(() => { getAllIdea() }, [])

    const goodIdeas = ideas.sort((a, b) => {
        return b.likeCount - a.likeCount
    }).slice(0, 10)

    const userNameList = []
    const likeCountList = []

    goodIdeas.forEach(idea => {
        userNameList.push(idea.userName)
        likeCountList.push(idea.likeCount)
    })

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const data = {
        labels: userNameList,
        datasets: [{
            label: '# of Votes',
            data: likeCountList,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
        }]
    }

    return (
        <div>
            <Bar
                options={options}
                data={data}
                width={100}
                height={55}
            />
        </div>
    );
};

export default BarChart;