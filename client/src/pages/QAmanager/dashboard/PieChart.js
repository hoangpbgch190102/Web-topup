import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TopicContext } from '../../../contexts/TopicContext';
import { IdeaContext } from '../../../contexts/IdeaContext';

ChartJS.register(
    Tooltip, Legend,
    ArcElement
)

const PieChart = () => {
    const { topicState: { topics }, getAllTopic } = React.useContext(TopicContext)
    const { ideaState: { ideas }, getAllIdea } = React.useContext(IdeaContext)
    React.useEffect(() => { getAllTopic() }, [])
    React.useEffect(() => { getAllIdea() }, [])

    const k = []
    for (let i = 0; i < topics.length; i++) {
        let arr = []
        for (let j = 0; j < ideas.length; j++) {
            if (topics[i].title == ideas[j].ideaCategoryName) {
                arr.push(ideas[j])
            }
        }
        k.push(arr)
    }

    const label = []
    const numberIdeas = []

    for (let i = 0; i < k.length; i++) {
        if (k[i].length > 0) {
            label.push(k[i][0].ideaCategoryName)
            numberIdeas.push(k[i].length)
        }
    }

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
        labels: label,
        datasets: [{
            label: '# of Votes',
            data: numberIdeas,
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
            <Pie
                options={options}
                data={data}
                width={100}
            />
        </div>
    );
};

export default PieChart;