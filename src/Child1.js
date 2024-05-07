import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }
  componentDidMount() {
    //console.log(this.chartRef);
    //this.drawChart();
    console.log(this.props.data1);
    var data = this.props.data1;
}

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.clearChart();
      this.drawChart();
    }
    console.log(this.chartRef);
    var data = this.props.chartRef;
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child1_svg").attr("width", w + margin.left + margin.right).attr("height", h + margin.top + margin.bottom).select(".g_1").attr("transform", `translate(${margin.left}, ${margin.top})`);
  }

  clearChart() {
    d3.select(this.chartRef.current).selectAll("*").remove();
  }

  drawChart() {
    const { data, x, y } = this.props;
    if (!this.chartRef.current || !data || data.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(this.chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3.scaleBand()
      .domain(data.map(d => d[x]))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[y])])
      .nice()
      .range([height, 0]);

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d[x]))
      .attr("width", xScale.bandwidth())
      .attr("y", d => yScale(d[y]))
      .attr("height", d => height - yScale(d[y]));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .call(d3.axisLeft(yScale));
  }

  render() {
    return <svg ref={this.chartRef}></svg>;
  }
}

export default Child1;
