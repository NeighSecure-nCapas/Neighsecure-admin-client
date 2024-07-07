import {
  CartesianGrid, Line, LineChart,
  XAxis, YAxis
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const chartConfig = {
  total: {
    label: 'Total',
    color: 'var(--primaryColor)'
  }
} satisfies ChartConfig;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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


const DashboardBarChart = ({data} : {data : DashboardData}) =>{

  const entriesByMonth = groupEntriesByMonth(data.entries);
  const chartData = Object.entries(entriesByMonth).map(([key, value]) => ({
    Month: key,
    Total: value
  }));

  return (
    <Card className={'shadow-none border-none'}>
      <CardHeader>
        <CardTitle className={'font-medium'}>Total de entradas por mes</CardTitle>
        <CardDescription>Enero - Julio 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <XAxis
              dataKey="Month"
              stroke="#888888"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent/>}
            />
            <Line
              dataKey="Total"
              activeDot={{r: 8}}
              type='natural'
              strokeWidth={2}
              stroke='var(--primaryColor)'
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardBarChart;
