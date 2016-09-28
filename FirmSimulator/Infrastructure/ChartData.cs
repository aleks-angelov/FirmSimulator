using System.Collections.Generic;

namespace FirmSimulator.Infrastructure
{
    public class Title
    {
        public string Text { get; set; }
    }

    public class Point
    {
        public double X { get; set; }

        public double Y { get; set; }
    }

    public class Series
    {
        public string Name { get; set; }
    }

    public class SplineSeries : Series
    {
        public List<Point> Data { get; set; }
    }

    public class ChartData
    {
        public Title Title { get; set; }
    }

    public class SplineData : ChartData
    {
        public List<SplineSeries> Series { get; set; }
    }
}