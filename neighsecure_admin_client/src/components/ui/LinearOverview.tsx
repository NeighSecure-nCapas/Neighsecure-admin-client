import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"


function groupEntriesByMonth(entries: any[]) {
    return entries.reduce((groups: { [x: string]: number; }, entry: { date: string | number | Date; }) => {
        // Convertir la fecha a un objeto Date
        const date = new Date(entry.date);

        // Obtener el mes y el año de la fecha
        const month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que añadimos 1 para obtener el mes correcto
        const year = date.getFullYear();

        // Crear la clave del grupo
        const groupKey = `${year}-${month < 10 ? '0' + month : month}`; // Asegurarse de que el mes siempre tenga dos dígitos

        // Si el grupo no existe, crearlo
        if (!groups[groupKey]) {
            groups[groupKey] = 0;
        }

        // Incrementar el contador de entradas para este grupo
        groups[groupKey]++;

        return groups;
    }, {});
}

export default function LinearOverview({data} : {data : DashboardData}) {

    const entriesByMonth = groupEntriesByMonth(data.entries);
    const chartData = Object.entries(entriesByMonth).map(([key, value]) => ({
        Month: key,
        Total: value,
    }));

    return (
        <ResponsiveContainer width="90%" height={300} className={"self-center"}>
            <LineChart data={chartData}>
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
