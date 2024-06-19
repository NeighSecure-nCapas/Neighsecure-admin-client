import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"

function groupEntriesByHour(entries: any[]) {
    return entries.reduce((groups: { [x: string]: number; }, entry: { date: string | number | Date; }) => {
        // Convertir la fecha a un objeto Date
        const date = new Date(entry.date);

        // Obtener la hora de la fecha
        const hour = date.getHours();

        // Crear la clave del grupo
        const groupKey = `${hour < 10 ? '0' + hour : hour}:00`;

        // Si el grupo no existe, crearlo
        if (!groups[groupKey]) {
            groups[groupKey] = 0;
        }

        // Incrementar el contador de entradas para este grupo
        groups[groupKey]++;

        return groups;
    }, {});
}

export default function Overview({data} : {data : DashboardData}) {

    const entriesByHour = groupEntriesByHour(data.entries);

    const chartData = Object.entries(entriesByHour).map(([key, value]) => ({
        hour: key,
        total: value,
    }));


    return (
        <ResponsiveContainer width="90%" height={250}  className={"self-center"}>
            <BarChart data={chartData}>
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

