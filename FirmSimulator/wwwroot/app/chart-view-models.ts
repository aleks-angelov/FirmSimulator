class Title {
    text: string;
}

class Point {
    x: number;
    y: number;
}

class Series {
    name: string;
}

class SplineSeries extends Series {
    data: number[];
}

export class ChartData {
    title: Title;
}

export class SplineData extends ChartData {
    series: SplineSeries[];
}