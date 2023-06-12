import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GradeDistributionChart({ grades }) {
    const gradeLabels = ['0-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85-89', '90-94', '95-100'];
    const gradeCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    grades.forEach((grade) => {
        if (grade >= 0 && grade <= 49) {
            gradeCounts[0]++;
        } else if (grade >= 50 && grade <= 54.99) {
            gradeCounts[1]++;
        } else if (grade >= 55 && grade <= 59.99) {
            gradeCounts[2]++;
        } else if (grade >= 60 && grade <= 64.99) {
            gradeCounts[3]++;
        } else if (grade >= 65 && grade <= 69.99) {
            gradeCounts[4]++;
        } else if (grade >= 70 && grade <= 74.99) {
            gradeCounts[5]++;
        } else if (grade >= 75 && grade <= 79.99) {
            gradeCounts[6]++;
        } else if (grade >= 80 && grade <= 84.99) {
            gradeCounts[7]++;
        } else if (grade >= 85 && grade <= 89.99) {
            gradeCounts[8]++;
        } else if (grade >= 90 && grade <= 94.99) {
            gradeCounts[9]++;
        } else if (grade >= 95 && grade <= 100) {
            gradeCounts[10]++;
        }
    });

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Grade Distribution",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: Math.max(...gradeCounts),
                stepSize: 1,
                ticks: {
                    precision: 0,
                    callback: (value) => Math.floor(value), // Round down the value to the nearest integer
                },
            },
        },
    };

    const data = {
        labels: gradeLabels,
        datasets: [
            {
                label: "Grade Distribution",
                data: gradeCounts,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    );
}

export default GradeDistributionChart;