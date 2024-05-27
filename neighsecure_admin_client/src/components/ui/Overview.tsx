import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"

const dataNew = [
    {
        hour: "10:00",
        total: 30,
    },
    {
        hour: "11:00",
        total: 10,
    },
    {
        hour: "12:00",
        total: 5,
    },
    {
        hour: "13:00",
        total: 25,
    },
    {
        hour: "14:00",
        total: 90,
    },
    {
        hour: "15:00",
        total: 40,
    },
]

export default function Overview() {
    return (
        <ResponsiveContainer width="90%" height={250}  className={"self-center"}>
            <BarChart data={dataNew}>
                <Tooltip/>
                <XAxis
                    dataKey="hour"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <CartesianGrid stroke="#f5f5f5" vertical={false} />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    //tickFormatter={(value) => `$${value}`}
                />
                <Tooltip/>
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    barSize={60}
                    radius={[4, 4, 0, 0]}
                    className="fill-primaryColor"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

