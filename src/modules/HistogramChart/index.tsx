import React, { useState, useCallback, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import ChartLabel from "../../components/ChartLabel";
import { formatHistJSONtoChartData } from "../../utils/dataFormattingHelpers";
import { histChartLineColors } from "../../theme/theme";
import { theme } from "../../theme/theme";

// TODO: colors edge case when more than 4 channels !!!!!!!
// TODO: check out data normalization in rust

const HistogramChart = ({ jsonData }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [chartLineColors, setChartLineColors] = useState<string[] | string>();

  const getChannelColors = useCallback(
    (channelCount: number) => {
      if (channelCount === 4) return histChartLineColors;
      if (channelCount === 3) return histChartLineColors.slice(0, -1);
      return [histChartLineColors[histChartLineColors.length - 1]];
    },
    [histChartLineColors]
  );

  useEffect(() => {
    if (jsonData) {
      const formattedChartData = formatHistJSONtoChartData(jsonData);

      setChartLineColors(getChannelColors(Object.keys(jsonData).length));
      setChartData(formattedChartData);
    }
  }, [jsonData]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis
          dataKey="name"
          minTickGap={500}
          label={{
            value: "Intensywność odcienia",
            fill: theme.palette.grey["100"],
          }}
        />
        <YAxis
          width={50}
          label={{
            value: "Ilość pixeli",
            fill: theme.palette.grey["100"],
            angle: -90,
            position: "insideLeft",
            x: 30,
          }}
        />
        <Tooltip
          wrapperStyle={{ color: theme.palette.grey["100"] }}
          contentStyle={{
            backgroundColor: theme.palette.grey["800"],
          }}
        />
        <Legend />
        {chartLineColors &&
          Object.keys(jsonData).map((_, index) => {
            return (
              <Line
                type="monotone"
                dataKey={`Kanał ${index}`}
                stroke={chartLineColors[index]}
                dot={false}
                strokeWidth={1.5}
              />
            );
          })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistogramChart;
