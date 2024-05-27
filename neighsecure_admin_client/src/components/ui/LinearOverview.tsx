import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"

const dataNew = [
    {
        Month: "Ene",
        Total: 30,
    },
    {
        Month: "Feb",
        Total: 10,
    },
    {
        Month: "Mar",
        Total: 5,
    },
    {
        Month: "Abr",
        Total: 25,
    },
    {
        Month: "May",
        Total: 90,
    },
    {
        Month: "Jun",
        Total: 40,
    },
]

export default function LinearOverview() {
    return (
        <ResponsiveContainer width="90%" height={300} className={"self-center"}>
            <LineChart data={dataNew}>
                <Tooltip/>
                <XAxis
                    dataKey="Month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={true}
                />
                <CartesianGrid stroke="#f5f5f5" vertical={false} />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    //tickFormatter={(value) => `$${value}`}
                />
                <Line
                    dataKey="Total"
                    activeDot={{r: 8}}
                    type={"monotone"}
                    strokeWidth={2}
                    stroke="currentColor"
                    className="fill-primaryColor"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
