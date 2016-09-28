using System.Collections.Generic;

namespace FirmSimulator.Infrastructure
{
    public static class ChartDataFactory
    {
        // Delegate
        public static ChartData GetChartData(int id)
        {
            return GetHeadquartersMainData();
        }

        // Overview Balance chart
        private static ChartData GetHeadquartersMainData()
        {
            SplineData data = new SplineData
            {
                Title = new Title
                {
                    Text = "Functions"
                },
                Series = new List<SplineSeries>
                {
                    new SplineSeries
                    {
                        Name = "Demand",
                        Data = new List<Point>
                        {
                            new Point
                            {
                                X = 0.0,
                                Y = 5.0
                            },
                            new Point
                            {
                                X = 1.0,
                                Y = 4.0
                            },
                            new Point
                            {
                                X = 2.0,
                                Y = 3.0
                            },
                            new Point
                            {
                                X = 3.0,
                                Y = 2.0
                            },
                            new Point
                            {
                                X = 4.0,
                                Y = 1.0
                            },
                            new Point
                            {
                                X = 5.0,
                                Y = 0.0
                            }
                        }
                    },
                    new SplineSeries
                    {
                        Name = "Supply",
                        Data = new List<Point>
                        {
                            new Point
                            {
                                X = 0.0,
                                Y = 0.0
                            },
                            new Point
                            {
                                X = 1.0,
                                Y = 1.0
                            },
                            new Point
                            {
                                X = 2.0,
                                Y = 2.0
                            },
                            new Point
                            {
                                X = 3.0,
                                Y = 3.0
                            },
                            new Point
                            {
                                X = 4.0,
                                Y = 4.0
                            },
                            new Point
                            {
                                X = 5.0,
                                Y = 5.0
                            }
                        }
                    },
                    new SplineSeries
                    {
                        Name = "Horizontal",
                        Data = new List<Point>
                        {
                            new Point
                            {
                                X = 0.0,
                                Y = 3.0
                            },
                            new Point
                            {
                                X = 1.0,
                                Y = 3.0
                            },
                            new Point
                            {
                                X = 2.0,
                                Y = 3.0
                            },
                            new Point
                            {
                                X = 3.0,
                                Y = 3.0
                            },
                            new Point
                            {
                                X = 4.0,
                                Y = 3.0
                            },
                            new Point
                            {
                                X = 5.0,
                                Y = 3.0
                            }
                        }
                    },
                    new SplineSeries
                    {
                        Name = "Vertical",
                        Data = new List<Point>
                        {
                            new Point
                            {
                                X = 3.0,
                                Y = 0.0
                            },
                            new Point
                            {
                                X = 3.0,
                                Y = 1.0
                            },
                            new Point
                            {
                                X = 3.0,
                                Y = 2.0
                            },
                            new Point
                            {
                                X = 3.0,
                                Y = 3.0
                            },
                            new Point
                            {
                                X = 3.0,
                                Y = 4.0
                            },
                            new Point
                            {
                                X = 3.0,
                                Y = 5.0
                            }
                        }
                    }
                }
            };

            return data;
        }
    }
}
