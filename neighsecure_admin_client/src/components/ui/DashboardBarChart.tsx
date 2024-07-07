import {
  Bar,
  BarChart,
  CartesianGrid,
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

const DashboardBarChart = ({data} : {data : DashboardData}) =>{

  const entriesByHour = groupEntriesByHour(data.entries);

  const chartData = Object.entries(entriesByHour).map(([key, value]) => ({
    hour: key,
    total: value
  }));

  return (
    <Card className={'shadow-none border-none'}>
      <CardHeader>
        <CardTitle className={'font-medium'}>Total de entradas por hora</CardTitle>
        <CardDescription>Enero - Julio 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent/>}
            />
            <Bar
              dataKey="total"
              fill="var(--primaryColor)"
              barSize={60}
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardBarChart;
