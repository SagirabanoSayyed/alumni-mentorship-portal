import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell
} from "recharts";

function AnalyticsChart({ stats, role }) {

    let data = [];

    if (role === "STUDENT") {
        data = [
            { name: "Pending", value: stats.pendingRequests },
            { name: "Accepted", value: stats.acceptedRequests },
            { name: "Upcoming", value: stats.upcomingSessions },
            { name: "Completed", value: stats.completedSessions }
        ];
    }
    else if (role === "MENTOR") {
        data = [
            { name: "Pending", value: stats.pendingRequests },
            { name: "Accepted", value: stats.acceptedRequests },
            { name: "Upcoming", value: stats.upcomingSessions },
            { name: "Completed", value: stats.completedSessions }
        ];
    }
    else {
        return (
            <div className="text-center p-4">
                Analytics not available.
            </div>
        );
    }

    const colors = [
        "#f59e0b",
        "#10b981",
        "#3b82f6",
        "#8b5cf6"
    ];

    return (
        <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={index}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </Bar>

            </BarChart>
        </ResponsiveContainer>
    );
}

export default AnalyticsChart;